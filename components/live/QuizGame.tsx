'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Quiz, QuizQuestion, QuizScore } from '@/types/live';
import { Trophy, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizGameProps {
  quiz: Quiz;
  currentQuestion: QuizQuestion | null;
  leaderboard: QuizScore[];
  onAnswer?: (optionId: string) => void;
}

export function QuizGame({ quiz, currentQuestion, leaderboard, onAnswer }: QuizGameProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(currentQuestion?.timeLimit || 30);

  // Reset state cuando cambia la pregunta
  useEffect(() => {
    if (currentQuestion) {
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setTimeLeft(currentQuestion.timeLimit);
    }
  }, [currentQuestion?.id]);

  // Timer countdown
  useEffect(() => {
    if (!currentQuestion || isAnswered || quiz.status === 'waiting') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto-submit cuando se acaba el tiempo
          handleAnswer(selectedOption || '');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, isAnswered, selectedOption, quiz.status]);

  const handleAnswer = (optionId: string) => {
    if (isAnswered || !currentQuestion) return;

    setSelectedOption(optionId);
    setIsAnswered(true);
    setIsCorrect(optionId === currentQuestion.correctOptionId);
    onAnswer?.(optionId);
  };

  // Estado: Esperando inicio
  if (quiz.status === 'waiting') {
    return (
      <div className="flex h-full items-center justify-center p-12 text-center">
        <div>
          <Trophy className="mx-auto mb-3 h-16 w-16 text-primary" />
          <h3 className="mb-2 text-2xl font-bold">¡Quiz en Vivo!</h3>
          <p className="mb-1 text-muted-foreground">
            {quiz.totalQuestions} preguntas
          </p>
          <p className="text-sm text-muted-foreground">
            Espera a que el moderador inicie el quiz
          </p>
        </div>
      </div>
    );
  }

  // Estado: Quiz finalizado
  if (quiz.status === 'finished' || !currentQuestion) {
    return (
      <div className="space-y-6 p-4">
        <Card className="border-primary bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-primary" />
              ¡Quiz Finalizado!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Gracias por participar. Revisa el leaderboard para ver tu posición.
            </p>
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Leaderboard Final</h3>
          <div className="space-y-2">
            {leaderboard.slice(0, 10).map((score) => (
              <Card
                key={score.userId}
                className={cn(
                  'border-border/40',
                  score.rank === 1 && 'border-yellow-500 bg-yellow-500/10',
                  score.rank === 2 && 'border-gray-400 bg-gray-400/10',
                  score.rank === 3 && 'border-orange-500 bg-orange-500/10'
                )}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-bold">
                      {score.rank}
                    </span>
                    {score.userAvatar && (
                      <img
                        src={score.userAvatar}
                        alt={score.userName}
                        className="h-8 w-8 rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-medium">{score.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {score.correctAnswers} correctas
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{score.totalPoints}</p>
                    <p className="text-xs text-muted-foreground">puntos</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Estado: Pregunta activa
  return (
    <div className="space-y-6 p-4">
      {/* Header con progreso */}
      <Card className="border-primary bg-primary/5">
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm text-muted-foreground">Pregunta</p>
            <p className="text-2xl font-bold">
              {quiz.currentQuestionNumber} / {quiz.totalQuestions}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Tiempo</p>
            <div className="flex items-center gap-2">
              <Clock className={cn('h-5 w-5', timeLeft <= 10 && 'text-red-500')} />
              <p
                className={cn(
                  'text-2xl font-bold',
                  timeLeft <= 10 ? 'text-red-500' : 'text-foreground'
                )}
              >
                {timeLeft}s
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pregunta */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
          <p className="text-sm text-muted-foreground">{currentQuestion.points} puntos</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrectOption = option.id === currentQuestion.correctOptionId;
            const showFeedback = isAnswered;

            return (
              <Button
                key={option.id}
                onClick={() => !isAnswered && handleAnswer(option.id)}
                disabled={isAnswered}
                variant="outline"
                className={cn(
                  'h-auto w-full justify-start whitespace-normal py-4 text-left transition-all',
                  !showFeedback && isSelected && 'border-primary bg-primary/10',
                  showFeedback && isCorrectOption && 'border-green-500 bg-green-500/20',
                  showFeedback && isSelected && !isCorrectOption && 'border-red-500 bg-red-500/20'
                )}
              >
                <span className="flex-1">{option.text}</span>
                {showFeedback && isCorrectOption && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {showFeedback && isSelected && !isCorrectOption && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Feedback */}
      {isAnswered && (
        <Card
          className={cn(
            'border-2',
            isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="h-6 w-6 shrink-0 text-green-500" />
              ) : (
                <XCircle className="h-6 w-6 shrink-0 text-red-500" />
              )}
              <div>
                <p className={cn('font-bold', isCorrect ? 'text-green-600' : 'text-red-600')}>
                  {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                </p>
                {currentQuestion.explanation && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {currentQuestion.explanation}
                  </p>
                )}
                {isCorrect && (
                  <p className="mt-2 text-sm font-medium">
                    +{currentQuestion.points} puntos
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mini Leaderboard */}
      <div>
        <h3 className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Trophy className="h-4 w-4" />
          Top 5
        </h3>
        <div className="space-y-1">
          {leaderboard.slice(0, 5).map((score) => (
            <div
              key={score.userId}
              className="flex items-center justify-between rounded-lg border border-border/40 bg-card/50 p-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-muted-foreground">{score.rank}.</span>
                {score.userAvatar && (
                  <img
                    src={score.userAvatar}
                    alt={score.userName}
                    className="h-6 w-6 rounded-full"
                  />
                )}
                <span className="text-sm font-medium">{score.userName}</span>
              </div>
              <span className="text-sm font-bold text-primary">{score.totalPoints}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

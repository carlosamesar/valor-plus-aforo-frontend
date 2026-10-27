'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Question } from '@/types/live';
import { ArrowUp, CheckCircle2, Star, Send } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface QAPanelProps {
  questions: Question[];
  onUpvote?: (questionId: string) => void;
  onSubmit?: (question: string) => void;
}

type FilterType = 'all' | 'top' | 'answered' | 'mine';

export function QAPanel({ questions, onUpvote, onSubmit }: QAPanelProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [newQuestion, setNewQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'Todas' },
    { id: 'top', label: 'Más Votadas' },
    { id: 'answered', label: 'Respondidas' },
    { id: 'mine', label: 'Mis Preguntas' }
  ];

  const filteredQuestions = questions
    .filter((q) => {
      if (filter === 'all') return true;
      if (filter === 'top') return q.upvotes > 10;
      if (filter === 'answered') return q.status === 'answered';
      if (filter === 'mine') return false; // Mock: no hay usuario actual
      return true;
    })
    .sort((a, b) => {
      if (filter === 'top') return b.upvotes - a.upvotes;
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || isSubmitting) return;

    setIsSubmitting(true);
    // Mock: simular envío
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSubmit?.(newQuestion);
    setNewQuestion('');
    setIsSubmitting(false);
  };

  const handleUpvote = (questionId: string) => {
    onUpvote?.(questionId);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border/40 p-4">
        <h3 className="mb-3 text-lg font-semibold">Preguntas para el Ponente</h3>

        {/* Filters */}
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                filter === f.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {filteredQuestions.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            <p>No hay preguntas aún</p>
            <p className="text-sm">Sé el primero en preguntar</p>
          </div>
        ) : (
          filteredQuestions.map((question) => (
            <Card
              key={question.id}
              className={cn(
                'border-border/40 transition-all',
                question.status === 'featured' && 'border-primary bg-primary/5',
                question.status === 'answered' && 'bg-green-500/5'
              )}
            >
              <CardContent className="p-4">
                {/* Header */}
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {question.userAvatar && (
                      <img
                        src={question.userAvatar}
                        alt={question.userName}
                        className="h-8 w-8 rounded-full"
                      />
                    )}
                    <div>
                      <p className="text-sm font-medium">{question.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(question.timestamp), "HH:mm", { locale: es })}
                      </p>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex gap-1">
                    {question.status === 'featured' && (
                      <Badge variant="outline" className="border-primary text-primary">
                        <Star className="mr-1 h-3 w-3" />
                        Destacada
                      </Badge>
                    )}
                    {question.status === 'answered' && (
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        Respondida
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Question */}
                <p className="mb-3 text-sm">{question.question}</p>

                {/* Answer */}
                {question.status === 'answered' && question.answer && (
                  <div className="mb-3 rounded-lg border border-green-500/20 bg-green-500/10 p-3">
                    <p className="mb-1 text-xs font-medium text-green-600">
                      Respuesta de {question.answeredBy}:
                    </p>
                    <p className="text-sm text-green-700">{question.answer}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={question.hasUpvoted ? 'default' : 'outline'}
                    onClick={() => handleUpvote(question.id)}
                    className="gap-1"
                  >
                    <ArrowUp className="h-4 w-4" />
                    {question.upvotes}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Submit Form */}
      <div className="border-t border-border/40 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex h-10 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            maxLength={200}
          />
          <Button type="submit" disabled={!newQuestion.trim() || isSubmitting} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="mt-2 text-xs text-muted-foreground">
          Las preguntas más votadas tienen más probabilidad de ser respondidas
        </p>
      </div>
    </div>
  );
}

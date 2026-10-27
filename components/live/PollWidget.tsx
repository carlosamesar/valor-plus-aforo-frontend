'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Poll } from '@/types/live';
import { CheckCircle2, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PollWidgetProps {
  polls: Poll[];
  onVote?: (pollId: string, optionId: string) => void;
}

export function PollWidget({ polls, onVote }: PollWidgetProps) {
  const [votingPoll, setVotingPoll] = useState<string | null>(null);

  const activePoll = polls.find((p) => p.status === 'active');
  const closedPolls = polls.filter((p) => p.status === 'closed').slice(0, 2);

  const handleVote = async (pollId: string, optionId: string) => {
    setVotingPoll(pollId);
    // Mock: simular delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    onVote?.(pollId, optionId);
    setVotingPoll(null);
  };

  if (!activePoll && closedPolls.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-12 text-center">
        <div>
          <Users className="mx-auto mb-3 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">No hay votaciones activas</p>
          <p className="text-sm text-muted-foreground">Espera la próxima pregunta</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {/* Active Poll */}
      {activePoll && (
        <Card className="border-2 border-primary bg-primary/5">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{activePoll.question}</CardTitle>
              <Badge className="animate-pulse bg-primary">
                Votación Activa
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {activePoll.totalVotes.toLocaleString()} votos totales
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {activePoll.hasVoted ? (
              // Show results after voting
              <>
                {activePoll.options.map((option) => {
                  const isUserVote = activePoll.userVote === option.id;
                  return (
                    <div key={option.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium">
                          {option.text}
                          {isUserVote && (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          )}
                        </span>
                        <span className="text-muted-foreground">
                          {option.percentage}% ({option.votes})
                        </span>
                      </div>
                      <div className="h-8 overflow-hidden rounded-lg bg-muted">
                        <div
                          className={cn(
                            'flex h-full items-center justify-end px-3 text-xs font-medium text-white transition-all duration-500',
                            isUserVote ? 'bg-primary' : 'bg-primary/60'
                          )}
                          style={{ width: `${option.percentage}%` }}
                        >
                          {option.percentage > 10 && `${option.percentage}%`}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  ✓ Tu voto ha sido registrado
                </p>
              </>
            ) : (
              // Show voting buttons
              <>
                {activePoll.options.map((option) => (
                  <Button
                    key={option.id}
                    onClick={() => handleVote(activePoll.id, option.id)}
                    disabled={votingPoll === activePoll.id}
                    variant="outline"
                    className="h-auto w-full justify-start whitespace-normal py-3 text-left"
                  >
                    <span className="flex-1">{option.text}</span>
                  </Button>
                ))}
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Selecciona una opción para votar
                </p>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Closed Polls (Recent Results) */}
      {closedPolls.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Resultados Anteriores</h3>
          {closedPolls.map((poll) => (
            <Card key={poll.id} className="border-border/40 bg-card/50">
              <CardHeader>
                <CardTitle className="text-base">{poll.question}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {poll.totalVotes.toLocaleString()} votos • Cerrada
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                {poll.options.map((option) => {
                  const isUserVote = poll.userVote === option.id;
                  return (
                    <div key={option.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          {option.text}
                          {isUserVote && (
                            <CheckCircle2 className="h-3 w-3 text-primary" />
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {option.percentage}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className={cn(
                            'h-full transition-all',
                            isUserVote ? 'bg-primary' : 'bg-primary/40'
                          )}
                          style={{ width: `${option.percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { StreamingPlayer } from '@/components/live/StreamingPlayer';
import { QAPanel } from '@/components/live/QAPanel';
import { PollWidget } from '@/components/live/PollWidget';
import { QuizGame } from '@/components/live/QuizGame';
import { LiveChat } from '@/components/live/LiveChat';
import { mockLiveSession, getCurrentQuizQuestion, mockLeaderboard } from '@/lib/mock-data-live';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { MessageSquare, HelpCircle, BarChart3, Trophy, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = 'stream' | 'qa' | 'polls' | 'quiz';

export default function LiveEventPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('stream');

  // Buscar evento y sesión live
  const event = MOCK_EVENTS.find((e) => e.id === resolvedParams.id);
  const liveSession = mockLiveSession; // En producción, esto vendría de una API

  if (!event) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold">Evento no encontrado</h1>
      </div>
    );
  }

  const tabs = [
    {
      id: 'stream' as Tab,
      label: 'Stream',
      icon: MessageSquare,
      enabled: true
    },
    {
      id: 'qa' as Tab,
      label: 'Q&A',
      icon: HelpCircle,
      enabled: liveSession.qa.enabled,
      count: liveSession.qa.questions.filter((q) => q.status === 'pending').length
    },
    {
      id: 'polls' as Tab,
      label: 'Votaciones',
      icon: BarChart3,
      enabled: liveSession.polls.enabled,
      count: liveSession.polls.active.length
    },
    {
      id: 'quiz' as Tab,
      label: 'Quiz',
      icon: Trophy,
      enabled: liveSession.quiz.enabled
    }
  ];

  const currentQuestion = liveSession.quiz.current
    ? getCurrentQuizQuestion(liveSession.quiz.current)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/40 bg-card/30">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </button>
              <div>
                <h1 className="text-xl font-bold md:text-2xl">{event.title}</h1>
                <div className="mt-1 flex items-center gap-2">
                  {liveSession.isLive && (
                    <Badge className="animate-pulse bg-red-500 text-white hover:bg-red-500">
                      EN VIVO
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">
                    {liveSession.viewerCount.toLocaleString()} espectadores
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Left: Video + Tabs Content */}
          <div className="space-y-6">
            {/* Video Player */}
            <StreamingPlayer
              streamUrl={liveSession.streamUrl}
              isLive={liveSession.isLive}
              viewerCount={liveSession.viewerCount}
            />

            {/* Tabs */}
            <div className="rounded-lg border border-border/40 bg-card">
              {/* Tab Headers */}
              <div className="flex border-b border-border/40">
                {tabs.map((tab) => {
                  if (!tab.enabled) return null;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      disabled={!tab.enabled}
                      className={cn(
                        'relative flex flex-1 items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                        activeTab === tab.id
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                        !tab.enabled && 'cursor-not-allowed opacity-50'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      {tab.count !== undefined && tab.count > 0 && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            'ml-1',
                            activeTab === tab.id && 'bg-primary text-primary-foreground'
                          )}
                        >
                          {tab.count}
                        </Badge>
                      )}
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="min-h-[500px]">
                {activeTab === 'stream' && (
                  <div className="p-6">
                    <h3 className="mb-2 text-lg font-semibold">Acerca del Stream</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{event.description}</p>

                    <div className="space-y-3">
                      <div className="rounded-lg border border-border/40 bg-card/50 p-4">
                        <h4 className="mb-2 font-medium">Interacción en Vivo</h4>
                        <p className="text-sm text-muted-foreground">
                          Participa en el Q&A, vota en las encuestas y compite en el quiz. Usa el
                          chat para comentar en tiempo real con otros asistentes.
                        </p>
                      </div>

                      {liveSession.qa.enabled && (
                        <div className="rounded-lg border border-border/40 bg-card/50 p-4">
                          <h4 className="mb-2 font-medium">Q&A con el Ponente</h4>
                          <p className="text-sm text-muted-foreground">
                            Haz preguntas y vota por las que más te interesen. Las más votadas
                            tienen prioridad para ser respondidas.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'qa' && liveSession.qa.enabled && (
                  <QAPanel
                    questions={liveSession.qa.questions}
                    onUpvote={(id) => console.log('Upvote question:', id)}
                    onSubmit={(q) => console.log('New question:', q)}
                  />
                )}

                {activeTab === 'polls' && liveSession.polls.enabled && (
                  <PollWidget
                    polls={[...liveSession.polls.active, ...liveSession.polls.closed]}
                    onVote={(pollId, optionId) =>
                      console.log('Vote:', { pollId, optionId })
                    }
                  />
                )}

                {activeTab === 'quiz' && liveSession.quiz.enabled && liveSession.quiz.current && (
                  <QuizGame
                    quiz={liveSession.quiz.current}
                    currentQuestion={currentQuestion}
                    leaderboard={mockLeaderboard}
                    onAnswer={(optionId) => console.log('Answer:', optionId)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right: Chat Sidebar */}
          {liveSession.chat.enabled && (
            <div className="hidden lg:block">
              <div className="sticky top-24 rounded-lg border border-border/40 bg-card">
                <div style={{ height: 'calc(100vh - 120px)' }}>
                  <LiveChat
                    messages={liveSession.chat.messages}
                    onSendMessage={(msg) => console.log('New message:', msg)}
                    onReact={(msgId, emoji) => console.log('React:', { msgId, emoji })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Mobile Chat (bottom sheet style) */}
          {liveSession.chat.enabled && (
            <div className="lg:hidden">
              <div className="rounded-lg border border-border/40 bg-card">
                <div style={{ height: '400px' }}>
                  <LiveChat
                    messages={liveSession.chat.messages}
                    onSendMessage={(msg) => console.log('New message:', msg)}
                    onReact={(msgId, emoji) => console.log('React:', { msgId, emoji })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

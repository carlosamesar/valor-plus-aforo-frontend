'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AttendeeCard } from '@/components/networking/AttendeeCard';
import { ChatWindow } from '@/components/networking/ChatWindow';
import { MeetingScheduler } from '@/components/networking/MeetingScheduler';
import { BusinessCardDisplay } from '@/components/networking/BusinessCardDisplay';
import {
  mockAttendees,
  mockConversations,
  mockMessages,
  mockMeetings,
  mockBusinessCard,
  mockConnectionRequests
} from '@/lib/mock-data-networking';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { ArrowLeft, Users, MessageCircle, Calendar, CreditCard, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Tab = 'attendees' | 'messages' | 'meetings' | 'card';

export default function NetworkingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('attendees');
  const [selectedConversationId, setSelectedConversationId] = useState<string>();

  const event = MOCK_EVENTS.find((e) => e.id === resolvedParams.id);

  if (!event) {
    return (
      <div className="container py-24 text-center">
        <h1 className="text-3xl font-bold">Evento no encontrado</h1>
      </div>
    );
  }

  const pendingRequests = mockConnectionRequests.filter((r) => r.status === 'pending');
  const unreadMessages = mockConversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const tabs = [
    {
      id: 'attendees' as Tab,
      label: 'Asistentes',
      icon: Users,
      count: mockAttendees.length
    },
    {
      id: 'messages' as Tab,
      label: 'Mensajes',
      icon: MessageCircle,
      count: unreadMessages
    },
    {
      id: 'meetings' as Tab,
      label: 'Reuniones',
      icon: Calendar,
      count: mockMeetings.filter((m) => m.status === 'pending').length
    },
    {
      id: 'card' as Tab,
      label: 'Mi Tarjeta',
      icon: CreditCard
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b border-border/40 bg-card/30">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div>
              <button
                onClick={() => router.back()}
                className="mb-2 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </button>
              <h1 className="text-2xl font-bold">{event.title}</h1>
              <p className="text-sm text-muted-foreground">Networking</p>
            </div>

            {/* Connection Requests Badge */}
            {pendingRequests.length > 0 && (
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                {pendingRequests.length} solicitudes
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-border/40 bg-background">
        <div className="container">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'relative flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                    activeTab === tab.id
                      ? 'border-primary text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
                    <Badge
                      variant={activeTab === tab.id ? 'default' : 'secondary'}
                      className="ml-1"
                    >
                      {tab.count}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-8">
        {activeTab === 'attendees' && (
          <div>
            {/* Connection Requests */}
            {pendingRequests.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-bold">Solicitudes de conexión</h2>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <Card key={request.id}>
                      <CardContent className="flex items-center gap-4 p-6">
                        <img
                          src={request.fromUserAvatar}
                          alt={request.fromUserName}
                          className="h-12 w-12 rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{request.fromUserName}</h3>
                          {request.fromUserCompany && (
                            <p className="text-sm text-muted-foreground">
                              {request.fromUserCompany}
                            </p>
                          )}
                          {request.message && (
                            <p className="mt-2 text-sm italic text-muted-foreground">
                              "{request.message}"
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">Aceptar</Button>
                          <Button size="sm" variant="outline">
                            Rechazar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Attendees Grid */}
            <h2 className="mb-4 text-xl font-bold">
              Todos los asistentes ({mockAttendees.length})
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockAttendees.map((attendee) => (
                <AttendeeCard
                  key={attendee.id}
                  attendee={attendee}
                  onConnect={(id) => console.log('Connect:', id)}
                  onMessage={(id) => {
                    setActiveTab('messages');
                    const conv = mockConversations.find(
                      (c) => c.participantId === id
                    );
                    if (conv) setSelectedConversationId(conv.id);
                  }}
                  onScheduleMeeting={(id) => {
                    setActiveTab('meetings');
                    console.log('Schedule meeting with:', id);
                  }}
                  onViewProfile={(id) => console.log('View profile:', id)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <ChatWindow
            conversations={mockConversations}
            messages={mockMessages}
            currentUserId="current-user"
            selectedConversationId={selectedConversationId}
            onSelectConversation={setSelectedConversationId}
            onSendMessage={(convId, content) =>
              console.log('Send message:', convId, content)
            }
            onBack={() => setSelectedConversationId(undefined)}
          />
        )}

        {activeTab === 'meetings' && (
          <MeetingScheduler
            meetings={mockMeetings}
            onSchedule={(meeting) => console.log('Schedule:', meeting)}
            onAccept={(id) => console.log('Accept:', id)}
            onDecline={(id) => console.log('Decline:', id)}
            onCancel={(id) => console.log('Cancel:', id)}
          />
        )}

        {activeTab === 'card' && (
          <div className="mx-auto max-w-2xl">
            <BusinessCardDisplay
              card={mockBusinessCard}
              onShare={() => console.log('Share card')}
              onDownload={() => console.log('Download card')}
            />
          </div>
        )}
      </section>
    </div>
  );
}

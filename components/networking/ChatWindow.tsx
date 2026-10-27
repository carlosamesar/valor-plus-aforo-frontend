'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Conversation, Message } from '@/types/networking';
import { Send, ArrowLeft, MoreVertical } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface ChatWindowProps {
  conversations: Conversation[];
  messages: Message[];
  currentUserId: string;
  selectedConversationId?: string;
  onSelectConversation?: (conversationId: string) => void;
  onSendMessage?: (conversationId: string, content: string) => void;
  onBack?: () => void;
}

export function ChatWindow({
  conversations,
  messages,
  currentUserId,
  selectedConversationId,
  onSelectConversation,
  onSendMessage,
  onBack
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );

  const conversationMessages = messages.filter(
    (m) => m.conversationId === selectedConversationId
  );

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversationId || isSending) return;

    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    onSendMessage?.(selectedConversationId, newMessage);
    setNewMessage('');
    setIsSending(false);
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      {/* Conversations List */}
      <Card className={`${selectedConversationId ? 'hidden lg:block' : ''}`}>
        <CardContent className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Mensajes</h3>
            {conversations.filter((c) => c.unreadCount > 0).length > 0 && (
              <Badge variant="default">
                {conversations.reduce((acc, c) => acc + c.unreadCount, 0)}
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            {conversations.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  No hay conversaciones aún
                </p>
              </div>
            ) : (
              conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => onSelectConversation?.(conversation.id)}
                  className={`w-full rounded-lg p-3 text-left transition-colors hover:bg-accent ${
                    selectedConversationId === conversation.id ? 'bg-accent' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src={conversation.participantAvatar}
                        alt={conversation.participantName}
                        className="h-12 w-12 rounded-full"
                      />
                      {conversation.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{conversation.participantName}</p>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="default" className="h-5 min-w-5 px-1 text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="truncate text-sm text-muted-foreground">
                        {conversation.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(conversation.lastMessageTime), {
                          addSuffix: true,
                          locale: es
                        })}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Chat Window */}
      {selectedConversation ? (
        <Card className="flex flex-col">
          {/* Header */}
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={onBack}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="relative">
                <img
                  src={selectedConversation.participantAvatar}
                  alt={selectedConversation.participantName}
                  className="h-10 w-10 rounded-full"
                />
                {selectedConversation.isOnline && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{selectedConversation.participantName}</h3>
                <p className="text-xs text-muted-foreground">
                  {selectedConversation.isOnline ? 'En línea' : 'Desconectado'}
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4" style={{ maxHeight: '500px' }}>
            {conversationMessages.map((message) => {
              const isOwn = message.senderId === currentUserId;
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg px-4 py-2 ${
                      isOwn
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`mt-1 text-xs ${
                        isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}
                    >
                      {format(new Date(message.timestamp), 'HH:mm')}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                maxLength={500}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!newMessage.trim() || isSending}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      ) : (
        <Card className="hidden lg:flex">
          <CardContent className="flex flex-1 items-center justify-center p-12">
            <div className="text-center">
              <p className="text-muted-foreground">
                Selecciona una conversación para comenzar a chatear
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

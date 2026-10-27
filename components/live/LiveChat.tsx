'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import type { ChatMessage } from '@/types/live';
import { Send, Smile } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface LiveChatProps {
  messages: ChatMessage[];
  onSendMessage?: (message: string) => void;
  onReact?: (messageId: string, emoji: string) => void;
}

const quickEmojis = ['👍', '❤️', '🔥', '😂', '👏', '🎉'];

export function LiveChat({ messages, onSendMessage, onReact }: LiveChatProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al final cuando llegan nuevos mensajes
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const isScrolledToBottom =
      container.scrollHeight - container.clientHeight <= container.scrollTop + 100;

    if (isScrolledToBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    // Mock: simular envío
    await new Promise((resolve) => setTimeout(resolve, 300));
    onSendMessage?.(newMessage);
    setNewMessage('');
    setIsSending(false);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    onReact?.(messageId, emoji);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-border/40 p-3">
        <h3 className="font-semibold">Chat en Vivo</h3>
        <p className="text-xs text-muted-foreground">{messages.length} mensajes</p>
      </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 space-y-4 overflow-y-auto p-3"
        style={{ maxHeight: 'calc(100vh - 300px)' }}
      >
        {messages.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            <p>No hay mensajes aún</p>
            <p>Sé el primero en comentar</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="group space-y-1">
              {/* Message Header */}
              <div className="flex items-center gap-2">
                {msg.userAvatar && (
                  <img
                    src={msg.userAvatar}
                    alt={msg.userName}
                    className="h-6 w-6 rounded-full"
                  />
                )}
                <span className="text-xs font-medium">{msg.userName}</span>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(msg.timestamp), 'HH:mm', { locale: es })}
                </span>
              </div>

              {/* Message Content */}
              <div className="ml-8">
                <p className="text-sm">{msg.message}</p>

                {/* Reactions */}
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {msg.reactions.map((reaction) => (
                      <button
                        key={reaction.emoji}
                        onClick={() => handleReaction(msg.id, reaction.emoji)}
                        className="flex items-center gap-1 rounded-full border border-border/40 bg-muted/50 px-2 py-0.5 text-xs transition-colors hover:bg-muted"
                      >
                        <span>{reaction.emoji}</span>
                        <span className="text-muted-foreground">{reaction.count}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick React (on hover) */}
                <div className="mt-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex gap-1">
                    {quickEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(msg.id, emoji)}
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-border/40 bg-background text-xs transition-colors hover:bg-muted"
                        title={`Reaccionar con ${emoji}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border/40 p-3">
        <form onSubmit={handleSend} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 pr-10 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              maxLength={200}
            />
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Smile className="h-4 w-4" />
            </button>

            {/* Quick Emoji Picker */}
            {showEmojiPicker && (
              <div className="absolute bottom-12 right-0 rounded-lg border border-border/40 bg-background p-2 shadow-lg">
                <div className="grid grid-cols-6 gap-1">
                  {quickEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        setNewMessage((prev) => prev + emoji);
                        setShowEmojiPicker(false);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded hover:bg-muted"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={!newMessage.trim() || isSending}
            className="h-9 w-9"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="mt-1 text-xs text-muted-foreground">
          Sé respetuoso con los demás participantes
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { PostCard } from './PostCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Post, SocialStats } from '@/types/social';
import { Image, Send, TrendingUp, Users } from 'lucide-react';

interface SocialWallProps {
  posts: Post[];
  stats: SocialStats;
  onCreatePost?: (content: string, image?: File) => void;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

type FilterType = 'all' | 'photos' | 'trending';

export function SocialWall({
  posts,
  stats,
  onCreatePost,
  onLike,
  onComment,
  onShare
}: SocialWallProps) {
  const [newPostContent, setNewPostContent] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [isSending, setIsSending] = useState(false);

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || isSending) return;

    setIsSending(true);
    // Mock: simular envío
    await new Promise((resolve) => setTimeout(resolve, 500));
    onCreatePost?.(newPostContent);
    setNewPostContent('');
    setIsSending(false);
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === 'photos') return post.type === 'photo';
    if (filter === 'trending') return post.likes > 50 || post.isPinned;
    return true;
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Main Feed */}
      <div className="space-y-6">
        {/* Create Post */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser"
                alt="Your avatar"
                className="h-10 w-10 rounded-full"
              />
              <form onSubmit={handleSubmitPost} className="flex-1">
                <div className="relative">
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="¿Qué está pasando en el evento?"
                    className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 pr-12 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    rows={3}
                    maxLength={280}
                  />
                  <button
                    type="submit"
                    disabled={!newPostContent.trim() || isSending}
                    className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Image className="mr-2 h-4 w-4" />
                  Foto
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {newPostContent.length}/280
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todos
          </Button>
          <Button
            variant={filter === 'photos' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('photos')}
          >
            Fotos
          </Button>
          <Button
            variant={filter === 'trending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('trending')}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Trending
          </Button>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No hay publicaciones aún</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  ¡Sé el primero en compartir algo!
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={onLike}
                onComment={onComment}
                onShare={onShare}
              />
            ))
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Stats Card */}
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 font-semibold">Actividad del Evento</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Publicaciones</span>
                <span className="font-semibold">{stats.totalPosts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Me gusta</span>
                <span className="font-semibold">{stats.totalLikes.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Comentarios</span>
                <span className="font-semibold">{stats.totalComments}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  <Users className="mr-1 inline h-4 w-4" />
                  Usuarios activos
                </span>
                <span className="font-semibold">{stats.activeUsers}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trending Hashtags */}
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 font-semibold">Hashtags Trending</h3>
            <div className="space-y-3">
              {stats.trendingHashtags.map((tag, index) => (
                <div key={tag.tag} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">#{tag.tag}</p>
                    <p className="text-xs text-muted-foreground">{tag.count} publicaciones</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Event Guidelines */}
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="p-6">
            <h3 className="mb-3 font-semibold">Normas de Convivencia</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span>✓</span>
                <span>Sé respetuoso con otros asistentes</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>No compartas información confidencial</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Reporta contenido inapropiado</span>
              </li>
              <li className="flex gap-2">
                <span>✓</span>
                <span>Usa hashtags relevantes</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

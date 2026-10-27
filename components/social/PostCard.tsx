'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Post } from '@/types/social';
import { Heart, MessageCircle, Share2, Pin } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

const roleLabels = {
  speaker: 'Speaker',
  organizer: 'Organizador',
  sponsor: 'Patrocinador',
  attendee: 'Asistente'
};

const roleColors = {
  speaker: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  organizer: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  sponsor: 'bg-green-500/10 text-green-500 border-green-500/20',
  attendee: 'bg-gray-500/10 text-gray-500 border-gray-500/20'
};

export function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike?.(post.id);
  };

  return (
    <Card className={`${post.isPinned ? 'border-primary' : ''}`}>
      <CardContent className="p-6">
        {/* Pinned Badge */}
        {post.isPinned && (
          <div className="mb-3 flex items-center gap-2 text-sm text-primary">
            <Pin className="h-4 w-4" />
            <span className="font-medium">Post fijado</span>
          </div>
        )}

        {/* Header */}
        <div className="mb-4 flex items-start gap-3">
          <img
            src={post.userAvatar}
            alt={post.userName}
            className="h-12 w-12 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{post.userName}</h3>
              {post.userRole && (
                <Badge
                  variant="outline"
                  className={roleColors[post.userRole]}
                >
                  {roleLabels[post.userRole]}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true, locale: es })}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="whitespace-pre-wrap text-foreground">{post.content}</p>

          {/* Image */}
          {post.type === 'photo' && post.imageUrl && (
            <div className="mt-3 overflow-hidden rounded-lg">
              <img
                src={post.imageUrl}
                alt="Post image"
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          {/* Link Preview */}
          {post.type === 'link' && post.linkUrl && (
            <a
              href={post.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block rounded-lg border border-border bg-card/50 p-4 transition-colors hover:bg-accent"
            >
              <p className="font-medium text-primary">{post.linkTitle || 'Ver enlace'}</p>
              <p className="mt-1 text-sm text-muted-foreground">{post.linkUrl}</p>
            </a>
          )}

          {/* Hashtags */}
          {post.hashtags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="cursor-pointer text-sm text-primary hover:underline"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mb-4 flex items-center gap-6 border-t border-border pt-3 text-sm text-muted-foreground">
          <span>{likes} me gusta</span>
          <span>{post.comments} comentarios</span>
          <span>{post.shares} compartidos</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 ${isLiked ? 'text-primary' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            Me gusta
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => onComment?.(post.id)}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Comentar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => onShare?.(post.id)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Compartir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

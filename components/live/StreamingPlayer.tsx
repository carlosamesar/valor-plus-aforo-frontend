'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

// @ts-ignore - ReactPlayer has type conflicts with Next.js dynamic imports
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface StreamingPlayerProps {
  streamUrl: string;
  isLive: boolean;
  viewerCount: number;
}

export function StreamingPlayer({ streamUrl, isLive, viewerCount }: StreamingPlayerProps) {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [showQuality, setShowQuality] = useState(false);

  const handleFullscreen = () => {
    const player = document.getElementById('stream-player');
    if (player) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        player.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
      {/* Live Badge */}
      {isLive && (
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
          <Badge className="animate-pulse bg-red-500 text-white hover:bg-red-500">
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-white" />
            EN VIVO
          </Badge>
          <Badge className="bg-black/60 text-white backdrop-blur">
            {viewerCount.toLocaleString()} viendo
          </Badge>
        </div>
      )}

      {/* Player */}
      <div id="stream-player" className="relative h-full w-full">
        {/* @ts-ignore */
        /* eslint-disable-next-line */}
        {React.createElement(ReactPlayer as any, {
          url: streamUrl,
          playing: playing,
          muted: muted,
          volume: volume,
          width: '100%',
          height: '100%',
          controls: false,
          style: { position: 'absolute', top: 0, left: 0 }
        })}
      </div>

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Play/Pause */}
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 text-white hover:bg-white/20"
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 text-white hover:bg-white/20"
              onClick={() => setMuted(!muted)}
            >
              {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={muted ? 0 : volume}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value);
                setVolume(newVolume);
                if (newVolume > 0) setMuted(false);
              }}
              className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-white/30"
              style={{
                background: `linear-gradient(to right, white ${(muted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(muted ? 0 : volume) * 100}%)`
              }}
            />
          </div>

          <div className="flex-1" />

          {/* Quality Selector */}
          <div className="relative">
            <Button
              size="icon"
              variant="ghost"
              className="h-10 w-10 text-white hover:bg-white/20"
              onClick={() => setShowQuality(!showQuality)}
            >
              <Settings className="h-5 w-5" />
            </Button>

            {showQuality && (
              <div className="absolute bottom-12 right-0 w-32 rounded-lg border border-white/20 bg-black/90 p-2 text-sm text-white backdrop-blur">
                <button className="w-full rounded px-3 py-2 text-left hover:bg-white/20">
                  Auto
                </button>
                <button className="w-full rounded px-3 py-2 text-left hover:bg-white/20">
                  1080p
                </button>
                <button className="w-full rounded px-3 py-2 text-left hover:bg-white/20">
                  720p
                </button>
                <button className="w-full rounded px-3 py-2 text-left hover:bg-white/20">
                  480p
                </button>
              </div>
            )}
          </div>

          {/* Fullscreen */}
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10 text-white hover:bg-white/20"
            onClick={handleFullscreen}
          >
            <Maximize className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

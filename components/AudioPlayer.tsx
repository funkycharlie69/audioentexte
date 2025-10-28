"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string | null;
  waveColor?: string;
  progressColor?: string;
  height?: number;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  waveColor = '#94a3b8', // slate-400
  progressColor = '#3b82f6', // blue-600
  height = 80,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize WaveSurfer
  useEffect(() => {
    if (!containerRef.current || !audioUrl) return;

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: waveColor,
      progressColor: progressColor,
      cursorColor: '#0056e0ff', // brand-green
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: height,
      normalize: true,
      backend: 'WebAudio',
      interact: true,
    });

    wavesurfer.load(audioUrl);

    // Event listeners
    wavesurfer.on('ready', () => {
      setDuration(wavesurfer.getDuration());
      setIsLoading(false);
    });

    wavesurfer.on('audioprocess', () => {
      setCurrentTime(wavesurfer.getCurrentTime());
    });

    wavesurfer.on('play', () => {
      setIsPlaying(true);
    });

    wavesurfer.on('pause', () => {
      setIsPlaying(false);
    });

    wavesurfer.on('finish', () => {
      setIsPlaying(false);
    });

    wavesurferRef.current = wavesurfer;

    // Cleanup
    return () => {
      wavesurfer.destroy();
    };
  }, [audioUrl, waveColor, progressColor, height]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!wavesurferRef.current || !audioUrl) return;

      // Prevent shortcuts when typing in input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const ws = wavesurferRef.current;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          ws.playPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipBackward();
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipForward();
          break;
        case 'ArrowUp':
          e.preventDefault();
          changeVolume(0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          changeVolume(-0.1);
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          toggleMute();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          e.preventDefault();
          const percent = parseInt(e.key) / 10;
          ws.seekTo(percent);
          break;
        case '0':
          e.preventDefault();
          ws.seekTo(0);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [audioUrl]);

  const togglePlayPause = useCallback(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  }, []);

  const skipBackward = useCallback(() => {
    if (wavesurferRef.current) {
      const newTime = Math.max(0, wavesurferRef.current.getCurrentTime() - 10);
      wavesurferRef.current.seekTo(newTime / duration);
    }
  }, [duration]);

  const skipForward = useCallback(() => {
    if (wavesurferRef.current) {
      const newTime = Math.min(duration, wavesurferRef.current.getCurrentTime() + 10);
      wavesurferRef.current.seekTo(newTime / duration);
    }
  }, [duration]);

  const changeVolume = useCallback((delta: number) => {
    if (wavesurferRef.current) {
      const newVolume = Math.max(0, Math.min(1, volume + delta));
      setVolume(newVolume);
      wavesurferRef.current.setVolume(newVolume);
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
      }
    }
  }, [volume, isMuted]);

  const toggleMute = useCallback(() => {
    if (wavesurferRef.current) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      wavesurferRef.current.setVolume(newMutedState ? 0 : volume);
    }
  }, [isMuted, volume]);

  const changePlaybackRate = useCallback((rate: number) => {
    if (wavesurferRef.current) {
      setPlaybackRate(rate);
      wavesurferRef.current.setPlaybackRate(rate);
    }
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!audioUrl) {
    return null;
  }

  return (
    <div className={`rounded-lg border border-brand-green/30 p-4 ${className}`}>
      {/* Waveform */}
      <div ref={containerRef} className="mb-4" />

      {isLoading && (
        <div className="text-center text-sm text-slate-800 mb-4">
          Chargement de l'audio...
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          disabled={isLoading}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-green hover:bg-brand-green/90 disabled:bg-slate-800/20 text-slate-800 flex items-center justify-center transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>

        {/* Skip Backward */}
        <button
          onClick={skipBackward}
          disabled={isLoading}
          className="flex-shrink-0 text-slate-800 hover:text-brand-green disabled:text-slate-800/30 transition-colors"
          aria-label="Reculer de 10 secondes"
          title="Reculer de 10s (←)"
        >
          <SkipBack size={24} />
        </button>

        {/* Skip Forward */}
        <button
          onClick={skipForward}
          disabled={isLoading}
          className="flex-shrink-0 text-slate-800 hover:text-brand-green disabled:text-slate-800/30 transition-colors"
          aria-label="Avancer de 10 secondes"
          title="Avancer de 10s (→)"
        >
          <SkipForward size={24} />
        </button>

        {/* Time Display */}
        <div className="text-sm text-slate-800 font-mono">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Playback Speed */}
        <select
          value={playbackRate}
          onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
          disabled={isLoading}
          className="text-sm px-2 py-1 bg-slate-800/10 border border-brand-green/50 rounded-md focus:ring-2 focus:ring-brand-green disabled:bg-slate-800/5 disabled:text-slate-800/30 text-slate-800"
          title="Vitesse de lecture"
        >
          <option value="0.5" className="bg-[#0E172B]">0.5x</option>
          <option value="0.75" className="bg-[#0E172B]">0.75x</option>
          <option value="1" className="bg-[#0E172B]">1x</option>
          <option value="1.25" className="bg-[#0E172B]">1.25x</option>
          <option value="1.5" className="bg-[#0E172B]">1.5x</option>
          <option value="1.75" className="bg-[#0E172B]">1.75x</option>
          <option value="2" className="bg-[#0E172B]">2x</option>
        </select>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            disabled={isLoading}
            className="text-slate-800 hover:text-brand-green disabled:text-slate-800/30 transition-colors"
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            title="Muet (M)"
          >
            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              setVolume(newVolume);
              if (wavesurferRef.current) {
                wavesurferRef.current.setVolume(newVolume);
              }
              if (newVolume > 0 && isMuted) {
                setIsMuted(false);
              }
            }}
            disabled={isLoading}
            className="w-20 h-1 bg-slate-800/20 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-green [&::-webkit-slider-thumb]:cursor-pointer"
            title="Volume (↑↓)"
          />
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="mt-3 text-xs text-slate-800/50 text-center">
        Raccourcis : Espace (play/pause) · ←→ (10s) · ↑↓ (volume) · M (muet) · 0-9 (sauter)
      </div>
    </div>
  );
};

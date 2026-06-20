"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function PlayIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function VolumeOnIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

function VolumeOffIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
    </svg>
  );
}

function FullscreenIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
    </svg>
  );
}

function RestartIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
    });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= 1) {
      setDuration(video.duration || 0);
      setIsReady(true);
    }

    const onLoadedMetadata = () => {
      setDuration(video.duration);
      setIsReady(true);
    };
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.duration > 0) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    const onVolumeChange = () => setIsMuted(video.muted);

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    video.addEventListener("volumechange", onVolumeChange);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("volumechange", onVolumeChange);
    };
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  }, []);

  const restart = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
  }, []);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  }, [duration]);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  }, []);

  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    }
  }, [isPlaying]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-[1324px] overflow-hidden rounded-xl bg-[#0c0c0e] shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => {
        if (isPlaying) setShowControls(false);
      }}
      style={{
        padding: "3px",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "14px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="relative overflow-hidden rounded-[11px] bg-[#0c0c0e]">
      <div
        className="relative w-full cursor-pointer"
        style={{ aspectRatio: "16 / 9" }}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src="/showcase.mp4"
          className="absolute inset-0 h-full w-full object-contain"
          playsInline
          loop
          muted
          preload="auto"
        />

        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0c0c0e]">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-white/40" />
              <span className="text-xs text-white/40">Loading showcase...</span>
            </div>
          </div>
        )}

        {isReady && (
          <div
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300",
              showControls && !isPlaying ? "opacity-100" : "opacity-0",
            )}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md">
              <PlayIcon size={28} />
            </div>
          </div>
        )}

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300",
            showControls ? "opacity-100" : "opacity-0",
          )}
        />
      </div>

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col gap-2 px-4 pb-3 transition-all duration-300",
          showControls ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        <div
          className="group relative h-1.5 w-full cursor-pointer rounded-full bg-white/15"
          onClick={seek}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#c9d4ff] to-[#e0d4ff] transition-[width] duration-75"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover:opacity-100"
            style={{ left: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
            </button>

            <button
              onClick={restart}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Restart"
            >
              <RestartIcon size={16} />
            </button>

            <button
              onClick={toggleMute}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeOffIcon size={18} /> : <VolumeOnIcon size={18} />}
            </button>

            <span className="font-mono text-[11px] text-white/50">
              {formatTime(currentTime)} <span className="text-white/25">/</span> {formatTime(duration)}
            </span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Fullscreen"
          >
            <FullscreenIcon size={18} />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src?: string;      // พาธไฟล์เสียง (เริ่มต้น: /music/theme.mp3)
  autoPlay?: boolean; // true = พยายามเล่นทันทีหลังผู้ใช้คลิกครั้งแรก
  loop?: boolean;     // เล่นวน
};

export default function MusicPlayer({
  src = "/music/theme.mp3",
  autoPlay = true,
  loop = true,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [error, setError] = useState<string | null>(null);

  // สร้าง <audio> และผูก event
  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.loop = loop;
    audio.preload = "metadata";
    audio.volume = volume;
    audio.muted = muted;

    const onLoaded = () => {
      setDuration(audio.duration || 0);
      setReady(true);
    };
    const onTime = () => setCurrent(audio.currentTime || 0);
    const onEnded = () => setPlaying(false);
    const onError = () => setError("โหลดไฟล์เสียงไม่สำเร็จ");

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    // อนุญาตเล่นหลังผู้ใช้แตะครั้งแรก (ผ่าน autoplay policy)
    let removeTap: (() => void) | undefined;
    if (autoPlay) {
      const handler = async () => {
        try {
          await audio.play();
          setPlaying(true);
        } catch {
          // ถ้าเล่นไม่ได้ ให้รอให้ผู้ใช้กดปุ่ม Play เอง
        } finally {
          window.removeEventListener("pointerdown", handler, { capture: true } as any);
        }
      };
      window.addEventListener("pointerdown", handler, { capture: true });
      removeTap = () =>
        window.removeEventListener("pointerdown", handler, { capture: true } as any);
    }

    return () => {
      audio.pause();
      audio.src = "";
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      removeTap?.();
    };
  }, [src, loop, autoPlay]);

  // sync volume/mute
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = muted;
  }, [muted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch {
      setError("เบราว์เซอร์บล็อกการเล่นเสียง ลองกดอีกครั้ง");
    }
  };

  const onSeek = (v: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = v;
    setCurrent(v);
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s / 60);
    const ss = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
    };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="w-[320px] rounded-2xl bg-black/70 text-white shadow-xl backdrop-blur p-3 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Now Playing</div>
          <div className="text-xs opacity-70">{ready ? "Ready" : "Loading…"}</div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            disabled={!ready}
            className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition disabled:opacity-40"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "Pause" : "Play"}
          </button>

          <button
            onClick={() => setMuted((m) => !m)}
            disabled={!ready}
            className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition disabled:opacity-40"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>

        {/* Seek bar */}
        <div className="flex items-center gap-2">
          <span className="text-xs tabular-nums w-10 text-right">{fmt(current)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(current, duration || 0)}
            onChange={(e) => onSeek(parseFloat(e.target.value))}
            className="flex-1 accent-white"
            disabled={!ready || !isFinite(duration)}
          />
          <span className="text-xs tabular-nums w-10">{fmt(duration)}</span>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2">
          <span className="text-xs opacity-75 w-12">Volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 accent-white"
            disabled={!ready}
          />
        </div>

        {error && <div className="text-xs text-red-300">{error}</div>}
      </div>
    </div>
  );
}

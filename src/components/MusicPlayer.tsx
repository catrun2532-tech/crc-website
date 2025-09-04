"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState<number>(0.15);

  // โหลดค่าที่บันทึกไว้
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedVol = Number(localStorage.getItem("music.vol") ?? "0.15");
    setVol(Number.isFinite(savedVol) ? savedVol : 0.15);
    const on = localStorage.getItem("music.on") === "1";
    setPlaying(on);
  }, []);

  // sync volume -> element + localStorage
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = vol;
    if (typeof window !== "undefined") {
      localStorage.setItem("music.vol", String(vol));
    }
  }, [vol]);

  async function toggle(): Promise<void> {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      localStorage.setItem("music.on", "0");
    } else {
      try {
        await el.play();
        setPlaying(true);
        localStorage.setItem("music.on", "1");
      } catch {
        // อาจโดน browser block ถ้ายังไม่มี user gesture
      }
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 group select-none">
      <button
        onClick={toggle}
        title={playing ? "หยุดเพลง" : "เปิดเพลง"}
        className={`h-12 w-12 rounded-full flex items-center justify-center shadow-lg ring-1 transition
        ${
          playing
            ? "bg-emerald-600 hover:bg-emerald-700 ring-emerald-400/40 animate-pulse"
            : "bg-zinc-800 hover:bg-zinc-700 ring-zinc-600/40"
        }`}
        aria-label={playing ? "หยุดเพลง" : "เปิดเพลง"}
        type="button"
      >
        <span className="text-xl">{playing ? "⏸" : "🎵"}</span>
      </button>

      {/* volume popover */}
      <div
        className="absolute right-14 bottom-1 opacity-0 pointer-events-none
                   group-hover:opacity-100 group-hover:pointer-events-auto
                   transition bg-zinc-900/90 backdrop-blur border border-zinc-700
                   rounded-xl px-3 py-2 flex items-center gap-2"
      >
        <span className="text-xs text-gray-300">เสียง</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={vol}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setVol(parseFloat(e.target.value))
          }
          className="w-28"
          aria-label="ปรับความดัง"
        />
      </div>

      <audio ref={audioRef} loop preload="auto" playsInline>
        {/* ตรวจให้ชัวร์ว่าไฟล์นี้อยู่ที่ /public/music/bg-music.mp3 */}
        <source src="/music/bg-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

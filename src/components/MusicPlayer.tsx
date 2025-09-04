"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [vol, setVol] = useState<number>(0.15);
  const [showEnableSound, setShowEnableSound] = useState(false);
  const [autoMuted, setAutoMuted] = useState(true); // เริ่มแบบเงียบถ้า autoplay

  // โหลดค่าที่บันทึกไว้
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedVol = Number(localStorage.getItem("music.vol") ?? "0.15");
    setVol(Number.isFinite(savedVol) ? savedVol : 0.15);

    // ค่าเปิดเพลง (ถ้าไม่เคยเก็บ ให้ถือว่า "เปิด" เพื่อพยายาม autoplay)
    const on = localStorage.getItem("music.on");
    if (on === null) localStorage.setItem("music.on", "1");
  }, []);

  // พยายาม autoplay เมื่อ component พร้อม
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    // ตั้งค่าเริ่ม
    el.volume = vol;

    const wantOn = localStorage.getItem("music.on") !== "0"; // ค่าเริ่มเปิด
    if (!wantOn) return;

    // พยายามเล่นแบบ muted ก่อน (เบราว์เซอร์ส่วนใหญ่ยอม)
    const tryAutoplay = async () => {
      try {
        el.muted = true;
        await el.play(); // ถ้าเล่นได้ ถือว่า autoplay สำเร็จ (แต่ยังเงียบ)
        setPlaying(true);
        // บันทึกว่าเปิดไว้
        localStorage.setItem("music.on", "1");

        // พยายามยกเลิก mute แบบเงียบๆ (บางเบราว์เซอร์จะอนุญาต ถ้าไม่อนุญาตจะเงียบเฉยๆ)
        requestAnimationFrame(() => {
          try {
            el.muted = false;
            // ถ้าโดนบล็อกเสียง การ unmute นี้อาจไม่ดัง แต่ไม่ error
            setAutoMuted(false);
          } catch {
            // ถ้ายังไม่ได้ gesture จะไม่ดัง ให้โชว์ปุ่ม "กดเพื่อเปิดเสียง"
            setAutoMuted(true);
            setShowEnableSound(true);
          }
        });
      } catch {
        // เล่นไม่ออกเลย (แม้แบบ muted) → แสดงปุ่ม “กดเพื่อเปิดเสียง”
        setShowEnableSound(true);
        setPlaying(false);
      }
    };

    tryAutoplay();
  }, [vol]);

  // กดเปิดเสียง/เล่น (ใช้เมื่อถูกบล็อก)
  const enableSound = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      el.muted = false;
      el.volume = vol;
      await el.play();
      setPlaying(true);
      setAutoMuted(false);
      setShowEnableSound(false);
      localStorage.setItem("music.on", "1");
    } catch {
      // ถ้าไม่สำเร็จ ให้ลองอีกครั้งด้วยปุ่มหลัก
    }
  };

  // ปุ่มสลับเล่น/หยุด (ไว้ควบคุมเอง)
  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      localStorage.setItem("music.on", "0");
    } else {
      try {
        el.muted = false;
        await el.play();
        setPlaying(true);
        setAutoMuted(false);
        localStorage.setItem("music.on", "1");
      } catch {
        // ยังโดนบล็อก → ให้กดปุ่มเปิดเสียง
        setShowEnableSound(true);
      }
    }
  };

  // sync volume -> element + localStorage
  useEffect(() => {
    const el = audioRef.current;
    if (el) el.volume = vol;
    if (typeof window !== "undefined") {
      localStorage.setItem("music.vol", String(vol));
    }
  }, [vol]);

  return (
    <div className="fixed bottom-4 right-4 z-50 group select-none">
      {/* ปุ่มเล่น/หยุด */}
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

      {/* แถบปรับเสียง */}
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
          onChange={(e) => setVol(parseFloat(e.target.value))}
          className="w-28"
          aria-label="ปรับความดัง"
        />
      </div>

      {/* ปุ่มลอย “แตะเพื่อเปิดเสียง” (โผล่เฉพาะตอนโดนบล็อก) */}
      {showEnableSound && (
        <button
          onClick={enableSound}
          className="absolute right-0 -top-12 text-sm px-3 py-2 rounded-lg
                     bg-amber-500 hover:bg-amber-600 text-black shadow
                     ring-1 ring-amber-300/50"
        >
          แตะเพื่อเปิดเสียง ▶️
        </button>
      )}

      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
        muted={autoMuted}
        controlsList="nodownload noplaybackrate"
        crossOrigin="anonymous"
      >
        <source src="/music/bg-music.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

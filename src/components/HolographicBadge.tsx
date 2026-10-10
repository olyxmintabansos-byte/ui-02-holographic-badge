"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Shield,
  ShieldCheck,
  Cpu,
  QrCode,
  RotateCw,
  Sparkles,
  Volume2,
  VolumeX,
  Code2,
  Check,
  Copy,
  Scan,
  Radio,
  Fingerprint,
  Zap,
} from "lucide-react";
import { sound } from "@/lib/sound";

type RoleType = "Principal Systems Architect" | "Quantum Cryptographer" | "Cyber SecOps Warden";
type ClearanceLevel = "LEVEL 5 // OMNI" | "LEVEL 4 // STRAT" | "LEVEL 3 // TAC";

export const HolographicBadge: React.FC = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [role, setRole] = useState<RoleType>("Principal Systems Architect");
  const [clearance, setClearance] = useState<ClearanceLevel>("LEVEL 5 // OMNI");
  const [scanned, setScanned] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Card 3D tilt springs
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-22, 22]), springConfig);
  const sheenX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const sheenY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  useEffect(() => {
    sound.enabled = audioEnabled;
  }, [audioEnabled]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleFlip = () => {
    sound.playFlip();
    setIsFlipped(!isFlipped);
  };

  const handleScanBadge = () => {
    sound.playScan();
    setScanned(true);
    setTimeout(() => {
      sound.playAccessGranted();
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#a855f7", "#ec4899", "#3b82f6"],
        });
      } catch {}
      setTimeout(() => setScanned(false), 2400);
    }, 600);
  };

  const componentCode = `// Holographic 3D Security ID Badge Component
// Stack: Next.js 15, Framer Motion, Web Audio API, Tailwind CSS v4
import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export function HolographicBadge() {
  const [flipped, setFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <motion.div 
      style={{ perspective: 1000 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      className="w-80 h-[480px] rounded-3xl p-6 bg-slate-900 border border-purple-500/30 cursor-pointer"
    >
      <div className="flex items-center justify-between text-xs font-mono text-purple-400">
        <span>SECURITY ID</span>
        <span>LEVEL 5</span>
      </div>
    </motion.div>
  );
}`;

  const handleCopyCode = async () => {
    sound.playClick();
    try {
      await navigator.clipboard.writeText(componentCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {}
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/10">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold font-mono tracking-wider text-slate-100 uppercase">
                Holographic 3D ID Badge
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
                UI-02
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive 3D Perspective Physics, Sheen Reflection & Cryptographic Matrix
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-end md:self-auto">
          <button
            onClick={() => {
              setAudioEnabled(!audioEnabled);
              sound.playClick();
            }}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all border ${
              audioEnabled
                ? "bg-purple-950/60 border-purple-500/40 text-purple-300"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
            <span>{audioEnabled ? "HAPTICS ON" : "MUTED"}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setShowCodeModal(true);
            }}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium shadow-md shadow-purple-950/50 transition-all cursor-pointer"
          >
            <Code2 className="w-4 h-4" />
            <span>Copy Component Code</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 3D Holographic Stage on Left | Hardware Control & Key Matrix on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 3D Tilt Badge Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-950/80 border border-purple-500/20 shadow-2xl relative min-h-[540px]">
          {/* Lanyard Top Ring */}
          <div className="w-16 h-8 rounded-t-xl border-t-2 border-x-2 border-slate-700 bg-slate-900/80 flex items-center justify-center -mb-2 z-10">
            <div className="w-8 h-2 rounded-full bg-slate-800 border border-slate-600" />
          </div>
          <div className="w-8 h-4 bg-slate-700/80 rounded-b-md mb-2 shadow-inner" />

          {/* Perspective Container */}
          <div className="perspective-1000 w-[310px] sm:w-[330px] h-[480px]">
            <motion.div
              ref={cardRef}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 180, damping: 20 }}
              className="relative w-full h-full rounded-3xl cursor-grab active:cursor-grabbing select-none"
            >
              {/* FRONT FACE */}
              <div
                style={{ backfaceVisibility: "hidden" }}
                className="absolute inset-0 rounded-3xl p-6 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-900/90 border border-purple-500/40 shadow-2xl overflow-hidden flex flex-col justify-between"
              >
                {/* Iridescent Dynamic Sheen Overlay */}
                <motion.div
                  style={{
                    background: `radial-gradient(circle at ${sheenX.get()}% ${sheenY.get()}%, rgba(236,72,153,0.35) 0%, rgba(168,85,247,0.2) 30%, transparent 70%)`,
                  }}
                  className="absolute inset-0 pointer-events-none rounded-3xl"
                />

                {/* Top Badge Brand & Microchip */}
                <div className="relative z-10 flex items-center justify-between border-b border-purple-500/20 pb-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-purple-400" />
                    <div>
                      <div className="text-[11px] font-mono font-bold tracking-widest text-slate-100">
                        VAULT // SEC-ID
                      </div>
                      <div className="text-[9px] font-mono text-purple-400">BIOMETRIC ACTIVE</div>
                    </div>
                  </div>
                  {/* Gold Contact Chip */}
                  <div className="w-10 h-8 rounded-lg bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-1 flex items-center justify-center shadow-md">
                    <Cpu className="w-6 h-6 text-amber-950" />
                  </div>
                </div>

                {/* Center Persona Avatar & Hologram Grid */}
                <div className="relative z-10 flex flex-col items-center my-auto space-y-3">
                  <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-tr from-purple-600/40 to-pink-600/40 p-1 border border-purple-400/50 shadow-lg shadow-purple-500/20">
                    <div className="w-full h-full rounded-xl bg-slate-950 flex items-center justify-center relative overflow-hidden">
                      <Fingerprint className="w-14 h-14 text-purple-400/80 animate-pulse" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-bounce opacity-60" />
                    </div>
                    {/* Corner Reticles */}
                    <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-purple-400" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-purple-400" />
                    <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-purple-400" />
                    <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-purple-400" />
                  </div>

                  <div className="text-center space-y-0.5">
                    <h2 className="text-base font-mono font-bold tracking-wider text-slate-100">
                      OLYX-MINTABANSOS
                    </h2>
                    <p className="text-[11px] font-mono text-purple-300 font-semibold">{role}</p>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {clearance}
                    </span>
                  </div>
                </div>

                {/* Bottom Holographic Barcode & RFID Beacon */}
                <div className="relative z-10 border-t border-purple-500/20 pt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <Radio className="w-3.5 h-3.5 text-pink-400 animate-ping" />
                    <span>NFC: 13.56 MHz</span>
                  </div>
                  <span className="tracking-widest text-purple-400 font-bold">UID: 0x9A44-FC82</span>
                </div>
              </div>

              {/* BACK FACE */}
              <div
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
                className="absolute inset-0 rounded-3xl p-6 bg-gradient-to-b from-slate-900/95 via-slate-950 to-slate-900/95 border border-pink-500/40 shadow-2xl flex flex-col justify-between"
              >
                <div className="flex items-center justify-between border-b border-pink-500/20 pb-3">
                  <div className="flex items-center space-x-2 text-xs font-mono text-pink-400 font-bold">
                    <QrCode className="w-4 h-4" />
                    <span>ENCRYPTED REVERSE</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">ISO/IEC 7810</span>
                </div>

                {/* Cryptographic QR Matrix & Hash */}
                <div className="flex flex-col items-center justify-center space-y-3 my-auto">
                  <div className="p-3 rounded-2xl bg-slate-950 border border-pink-500/30 shadow-inner">
                    <QrCode className="w-32 h-32 text-pink-400" />
                  </div>
                  <div className="text-center font-mono text-[9px] text-slate-400 space-y-0.5">
                    <p>PUBKEY: ed25519:7D...93A0</p>
                    <p className="text-pink-400 font-bold">CERT: ZERO-KNOWLEDGE PROOF</p>
                  </div>
                </div>

                <div className="border-t border-pink-500/20 pt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>EXP: 2029-10-31</span>
                  <span className="text-emerald-400">STATUS: VALID</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Action Buttons for Badge */}
          <div className="mt-6 flex items-center space-x-3 z-10">
            <button
              onClick={handleFlip}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 transition cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5 text-purple-400" />
              <span>Flip Card ({isFlipped ? "Back" : "Front"})</span>
            </button>

            <button
              onClick={handleScanBadge}
              disabled={scanned}
              className={`flex items-center space-x-1.5 px-5 py-2 rounded-xl text-xs font-mono font-bold transition shadow-lg cursor-pointer ${
                scanned
                  ? "bg-emerald-500 text-slate-950"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white"
              }`}
            >
              {scanned ? <ShieldCheck className="w-3.5 h-3.5" /> : <Scan className="w-3.5 h-3.5" />}
              <span>{scanned ? "ACCESS GRANTED" : "Scan RFID Badge"}</span>
            </button>
          </div>
        </div>

        {/* Right: Hardware Tuning & Clearance Switcher */}
        <div className="lg:col-span-5 space-y-5">
          {/* Identity Tuning Card */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-200">
                <Zap className="w-4 h-4 text-purple-400" />
                <span>OPERATOR CLEARANCE & ROLE</span>
              </div>
              <span className="text-[10px] font-mono text-purple-400">HARDWARE CONTROLLER</span>
            </div>

            {/* Role Switcher */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-slate-400">ASSIGNED SECURITY ROLE</label>
              <div className="space-y-2">
                {([
                  "Principal Systems Architect",
                  "Quantum Cryptographer",
                  "Cyber SecOps Warden",
                ] as RoleType[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      sound.playClick();
                      setRole(r);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left font-mono text-xs transition border flex items-center justify-between ${
                      role === r
                        ? "bg-purple-950/60 border-purple-500 text-purple-200 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                    }`}
                  >
                    <span>{r}</span>
                    {role === r && <Check className="w-4 h-4 text-purple-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Clearance Rating */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="text-[11px] font-mono text-slate-400">CLEARANCE ACCREDITATION</label>
              <div className="grid grid-cols-3 gap-2">
                {(["LEVEL 5 // OMNI", "LEVEL 4 // STRAT", "LEVEL 3 // TAC"] as ClearanceLevel[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      sound.playClick();
                      setClearance(c);
                    }}
                    className={`p-2 rounded-xl text-center font-mono text-[10px] transition border ${
                      clearance === c
                        ? "bg-pink-950/60 border-pink-500 text-pink-200 font-bold"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {c.split("//")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cryptographic Telemetry Specs */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-3">
            <div className="text-[11px] text-slate-400 flex items-center justify-between border-b border-slate-900 pb-2">
              <span>HARDWARE ENCLAVE TELEMETRY</span>
              <span className="text-emerald-400">SECURE BOOT v4.2</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[9px]">CHIP ARCHITECTURE</span>
                <span className="text-slate-200 font-bold">ARM TrustZone</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[9px]">TILT PERSPECTIVE</span>
                <span className="text-purple-300 font-bold">Framer 3D Spring</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[9px]">ENCRYPTION CIPHER</span>
                <span className="text-pink-300 font-bold">Curve25519 / Poly1305</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-500 block text-[9px]">AUDIO SYNTHESIZER</span>
                <span className="text-emerald-300 font-bold">Zero-Asset Web Audio</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Modal Drawer */}
      <AnimatePresence>
        {showCodeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono font-bold text-slate-200">
                    HolographicBadge.tsx
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-mono bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold transition cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setShowCodeModal(false);
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    Close
                  </button>
                </div>
              </div>
              <div className="p-4 overflow-y-auto bg-slate-950 text-slate-300 font-mono text-xs leading-relaxed">
                <pre>{componentCode}</pre>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

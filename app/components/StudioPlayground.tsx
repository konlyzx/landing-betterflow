"use client";

import React, { useState } from "react";
import Image from "next/image";

// ─── UI Primitives ─────────────────────────────────────────────────────────
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function Slider({ value, min, max, step = 1, label, valueDisplay }: {
  value: number[]; min: number; max: number; step?: number;
  label: string; valueDisplay: string;
}) {
  const pct = ((value[0] - min) / (max - min)) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[10px] text-white/50">{label}</span>
        <span className="text-[10px] text-white/70 font-mono">{valueDisplay}</span>
      </div>
      <div className="relative w-full h-4 flex items-center">
        <div className="absolute inset-x-0 h-[3px] rounded-full bg-white/[0.08]" />
        <div className="absolute left-0 h-[3px] rounded-full bg-white/30" style={{ width: `${pct}%` }} />
        <div className="absolute w-3 h-3 rounded-full bg-white shadow" style={{ left: `calc(${pct}% - 6px)` }} />
      </div>
    </div>
  );
}

function SectionWrapper({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="mb-1">
      <div className="w-full flex items-center justify-between gap-2 py-2 px-2 hover:bg-white/[0.03] rounded-xl transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-2 flex-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            className={cn("text-white/40 transition-transform duration-200", !isOpen && "-rotate-90")}>
            <path d="M6 9l6 6 6-6" />
          </svg>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/40">{title}</span>
        </div>
      </div>
      <div className={cn("overflow-hidden transition-all duration-200", isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0")}>
        <div className="px-2 pb-4 space-y-4">{children}</div>
      </div>
    </div>
  );
}

function SegmentedControl({ options, value, onChange }: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-1 p-0.5 bg-white/[0.03] rounded-lg border border-white/10">
      {options.map((opt) => (
        <button key={opt.id} onClick={() => onChange(opt.id)}
          className={cn("flex-1 py-1.5 px-2 rounded-md text-[11px] font-medium transition-all",
            value === opt.id ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60")}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────────
function LayersLogoIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function ColorsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
    </svg>
  );
}

function RotateSquareIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 12" /><path d="M21 3v9h-9" />
    </svg>
  );
}

function VideoReplayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function ArrowDown01Icon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

function ArrowRight01Icon({ size = 12, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function Add01Icon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function Cancel01Icon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function MagicWand01Icon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M10 13l-2 2 2 2" /><path d="M14 13l2 2-2 2" />
    </svg>
  );
}

function PlateIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

function ArrowTurnBackwardIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7v6h6" /><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
    </svg>
  );
}

function ArrowTurnForwardIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 7v6h-6" /><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13" />
    </svg>
  );
}

function MagicStarIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fill="#F94A73" d="m11.66 8.02 4.33-1.45-4.34-1.45-1.23-5.13-1.23 5.12-4.34 1.44 4.33 1.44 1.22 5.12 1.22-5.13Z" />
      <path fill="#FB7A53" d="m4.66 8.1-.74 3.07-2.6.86 2.6.86.73 3.07.73-3.08 2.6-.87-2.61-.87-.74-3.08Z" />
      <path fill="#C893E1" d="M2.88.43 2.24 3.1l-2.26.75 2.25.75.63 2.67.63-2.68 2.25-.76-2.26-.76L2.84.39Z" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[10px] font-medium uppercase tracking-wide text-white/40">{children}</span>;
}

// ─── Style Preview ──────────────────────────────────────────────────────────
const stylePresets = [
  { value: "default", label: "Default" },
  { value: "glass-light", label: "Glass Light" },
  { value: "glass-dark", label: "Glass Dark" },
  { value: "outline", label: "Outline" },
  { value: "border-light", label: "Border" },
  { value: "border-dark", label: "Border Dark" },
] as const;

function StylePreview({ preset, selected }: { preset: string; selected: boolean }) {
  const isDark = preset === "glass-dark" || preset === "border-dark";
  const outerBg = isDark ? "rgb(60, 60, 65)" : "rgb(45, 45, 50)";
  const getWrapperStyle = (): React.CSSProperties => {
    switch (preset) {
      case "default": return {};
      case "glass-light": return { background: "rgba(255,255,255,0.3)", padding: "3px", borderRadius: "7px" };
      case "glass-dark": return { background: "rgba(0,0,0,0.35)", padding: "3px", borderRadius: "7px" };
      case "outline": return { background: "rgba(255,255,255,0.4)", padding: "2px", borderRadius: "7px" };
      case "border-light": return { background: "rgb(255,255,255)", padding: "4px", borderRadius: "8px" };
      case "border-dark": return { background: "rgb(30,30,30)", padding: "4px", borderRadius: "8px" };
      default: return {};
    }
  };
  const hasWrapper = preset !== "default";
  return (
    <div className={cn("relative w-full aspect-square rounded-xl overflow-hidden transition-all duration-200",
      selected ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#1c1c1e] shadow-lg shadow-blue-500/10" : "ring-1 ring-white/10 hover:ring-white/20")}
      style={{ backgroundColor: outerBg }}>
      <div className="absolute" style={{ top: "19.5%", left: "19.5%", width: "95.5%", height: "95.5%" }}>
        {hasWrapper ? (
          <div className="w-full h-full" style={getWrapperStyle()}>
            <div className="w-full h-full bg-gradient-to-br from-white to-gray-100 rounded-[6px] shadow-sm" />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-white to-gray-100 rounded-[8px] shadow-sm" />
        )}
      </div>
    </div>
  );
}

// ─── Border Preview ──────────────────────────────────────────────────────────
const borderPresets = [
  { value: 0, label: "Sharp" },
  { value: 12, label: "Curved" },
  { value: 20, label: "Round" },
] as const;

function BorderPreview({ radius, selected }: { radius: number; selected: boolean }) {
  const previewRadius = radius === 0 ? "0px" : radius === 12 ? "6px" : "12px";
  return (
    <div className={cn("relative w-full aspect-square rounded-xl overflow-hidden transition-all duration-200",
      selected ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#1c1c1e] shadow-lg shadow-blue-500/10" : "ring-1 ring-white/10 hover:ring-white/20")}
      style={{ backgroundColor: "rgb(45,45,50)" }}>
      <div className="absolute" style={{ top: "19.5%", left: "19.5%", width: "95.5%", height: "95.5%" }}>
        <div className="w-full h-full bg-gradient-to-br from-white to-gray-100 shadow-sm" style={{ borderRadius: previewRadius }} />
      </div>
    </div>
  );
}

// ─── Shadow Preview ─────────────────────────────────────────────────────────
const shadowPresets = [
  { value: "hug", label: "Hug", shadow: "rgba(0,0,0,0.2) 0px 2px 12px 0px, rgba(0,0,0,0.14) 0px 1px 4px 0px" },
  { value: "soft", label: "Soft", shadow: "rgba(0,0,0,0.28) 0px 12px 48px 0px, rgba(0,0,0,0.18) 0px 4px 12px 0px" },
  { value: "strong", label: "Strong", shadow: "rgba(0,0,0,0.45) 0px 24px 80px 0px, rgba(0,0,0,0.3) 0px 8px 24px 0px" },
  { value: "none", label: "None", shadow: "none" },
] as const;

function ShadowPreview({ shadow, selected }: { shadow: string; selected: boolean }) {
  return (
    <div className={cn("relative w-full aspect-square rounded-xl overflow-hidden transition-all duration-200",
      selected ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#1c1c1e] shadow-lg shadow-blue-500/10" : "ring-1 ring-white/10 hover:ring-white/20")}
      style={{ backgroundColor: "rgb(45,45,50)" }}>
      <div className="absolute bg-gradient-to-br from-white to-gray-100 rounded-[10px]"
        style={{ top: "26%", left: "26%", width: "95%", height: "95%", boxShadow: shadow }} />
    </div>
  );
}

// ─── Transform Preview ────────────────────────────────────────────────────────
const SNAP_POINTS = [
  { x: -15, y: -15 }, { x: 0, y: -15 }, { x: 15, y: -15 },
  { x: -15, y: 0 },   { x: 0, y: 0 },   { x: 15, y: 0 },
  { x: -15, y: 15 },  { x: 0, y: 15 },  { x: 15, y: 15 },
];

function TransformPreview() {
  const perspective3D = { rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, translateX: 0, translateY: 0, perspective: 1000 };
  const screenshot = { offsetX: 0, offsetY: 0 };
  const [dragging, setDragging] = useState(false);
  const bgStyle = { background: "linear-gradient(135deg, rgb(255,100,50) 12.8%, rgb(255,0,101) 43.52%, rgb(123,46,255) 84.34%)" };

  const transformStyle: React.CSSProperties = {
    transform: `translate(${perspective3D.translateX}%, ${perspective3D.translateY}%) rotateX(${perspective3D.rotateX}deg) rotateY(${perspective3D.rotateY}deg) rotateZ(${perspective3D.rotateZ}deg) scale(${perspective3D.scale})`,
    transition: dragging ? "none" : "transform 150ms ease-out",
    transformOrigin: "center center",
  };

  const handleX = 50;
  const handleY = 50;

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 touch-none select-none cursor-grab"
      style={{ aspectRatio: "4 / 3" }}
      onMouseDown={() => setDragging(true)} onMouseUp={() => setDragging(false)} onMouseLeave={() => setDragging(false)}>
      <div className="absolute inset-0" style={{ ...bgStyle, borderRadius: "12px" }} />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-[12%] bottom-[12%] w-px bg-white/10" />
        <div className="absolute top-1/2 left-[12%] right-[12%] h-px bg-white/10" />
        {SNAP_POINTS.map((point, i) => {
          const left = 50 + (point.x / 15) * 50;
          const top = 50 + (point.y / 15) * 50;
          const isCenter = point.x === 0 && point.y === 0;
          return (
            <div key={i} className={cn("absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150",
              isCenter ? "w-2.5 h-2.5 bg-white/40 ring-1 ring-white/10" : "w-2 h-2 bg-white/20")}
              style={{ left: `${left}%`, top: `${top}%` }} />
          );
        })}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ perspective: `${perspective3D.perspective}px` }}>
        <div className="w-[85%] h-[85%]" style={transformStyle}>
          <div className="w-full h-full bg-white/10 rounded-md border border-white/10" />
        </div>
      </div>
      <div className={cn("absolute w-7 h-7 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none bg-white/70 backdrop-blur-sm border-2 border-black/50 transition-all duration-150",
        dragging && "scale-110")}
        style={{ left: `${Math.max(8, Math.min(92, handleX))}%`, top: `${Math.max(8, Math.min(92, handleY))}%` }}>
        <div className="absolute inset-1 rounded-full border border-black/30" />
      </div>
      <div className="absolute inset-0 rounded-xl border border-white/5 pointer-events-none" />
    </div>
  );
}

// ─── Section Components ─────────────────────────────────────────────────────
function StyleSectionStandalone() {
  const [imageStylePreset, setImageStylePreset] = useState("default");
  const [padding, setPadding] = useState(2);
  const [opacity, setOpacity] = useState(30);
  const isNonDefault = imageStylePreset !== "default";

  return (
    <SectionWrapper title="Style" defaultOpen={true}>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2 p-1">
          {stylePresets.map(({ value, label }) => {
            const isSelected = imageStylePreset === value;
            return (
              <button key={value} type="button" onClick={() => setImageStylePreset(value)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer">
                <StylePreview preset={value} selected={isSelected} />
                <span className={cn("text-[10px] leading-tight transition-colors",
                  isSelected ? "text-white font-medium" : "text-white/40 group-hover:text-white/60")}>{label}</span>
              </button>
            );
          })}
        </div>
        {isNonDefault && (
          <>
            <Slider value={[padding]} min={0} max={8} step={0.5} label="Padding" valueDisplay={padding.toFixed(1)} />
            <Slider value={[Math.round(opacity)]} min={5} max={100} step={1} label="Opacity" valueDisplay={`${Math.round(opacity)}%`} />
          </>
        )}
      </div>
    </SectionWrapper>
  );
}

function BorderSectionStandalone() {
  const [borderRadius, setBorderRadius] = useState(10);
  const [imageScale, setImageScale] = useState(100);

  return (
    <SectionWrapper title="Border" defaultOpen={true}>
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2 p-1">
          {borderPresets.map(({ value, label }) => {
            const isSelected = borderRadius === value;
            return (
              <button key={value} type="button" onClick={() => setBorderRadius(value)}
                className="flex flex-col items-center gap-1.5 group cursor-pointer">
                <BorderPreview radius={value} selected={isSelected} />
                <span className={cn("text-[10px] leading-tight transition-colors",
                  isSelected ? "text-white font-medium" : "text-white/40 group-hover:text-white/60")}>{label}</span>
              </button>
            );
          })}
        </div>
        <Slider value={[borderRadius]} min={0} max={50} step={1} label="Radius" valueDisplay={`${borderRadius}`} />
        <Slider value={[imageScale / 100]} min={0.1} max={2} step={0.01} label="Scale" valueDisplay={(imageScale / 100).toFixed(1)} />
      </div>
    </SectionWrapper>
  );
}

function ShadowSectionStandalone() {
  const [shadowPreset, setShadowPreset] = useState("soft");

  return (
    <SectionWrapper title="Shadow" defaultOpen={true}>
      <div className="grid grid-cols-2 gap-2 p-1">
        {shadowPresets.map(({ value, label, shadow }) => {
          const isSelected = shadowPreset === value;
          return (
            <button key={value} type="button" onClick={() => setShadowPreset(value)}
              className="flex flex-col items-center gap-1.5 group cursor-pointer">
              <ShadowPreview shadow={shadow} selected={isSelected} />
              <span className={cn("text-[10px] leading-tight transition-colors",
                isSelected ? "text-white font-medium" : "text-white/40 group-hover:text-white/60")}>{label}</span>
            </button>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

// ─── Tabs & Types ───────────────────────────────────────────────────────────
type LeftTabType = "frame" | "background";
type RightTabType = "transforms" | "animate";

const leftTabs: { id: LeftTabType; icon: React.ReactNode; label: string }[] = [
  { id: "frame", icon: <LayersLogoIcon size={16} />, label: "Frame" },
  { id: "background", icon: <ColorsIcon size={16} />, label: "BG" },
];

const rightTabs: { id: RightTabType; icon: React.ReactNode; label: string }[] = [
  { id: "transforms", icon: <RotateSquareIcon size={18} />, label: "3D" },
  { id: "animate", icon: <VideoReplayIcon size={18} />, label: "Motion" },
];

function MiniGradient({ grad, active = false }: { grad: string; active?: boolean }) {
  return (
    <div className={cn("w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2",
      active ? "border-white/60" : "border-transparent hover:border-white/20")}>
      <div className="w-full h-full" style={{ background: grad }} />
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function StudioPlayground() {
  const [activeLeftTab, setActiveLeftTab] = useState<LeftTabType>("frame");
  const [activeRightTab, setActiveRightTab] = useState<RightTabType>("transforms");
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const [lightDialogOpen, setLightDialogOpen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [controlMode, setControlMode] = useState<"zoom" | "tilt">("zoom");
  const [imageScale, setImageScale] = useState(100);
  const [perspective3D, setPerspective3D] = useState({ rotateZ: 0 });

  const bgGradient = "linear-gradient(135deg, rgb(255, 100, 50) 12.8%, rgb(255, 0, 101) 43.52%, rgb(123, 46, 255) 84.34%)";

  const miniGrads = [
    "linear-gradient(135deg, rgb(255,100,50), rgb(255,0,101), rgb(123,46,255))",
    "linear-gradient(135deg, rgb(255,177,122), rgb(233,107,189), rgb(123,79,255))",
    "linear-gradient(135deg, rgb(0,255,229), rgb(75,108,255), rgb(156,31,217))",
    "linear-gradient(135deg, rgb(255,184,107), rgb(255,69,133), rgb(47,28,150))",
    "linear-gradient(135deg, rgb(71,246,132), rgb(0,184,169), rgb(24,78,104))",
    "linear-gradient(135deg, rgb(255,97,230), rgb(255,51,51), rgb(255,184,0))",
  ];

  return (
    <div className="w-full max-w-[1324px] mx-auto relative rounded-xl border border-white/[0.06] bg-[#0c0c0e] shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden select-none">

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* TOP HEADER                                                 */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="h-11 mt-1 -ml-1 flex items-center shrink-0 gap-3 bg-[#0a0a0c] px-3">
        {/* Left - Logo + Templates (240px exacto) */}
        <div className="w-[240px] flex items-center h-9 rounded-lg bg-[#141416] border border-white/[0.06] px-1">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-white/[0.03] transition-all cursor-pointer">
            <Image src="/logo.svg" alt="Better Flow" width={28} height={28} className="w-7 h-7" />
          </div>
          <div className="w-px h-5 bg-white/[0.06] mx-1" />
          <button className="flex items-center gap-2 px-3 h-9 rounded-lg hover:bg-white/[0.03] transition-all group flex-1 justify-center cursor-pointer">
            <PlateIcon size={14} className="text-blue-400" />
            <span className="text-[13px] font-medium text-white/80">Templates</span>
            <ArrowDown01Icon size={12} className="text-white/30 ml-1" />
          </button>
        </div>

        {/* Center - Undo/Redo + Icons (flex-1) */}
        <div className="flex-1 flex items-center justify-center h-9 rounded-lg px-2">
          <button className="flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:bg-white/[0.03] hover:text-white/60 transition-all cursor-pointer opacity-40">
            <ArrowTurnBackwardIcon size={14} />
          </button>
          <button className="flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:bg-white/[0.03] hover:text-white/60 transition-all cursor-pointer opacity-40">
            <ArrowTurnForwardIcon size={14} />
          </button>
          <div className="w-px h-5 bg-white/[0.06] mx-2" />
          <div className="flex items-center gap-0.5">
            <button className="flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.03] transition-all cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.03] transition-all cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m4.22-10.22l4.24-4.24M6.34 6.34L2.1 2.1m17.8 17.8l-4.24-4.24M6.34 17.66l-4.24 4.24M23 12h-6m-6 0H1m20.24-4.24l-4.24 4.24M6.34 6.34l-4.24-4.24"/></svg>
            </button>
            <button className="flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.03] transition-all cursor-pointer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
            </button>
          </div>
        </div>

        {/* Right - Export (240px exacto) */}
        <div className="w-[240px] flex items-center justify-between h-9 rounded-lg bg-white border border-white/[0.1] px-1 gap-1">
          <button className="flex-1 flex items-center justify-between px-4 h-8 rounded-lg text-black text-xs font-medium transition-all cursor-pointer">
            <span className="font-semibold">Export</span>
            <span className="opacity-60 text-[11px]">1x · PNG</span>
            <ArrowDown01Icon size={10} />
          </button>
          <div className="w-px h-5 bg-black/10 mx-1" />
          <a href="https://x.com/konlyzx_" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5 transition-all text-black/50 hover:text-black active:scale-95">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5 transition-all text-black/50 hover:text-black active:scale-95">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* MAIN 3-COLUMN GRID con espaciado                          */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-[240px_1fr_240px] gap-2 p-2 h-[700px] bg-[#0a0a0c]">

        {/* ═════════════════════ LEFT SIDEBAR ═════════════════════ */}
        <div className="h-full bg-[#1c1c1e] rounded-lg flex flex-col overflow-hidden border border-white/5 relative shrink-0">
          {/* Tab Navigation */}
          <div className="px-2.5 py-2.5 border-b border-white/10 shrink-0">
            <div className="flex gap-1 p-0.5 bg-[#2c2c2e]/50 rounded-lg border border-white/10">
              {leftTabs.map((tab) => {
                const isActive = activeLeftTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setActiveLeftTab(tab.id)}
                    className={cn("flex items-center justify-center py-2 px-2 rounded-md cursor-pointer transition-all duration-300",
                      isActive ? "bg-[#3a3a3c] text-white flex-[1.8] shadow-sm" : "text-white/40 hover:text-white/70 flex-1")}>
                    <span className="shrink-0">{tab.icon}</span>
                    <span className={cn("text-[11px] font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                      isActive ? "max-w-[60px] opacity-100 ml-1.5" : "max-w-0 opacity-0 ml-0")}>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable Content - scrollbar hide */}
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <div className="p-4 space-y-5">
              {activeLeftTab === "frame" && (<>
                <button onClick={() => setTemplatesOpen(true)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#1c1c1e] hover:bg-[#262628] transition-colors border border-white/5 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <MagicStarIcon size={14} />
                    <span className="text-[11px] font-medium text-white/80">Magic Preset</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <ArrowRight01Icon size={10} className="text-white/25 rotate-180" />
                    <ArrowRight01Icon size={10} className="text-white/50" />
                  </div>
                </button>

                <div className="space-y-1.5">
                  <SectionLabel>Media</SectionLabel>
                  <button className="w-full rounded-lg bg-[#2c2c2e] border border-dashed border-white/10 hover:border-white/30 hover:bg-[#323234] transition-all group cursor-pointer overflow-hidden">
                    <div className="p-2 flex flex-col items-center justify-center gap-1.5">
                      <div className="w-8 h-6 rounded bg-[#3a3a3c] group-hover:bg-[#48484a] transition-colors flex items-center justify-center">
                        <Add01Icon size={14} className="text-white/50" />
                      </div>
                      <span className="text-[9px] text-white/30 text-center leading-tight">Drop media or click to choose</span>
                    </div>
                  </button>
                </div>

                <StyleSectionStandalone />
                <BorderSectionStandalone />
                <ShadowSectionStandalone />

                <button onClick={() => setLightDialogOpen(!lightDialogOpen)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#2c2c2e] hover:bg-[#3a3a3c] transition-colors cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/50">
                    <circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                  </svg>
                  <span className="text-[11px] text-white/70">Adjust Light</span>
                </button>

                {lightDialogOpen && (
                  <div className="p-3 rounded-xl bg-[#2c2c2e] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/60">Brightness</span>
                      <span className="text-[10px] text-white/80">{brightness}%</span>
                    </div>
                    <input type="range" min="0" max="200" value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white" />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/60">Contrast</span>
                      <span className="text-[10px] text-white/80">{contrast}%</span>
                    </div>
                    <input type="range" min="0" max="200" value={contrast}
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white" />
                  </div>
                )}

                <div className="space-y-2">
                  <SectionLabel>Details</SectionLabel>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="px-2 py-1.5 rounded-lg bg-[#2c2c2e]">
                      <span className="text-white/30 block">Device</span>
                      <span className="text-white/60">Screenshot</span>
                    </div>
                    <div className="px-2 py-1.5 rounded-lg bg-[#2c2c2e]">
                      <span className="text-white/30 block">Screen pixels</span>
                      <span className="text-white/60">Adapts to media</span>
                    </div>
                  </div>
                </div>
              </>)}

              {activeLeftTab === "background" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <SectionLabel>Background</SectionLabel>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full border-2 border-white/30" style={{ background: bgGradient }} />
                      <div className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center cursor-pointer hover:bg-white/[0.06]">
                        <Add01Icon size={12} className="text-white/30" />
                      </div>
                      <div className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center cursor-pointer hover:bg-white/[0.06]">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18M3 12h18"/></svg>
                      </div>
                    </div>
                    <p className="text-[10px] text-white/30 pt-1">Drag media or click to choose</p>
                  </div>
                  <div className="space-y-2">
                    <SectionLabel>Layout Presets</SectionLabel>
                    <div className="grid grid-cols-1 gap-2">
                      {miniGrads.slice(0, 3).map((grad, i) => (
                        <MiniGradient key={i} grad={grad} active={i === 0} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Templates Overlay */}
          <div className={cn("absolute inset-0 z-50 bg-[#1c1c1e] flex flex-col transition-all duration-300",
            templatesOpen ? "translate-x-0" : "-translate-x-full pointer-events-none")}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <MagicWand01Icon size={16} className="text-white/60" />
                <h2 className="text-sm font-medium text-white/80">Templates</h2>
              </div>
              <button onClick={() => setTemplatesOpen(false)} className="flex items-center justify-center w-7 h-7 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                <Cancel01Icon size={14} className="text-white/50" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto hide-scrollbar p-4">
              <div className="grid grid-cols-2 gap-2">
                {miniGrads.map((grad, i) => (
                  <MiniGradient key={i} grad={grad} active={i === 0} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═════════════════════ CENTER CANVAS ════════════════════ */}
        <div className="relative flex items-center justify-center p-6 overflow-hidden rounded-lg" style={{ background: bgGradient }}>
          {/* subtle grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

          {/* Canvas card */}
          <div className="relative w-full max-w-[420px] aspect-square rounded-xl bg-black/20 backdrop-blur-sm border border-white/[0.08] shadow-2xl flex flex-col items-center justify-center gap-4 overflow-hidden">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/40">
              <Add01Icon size={24} />
            </div>
            <div className="text-center space-y-1">
              <p className="text-[13px] text-white/70 font-medium">Drag & drop, click to browse, or paste</p>
              <div className="flex items-center justify-center gap-1.5">
                <span className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-[10px] text-white/50 font-mono">⌘V</span>
                <span className="text-[11px] text-white/40">to paste</span>
              </div>
            </div>
            <span className="text-[10px] text-white/20 font-medium">or</span>
            <div className="flex items-center gap-2 w-full max-w-[240px]">
              <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/30 border border-white/[0.08] text-[11px] text-white/30">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span>Enter website URL...</span>
              </div>
              <button className="w-8 h-8 rounded-lg bg-black/30 border border-white/[0.08] flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ═════════════════════ RIGHT SIDEBAR ══════════════════ */}
        <div className="h-full bg-[#141416] rounded-lg flex flex-col overflow-hidden border border-white/5 shrink-0">
          {/* Tab Navigation */}
          <div className="px-2.5 py-2.5 border-b border-white/10 shrink-0">
            <div className="flex gap-1 p-0.5 bg-[#1c1c1e] rounded-lg border border-white/10">
              {rightTabs.map((tab) => {
                const isActive = activeRightTab === tab.id;
                return (
                  <button key={tab.id} onClick={() => setActiveRightTab(tab.id)}
                    className={cn("flex items-center justify-center py-2 px-2 rounded-md cursor-pointer transition-all duration-300",
                      isActive ? "bg-[#2a2a2c] text-white flex-[1.8] shadow-sm" : "text-white/40 hover:text-white/70 flex-1")}>
                    <span className="shrink-0">{tab.icon}</span>
                    <span className={cn("text-[11px] font-medium whitespace-nowrap overflow-hidden transition-all duration-300",
                      isActive ? "max-w-[60px] opacity-100 ml-1.5" : "max-w-0 opacity-0 ml-0")}>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scrollable Content - scrollbar hide */}
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            <div className="p-3 space-y-3">
              {activeRightTab === "transforms" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] text-white/60 font-medium">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                      3D
                    </div>
                    <div className="w-9 h-5 rounded-full relative bg-white/30 transition-colors">
                      <div className="absolute top-[2px] left-[18px] w-4 h-4 rounded-full bg-white shadow" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] text-white/60 font-medium">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                      Fit
                    </div>
                    <div className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-white/50">
                      <span>Zoom</span>
                      <span className="text-white/30">100%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] cursor-pointer">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                      </button>
                      <div className="flex-1 h-1 bg-white/[0.06] rounded-full relative">
                        <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white/60 rounded-full" />
                      </div>
                      <button className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] cursor-pointer">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                      </button>
                    </div>
                  </div>

                  <SegmentedControl options={[{ id: "zoom", label: "Zoom" }, { id: "tilt", label: "Tilt" }]} value={controlMode} onChange={(v) => setControlMode(v as any)} />
                  <TransformPreview />

                  {controlMode === "zoom" ? (
                    <Slider value={[imageScale / 100]} min={0.1} max={2} step={0.01} label="Zoom" valueDisplay={`${imageScale}%`} />
                  ) : (
                    <Slider value={[perspective3D.rotateZ]} min={-45} max={45} step={1} label="Rotation" valueDisplay={`${perspective3D.rotateZ}°`} />
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Layout Presets</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {miniGrads.map((grad, i) => (
                      <MiniGradient key={i} grad={grad} active={i === 0} />
                    ))}
                  </div>
                </div>
              )}

              {activeRightTab === "animate" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Animation Presets</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {miniGrads.map((grad, i) => (
                      <MiniGradient key={i} grad={grad} active={i === 0} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

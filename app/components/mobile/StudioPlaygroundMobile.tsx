"use client";

import React, { useState } from "react";

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function LayersLogoIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function ColorsIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function RotateSquareIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 12" />
      <path d="M21 3v9h-9" />
    </svg>
  );
}

function VideoReplayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function ArrowDown01Icon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

function Add01Icon({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function Cancel01Icon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function MagicWand01Icon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10 13l-2 2 2 2" />
      <path d="M14 13l2 2-2 2" />
    </svg>
  );
}

function PlateIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[10px] font-medium tracking-wide text-white/40 uppercase">{children}</span>;
}

const stylePresets = [
  { value: "default", label: "Default" },
  { value: "glass-light", label: "Glass Light" },
  { value: "glass-dark", label: "Glass Dark" },
  { value: "outline", label: "Outline" },
  { value: "border-light", label: "Border" },
  { value: "border-dark", label: "Border Dark" },
] as const;

const borderPresets = [
  { value: 0, label: "Sharp" },
  { value: 12, label: "Curved" },
  { value: 20, label: "Round" },
] as const;

const shadowPresets = [
  { value: "hug", label: "Hug", shadow: "rgba(0,0,0,0.2) 0px 2px 12px 0px, rgba(0,0,0,0.14) 0px 1px 4px 0px" },
  { value: "soft", label: "Soft", shadow: "rgba(0,0,0,0.28) 0px 12px 48px 0px, rgba(0,0,0,0.18) 0px 4px 12px 0px" },
  { value: "strong", label: "Strong", shadow: "rgba(0,0,0,0.45) 0px 24px 80px 0px, rgba(0,0,0,0.3) 0px 8px 24px 0px" },
  { value: "none", label: "None", shadow: "none" },
] as const;

function Slider({
  value,
  min,
  max,
  step = 1,
  label,
  valueDisplay,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  label: string;
  valueDisplay: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-white/50">{label}</span>
        <span className="font-mono text-[10px] text-white/70">{valueDisplay}</span>
      </div>
      <div className="relative flex h-4 w-full items-center">
        <div className="absolute inset-x-0 h-[3px] rounded-full bg-white/[0.08]" />
        <div className="absolute left-0 h-[3px] rounded-full bg-white/30" style={{ width: `${pct}%` }} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <div
          className="pointer-events-none absolute h-3 w-3 rounded-full bg-white shadow"
          style={{ left: `calc(${pct}% - 6px)` }}
        />
      </div>
    </div>
  );
}

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={cn(
            "flex-1 rounded-md px-2 py-1.5 text-[11px] font-medium transition-all",
            value === opt.id ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function StylePreview({ preset, selected }: { preset: string; selected: boolean }) {
  const isDark = preset === "glass-dark" || preset === "border-dark";
  const outerBg = isDark ? "rgb(60, 60, 65)" : "rgb(45, 45, 50)";
  const getWrapperStyle = (): React.CSSProperties => {
    switch (preset) {
      case "default":
        return {};
      case "glass-light":
        return { background: "rgba(255,255,255,0.3)", padding: "3px", borderRadius: "7px" };
      case "glass-dark":
        return { background: "rgba(0,0,0,0.35)", padding: "3px", borderRadius: "7px" };
      case "outline":
        return { background: "rgba(255,255,255,0.4)", padding: "2px", borderRadius: "7px" };
      case "border-light":
        return { background: "rgb(255,255,255)", padding: "4px", borderRadius: "8px" };
      case "border-dark":
        return { background: "rgb(30,30,30)", padding: "4px", borderRadius: "8px" };
      default:
        return {};
    }
  };
  const hasWrapper = preset !== "default";
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-xl transition-all",
        selected ? "ring-2 ring-white/60" : "ring-1 ring-white/10",
      )}
      style={{ backgroundColor: outerBg }}
    >
      <div className="absolute" style={{ top: "19.5%", left: "19.5%", width: "95.5%", height: "95.5%" }}>
        {hasWrapper ? (
          <div className="h-full w-full" style={getWrapperStyle()}>
            <div className="h-full w-full rounded-[6px] bg-gradient-to-br from-white to-gray-100 shadow-sm" />
          </div>
        ) : (
          <div className="h-full w-full rounded-[8px] bg-gradient-to-br from-white to-gray-100 shadow-sm" />
        )}
      </div>
    </div>
  );
}

function BorderPreview({ radius, selected }: { radius: number; selected: boolean }) {
  const previewRadius = radius === 0 ? "0px" : radius === 12 ? "6px" : "12px";
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-xl transition-all",
        selected ? "ring-2 ring-white/60" : "ring-1 ring-white/10",
      )}
      style={{ backgroundColor: "rgb(45, 45, 50)" }}
    >
      <div className="absolute" style={{ top: "19.5%", left: "19.5%", width: "95.5%", height: "95.5%" }}>
        <div
          className="h-full w-full bg-gradient-to-br from-white to-gray-100 shadow-sm"
          style={{ borderRadius: previewRadius }}
        />
      </div>
    </div>
  );
}

function ShadowPreview({ shadow, selected }: { shadow: string; selected: boolean }) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-xl transition-all",
        selected ? "ring-2 ring-white/60" : "ring-1 ring-white/10",
      )}
      style={{ backgroundColor: "rgb(45, 45, 50)" }}
    >
      <div
        className="absolute rounded-[10px] bg-gradient-to-br from-white to-gray-100"
        style={{ top: "26%", left: "26%", width: "95%", height: "95%", boxShadow: shadow }}
      />
    </div>
  );
}

function MiniGradient({ grad, active }: { grad: string; active?: boolean }) {
  return (
    <div
      className={cn(
        "aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl border-2 transition-all",
        active ? "border-white/60" : "border-transparent hover:border-white/20",
      )}
    >
      <div className="h-full w-full" style={{ background: grad }} />
    </div>
  );
}

type TabType = "frame" | "background" | "transforms" | "animate";

const tabs: { id: TabType; icon: React.ReactNode; label: string }[] = [
  { id: "frame", icon: <LayersLogoIcon size={16} />, label: "Frame" },
  { id: "background", icon: <ColorsIcon size={16} />, label: "BG" },
  { id: "transforms", icon: <RotateSquareIcon size={18} />, label: "3D" },
  { id: "animate", icon: <VideoReplayIcon size={18} />, label: "Motion" },
];

export default function StudioPlaygroundMobile() {
  const [activeTab, setActiveTab] = useState<TabType>("frame");
  const [imageStylePreset, setImageStylePreset] = useState("default");
  const [borderRadius, setBorderRadius] = useState(12);
  const [padding, setPadding] = useState(24);
  const [imageScale, setImageScale] = useState(100);
  const [shadowPreset, setShadowPreset] = useState("soft");
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [controlMode, setControlMode] = useState<"zoom" | "tilt">("zoom");

  const bgGradient =
    "linear-gradient(135deg, rgb(255, 100, 50) 12.8%, rgb(255, 0, 101) 43.52%, rgb(123, 46, 255) 84.34%)";

  const miniGrads = [
    "linear-gradient(135deg, rgb(255, 100, 50), rgb(255, 0, 101), rgb(123, 46, 255))",
    "linear-gradient(135deg, rgb(255, 177, 122), rgb(233, 107, 189), rgb(123, 79, 255))",
    "linear-gradient(135deg, rgb(0, 255, 229), rgb(75, 108, 255), rgb(156, 31, 217))",
    "linear-gradient(135deg, rgb(255, 184, 107), rgb(255, 69, 133), rgb(47, 28, 150))",
    "linear-gradient(135deg, rgb(71, 246, 132), rgb(0, 184, 169), rgb(24, 78, 104))",
    "linear-gradient(135deg, rgb(255, 97, 230), rgb(255, 51, 51), rgb(255, 184, 0))",
  ];

  const currentShadow = shadowPresets.find((s) => s.value === shadowPreset)?.shadow || "none";

  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-[20px] border border-white/[0.06] bg-[#0c0c0e] shadow-[0_24px_80px_rgba(0,0,0,0.7)] select-none"
      style={{ height: "580px" }}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-white/[0.04] bg-[#0a0a0c] px-3 py-2">
        <div className="flex h-9 flex-1 items-center rounded-lg border border-white/[0.06] bg-[#141416] px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg">
            <img src="/logo.svg" alt="Logo" className="h-5 w-5" />
          </div>
          <div className="mx-1 h-5 w-px bg-white/[0.06]" />
          <button className="flex h-8 flex-1 items-center justify-center gap-2 rounded-lg px-3">
            <PlateIcon size={14} className="text-blue-400" />
            <span className="text-[12px] font-medium text-white/80">Templates</span>
            <ArrowDown01Icon size={12} className="ml-1 text-white/30" />
          </button>
        </div>
        <div className="flex h-9 items-center rounded-lg border border-white/[0.1] bg-white px-1">
          <button className="flex h-8 items-center gap-2 rounded-lg px-3 text-[11px] font-medium text-black">
            <span className="font-semibold">Export</span>
            <span className="text-[10px] opacity-60">1x · PNG</span>
            <ArrowDown01Icon size={10} />
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 shrink-0 p-4" style={{ background: bgGradient }}>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] bg-[size:2rem_2rem]" />
        <div
          className="relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-white/[0.08] bg-black/20 shadow-2xl backdrop-blur-sm"
          style={{ padding: `${padding * 0.5}px` }}
        >
          <div
            className="h-full w-full overflow-hidden rounded-xl transition-all duration-300"
            style={{ background: bgGradient, borderRadius: `${borderRadius}px`, boxShadow: currentShadow }}
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/40">
                <Add01Icon size={24} />
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 mb-25 flex flex-col items-center justify-center gap-3">
            <div className="space-y-1 text-center">
              <p className="text-[13px] font-medium text-white/70">Drag & drop, click to browse, or paste</p>
              <div className="flex items-center justify-center gap-1.5">
                <span className="rounded border border-white/10 bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/50">
                  ⌘V
                </span>
                <span className="text-[11px] text-white/40">to paste</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-b border-white/[0.06] px-2.5 py-2.5">
        <div className="flex gap-1 rounded-lg border border-white/10 bg-[#2c2c2e]/50 p-0.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center justify-center rounded-md px-2 py-2 transition-all duration-300",
                  isActive
                    ? "flex-[1.8] bg-[#3a3a3c] text-white shadow-sm"
                    : "flex-1 text-white/40 hover:text-white/70",
                )}
              >
                <span className="shrink-0">{tab.icon}</span>
                <span
                  className={cn(
                    "overflow-hidden text-[11px] font-medium whitespace-nowrap transition-all duration-300",
                    isActive ? "ml-1.5 max-w-[60px] opacity-100" : "ml-0 max-w-0 opacity-0",
                  )}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="hide-scrollbar min-h-0 flex-1 overflow-y-auto">
        <div className="space-y-5 p-4">
          {activeTab === "frame" && (
            <>
              <div className="space-y-2">
                <SectionLabel>Templates</SectionLabel>
                <div className="grid grid-cols-2 gap-2">
                  {miniGrads.map((grad, i) => (
                    <MiniGradient key={i} grad={grad} active={i === 0} />
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>Border Presets</SectionLabel>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {borderPresets.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setBorderRadius(p.value)}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <BorderPreview radius={p.value} selected={borderRadius === p.value} />
                      <span className={cn("text-[10px]", borderRadius === p.value ? "text-white" : "text-white/30")}>
                        {p.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <Slider
                  value={borderRadius}
                  min={0}
                  max={50}
                  step={1}
                  label="Border Radius"
                  valueDisplay={`${borderRadius}px`}
                  onChange={setBorderRadius}
                />
                <Slider
                  value={padding}
                  min={0}
                  max={80}
                  step={1}
                  label="Padding"
                  valueDisplay={`${padding}px`}
                  onChange={setPadding}
                />
                <Slider
                  value={imageScale}
                  min={50}
                  max={150}
                  step={1}
                  label="Scale"
                  valueDisplay={`${imageScale}%`}
                  onChange={setImageScale}
                />
              </div>
            </>
          )}

          {activeTab === "background" && (
            <div className="space-y-5">
              <div>
                <SectionLabel>Style Presets</SectionLabel>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {stylePresets.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setImageStylePreset(p.value)}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <StylePreview preset={p.value} selected={imageStylePreset === p.value} />
                      <span
                        className={cn("text-[10px]", imageStylePreset === p.value ? "text-white" : "text-white/30")}
                      >
                        {p.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <SectionLabel>Shadow Presets</SectionLabel>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {shadowPresets.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setShadowPreset(p.value)}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <ShadowPreview shadow={p.shadow} selected={shadowPreset === p.value} />
                      <span className={cn("text-[10px]", shadowPreset === p.value ? "text-white" : "text-white/30")}>
                        {p.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <SectionLabel>Gradients</SectionLabel>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {miniGrads.map((grad, i) => (
                    <MiniGradient key={i} grad={grad} active={i === 0} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "transforms" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] font-medium text-white/60">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                  3D Transform
                </div>
                <div className="relative h-5 w-9 rounded-full bg-white/30 transition-colors">
                  <div className="absolute top-[2px] left-[18px] h-4 w-4 rounded-full bg-white shadow" />
                </div>
              </div>

              <SegmentedControl
                options={[
                  { id: "zoom", label: "Zoom" },
                  { id: "tilt", label: "Tilt" },
                ]}
                value={controlMode}
                onChange={(v) => setControlMode(v as "zoom" | "tilt")}
              />

              <div className="space-y-3 pt-1">
                <Slider
                  value={brightness}
                  min={0}
                  max={200}
                  step={1}
                  label="Brightness"
                  valueDisplay={`${brightness}%`}
                  onChange={setBrightness}
                />
                <Slider
                  value={contrast}
                  min={0}
                  max={200}
                  step={1}
                  label="Contrast"
                  valueDisplay={`${contrast}%`}
                  onChange={setContrast}
                />
              </div>
            </div>
          )}

          {activeTab === "animate" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <SectionLabel>Animation Presets</SectionLabel>
                <div className="h-px flex-1 bg-white/5" />
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
  );
}

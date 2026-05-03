"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type RowsMode = "mono" | "duo" | "trio";
type DockMode = "floating" | "fixed" | "mini";

type State = {
  badge: boolean;
  rows: RowsMode;
  sidebar: boolean;
  dock: DockMode;
};

const states: readonly State[] = [
  { badge: true, rows: "trio", sidebar: false, dock: "floating" },
  { badge: false, rows: "mono", sidebar: true, dock: "mini" },
  { badge: false, rows: "duo", sidebar: true, dock: "floating" },
  { badge: true, rows: "trio", sidebar: true, dock: "fixed" },
];

/* ---------- Geometry (viewBox 1120 x 460) ---------- */
const PILL_RIGHT = 360;
const MIDDLE_X = 600;
const RIGHT_LEFT = 740;
const RIGHT_RIGHT = 1080;
// FIX: Більш рівномірний розподіл Y позицій
const ROW_Y = [110, 180, 250, 320] as const;

export function SystemArchitectureVisual() {
  const [i, setI] = useState(0);
  const state = states[i];

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % states.length), 2600);
    return () => clearInterval(id);
  }, []);

  // FIX: Коректне позиціювання для всіх ліній
  const badgeEnd = { x: MIDDLE_X - 72, y: ROW_Y[0] };
  const rowsEndY = state.rows === "mono" ? 174 : state.rows === "duo" ? 215 : 175;
  const rowsEnd = { x: MIDDLE_X - 65, y: rowsEndY };

  const sidebarEnd = state.sidebar
    ? { x: RIGHT_LEFT + 14, y: 270 }
    : { x: MIDDLE_X - 65, y: 297 };

  const dockEndX =
    state.dock === "mini"
      ? MIDDLE_X - 45
      : state.dock === "fixed"
      ? MIDDLE_X - 55
      : MIDDLE_X - 65;
  const dockEnd = { x: dockEndX, y: 400 };

  const paths = useMemo(
    () => ({
      badge: bezier(PILL_RIGHT, ROW_Y[0], badgeEnd.x, badgeEnd.y),
      rows: bezier(PILL_RIGHT, ROW_Y[1], rowsEnd.x, rowsEnd.y),
      sidebar: bezier(PILL_RIGHT, ROW_Y[2], sidebarEnd.x, sidebarEnd.y),
      dock: bezier(PILL_RIGHT, ROW_Y[3], dockEnd.x, dockEnd.y),
    }),
    [rowsEnd.y, sidebarEnd.x, sidebarEnd.y, dockEnd.x]
  );

  return (
    <section className="rounded-2xl border border-border bg-card/70 overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="font-semibold">System Architecture</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Live platform logic connecting orders, users, database and admin controls.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live preview
        </div>
      </div>

      <div className="bg-black relative overflow-hidden">
        <div className="relative w-full" style={{ aspectRatio: "1120 / 460" }}>
          <svg
            viewBox="0 0 1120 460"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="sa-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="1120" height="460" fill="#0a0a0a" />

            <line x1={480} y1="30" x2={480} y2="430" stroke="rgba(255,255,255,0.06)" />
            <line x1={720} y1="30" x2={720} y2="430" stroke="rgba(255,255,255,0.06)" />

            <AnimatedLine d={paths.badge} color="#ff3ba7" />
            <AnimatedLine d={paths.rows} color="#a855f7" />
            <AnimatedLine d={paths.sidebar} color="#3b82f6" />
            <AnimatedLine d={paths.dock} color="#fbbf24" />

            {/* FIX: Виправлені стартові точки для ліній */}
            <Dot x={PILL_RIGHT} y={ROW_Y[0]} color="#ff3ba7" />
            <Dot x={PILL_RIGHT} y={ROW_Y[1]} color="#a855f7" />
            <Dot x={PILL_RIGHT} y={ROW_Y[2]} color="#3b82f6" />
            <Dot x={PILL_RIGHT} y={ROW_Y[3]} color="#fbbf24" />

            <MovingDot x={badgeEnd.x} y={badgeEnd.y} color="#ff3ba7" />
            <MovingDot x={rowsEnd.x} y={rowsEnd.y} color="#a855f7" />
            <MovingDot x={sidebarEnd.x} y={sidebarEnd.y} color="#3b82f6" />
            <MovingDot x={dockEnd.x} y={dockEnd.y} color="#fbbf24" />

            <MiddlePanel state={state} />
            <RightPanel state={state} />
          </svg>

          <div
            className="absolute"
            style={{
              left: `${(65 / 1120) * 100}%`,
              top: `${(80 / 460) * 100}%`,
              width: `${(295 / 1120) * 100}%`,
            }}
          >
            <div className="flex flex-col gap-[34px]">
              <ControlPill label="custom-badge" value={state.badge} color="#ff3ba7" type="toggle" />
              <ControlPill
                label="favorites-rows"
                value={`"${state.rows}"`}
                color="#a855f7"
                type="select"
                active={state.rows}
                options={["mono", "duo", "trio"]}
              />
              <ControlPill label="compact-sidebar" value={state.sidebar} color="#3b82f6" type="toggle" />
              <ControlPill
                label="dock-mode"
                value={`"${state.dock}"`}
                color="#fbbf24"
                type="select"
                active={state.dock}
                options={["floating", "fixed", "mini"]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.max(70, Math.abs(x2 - x1) * 0.55);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

function AnimatedLine({ d, color }: { d: string; color: string }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      filter="url(#sa-glow)"
      initial={false}
      animate={{ d }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    />
  );
}

function Dot({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={5.5} fill="#0a0a0a" stroke={color} strokeWidth={2} />
      <circle cx={x} cy={y} r={2.5} fill={color} />
    </g>
  );
}

function MovingDot({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <motion.g
      initial={false}
      animate={{ x, y }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <circle r={5.5} fill="#0a0a0a" stroke={color} strokeWidth={2} />
      <circle r={2.5} fill={color} />
    </motion.g>
  );
}

type PillProps =
  | { label: string; value: boolean; color: string; type: "toggle"; active?: undefined; options?: undefined }
  | { label: string; value: string; color: string; type: "select"; active: string; options: string[] };

function ControlPill(props: PillProps) {
  const { label, value, color, type } = props;
  return (
    <div className="flex items-center h-11 pl-4 pr-5 rounded-full bg-zinc-950 border border-zinc-800 w-full">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {type === "toggle" ? (
          <div
            className="w-9 h-[21px] rounded-full border-2 relative flex-shrink-0"
            style={{ borderColor: color }}
          >
            <motion.div
              className="w-3 h-3 rounded-full absolute top-1/2 -translate-y-1/2"
              style={{ backgroundColor: color }}
              animate={{ left: value ? 18 : 3 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            />
          </div>
        ) : (
          <div className="flex gap-1.5 flex-shrink-0">
            {props.options.map((v) => (
              <motion.span
                key={v}
                className="w-1.5 h-1.5 rounded-full"
                animate={{
                  backgroundColor: props.active === v ? color : "#3f3f46",
                  scale: props.active === v ? 1.3 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        )}
        <span className="font-mono text-[13px] text-white truncate">{label}</span>
      </div>
      <motion.span
        key={String(value)}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="font-mono text-[13px] text-zinc-400 tabular-nums ml-2"
      >
        {String(value)}
      </motion.span>
    </div>
  );
}

function MiddlePanel({ state }: { state: State }) {
  return (
    <g>
      <motion.circle
        cx={MIDDLE_X}
        cy={ROW_Y[0]}
        r={26}
        animate={{ fill: state.badge ? "rgba(234,179,8,0.12)" : "rgba(255,255,255,0.05)" }}
        stroke="rgba(255,255,255,0.12)"
        transition={{ duration: 0.4 }}
      />
      <motion.circle
        cx={MIDDLE_X + 17}
        cy={ROW_Y[0] - 14}
        r={5.5}
        animate={{ fill: state.badge ? "#22c55e" : "#52525b" }}
        transition={{ duration: 0.4 }}
      />

      {state.rows === "mono" && (
        <>
          <Rect x={MIDDLE_X - 65} y={150} w={130} h={48} />
          <Rect x={MIDDLE_X - 65} y={210} w={130} h={28} />
          <Rect x={MIDDLE_X - 65} y={246} w={130} h={28} />
        </>
      )}
      {state.rows === "duo" && (
        <>
          <Rect x={MIDDLE_X - 65} y={150} w={60} h={50} />
          <Rect x={MIDDLE_X + 5} y={150} w={60} h={50} />
          <Rect x={MIDDLE_X - 65} y={212} w={130} h={26} />
          <Rect x={MIDDLE_X - 65} y={246} w={130} h={26} />
        </>
      )}
      {state.rows === "trio" && (
        <>
          <Rect x={MIDDLE_X - 65} y={150} w={60} h={50} />
          <Rect x={MIDDLE_X + 5} y={150} w={60} h={50} />
          <Rect x={MIDDLE_X - 65} y={210} w={60} h={32} />
          <Rect x={MIDDLE_X + 5} y={210} w={60} h={32} />
          <Rect x={MIDDLE_X - 65} y={252} w={130} h={24} />
        </>
      )}

      <Rect x={MIDDLE_X - 65} y={290} w={130} h={14} opacity={0.7} />
      <Rect x={MIDDLE_X - 65} y={312} w={130} h={14} opacity={0.55} />
      <Rect x={MIDDLE_X - 65} y={334} w={130} h={14} opacity={0.4} />

      <motion.rect
        animate={{
          x:
            state.dock === "mini"
              ? MIDDLE_X - 45
              : state.dock === "fixed"
              ? MIDDLE_X - 55
              : MIDDLE_X - 65,
          width: state.dock === "mini" ? 90 : state.dock === "fixed" ? 110 : 130,
        }}
        y={385}
        height={30}
        rx={15}
        fill="#111111"
        stroke="rgba(255,255,255,0.15)"
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      />
      <circle cx={MIDDLE_X - 30} cy={400} r={3} fill="rgba(255,255,255,0.4)" />
      <circle cx={MIDDLE_X} cy={400} r={3} fill="rgba(255,255,255,0.4)" />
      <circle cx={MIDDLE_X + 30} cy={400} r={3} fill="rgba(255,255,255,0.4)" />
    </g>
  );
}

function RightPanel({ state }: { state: State }) {
  const left = RIGHT_LEFT;
  const w = RIGHT_RIGHT - left;
  return (
    <g>
      <rect x={left} y={80} width={w} height={34} rx={17} fill="#111" stroke="rgba(255,255,255,0.1)" />
      <circle cx={left + 18} cy={97} r={4.5} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} />

      <motion.rect
        animate={{
          x: state.sidebar ? left + 56 : left + 14,
          width: state.sidebar ? w - 70 : w - 28,
        }}
        y={140}
        height={260}
        rx={14}
        fill="rgba(255,255,255,0.02)"
        stroke="rgba(255,255,255,0.08)"
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      />

      <motion.rect
        animate={{ opacity: state.sidebar ? 1 : 0 }}
        x={left + 14}
        y={140}
        width={36}
        height={260}
        rx={10}
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.08)"
        transition={{ duration: 0.4 }}
      />
      {state.sidebar &&
        [0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={left + 24}
            y={156 + i * 28}
            width={16}
            height={16}
            rx={4}
            fill="rgba(255,255,255,0.08)"
          />
        ))}

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.rect
          key={i}
          animate={{
            x: state.sidebar ? left + 70 : left + 28,
            width: state.sidebar ? w - 98 : w - 56,
          }}
          y={160 + i * 36}
          height={22}
          rx={6}
          fill="rgba(255,255,255,0.05)"
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        />
      ))}
    </g>
  );
}

function Rect({
  x,
  y,
  w,
  h,
  opacity = 1,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  opacity?: number;
}) {
  return (
    <motion.rect
      initial={false}
      animate={{ x, y, width: w, height: h, opacity }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      rx={8}
      fill="rgba(255,255,255,0.07)"
    />
  );
}

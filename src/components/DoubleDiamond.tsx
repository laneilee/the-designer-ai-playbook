import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { phaseColors } from "@/data/phaseColors";
import { type Phase } from "@/data/methods";
import { Sparkles, User } from "lucide-react";

type Mode = "traditional" | "ai";

const diamondPhases: { phase: Phase; label: string; column: string }[] = [
  { phase: "Align", label: "Align", column: "Start" },
  { phase: "Discovery", label: "Discovery", column: "Diverge" },
  { phase: "Define", label: "Define", column: "Converge" },
  { phase: "Design", label: "Design", column: "Diverge" },
  { phase: "Validate", label: "Validate", column: "Converge" },
  { phase: "Handoff", label: "Handoff", column: "Deliver" },
];

const traditionalDesc: Record<Phase, string> = {
  Align: "Lengthy alignment meetings, stakeholder presentations, and manual prioritization exercises.",
  Discovery: "Weeks of field research, interviews, and observation to understand the problem space broadly.",
  Define: "Manual synthesis — sticky notes, affinity mapping, and problem framing over days of workshops.",
  Design: "Days to weeks building wireframes and prototypes by hand in design tools.",
  Validate: "Recruiting participants, scheduling sessions, manually analyzing hours of recordings.",
  Handoff: "Lengthy handoff documents, spec reviews, and back-and-forth with engineering.",
};

const aiDesc: Record<Phase, string> = {
  Align: "AI helps generate prioritization frameworks, analyze OKR alignment, and surface strategic opportunities faster.",
  Discovery: "AI transcribes interviews in real-time, analyzes data at scale, and surfaces patterns humans miss.",
  Define: "LLMs synthesize research into insights, problem frames, and success metrics in minutes — you curate and refine.",
  Design: "AI-powered tools generate interactive prototypes from descriptions — test ideas in hours, not weeks.",
  Validate: "Automated transcription, AI-powered analysis of testing sessions, and instant usability reports.",
  Handoff: "AI drafts specs, generates QA checklists, and keeps design-dev handoff tight and comprehensive.",
};

export default function DoubleDiamond() {
  const [mode, setMode] = useState<Mode>("ai");
  const [hoveredPhase, setHoveredPhase] = useState<Phase | null>(null);

  return (
    <div className="rounded-2xl border border-border bg-card/60 overflow-hidden">
      {/* Header with toggle */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
        <div>
          <h3 className="text-lg font-display text-foreground">The Design Process — Reimagined</h3>
          <p className="text-xs text-muted-foreground font-body mt-0.5">
            How AI transforms each phase of the design process
          </p>
        </div>
        <div className="flex items-center bg-background rounded-xl p-1 border border-border">
          <button
            onClick={() => setMode("traditional")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all ${
              mode === "traditional"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground/50 hover:text-muted-foreground"
            }`}
          >
            <User className="w-3 h-3" />
            Traditional
          </button>
          <button
            onClick={() => setMode("ai")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all ${
              mode === "ai"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground/50 hover:text-muted-foreground"
            }`}
          >
            <Sparkles className="w-3 h-3" />
            AI-Enhanced
          </button>
        </div>
      </div>

      {/* Phase visualization */}
      <div className="px-5 sm:px-6 py-6">
        {/* Double Diamond SVG */}
        <div className="relative mb-6">
          <svg viewBox="0 0 920 220" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Gradient for diamond 1 */}
              <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={phaseColors.Discovery.accent} stopOpacity={mode === "ai" ? 0.2 : 0.06} />
                <stop offset="100%" stopColor={phaseColors.Define.accent} stopOpacity={mode === "ai" ? 0.12 : 0.03} />
              </linearGradient>
              {/* Gradient for diamond 2 */}
              <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={phaseColors.Design.accent} stopOpacity={mode === "ai" ? 0.2 : 0.06} />
                <stop offset="100%" stopColor={phaseColors.Validate.accent} stopOpacity={mode === "ai" ? 0.12 : 0.03} />
              </linearGradient>
              {/* Glow filter for AI mode */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Subtle shadow */}
              <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="6" floodOpacity="0.08" />
              </filter>
            </defs>

            {/* Background connecting line */}
            <line x1="60" y1="110" x2="860" y2="110" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

            {/* Diamond 1: Align → Discovery → Define */}
            <motion.path
              d="M 60,110 C 60,110 140,30 260,30 C 380,30 460,110 460,110 C 460,110 380,190 260,190 C 140,190 60,110 60,110 Z"
              fill="url(#grad1)"
              stroke={phaseColors.Discovery.accent}
              strokeWidth="1.5"
              strokeOpacity={0.25}
              filter="shadow"
              animate={{ strokeOpacity: mode === "ai" ? 0.4 : 0.15 }}
              transition={{ duration: 0.5 }}
            />
            {/* Diamond 2: Define → Design → Validate */}
            <motion.path
              d="M 460,110 C 460,110 540,30 660,30 C 780,30 860,110 860,110 C 860,110 780,190 660,190 C 540,190 460,110 460,110 Z"
              fill="url(#grad2)"
              stroke={phaseColors.Design.accent}
              strokeWidth="1.5"
              strokeOpacity={0.25}
              filter="shadow"
              animate={{ strokeOpacity: mode === "ai" ? 0.4 : 0.15 }}
              transition={{ duration: 0.5 }}
            />

            {/* Inner diamond lines for depth */}
            <motion.path
              d="M 90,110 C 90,110 155,52 260,52 C 365,52 430,110 430,110 C 430,110 365,168 260,168 C 155,168 90,110 90,110 Z"
              fill="none"
              stroke={phaseColors.Discovery.accent}
              strokeWidth="0.5"
              strokeOpacity={0.12}
              strokeDasharray="2 4"
            />
            <motion.path
              d="M 490,110 C 490,110 555,52 660,52 C 765,52 830,110 830,110 C 830,110 765,168 660,168 C 555,168 490,110 490,110 Z"
              fill="none"
              stroke={phaseColors.Design.accent}
              strokeWidth="0.5"
              strokeOpacity={0.12}
              strokeDasharray="2 4"
            />

            {/* Phase position markers */}
            {/* Align — left start */}
            <circle cx="60" cy="110" r="6" fill="hsl(var(--background))" stroke={phaseColors.Align.accent} strokeWidth="2" />
            <circle cx="60" cy="110" r="2.5" fill={phaseColors.Align.accent} />

            {/* Discovery — top of diamond 1 */}
            <circle cx="260" cy="30" r="6" fill="hsl(var(--background))" stroke={phaseColors.Discovery.accent} strokeWidth="2" />
            <circle cx="260" cy="30" r="2.5" fill={phaseColors.Discovery.accent} />

            {/* Define — center junction */}
            <circle cx="460" cy="110" r="8" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" strokeOpacity="0.2" />
            <circle cx="460" cy="110" r="3.5" fill={phaseColors.Define.accent} />

            {/* Design — top of diamond 2 */}
            <circle cx="660" cy="30" r="6" fill="hsl(var(--background))" stroke={phaseColors.Design.accent} strokeWidth="2" />
            <circle cx="660" cy="30" r="2.5" fill={phaseColors.Design.accent} />

            {/* Validate — right end */}
            <circle cx="860" cy="110" r="6" fill="hsl(var(--background))" stroke={phaseColors.Validate.accent} strokeWidth="2" />
            <circle cx="860" cy="110" r="2.5" fill={phaseColors.Validate.accent} />

            {/* Handoff — extending beyond with arrow */}
            <line x1="860" y1="110" x2="910" y2="110" stroke={phaseColors.Handoff.accent} strokeWidth="2" strokeOpacity="0.4" />
            <polygon points="908,105 920,110 908,115" fill={phaseColors.Handoff.accent} opacity="0.5" />

            {/* Phase labels */}
            <text x="60" y="136" textAnchor="middle" fontSize="11" fontFamily="var(--font-body)" fontWeight="600" fill={phaseColors.Align.accent}>Align</text>
            <text x="60" y="150" textAnchor="middle" fontSize="9" fontFamily="var(--font-body)" className="fill-muted-foreground/40">Start</text>

            <text x="260" y="18" textAnchor="middle" fontSize="11" fontFamily="var(--font-body)" fontWeight="600" fill={phaseColors.Discovery.accent}>Discovery</text>
            <text x="260" y="196" textAnchor="middle" fontSize="9" fontFamily="var(--font-body)" className="fill-muted-foreground/40">Diverge</text>

            <text x="460" y="136" textAnchor="middle" fontSize="11" fontFamily="var(--font-body)" fontWeight="600" fill={phaseColors.Define.accent}>Define</text>
            <text x="460" y="150" textAnchor="middle" fontSize="9" fontFamily="var(--font-body)" className="fill-muted-foreground/40">Converge</text>

            <text x="660" y="18" textAnchor="middle" fontSize="11" fontFamily="var(--font-body)" fontWeight="600" fill={phaseColors.Design.accent}>Design</text>
            <text x="660" y="196" textAnchor="middle" fontSize="9" fontFamily="var(--font-body)" className="fill-muted-foreground/40">Diverge</text>

            <text x="860" y="136" textAnchor="middle" fontSize="11" fontFamily="var(--font-body)" fontWeight="600" fill={phaseColors.Validate.accent}>Validate</text>
            <text x="860" y="150" textAnchor="middle" fontSize="9" fontFamily="var(--font-body)" className="fill-muted-foreground/40">Converge</text>

            {/* Handoff label */}
            <text x="910" y="130" textAnchor="middle" fontSize="10" fontFamily="var(--font-body)" fontWeight="500" fill={phaseColors.Handoff.accent} opacity="0.7">Handoff</text>

            {/* AI sparkle indicators along the diamond curves */}
            <AnimatePresence>
              {mode === "ai" && (
                <>
                  {[
                    { x: 160, y: 65, c: phaseColors.Discovery.accent },
                    { x: 360, y: 65, c: phaseColors.Define.accent },
                    { x: 560, y: 65, c: phaseColors.Design.accent },
                    { x: 760, y: 65, c: phaseColors.Validate.accent },
                    { x: 260, y: 180, c: phaseColors.Discovery.accent },
                    { x: 660, y: 180, c: phaseColors.Design.accent },
                  ].map(({ x, y, c }, i) => (
                    <motion.circle
                      key={`${x}-${y}`}
                      cx={x}
                      cy={y}
                      r="2.5"
                      fill={c}
                      filter="url(#glow)"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.6, 1.3, 0.6] }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </svg>
        </div>

        {/* Phase cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {diamondPhases.map(({ phase, label }) => {
            const colors = phaseColors[phase];
            const isHovered = hoveredPhase === phase;
            return (
              <motion.div
                key={phase}
                onMouseEnter={() => setHoveredPhase(phase)}
                onMouseLeave={() => setHoveredPhase(null)}
                className="relative rounded-xl p-3 border cursor-default transition-all"
                style={{
                  borderColor: isHovered ? colors.accentBorder : "hsl(var(--border))",
                  background: isHovered ? colors.gradient : "transparent",
                }}
                layout
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: colors.accent }}
                  />
                  <span className="text-[10px] font-body font-semibold uppercase tracking-wider" style={{ color: colors.accent }}>
                    {label}
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={mode}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="text-[11px] text-foreground/70 font-body leading-relaxed"
                  >
                    {mode === "ai" ? aiDesc[phase] : traditionalDesc[phase]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom summary */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-4 px-4 py-3 rounded-xl bg-foreground/[0.03] border border-foreground/[0.05]"
          >
            <p className="text-xs text-foreground/70 font-body leading-relaxed text-center">
              {mode === "ai" ? (
                <>
                  <span className="font-medium text-foreground/80">AI amplifies every phase</span> — from research synthesis to prototype generation. The designer's role shifts from execution to curation, judgment, and strategic decision-making.
                </>
              ) : (
                <>
                  <span className="font-medium text-foreground/80">The traditional process is thorough but slow</span> — each phase relies heavily on manual effort, co-located workshops, and sequential handoffs.
                </>
              )}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

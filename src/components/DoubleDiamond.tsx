import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { phaseColors } from "@/data/phaseColors";
import { type Phase } from "@/data/methods";
import { Sparkles, User } from "lucide-react";

type Mode = "traditional" | "ai";

const diamondPhases: { phase: Phase; label: string; column: string }[] = [
  { phase: "Discover", label: "Discover", column: "Diverge" },
  { phase: "Define", label: "Define", column: "Converge" },
  { phase: "Ideate", label: "Ideate", column: "Diverge" },
  { phase: "Prototype", label: "Prototype", column: "Converge" },
  { phase: "Validate", label: "Validate", column: "Converge" },
  { phase: "Align", label: "Align", column: "Converge" },
];

const traditionalDesc: Record<Phase, string> = {
  Discover: "Weeks of field research, interviews, and observation to understand the problem space broadly.",
  Define: "Manual synthesis — sticky notes, affinity mapping, persona creation over days of workshops.",
  Ideate: "Brainstorms, sketching sessions, design studios — all requiring co-located team time.",
  Prototype: "Days to weeks building wireframes and prototypes by hand in design tools.",
  Validate: "Recruiting participants, scheduling sessions, manually analyzing hours of recordings.",
  Align: "Lengthy handoff documents, stakeholder presentations, and alignment meetings.",
};

const aiDesc: Record<Phase, string> = {
  Discover: "AI transcribes interviews in real-time, analyzes survey data at scale, and surfaces patterns humans miss.",
  Define: "LLMs synthesize research into personas, problem frames, and HMW questions in minutes — you curate and refine.",
  Ideate: "AI generates concept variations, challenges assumptions, and explores the solution space beyond human cognitive limits.",
  Prototype: "AI-powered tools generate interactive prototypes from descriptions — test ideas in hours, not weeks.",
  Validate: "Automated transcription, AI-powered analysis of usability sessions, and instant heuristic evaluations.",
  Align: "AI drafts specs, generates QA checklists, and keeps design-dev handoff tight and comprehensive.",
};

export default function DoubleDiamond() {
  const [mode, setMode] = useState<Mode>("ai");
  const [hoveredPhase, setHoveredPhase] = useState<Phase | null>(null);

  return (
    <div className="rounded-2xl border border-border bg-card/60 overflow-hidden">
      {/* Header with toggle */}
      <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border">
        <div>
          <h3 className="text-base font-display text-foreground">The Double Diamond — Reimagined</h3>
          <p className="text-[11px] text-muted-foreground/50 font-body mt-0.5">
            How AI transforms each phase of the design process
          </p>
        </div>
        <div className="flex items-center bg-background rounded-xl p-1 border border-border">
          <button
            onClick={() => setMode("traditional")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-body font-medium transition-all ${
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-body font-medium transition-all ${
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

      {/* Diamond visualization */}
      <div className="px-5 sm:px-6 py-6">
        {/* Diamond shape — SVG */}
        <div className="relative mb-6">
          <svg viewBox="0 0 800 180" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            {/* Diamond 1: Discover + Define */}
            <motion.path
              d="M 30,90 L 210,20 L 390,90 L 210,160 Z"
              fill={`${phaseColors.Discover.accent}${mode === "ai" ? "18" : "0a"}`}
              stroke={phaseColors.Discover.accent}
              strokeWidth="1.5"
              strokeOpacity={0.3}
              animate={{ fillOpacity: mode === "ai" ? 0.15 : 0.05 }}
              transition={{ duration: 0.5 }}
            />
            {/* Diamond 2: Ideate + Prototype */}
            <motion.path
              d="M 390,90 L 570,20 L 770,90 L 570,160 Z"
              fill={`${phaseColors.Ideate.accent}${mode === "ai" ? "18" : "0a"}`}
              stroke={phaseColors.Ideate.accent}
              strokeWidth="1.5"
              strokeOpacity={0.3}
              animate={{ fillOpacity: mode === "ai" ? 0.15 : 0.05 }}
              transition={{ duration: 0.5 }}
            />

            {/* Phase labels on diamond */}
            <text x="130" y="88" textAnchor="middle" className="fill-foreground/70" fontSize="11" fontFamily="var(--font-body)" fontWeight="500">Discover</text>
            <text x="300" y="88" textAnchor="middle" className="fill-foreground/70" fontSize="11" fontFamily="var(--font-body)" fontWeight="500">Define</text>
            <text x="480" y="88" textAnchor="middle" className="fill-foreground/70" fontSize="11" fontFamily="var(--font-body)" fontWeight="500">Ideate</text>
            <text x="640" y="88" textAnchor="middle" className="fill-foreground/70" fontSize="11" fontFamily="var(--font-body)" fontWeight="500">Prototype</text>

            {/* Diverge/Converge labels */}
            <text x="130" y="105" textAnchor="middle" className="fill-muted-foreground/30" fontSize="9" fontFamily="var(--font-body)">Diverge</text>
            <text x="300" y="105" textAnchor="middle" className="fill-muted-foreground/30" fontSize="9" fontFamily="var(--font-body)">Converge</text>
            <text x="480" y="105" textAnchor="middle" className="fill-muted-foreground/30" fontSize="9" fontFamily="var(--font-body)">Diverge</text>
            <text x="640" y="105" textAnchor="middle" className="fill-muted-foreground/30" fontSize="9" fontFamily="var(--font-body)">Converge</text>

            {/* AI sparkle indicators */}
            <AnimatePresence>
              {mode === "ai" && (
                <>
                  {[120, 290, 470, 630].map((x, i) => (
                    <motion.circle
                      key={x}
                      cx={x}
                      cy={62}
                      r="3"
                      fill={i < 2 ? phaseColors.Discover.accent : phaseColors.Ideate.accent}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Center dots at meeting points */}
            <circle cx="30" cy="90" r="4" className="fill-muted-foreground/20" />
            <circle cx="390" cy="90" r="5" className="fill-foreground/30" />
            <circle cx="770" cy="90" r="4" className="fill-muted-foreground/20" />
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
                    className="text-[11px] text-foreground/60 font-body leading-relaxed"
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
            className="mt-5 px-4 py-3 rounded-xl bg-foreground/[0.03] border border-foreground/[0.05]"
          >
            <p className="text-[12px] text-foreground/60 font-body leading-relaxed text-center">
              {mode === "ai" ? (
                <>
                  <span className="font-medium text-foreground/80">AI amplifies every phase</span> — from research synthesis to prototype generation. The designer's role shifts from execution to curation, judgment, and strategic decision-making.
                </>
              ) : (
                <>
                  <span className="font-medium text-foreground/80">The traditional process is thorough but slow</span> — each phase relies heavily on manual effort, co-located workshops, and sequential handoffs. Quality depends on the designer's available time.
                </>
              )}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

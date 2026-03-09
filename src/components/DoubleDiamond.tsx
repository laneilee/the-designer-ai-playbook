import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { phaseColors } from "@/data/phaseColors";
import { type Phase } from "@/data/methods";
import { Sparkles, User } from "lucide-react";

type Mode = "traditional" | "ai";

const diamondPhases: { phase: Phase; label: string; column: string }[] = [
  { phase: "Align", label: "Align", column: "Converge" },
  { phase: "Discovery", label: "Discovery", column: "Diverge" },
  { phase: "Define", label: "Define", column: "Converge" },
  { phase: "Design", label: "Design", column: "Diverge" },
  { phase: "Validate", label: "Validate", column: "Converge" },
  { phase: "Handoff", label: "Handoff", column: "Converge" },
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
        {/* Linear process flow */}
        <div className="relative mb-6">
          <svg viewBox="0 0 800 80" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            {/* Process line */}
            <line x1="30" y1="40" x2="770" y2="40" stroke="hsl(var(--border))" strokeWidth="2" />
            
            {/* Phase nodes */}
            {diamondPhases.map(({ phase, label }, i) => {
              const x = 30 + (i * 148);
              const colors = phaseColors[phase];
              return (
                <g key={phase}>
                  <motion.circle
                    cx={x}
                    cy={40}
                    r={12}
                    fill={`${colors.accent}${mode === "ai" ? "30" : "15"}`}
                    stroke={colors.accent}
                    strokeWidth="2"
                    animate={{ r: mode === "ai" ? 14 : 12 }}
                    transition={{ duration: 0.3 }}
                  />
                  <circle cx={x} cy={40} r={4} fill={colors.accent} />
                  <text x={x} y={20} textAnchor="middle" className="fill-foreground/80" fontSize="11" fontFamily="var(--font-body)" fontWeight="500">
                    {label}
                  </text>
                  <text x={x} y={65} textAnchor="middle" className="fill-muted-foreground/50" fontSize="9" fontFamily="var(--font-body)">
                    {diamondPhases[i].column}
                  </text>
                  {/* AI sparkle */}
                  <AnimatePresence>
                    {mode === "ai" && (
                      <motion.circle
                        cx={x + 10}
                        cy={28}
                        r="2.5"
                        fill={colors.accent}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </g>
              );
            })}
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
                  <span className="text-xs font-body font-semibold uppercase tracking-wider" style={{ color: colors.accent }}>
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
                    className="text-xs text-foreground/70 font-body leading-relaxed"
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
            <p className="text-sm text-foreground/70 font-body leading-relaxed text-center">
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

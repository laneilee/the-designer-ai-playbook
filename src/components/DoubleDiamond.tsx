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
        {/* Double Diamond SVG */}
        <div className="relative mb-6">
          <svg viewBox="0 0 900 200" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
            {/* Diamond 1: Align → Discovery → Define */}
            <motion.path
              d="M 50,100 L 250,25 L 450,100 L 250,175 Z"
              fill={`${phaseColors.Discovery.accent}${mode === "ai" ? "18" : "0a"}`}
              stroke={phaseColors.Discovery.accent}
              strokeWidth="1.5"
              strokeOpacity={0.3}
              animate={{ fillOpacity: mode === "ai" ? 0.15 : 0.05 }}
              transition={{ duration: 0.5 }}
            />
            {/* Diamond 2: Define → Design → Validate → Handoff */}
            <motion.path
              d="M 450,100 L 650,25 L 850,100 L 650,175 Z"
              fill={`${phaseColors.Design.accent}${mode === "ai" ? "18" : "0a"}`}
              stroke={phaseColors.Design.accent}
              strokeWidth="1.5"
              strokeOpacity={0.3}
              animate={{ fillOpacity: mode === "ai" ? 0.15 : 0.05 }}
              transition={{ duration: 0.5 }}
            />

            {/* Phase labels on diamond */}
            <text x="50" y="96" textAnchor="middle" className="fill-foreground/80" fontSize="12" fontFamily="var(--font-body)" fontWeight="500">Align</text>
            <text x="50" y="112" textAnchor="middle" className="fill-muted-foreground/40" fontSize="10" fontFamily="var(--font-body)">Start</text>

            <text x="250" y="96" textAnchor="middle" className="fill-foreground/80" fontSize="12" fontFamily="var(--font-body)" fontWeight="500">Discovery</text>
            <text x="250" y="112" textAnchor="middle" className="fill-muted-foreground/40" fontSize="10" fontFamily="var(--font-body)">Diverge</text>

            <text x="450" y="96" textAnchor="middle" className="fill-foreground/80" fontSize="12" fontFamily="var(--font-body)" fontWeight="500">Define</text>
            <text x="450" y="112" textAnchor="middle" className="fill-muted-foreground/40" fontSize="10" fontFamily="var(--font-body)">Converge</text>

            <text x="650" y="96" textAnchor="middle" className="fill-foreground/80" fontSize="12" fontFamily="var(--font-body)" fontWeight="500">Design</text>
            <text x="650" y="112" textAnchor="middle" className="fill-muted-foreground/40" fontSize="10" fontFamily="var(--font-body)">Diverge</text>

            <text x="850" y="96" textAnchor="middle" className="fill-foreground/80" fontSize="12" fontFamily="var(--font-body)" fontWeight="500">Validate</text>
            <text x="850" y="112" textAnchor="middle" className="fill-muted-foreground/40" fontSize="10" fontFamily="var(--font-body)">Converge</text>

            {/* Handoff label below second diamond */}
            <text x="750" y="186" textAnchor="middle" className="fill-foreground/60" fontSize="11" fontFamily="var(--font-body)" fontWeight="500">→ Handoff</text>

            {/* AI sparkle indicators */}
            <AnimatePresence>
              {mode === "ai" && (
                <>
                  {[{ x: 150, c: phaseColors.Discovery.accent }, { x: 350, c: phaseColors.Define.accent }, { x: 550, c: phaseColors.Design.accent }, { x: 750, c: phaseColors.Validate.accent }].map(({ x, c }, i) => (
                    <motion.circle
                      key={x}
                      cx={x}
                      cy={55}
                      r="3"
                      fill={c}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>

            {/* Junction dots */}
            <circle cx="50" cy="100" r="4" className="fill-muted-foreground/20" />
            <circle cx="450" cy="100" r="5" className="fill-foreground/30" />
            <circle cx="850" cy="100" r="4" className="fill-muted-foreground/20" />
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

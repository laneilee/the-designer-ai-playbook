import { useState } from "react";
import { type Method } from "@/data/methods";
import { phaseColors } from "@/data/phaseColors";
import { motion } from "framer-motion";
import {
  Bot, ExternalLink, Clock, Zap, Users,
  ChevronDown, CheckCircle2, Wrench,
} from "lucide-react";
import ToolLogo from "@/components/ToolLogo";

interface MethodDetailProps {
  method: Method;
  onMethodClick?: (id: string) => void;
}

const effortConfig: Record<string, { color: string; bg: string; label: string }> = {
  Low: { color: "hsl(150, 50%, 40%)", bg: "hsl(150 50% 40% / 0.1)", label: "Low effort" },
  Medium: { color: "hsl(38, 70%, 45%)", bg: "hsl(38 70% 45% / 0.1)", label: "Medium effort" },
  High: { color: "hsl(0, 60%, 50%)", bg: "hsl(0 60% 50% / 0.1)", label: "High effort" },
};

export default function MethodDetail({ method, onMethodClick }: MethodDetailProps) {
  const colors = phaseColors[method.phase];
  const effort = effortConfig[method.effort];
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="max-w-3xl px-6 sm:px-8 lg:px-12 py-8 lg:py-10">
      {/* Phase pill + context */}
      <div className="flex items-center gap-2.5 mb-5 flex-wrap">
        <span
          className="text-xs font-body font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
          style={{ background: colors.accentBg, color: colors.accent, border: `1px solid ${colors.accentBorder}` }}
        >
          {method.phase}
        </span>
        {method.context.map((ctx) => (
          <span
            key={ctx}
            className="text-xs px-2 py-0.5 rounded-full bg-foreground/5 text-muted-foreground font-body border border-foreground/5"
          >
            {ctx}
          </span>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-3xl lg:text-4xl font-display text-foreground leading-tight mb-4">
        {method.title}
      </h2>

      {/* Meta bar */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="flex items-center gap-1.5 text-xs font-body font-medium px-2.5 py-1 rounded-lg"
          style={{ background: effort.bg, color: effort.color }}
        >
          <Zap className="w-3.5 h-3.5" />
          {effort.label}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-body text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          {method.timeEstimate}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-body text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          {method.context.join(", ")}
        </div>
      </div>

      {/* Description */}
      <p className="text-base leading-[1.8] text-foreground/80 font-body mb-8">
        {method.description}
      </p>

      {/* When to use — callout card */}
      <div
        className="rounded-xl p-5 mb-10 border"
        style={{ background: colors.gradient, borderColor: colors.accentBorder }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: colors.accent }}
          />
          <span className="text-xs font-body font-semibold uppercase tracking-widest" style={{ color: colors.accent }}>
            When to use this
          </span>
        </div>
        <p className="text-[15px] text-foreground/80 font-body leading-relaxed">
          {method.whenToUse}
        </p>
      </div>

      {/* Step-by-step — interactive */}
      <div className="mb-10">
        <SectionLabel>Step-by-Step Guide</SectionLabel>
        <div className="space-y-1">
          {method.steps.map((step, i) => (
            <motion.button
              key={i}
              onClick={() => setExpandedStep(expandedStep === i ? null : i)}
              className="w-full text-left group"
              whileTap={{ scale: 0.995 }}
            >
              <div className={`flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                expandedStep === i ? "bg-foreground/[0.04]" : "hover:bg-foreground/[0.02]"
              }`}>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-display transition-colors"
                  style={{
                    background: expandedStep === i ? colors.accent : colors.accentBg,
                    color: expandedStep === i ? "white" : colors.accent,
                  }}
                >
                  {i + 1}
                </div>
                <span className={`text-sm font-body leading-relaxed flex-1 transition-colors ${
                  expandedStep === i ? "text-foreground" : "text-foreground/70"
                }`}>
                  {step}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-muted-foreground/30 shrink-0 mt-1 transition-transform ${
                    expandedStep === i ? "rotate-180" : ""
                  }`}
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Artifacts */}
      <div className="mb-10">
        <SectionLabel>Example Artifacts</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {method.artifacts.map((artifact, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-foreground/[0.02] border border-foreground/[0.04]"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: colors.accent }} />
              <span className="text-sm text-foreground/80 font-body leading-relaxed">{artifact}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tools — two columns */}
      <div className="mb-10">
        <SectionLabel>Tools</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ToolColumn label="AI-Powered" icon={<Bot className="w-3 h-3 text-clay" />} tools={method.aiTools} />
          <ToolColumn label="Traditional" icon={<Wrench className="w-3 h-3 text-muted-foreground" />} tools={method.traditionalTools} />
        </div>
      </div>


      {/* External resources */}
      {method.resources.length > 0 && (
        <div className="mb-8">
          <SectionLabel>External Resources</SectionLabel>
          <div className="space-y-2">
            {method.resources.map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] text-foreground/60 hover:text-clay font-body transition-colors group"
              >
                <ExternalLink className="w-3.5 h-3.5 group-hover:text-clay transition-colors" />
                {r.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">
      {children}
    </h3>
  );
}

function ToolColumn({ label, icon, tools }: { label: string; icon: React.ReactNode; tools: Method["aiTools"] }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-3">
        {icon}
        <span className="text-xs font-body font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <div className="space-y-2">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border/50 hover:border-border transition-colors"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-accent">
              <ToolLogo name={tool.name} type={tool.type} size="md" />
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-medium text-foreground font-body">{tool.name}</div>
              <div className="text-[11px] text-muted-foreground/60 leading-relaxed font-body mt-0.5">{tool.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

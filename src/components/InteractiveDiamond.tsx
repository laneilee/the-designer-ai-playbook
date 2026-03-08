import { useState, useRef, useEffect } from "react";
import { methods, type Method } from "@/data/methods";
import ToolLogo from "@/components/ToolLogo";
import { Bot, User, X, ArrowRight } from "lucide-react";

type Phase = "discover" | "define" | "develop" | "deliver";

const phaseConfig: Record<
  Phase,
  {
    label: string;
    categories: string[];
    aiLabel: string;
    aiDesc: string;
    traditional: string[];
    color: string;
    colorFill: string;
    colorStroke: string;
  }
> = {
  discover: {
    label: "Discover",
    categories: ["Discovery"],
    aiLabel: "AI Research Synthesis",
    aiDesc: "ChatGPT + Claude analyze transcripts, surface patterns from large datasets, and cross-reference multiple research sources.",
    traditional: ["Interviews", "Surveys", "Field Studies"],
    color: "hsl(200 98% 39%)",
    colorFill: "hsl(200 98% 39% / 0.15)",
    colorStroke: "hsl(200 98% 39% / 0.6)",
  },
  define: {
    label: "Define",
    categories: ["Ideation"],
    aiLabel: "AI Pattern Detection",
    aiDesc: "Auto-cluster insights, generate HMW statements, and synthesize research into actionable frameworks.",
    traditional: ["Affinity Maps", "Personas", "Journey Maps"],
    color: "hsl(200 98% 39%)",
    colorFill: "hsl(200 98% 39% / 0.15)",
    colorStroke: "hsl(200 98% 39% / 0.6)",
  },
  develop: {
    label: "Develop",
    categories: ["Testing", "Design"],
    aiLabel: "AI Rapid Prototyping",
    aiDesc: "Lovable + v0 generate functional prototypes from descriptions. AI assists with asset generation and accessibility audits.",
    traditional: ["Sketches", "Wireframes", "Usability Tests"],
    color: "hsl(28 60% 55%)",
    colorFill: "hsl(28 60% 55% / 0.15)",
    colorStroke: "hsl(28 60% 55% / 0.6)",
  },
  deliver: {
    label: "Deliver",
    categories: ["Handoff"],
    aiLabel: "AI Quality Assurance",
    aiDesc: "Auto-generate component docs, design specs, and post-launch analytics reports with AI assistance.",
    traditional: ["Handoff Docs", "Redlines", "QA"],
    color: "hsl(28 60% 55%)",
    colorFill: "hsl(28 60% 55% / 0.15)",
    colorStroke: "hsl(28 60% 55% / 0.6)",
  },
};

const phases: Phase[] = ["discover", "define", "develop", "deliver"];

function getMethodsForPhase(phase: Phase): Method[] {
  const cats = phaseConfig[phase].categories;
  return methods.filter((m) => cats.includes(m.category));
}

function getAllToolsForPhase(phase: Phase) {
  const phaseMethods = getMethodsForPhase(phase);
  const toolMap = new Map<string, { name: string; type: "ai" | "traditional"; count: number }>();
  phaseMethods.forEach((m) => {
    [...m.aiTools, ...m.traditionalTools].forEach((t) => {
      const existing = toolMap.get(t.name);
      if (existing) {
        existing.count++;
      } else {
        toolMap.set(t.name, { name: t.name, type: t.type, count: 1 });
      }
    });
  });
  return Array.from(toolMap.values()).sort((a, b) => b.count - a.count);
}

interface DiamondPhaseProps {
  phase: Phase;
  index: number;
  isActive: boolean;
  isAnyActive: boolean;
  onClick: () => void;
}

function DiamondPhase({ phase, index, isActive, isAnyActive, onClick }: DiamondPhaseProps) {
  const config = phaseConfig[phase];
  const dimmed = isAnyActive && !isActive;

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center transition-all duration-300 ${
        dimmed ? "opacity-30 scale-95" : "opacity-100 scale-100"
      } ${isActive ? "scale-105" : ""}`}
      style={{ flex: 1 }}
    >
      {/* Diamond shape */}
      <svg viewBox="0 0 200 120" className="w-full" fill="none">
        {/* Traditional (top, muted) */}
        <polygon
          points="0,60 100,15 200,60"
          fill="hsl(215 20% 65% / 0.06)"
          stroke={isActive ? config.colorStroke : "hsl(215 20% 65% / 0.2)"}
          strokeWidth={isActive ? 2 : 1}
          className="transition-all duration-300"
        />
        {/* AI-enhanced (bottom, vibrant) */}
        <polygon
          points="0,60 100,105 200,60"
          fill={isActive ? config.colorFill : "hsl(215 20% 65% / 0.04)"}
          stroke={isActive ? config.colorStroke : "hsl(215 20% 65% / 0.15)"}
          strokeWidth={isActive ? 2.5 : 1}
          className="transition-all duration-300"
        />
        {/* Center dot */}
        <circle
          cx="100"
          cy="60"
          r={isActive ? 5 : 3}
          fill={isActive ? config.color : "hsl(215 20% 65% / 0.3)"}
          className="transition-all duration-300"
        />
      </svg>

      {/* Phase number & label */}
      <div className="mt-1 text-center">
        <span
          className={`text-[10px] font-body block transition-colors duration-300 ${
            isActive ? "text-secondary-foreground" : "text-secondary-foreground/30"
          }`}
        >
          0{index + 1}
        </span>
        <span
          className={`text-xs sm:text-sm font-display block transition-colors duration-300 ${
            isActive ? "text-secondary-foreground" : "text-secondary-foreground/50"
          }`}
        >
          {config.label}
        </span>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full animate-fade-in"
          style={{ background: config.color }}
        />
      )}
    </button>
  );
}

interface Props {
  onMethodClick: (id: string) => void;
}

export default function InteractiveDiamond({ onMethodClick }: Props) {
  const [activePhase, setActivePhase] = useState<Phase | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const togglePhase = (phase: Phase) => {
    setActivePhase((prev) => (prev === phase ? null : phase));
  };

  useEffect(() => {
    if (activePhase && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activePhase]);

  const activeConfig = activePhase ? phaseConfig[activePhase] : null;
  const activeMethods = activePhase ? getMethodsForPhase(activePhase) : [];
  const activeTools = activePhase ? getAllToolsForPhase(activePhase) : [];

  return (
    <div className="px-4 sm:px-6 mb-12">
      <div className="max-w-4xl mx-auto rounded-2xl bg-secondary px-5 sm:px-8 py-8 sm:py-10 overflow-hidden">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-display text-secondary-foreground leading-tight">
              Design Thinking × AI
            </h2>
            <p className="text-xs sm:text-sm text-secondary-foreground/50 mt-1 font-body">
              Click each phase to explore its methods and tools
            </p>
          </div>
          {/* Legend dots */}
          <div className="hidden sm:flex items-center gap-3 shrink-0 mt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[hsl(215,20%,65%,0.3)]" />
              <span className="text-[10px] text-secondary-foreground/30 font-body">Traditional</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] text-secondary-foreground/50 font-body">AI-Enhanced</span>
            </div>
          </div>
        </div>

        {/* Diverge / Converge labels */}
        <div className="flex mb-0">
          {["Diverge", "Converge", "Diverge", "Converge"].map((label, i) => (
            <div key={i} className="flex-1 text-center">
              <span className="text-[9px] text-secondary-foreground/20 font-body uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Diamond phases row */}
        <div className="flex items-center -mx-1">
          {phases.map((phase, i) => (
            <DiamondPhase
              key={phase}
              phase={phase}
              index={i}
              isActive={activePhase === phase}
              isAnyActive={activePhase !== null}
              onClick={() => togglePhase(phase)}
            />
          ))}
        </div>

        {/* Connecting flow line */}
        <div className="flex items-center mx-8 -mt-1 mb-4">
          <div className="flex-1 h-px bg-secondary-foreground/10" />
          <ArrowRight className="w-3 h-3 text-secondary-foreground/15 mx-1" />
        </div>

        {/* Expanded detail panel */}
        <div
          ref={panelRef}
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            activePhase ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {activeConfig && activePhase && (
            <div className="rounded-xl border border-secondary-foreground/10 bg-secondary-foreground/5 p-5 sm:p-6 animate-fade-in">
              {/* Panel header */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: activeConfig.color }}
                    />
                    <h3 className="text-base sm:text-lg font-display text-secondary-foreground">
                      {activeConfig.label} Phase
                    </h3>
                  </div>
                  <p className="text-xs text-secondary-foreground/50 font-body leading-relaxed max-w-lg">
                    {activeConfig.aiDesc}
                  </p>
                </div>
                <button
                  onClick={() => setActivePhase(null)}
                  className="p-1 rounded-md hover:bg-secondary-foreground/10 transition-colors shrink-0"
                >
                  <X className="w-4 h-4 text-secondary-foreground/40" />
                </button>
              </div>

              {/* Two columns: Methods + Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Methods */}
                <div>
                  <h4 className="text-[10px] font-body font-medium uppercase tracking-widest text-secondary-foreground/30 mb-3">
                    Methods ({activeMethods.length})
                  </h4>
                  <div className="space-y-1.5">
                    {activeMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => onMethodClick(method.id)}
                        className="w-full text-left group flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-secondary-foreground/8 transition-colors"
                      >
                        {method.criticality === "ai-enhanced" ? (
                          <Bot className="w-3.5 h-3.5 text-primary shrink-0" />
                        ) : (
                          <User className="w-3.5 h-3.5 text-secondary-foreground/40 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <span className="text-xs sm:text-sm text-secondary-foreground font-body group-hover:text-primary transition-colors block truncate">
                            {method.title}
                          </span>
                          {method.criticality === "ai-enhanced" ? (
                            <span className="text-[9px] text-primary/60 font-body">AI-Enhanced</span>
                          ) : (
                            <span className="text-[9px] text-secondary-foreground/30 font-body">Human-Critical</span>
                          )}
                        </div>
                        <ArrowRight className="w-3 h-3 text-secondary-foreground/20 group-hover:text-primary/50 ml-auto shrink-0 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="text-[10px] font-body font-medium uppercase tracking-widest text-secondary-foreground/30 mb-3">
                    Tools Used ({activeTools.length})
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activeTools.slice(0, 8).map((tool) => (
                      <div
                        key={tool.name}
                        className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-secondary-foreground/5"
                      >
                        <ToolLogo name={tool.name} type={tool.type} size="sm" />
                        <div className="min-w-0">
                          <span className="text-[11px] text-secondary-foreground/80 font-body block truncate">
                            {tool.name}
                          </span>
                          <span className="text-[9px] text-secondary-foreground/30 font-body">
                            {tool.count} method{tool.count > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {activeTools.length > 8 && (
                    <p className="text-[10px] text-secondary-foreground/25 font-body mt-2 px-1">
                      +{activeTools.length - 8} more tools
                    </p>
                  )}
                </div>
              </div>

              {/* Traditional comparison */}
              <div className="mt-5 pt-4 border-t border-secondary-foreground/8">
                <h4 className="text-[10px] font-body font-medium uppercase tracking-widest text-secondary-foreground/20 mb-2">
                  Traditional approach at this stage
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeConfig.traditional.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-1 rounded-md bg-secondary-foreground/5 text-secondary-foreground/30 font-body line-through decoration-secondary-foreground/15"
                    >
                      {t}
                    </span>
                  ))}
                  <ArrowRight className="w-3 h-3 text-secondary-foreground/15 self-center mx-1" />
                  <span className="text-[10px] px-2 py-1 rounded-md text-primary/70 font-body font-medium" style={{ background: `${activeConfig.color}15` }}>
                    Now AI-augmented
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hint when nothing selected */}
        {!activePhase && (
          <p className="text-center text-[10px] text-secondary-foreground/20 font-body mt-2 animate-fade-in">
            AI reduces cycle time by 40-60% while maintaining human judgment at critical decision points
          </p>
        )}
      </div>
    </div>
  );
}

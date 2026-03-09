import { type Method } from "@/data/methods";
import { phaseColors } from "@/data/phaseColors";
import {
  Bot, ExternalLink, Clock, Zap, Users,
  CheckCircle2, Wrench, ArrowDown,
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

// Map step keywords to relevant tools
function getToolsForStep(step: string, allTools: Method["aiTools"], traditionalTools: Method["traditionalTools"]) {
  const combined = [
    ...allTools.map((t) => ({ ...t, kind: "ai" as const })),
    ...traditionalTools.map((t) => ({ ...t, kind: "traditional" as const })),
  ];
  const stepLower = step.toLowerCase();
  return combined.filter((tool) => {
    const toolLower = tool.name.toLowerCase();
    const descLower = tool.description.toLowerCase();
    // Match if the tool description references something in the step, or vice versa
    const stepWords = stepLower.split(/\s+/).filter((w) => w.length > 4);
    return stepWords.some((w) => descLower.includes(w)) || stepWords.some((w) => toolLower.includes(w));
  });
}

export default function MethodDetail({ method, onMethodClick }: MethodDetailProps) {
  const colors = phaseColors[method.phase];
  const effort = effortConfig[method.effort];

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

      {/* When to use */}
      <div
        className="rounded-xl p-5 mb-10 border"
        style={{ background: colors.gradient, borderColor: colors.accentBorder }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: colors.accent }} />
          <span className="text-xs font-body font-semibold uppercase tracking-widest" style={{ color: colors.accent }}>
            When to use this
          </span>
        </div>
        <p className="text-[15px] text-foreground/80 font-body leading-relaxed">
          {method.whenToUse}
        </p>
      </div>

      {/* Workflow diagram */}
      <div className="mb-10">
        <SectionLabel>Workflow</SectionLabel>
        <div className="relative">
          {method.steps.map((step, i) => {
            const stepTools = getToolsForStep(step, method.aiTools, method.traditionalTools);
            const isLast = i === method.steps.length - 1;

            return (
              <div key={i} className="relative">
                {/* Connector line */}
                {!isLast && (
                  <div className="absolute left-[15px] top-[40px] bottom-0 w-px" style={{ background: colors.accentBorder }} />
                )}

                <div className="flex gap-4 pb-2">
                  {/* Node */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-[11px] font-display font-medium"
                      style={{ background: colors.accentBg, color: colors.accent, border: `1px solid ${colors.accentBorder}` }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {/* Step content */}
                  <div className="flex-1 pb-5">
                    <p className="text-sm font-body text-foreground/80 leading-relaxed pt-1">
                      {step}
                    </p>

                    {/* Tools for this step */}
                    {stepTools.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {stepTools.map((tool) => (
                          <div
                            key={tool.name}
                            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-card border border-border/50 text-[11px] font-body text-muted-foreground"
                          >
                            <div className="w-4 h-4 rounded overflow-hidden shrink-0 flex items-center justify-center">
                              <ToolLogo name={tool.name} type={tool.type} size="sm" />
                            </div>
                            {tool.name}
                            {tool.kind === "ai" && <Bot className="w-2.5 h-2.5 text-clay/50" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Arrow between steps */}
                {!isLast && (
                  <div className="absolute left-[11px] bottom-[-2px] z-10">
                    <ArrowDown className="w-2 h-2" style={{ color: colors.accent + "60" }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Deliverables */}
      <div className="mb-10">
        <SectionLabel>Key Deliverables</SectionLabel>
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

      {/* All tools reference */}
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
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-clay font-body transition-colors group"
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
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-3">
        {icon}
        <span className="text-xs font-body font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
      </div>
      <div className="space-y-2">
        {tools.map((tool, idx) => (
          <div
            key={tool.name}
            className="rounded-xl bg-card border border-border/50 hover:border-border transition-colors overflow-hidden"
          >
            <div className="flex items-start gap-3 p-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-accent">
                <ToolLogo name={tool.name} type={tool.type} size="md" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground font-body">{tool.name}</div>
                <div className="text-xs text-muted-foreground leading-relaxed font-body mt-0.5">{tool.description}</div>
              </div>
            </div>
            {tool.promptGuide && (
              <div className="mx-3 mb-3 rounded-lg bg-foreground/[0.03] border border-foreground/[0.06] p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-body font-semibold uppercase tracking-widest text-muted-foreground/50">
                    Prompt guide
                  </span>
                  <button
                    onClick={() => handleCopy(tool.promptGuide!, idx)}
                    className="flex items-center gap-1 text-[10px] font-body text-muted-foreground/40 hover:text-foreground/60 transition-colors"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="w-3 h-3" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs font-body text-foreground/60 leading-relaxed">
                  {tool.promptGuide}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

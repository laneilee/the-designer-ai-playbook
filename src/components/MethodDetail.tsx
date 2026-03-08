import { type Method } from "@/data/methods";
import { Bot, ArrowRight, ExternalLink, Clock, Zap, Users, Link2 } from "lucide-react";
import ToolLogo from "@/components/ToolLogo";

interface MethodDetailProps {
  method: Method;
  onMethodClick?: (id: string) => void;
}

const effortColor: Record<string, string> = {
  Low: "text-green-600 bg-green-500/10",
  Medium: "text-amber-600 bg-amber-500/10",
  High: "text-red-500 bg-red-500/10",
};

export default function MethodDetail({ method, onMethodClick }: MethodDetailProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
      {/* Phase & context badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-body uppercase tracking-widest text-muted-foreground">
          {method.phase}
        </span>
        <span className="text-muted-foreground">·</span>
        {method.context.map((ctx) => (
          <span key={ctx} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-body">
            {ctx}
          </span>
        ))}
      </div>

      {/* Title */}
      <h2 className="text-2xl lg:text-3xl font-display mb-3 text-foreground leading-tight">
        {method.title}
      </h2>

      {/* Meta: effort + time */}
      <div className="flex items-center gap-4 mb-6">
        <div className={`flex items-center gap-1.5 text-xs font-body px-2.5 py-1 rounded-lg ${effortColor[method.effort]}`}>
          <Zap className="w-3 h-3" />
          {method.effort} effort
        </div>
        <div className="flex items-center gap-1.5 text-xs font-body text-muted-foreground">
          <Clock className="w-3 h-3" />
          {method.timeEstimate}
        </div>
      </div>

      {/* When to use */}
      <div className="rounded-xl bg-accent/50 border border-border p-4 mb-8">
        <h3 className="text-[11px] font-body font-medium uppercase tracking-widest text-muted-foreground mb-2">
          When to use this
        </h3>
        <p className="text-sm text-foreground font-body leading-relaxed">
          {method.whenToUse}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground mb-10">
        {method.description}
      </p>

      {/* Step-by-step guide */}
      <div className="mb-10">
        <h3 className="text-[11px] font-body font-medium uppercase tracking-widest text-muted-foreground mb-4">
          Step-by-Step Guide
        </h3>
        <ol className="space-y-3">
          {method.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[11px] font-display text-secondary-foreground shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-foreground font-body leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Example Artifacts */}
      <div className="mb-10">
        <h3 className="text-[11px] font-body font-medium uppercase tracking-widest text-muted-foreground mb-3">
          Example Artifacts
        </h3>
        <ul className="space-y-2">
          {method.artifacts.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="text-clay mt-0.5">•</span>
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* Tools section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <h3 className="text-[11px] font-body font-medium uppercase tracking-widest text-muted-foreground mb-3">
            AI Tools
          </h3>
          <div className="space-y-3">
            {method.aiTools.map((tool) => (
              <div key={tool.name} className="tool-card">
                <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-accent">
                  <ToolLogo name={tool.name} type={tool.type} size="md" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{tool.name}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{tool.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-[11px] font-body font-medium uppercase tracking-widest text-muted-foreground mb-3">
            Traditional Tools
          </h3>
          <div className="space-y-3">
            {method.traditionalTools.map((tool) => (
              <div key={tool.name} className="tool-card">
                <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-accent">
                  <ToolLogo name={tool.name} type={tool.type} size="md" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{tool.name}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{tool.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Methods */}
      {method.relatedMethods.length > 0 && (
        <div className="mb-10">
          <h3 className="text-[11px] font-body font-medium uppercase tracking-widest text-muted-foreground mb-3">
            <Link2 className="w-3 h-3 inline mr-1.5" />
            Related Methods
          </h3>
          <div className="flex flex-wrap gap-2">
            {method.relatedMethods.map((relId) => (
              <button
                key={relId}
                onClick={() => onMethodClick?.(relId)}
                className="text-xs px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground font-body hover:bg-accent transition-colors"
              >
                {relId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                <ArrowRight className="w-3 h-3 inline ml-1.5" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Resources */}
      {method.resources.length > 0 && (
        <div className="mb-12">
          <h3 className="text-[11px] font-body font-medium uppercase tracking-widest text-muted-foreground mb-3">
            External Resources
          </h3>
          <div className="space-y-2">
            {method.resources.map((r, i) => (
              <a
                key={i}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground hover:text-clay transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {r.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

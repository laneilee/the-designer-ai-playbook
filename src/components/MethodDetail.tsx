import { ScrollArea } from "@/components/ui/scroll-area";
import { type Method } from "@/data/methods";
import { Bot, Wrench, ArrowRight, ExternalLink } from "lucide-react";

interface MethodDetailProps {
  method: Method;
}

export default function MethodDetail({ method }: MethodDetailProps) {
  return (
    <ScrollArea className="flex-1 h-screen">
      <div className="max-w-2xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
        {/* Hero image */}
        <div className="rounded-xl overflow-hidden mb-8">
          <img
            src={method.image}
            alt={method.title}
            className="w-full h-48 lg:h-64 object-cover"
          />
        </div>

        {/* Category & criticality badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-body uppercase tracking-widest text-muted-foreground">
            {method.category}
          </span>
          <span className="text-muted-foreground">·</span>
          {method.criticality === "ai-enhanced" ? (
            <span className="badge-ai">
              <Bot className="w-3 h-3" /> AI-Enhanced
            </span>
          ) : (
            <span className="badge-human">
              <span className="w-3 h-3 inline-block">✦</span> Human-Critical
            </span>
          )}
        </div>

        {/* Title & description */}
        <h2 className="text-2xl lg:text-3xl font-display mb-4 text-foreground leading-tight">
          {method.title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground mb-10">
          {method.description}
        </p>

        {/* Tools section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* AI Tools */}
          <div>
            <h3 className="text-[11px] font-body font-medium uppercase tracking-widest text-muted-foreground mb-3">
              AI Tools
            </h3>
            <div className="space-y-3">
              {method.aiTools.map((tool) => (
                <div key={tool.name} className="tool-card">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-clay" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">{tool.name}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{tool.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traditional Tools */}
          <div>
            <h3 className="text-[11px] font-body font-medium uppercase tracking-widest text-muted-foreground mb-3">
              Traditional Tools
            </h3>
            <div className="space-y-3">
              {method.traditionalTools.map((tool) => (
                <div key={tool.name} className="tool-card">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Wrench className="w-4 h-4 text-muted-foreground" />
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

        {/* Workflow */}
        <div className="mb-10">
          <h3 className="text-[11px] font-body font-medium uppercase tracking-widest text-muted-foreground mb-4">
            Example Workflow
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            {method.workflow.map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <span className="text-sm text-foreground">{step.label}</span>
                  {step.aiTool && (
                    <span className="badge-ai mt-1 text-[10px]">
                      <Bot className="w-2.5 h-2.5" /> {step.aiTool}
                    </span>
                  )}
                </div>
                {i < method.workflow.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div className="mb-10">
          <h3 className="text-[11px] font-body font-medium uppercase tracking-widest text-muted-foreground mb-3">
            Key Deliverables
          </h3>
          <ul className="space-y-2">
            {method.deliverables.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-clay mt-0.5">•</span>
                {d}
              </li>
            ))}
          </ul>
        </div>

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
    </ScrollArea>
  );
}

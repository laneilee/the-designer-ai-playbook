import { ScrollArea } from "@/components/ui/scroll-area";
import { phases, methods, type Method } from "@/data/methods";
import { Bot, Users } from "lucide-react";

interface MethodSidebarProps {
  activeMethod: string;
  onSelect: (id: string) => void;
  view: "methods" | "tools";
  onViewChange: (view: "methods" | "tools") => void;
}

export default function MethodSidebar({ activeMethod, onSelect, view, onViewChange }: MethodSidebarProps) {
  return (
    <aside className="w-full lg:w-[380px] shrink-0 border-r border-border bg-card">
      <div className="flex items-center gap-2 px-6 pt-6 pb-4">
        <button
          onClick={() => onViewChange("methods")}
          className={`text-sm font-body font-medium transition-colors ${
            view === "methods" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Methods
        </button>
        <span className="text-muted-foreground">/</span>
        <button
          onClick={() => onViewChange("tools")}
          className={`text-sm font-body font-medium transition-colors ${
            view === "tools" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Tools
        </button>
      </div>
      <ScrollArea className="h-[calc(100vh-120px)]">
        <div className="pb-6">
          {phases.map((phase) => {
            const phaseMethods = methods.filter((m) => m.phase === phase);
            return (
              <div key={phase}>
                <div className="category-label">{phase}</div>
                {phaseMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => onSelect(method.id)}
                    className={`method-item w-full text-left ${
                      activeMethod === method.id ? "active" : ""
                    }`}
                  >
                    <span className="truncate">{method.title}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      {method.context.includes("Team") && (
                        <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </aside>
  );
}

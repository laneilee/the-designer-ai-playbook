import { ScrollArea } from "@/components/ui/scroll-area";
import { categories, methods, type Method } from "@/data/methods";
import { Bot, User } from "lucide-react";

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
          {categories.map((category) => {
            const categoryMethods = methods.filter((m) => m.category === category);
            return (
              <div key={category}>
                <div className="category-label">{category}</div>
                {categoryMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => onSelect(method.id)}
                    className={`method-item w-full text-left ${
                      activeMethod === method.id ? "active" : ""
                    }`}
                  >
                    <span className="truncate">{method.title}</span>
                    {method.criticality === "ai-enhanced" ? (
                      <Bot className="w-4 h-4 shrink-0 text-clay" />
                    ) : (
                      <User className="w-4 h-4 shrink-0 text-human" />
                    )}
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

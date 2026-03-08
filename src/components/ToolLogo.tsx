import { toolLogos } from "@/data/toolLogos";
import { Bot, Wrench } from "lucide-react";

interface ToolLogoProps {
  name: string;
  type: "ai" | "traditional";
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-9 h-9",
};

export default function ToolLogo({ name, type, size = "md" }: ToolLogoProps) {
  const logoUrl = toolLogos[name];
  const sizeClass = sizeMap[size];

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className={`${sizeClass} rounded-md object-contain`}
        loading="lazy"
        onError={(e) => {
          // Fallback: hide image and show nothing (parent will handle)
          (e.target as HTMLImageElement).style.display = "none";
          const fallback = (e.target as HTMLImageElement).nextElementSibling;
          if (fallback) (fallback as HTMLElement).style.display = "flex";
        }}
      />
    );
  }

  // Fallback icons for generic tools
  return (
    <div className={`${sizeClass} rounded-md bg-accent flex items-center justify-center`}>
      {type === "ai" ? (
        <Bot className="w-3.5 h-3.5 text-clay" />
      ) : (
        <Wrench className="w-3.5 h-3.5 text-muted-foreground" />
      )}
    </div>
  );
}

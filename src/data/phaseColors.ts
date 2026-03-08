import { type Phase } from "./methods";

export const phaseColors: Record<Phase, {
  hue: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  gradient: string;
}> = {
  Discover: {
    hue: "200",
    accent: "hsl(200, 98%, 39%)",
    accentBg: "hsl(200 98% 39% / 0.08)",
    accentBorder: "hsl(200 98% 39% / 0.2)",
    gradient: "linear-gradient(135deg, hsl(200 98% 39% / 0.12), hsl(210 90% 55% / 0.06))",
  },
  Define: {
    hue: "270",
    accent: "hsl(270, 50%, 55%)",
    accentBg: "hsl(270 50% 55% / 0.08)",
    accentBorder: "hsl(270 50% 55% / 0.2)",
    gradient: "linear-gradient(135deg, hsl(270 50% 55% / 0.12), hsl(280 40% 60% / 0.06))",
  },
  Ideate: {
    hue: "38",
    accent: "hsl(38, 70%, 50%)",
    accentBg: "hsl(38 70% 50% / 0.08)",
    accentBorder: "hsl(38 70% 50% / 0.2)",
    gradient: "linear-gradient(135deg, hsl(38 70% 50% / 0.12), hsl(28 60% 55% / 0.06))",
  },
  Prototype: {
    hue: "160",
    accent: "hsl(160, 45%, 40%)",
    accentBg: "hsl(160 45% 40% / 0.08)",
    accentBorder: "hsl(160 45% 40% / 0.2)",
    gradient: "linear-gradient(135deg, hsl(160 45% 40% / 0.12), hsl(140 35% 45% / 0.06))",
  },
  Validate: {
    hue: "15",
    accent: "hsl(15, 60%, 50%)",
    accentBg: "hsl(15 60% 50% / 0.08)",
    accentBorder: "hsl(15 60% 50% / 0.2)",
    gradient: "linear-gradient(135deg, hsl(15 60% 50% / 0.12), hsl(25 50% 55% / 0.06))",
  },
  Align: {
    hue: "215",
    accent: "hsl(215, 40%, 50%)",
    accentBg: "hsl(215 40% 50% / 0.08)",
    accentBorder: "hsl(215 40% 50% / 0.2)",
    gradient: "linear-gradient(135deg, hsl(215 40% 50% / 0.12), hsl(220 35% 55% / 0.06))",
  },
};

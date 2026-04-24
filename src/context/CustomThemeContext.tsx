import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ColorTheme = "saffron" | "emerald" | "royal" | "rose";

interface ThemePreset {
  primary: string;
  accent: string;
  label: string;
  color: string;
}

const presets: Record<ColorTheme, ThemePreset> = {
  saffron: {
    primary: "28 90% 50%",
    accent: "38 95% 55%",
    label: "Classic Saffron",
    color: "#f97316"
  },
  emerald: {
    primary: "142 70% 45%",
    accent: "160 84% 39%",
    label: "Medical Emerald",
    color: "#10b981"
  },
  royal: {
    primary: "221 83% 53%",
    accent: "199 89% 48%",
    label: "Engineering Blue",
    color: "#3b82f6"
  },
  rose: {
    primary: "330 81% 60%",
    accent: "320 70% 50%",
    label: "Premium Rose",
    color: "#e11d48"
  }
};

interface CustomThemeContextType {
  currentTheme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
  presets: typeof presets;
}

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined);

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>("saffron");

  useEffect(() => {
    const saved = localStorage.getItem("gurukul-accent-theme") as ColorTheme;
    if (saved && presets[saved]) {
      setCurrentTheme(saved);
    }
  }, []);

  useEffect(() => {
    const preset = presets[currentTheme];
    const root = document.documentElement;
    
    // Update CSS variables dynamically
    root.style.setProperty("--primary", preset.primary);
    root.style.setProperty("--accent", preset.accent);
    root.style.setProperty("--ring", preset.primary);
    
    // Update gradients
    root.style.setProperty("--gradient-hero", `linear-gradient(135deg, hsl(${preset.primary}) 0%, hsl(${preset.accent}) 50%, hsl(${preset.primary}) 100%)`);
    
    localStorage.setItem("gurukul-accent-theme", currentTheme);
  }, [currentTheme]);

  return (
    <CustomThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme, presets }}>
      {children}
    </CustomThemeContext.Provider>
  );
};

export const useCustomTheme = () => {
  const context = useContext(CustomThemeContext);
  if (!context) throw new Error("useCustomTheme must be used within a CustomThemeProvider");
  return context;
};

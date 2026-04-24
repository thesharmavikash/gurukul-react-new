import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { useState } from "react";
import { useCustomTheme } from "@/context/CustomThemeContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const ThemeCustomizer = () => {
  const { currentTheme, setTheme, presets } = useCustomTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full border-primary/20 hover:bg-primary/5 transition-all shadow-soft"
        >
          <Palette className="w-5 h-5 text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 rounded-2xl shadow-large border-border bg-card/95 backdrop-blur-md" align="end">
        <div className="space-y-4">
          <div className="space-y-1">
            <h4 className="font-bold text-sm">Theme Accent</h4>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Customize brand color</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(presets) as Array<keyof typeof presets>).map((key) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`flex items-center gap-3 p-2 rounded-xl transition-all border-2 ${
                  currentTheme === key ? "border-primary bg-primary/5 shadow-sm" : "border-transparent hover:bg-secondary"
                }`}
              >
                <div 
                  className="w-6 h-6 rounded-full shadow-inner flex items-center justify-center" 
                  style={{ backgroundColor: presets[key].color }}
                >
                  {currentTheme === key && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-xs font-semibold">{presets[key].label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-[10px] italic text-muted-foreground">Changes apply globally to all pages and images.</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeCustomizer;


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 'traditional' | 'minimal' | 'dark' | 'nature' | 'accessibility' | 'festival';

interface ThemeConfig {
  name: string;
  colors: {
    bg: string;
    text: string;
    primary: string;
    secondary: string;
    accent: string;
    surface: string;
    border: string;
    pattern: string;
  };
  fonts: {
    display: string;
    body: string;
  };
  fontSize: number; // multiplier
  backgroundEffect: 'gradient' | 'minimal' | 'organic' | 'geometric';
  animationIntensity: number; // 0 to 1
}

const themes: Record<ThemeType, ThemeConfig> = {
  traditional: {
    name: 'Traditional Indian',
    colors: {
      bg: '#0c0805',
      text: '#F5F5DC',
      primary: '#F27D26', // Saffron
      secondary: '#800000', // Maroon
      accent: '#D4AF37', // Gold
      surface: 'rgba(255, 255, 255, 0.02)',
      border: 'rgba(212, 175, 55, 0.1)',
      pattern: '#d4af37',
    },
    fonts: {
      display: '"Marcellus", serif',
      body: '"Inter", sans-serif',
    },
    fontSize: 1,
    backgroundEffect: 'gradient',
    animationIntensity: 1,
  },
  minimal: {
    name: 'Modern Minimal',
    colors: {
      bg: '#ffffff',
      text: '#1a1a1a',
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#0f172a',
      surface: 'rgba(0, 0, 0, 0.02)',
      border: 'rgba(0, 0, 0, 0.05)',
      pattern: '#3b82f6',
    },
    fonts: {
      display: '"Inter", sans-serif',
      body: '"Inter", sans-serif',
    },
    fontSize: 1,
    backgroundEffect: 'minimal',
    animationIntensity: 0.5,
  },
  dark: {
    name: 'Dark Premium',
    colors: {
      bg: '#050505',
      text: '#e2e8f0',
      primary: '#8b5cf6',
      secondary: '#1e293b',
      accent: '#06b6d4',
      surface: 'rgba(255, 255, 255, 0.03)',
      border: 'rgba(255, 255, 255, 0.1)',
      pattern: '#06b6d4',
    },
    fonts: {
      display: '"Inter", sans-serif',
      body: '"Inter", sans-serif',
    },
    fontSize: 1,
    backgroundEffect: 'gradient',
    animationIntensity: 1,
  },
  nature: {
    name: 'Nature Inspired',
    colors: {
      bg: '#f0f4f0',
      text: '#163020',
      primary: '#2d5a27',
      secondary: '#b3cf99',
      accent: '#606c38',
      surface: 'rgba(45, 90, 39, 0.05)',
      border: 'rgba(45, 90, 39, 0.1)',
      pattern: '#2d5a27',
    },
    fonts: {
      display: '"Marcellus", serif',
      body: '"Inter", sans-serif',
    },
    fontSize: 1,
    backgroundEffect: 'organic',
    animationIntensity: 0.8,
  },
  accessibility: {
    name: 'High Contrast',
    colors: {
      bg: '#000000',
      text: '#ffffff',
      primary: '#ffff00',
      secondary: '#0000ff',
      accent: '#ffff00',
      surface: 'rgba(255, 255, 255, 0.1)',
      border: '#ffffff',
      pattern: '#ffffff',
    },
    fonts: {
      display: 'sans-serif',
      body: 'sans-serif',
    },
    fontSize: 1.25,
    backgroundEffect: 'minimal',
    animationIntensity: 0,
  },
  festival: {
    name: 'Holi Festival',
    colors: {
      bg: '#fff5f8',
      text: '#4a044e',
      primary: '#db2777',
      secondary: '#7c3aed',
      accent: '#ea580c',
      surface: 'rgba(219, 39, 119, 0.05)',
      border: 'rgba(219, 39, 119, 0.1)',
      pattern: '#db2777',
    },
    fonts: {
      display: '"Marcellus", serif',
      body: '"Inter", sans-serif',
    },
    fontSize: 1,
    backgroundEffect: 'gradient',
    animationIntensity: 1.2,
  },
};

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  config: ThemeConfig;
  setCustomColor: (key: keyof ThemeConfig['colors'], value: string) => void;
  setFontSize: (size: number) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('sankalp-theme');
    // Auto-detection logic for system preference
    if (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
       return 'minimal';
    }
    return (saved as ThemeType) || 'traditional';
  });

  const [customConfig, setCustomConfig] = useState<ThemeConfig>(themes[theme]);

  // Sync custom config when theme changes
  useEffect(() => {
    setCustomConfig(themes[theme]);
    localStorage.setItem('sankalp-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  const setCustomColor = (key: keyof ThemeConfig['colors'], value: string) => {
    setCustomConfig(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [key]: value
      }
    }));
  };

  const setFontSize = (size: number) => {
    setCustomConfig(prev => ({
      ...prev,
      fontSize: size
    }));
  };

  const resetTheme = () => {
    setCustomConfig(themes[theme]);
  };

  useEffect(() => {
    const root = document.documentElement;
    const { colors, fonts, fontSize, animationIntensity } = customConfig;

    root.style.setProperty('--bg-color', colors.bg);
    root.style.setProperty('--text-color', colors.text);
    root.style.setProperty('--primary-color', colors.primary);
    root.style.setProperty('--secondary-color', colors.secondary);
    root.style.setProperty('--accent-color', colors.accent);
    root.style.setProperty('--surface-color', colors.surface);
    root.style.setProperty('--border-color', colors.border);
    root.style.setProperty('--pattern-color', colors.pattern);
    
    root.style.setProperty('--font-display', fonts.display);
    root.style.setProperty('--font-body', fonts.body);
    
    root.style.setProperty('--font-size-base', `${fontSize * 16}px`);
    root.style.setProperty('--anim-intensity', animationIntensity.toString());

    // Set dark/light mode class
    const lightBgColors = ['#ffffff', '#fcfcfc', '#fff5f8', '#f0f4f0'];
    if (lightBgColors.includes(colors.bg.toLowerCase())) {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  }, [customConfig]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, config: customConfig, setCustomColor, setFontSize, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

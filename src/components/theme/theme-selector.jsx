import React from 'react';
import { Button } from '../ui/button';
import { useTheme } from '../../contexts/theme-context';
import { Sun, Moon, Palette, Zap, Sunset, Droplets } from 'lucide-react';

export default function ThemeSelector() {
  const { theme, changeTheme, themes } = useTheme();
  
  const getThemeIcon = (themeId) => {
    switch (themeId) {
      case 'light':
        return <Sun className="h-5 w-5" />;
      case 'dark':
        return <Moon className="h-5 w-5" />;
      case 'blue':
      case 'purple':
      case 'green':
        return <Palette className="h-5 w-5" />;
      case 'neon':
        return <Zap className="h-5 w-5" />;
      case 'sunset':
        return <Sunset className="h-5 w-5" />;
      case 'ocean':
        return <Droplets className="h-5 w-5" />;
      default:
        return <Sun className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Theme</h2>
      <div className="grid grid-cols-2 gap-3">
        {themes.map((t) => (
          <Button
            key={t.id}
            variant={theme === t.id ? "default" : "outline"}
            className="flex items-center justify-start h-12"
            onClick={() => changeTheme(t.id)}
          >
            <div className="mr-3">{getThemeIcon(t.id)}</div>
            <span>{t.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
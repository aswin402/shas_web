import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

export function ThemeToggleButton() {
  const { theme, setTheme } = useThemeStore();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
  };

  return (
    <button
      onClick={cycleTheme}
      title={`Toggle Theme (Current: ${theme})`}
      className="p-1.5 hover:text-[#C79A3B] transition-colors flex items-center justify-center relative"
    >
      <Sun
        className={`h-4.5 w-4.5 transition-all duration-300 ${
          theme === 'light'
            ? 'rotate-0 scale-100'
            : 'rotate-90 scale-0'
        }`}
      />
      <Moon
        className={`absolute h-4.5 w-4.5 transition-all duration-300 ${
          theme === 'dark'
            ? 'rotate-0 scale-100'
            : 'rotate-90 scale-0'
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { NavigationMenu } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="border-b h-12 flex items-center px-8 justify-between">
      <NavigationMenu>
        <Link href="/" legacyBehavior passHref>
          <div className="cursor-pointer font-light">🏒 Lineups</div>
        </Link>
      </NavigationMenu>
      <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {(theme === 'dark' || theme === 'system') && (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
        )}
        {theme === 'light' && (
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};

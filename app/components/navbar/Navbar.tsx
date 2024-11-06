import Link from 'next/link';

import { NavigationMenu } from '@/components/ui/navigation-menu';

export const Navbar = () => {
  return (
    <div className="border-b h-12 flex items-center px-8">
      <NavigationMenu>
        <Link href="/" legacyBehavior passHref>
          <div className="cursor-pointer font-light">🏒 Lineups</div>
        </Link>
      </NavigationMenu>
    </div>
  );
};

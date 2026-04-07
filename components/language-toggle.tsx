'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/src/i18n/routing';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-menu-blue text-menu-blue hover:bg-menu-blue hover:text-white transition-all duration-300"
        >
          <Globe className="mr-2 h-4 w-4" />
          <span className="uppercase">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-menu-blue">
        <DropdownMenuItem 
          onClick={() => handleLocaleChange('fr')}
          className="cursor-pointer hover:bg-menu-cream focus:bg-menu-cream"
        >
          Français
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleLocaleChange('en')}
          className="cursor-pointer hover:bg-menu-cream focus:bg-menu-cream"
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

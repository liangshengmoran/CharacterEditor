'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from '@/i18n/routing';
import { LanguagesIcon } from 'lucide-react';

export function LanguageToggle() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LanguagesIcon />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.replace('/workspaces/settings', { locale: 'zh-CN' })}
        >
          简体中文
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.replace('/workspaces/settings', { locale: 'zh-TW' })}
        >
          繁体中文
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.replace('/workspaces/settings', { locale: 'en' })}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.replace('/workspaces/settings', { locale: 'ja' })}>
          日本語
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.replace('/workspaces/settings', { locale: 'ko' })}>
          한국어
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.replace('/workspaces/settings', { locale: 'fr' })}>
          Français
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.replace('/workspaces/settings', { locale: 'de' })}>
          Deutsch
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.replace('/workspaces/settings', { locale: 'ru' })}>
          русск
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

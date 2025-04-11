'use client';

import { TokenCounter } from '@/components/tokenCounter';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getCharacterField, updateCharacter, usePageGuard } from '@/lib/character';
import { selectedCharacterIdAtom } from '@/store/action';
import { debounce } from 'es-toolkit';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

function page() {
  usePageGuard();
  return (
    <>
      <Post_History_Instructions />
    </>
  );
}

export default page;

function Post_History_Instructions() {
  const [cid] = useAtom(selectedCharacterIdAtom);
  const [inputValue, setInputValue] = useState<string>('');
  const t = useTranslations();
  const handleChangeText = debounce(async (value: string) => {
    await updateCharacter(cid as number, 'data.post_history_instructions' as string, value);
  }, 1000);

  useEffect(() => {
    const fetchDefaultValue = async () => {
      try {
        const rows = await getCharacterField(cid as number, 'data.post_history_instructions');
        if (rows && typeof rows === 'string') {
          setInputValue(rows);
        }
      } catch (error) {
        console.error('Failed to fetch default value:', error);
      }
    };
    fetchDefaultValue();
  }, [cid]);

  return (
    <>
      {cid ? (
        <div className="flex h-full flex-col overflow-hidden p-0.5">
          <div className="flex flex-row items-center justify-between">
            <Label htmlFor="message">{t('Character.post_history_instructions')}</Label>
            <TokenCounter text={inputValue} />
          </div>

          <Textarea
            className="mt-4 flex-1 resize-none overflow-auto"
            placeholder={t('type messages')}
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value);
              handleChangeText(value);
            }}
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

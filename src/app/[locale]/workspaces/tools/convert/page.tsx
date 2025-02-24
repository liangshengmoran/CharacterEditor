'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { convertCharacterToJson } from '@/lib/tools';
import { atom, useAtom } from 'jotai';
import { CopyIcon, ImportIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export const runtime = 'edge';
function page() {
  return (
    <>
      <Header />
      <ConvertCharacterToJson />
    </>
  );
}

export default page;

const previewAtom = atom<string>('');

function Header() {
  const [preview, setPreview] = useAtom(previewAtom);
  const t = useTranslations();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(preview);
      toast.success(t('Success.copySuccess'));
    } catch (error) {
      toast.error(t('error'));
    }
  };

  const handleImport = () => {
    const t = useTranslations()
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png';
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const jsonString = await convertCharacterToJson(file);
        if (typeof jsonString === 'string') {
          const parsedData = JSON.parse(jsonString);
          const formattedJson = JSON.stringify(parsedData, undefined, 2);
          setPreview(formattedJson);
        } else {
          const formattedJson = JSON.stringify(jsonString, undefined, 2);
          setPreview(formattedJson);
        }
      } catch (error) {
        console.error('完整错误信息:', error);
        toast.error(t('!ERROR_UNKNOW'));
      }
    };
    input.click();
  };

  return (
    <div className="flex justify-between">
      <div>{t('Nav.convertCharacterToJson')}</div>
      <div className="flex gap-x-2">
        {preview && (
          <Button onClick={handleCopy} variant="outline" size="icon">
            <CopyIcon />
          </Button>
        )}
        <Button variant="outline" size="icon" onClick={handleImport}>
          <ImportIcon />
        </Button>
      </div>
    </div>
  );
}

function ConvertCharacterToJson() {
  const [preview, setPreview] = useAtom(previewAtom);
  return <Textarea className="h-full w-full mt-2 whitespace-pre font-mono text-sm" value={preview} />;
}

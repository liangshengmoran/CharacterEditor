import { LanguageToggle } from '@/components/language-toggle';
import { ModeToggle } from '@/components/mode-toggle';
import { useTranslations } from 'next-intl';

export const runtime = 'edge';
function page() {
  return (
    <>
      <Settings />
    </>
  );
}

export default page;

function Settings() {
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <LanguageSelect />
        <ThemeSwitch />
        <hr />
        {/* <ExportData />
        <ImportData />
        <CleanData />
        <hr />
        <ExportOldData />
        <ImportOldData /> */}
      </div>
    </>
  );
}

function ThemeSwitch() {
  const t = useTranslations();
  return (
    <div className="flex w-full justify-between">
      <div>{t('theme')}</div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}

function LanguageSelect() {
  const t = useTranslations();
  return (
    <div className="flex w-full justify-between">
      <div>{t('language')}</div>
      <LanguageToggle />
    </div>
  );
}

function ConvertCharacterToJson() {
  const t = useTranslations();
  return (
    <div className="flex w-full justify-between">
      <div>{t('convertCharacterToJson')}</div>
      <LanguageToggle />
    </div>
  );
}
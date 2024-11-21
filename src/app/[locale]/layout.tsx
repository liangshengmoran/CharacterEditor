import "../globals.css";
// next-intl
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import UmamiProvider from 'next-umami'

const ANALYTICS_SRC = process.env.NEXT_PUBLIC_ANALYTICS_SRC ?? "";
const ANALYTICS_WEBSITE_ID = process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID ?? "";
const ANALYTICS_HOST_URL = process.env.NEXT_PUBLIC_ANALYTICS_HOST_URL ?? "";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale });

  return {
    title: t("Metadata.title"),
    description: t("Metadata.description"),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <head>
        <UmamiProvider src={ANALYTICS_SRC} websiteId={ANALYTICS_WEBSITE_ID} hostUrl={ANALYTICS_HOST_URL }/>
      </head>
      <body
        className={`antialiased bg-zinc-100 dark:bg-zinc-900 lg:dark:bg-zinc-950 text-black dark:text-white`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

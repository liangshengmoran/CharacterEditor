import { routing } from './i18n/routing';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|zh-CN|zh-TW|ja|ko|ru|de|fr|)/:path*'],
};

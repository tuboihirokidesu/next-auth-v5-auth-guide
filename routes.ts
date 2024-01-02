/**
 * 認証が必要ないルートの配列(これらのルートは認証を必要としません)
 */
export const publicRoutes: string[] = ['/new-verification'];

/**
 * 認証に使用されるルートの配列
 */
export const authRoutes: string[] = [
  '/sign-up',
  '/sign-in',
  '/auth/new-password',
  '/reset-password',
  '/new-password',
];

/**
 * API認証ルートのプレフィックス
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * ログイン後のデフォルトリダイレクトパス
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/';

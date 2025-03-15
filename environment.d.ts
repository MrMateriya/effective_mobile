declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL_DEV: string;
      DATABASE_URL_PROD: string;
      NODE_ENV: 'development' | 'production';
      PORT: number;
    }
  }
}
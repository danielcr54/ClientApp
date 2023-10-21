const env = process.env;

export interface Config {
  apiUrl: string;
  wsUrl: string;
  sentry?: string;
}

export const config: Config = {
  apiUrl: env.REACT_APP_API_URL || 'http://localhost:9050',
  wsUrl: env.REACT_APP_WS_URL || 'ws://localhost:9050',
  sentry: env.REACT_APP_SENTRY_DSN
};

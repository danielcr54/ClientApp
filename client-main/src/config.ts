const env = process.env;

export interface Config {
  apiUrl: string;
  wsUrl: string;
  googleAnalytics: {
    enabled: boolean;
    ua: string;
  };
  reCaptcha: {
    siteKey: string;
  };
  sentry?: string;
}

export const config: Config = {
  apiUrl: env.REACT_APP_API_URL || 'http://localhost:9050',
  wsUrl: env.REACT_APP_WS_URL || 'ws://localhost:9050',
  googleAnalytics: {
    enabled: Boolean(env.REACT_APP_GOOGLE_ANALYTICS_ENABLED),
    ua: env.REACT_APP_GOOGLE_ANALYTICS_UA || ''
  },
  reCaptcha: {
    siteKey: env.REACT_APP_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'
  },
  sentry: env.REACT_APP_SENTRY_DSN
};

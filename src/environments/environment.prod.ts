declare var GLOBAL_CONFIG: any;

export const environment = {
  production: false,
  host: (GLOBAL_CONFIG && GLOBAL_CONFIG.host) || '/',
  grafanaHost: (GLOBAL_CONFIG && GLOBAL_CONFIG.grafanaHost) || 'http://10.139.7.119:3000/'
};

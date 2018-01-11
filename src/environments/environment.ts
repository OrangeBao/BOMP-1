// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  host: 'http://localhost:3003/',
  // host: 'http://172.20.29.163:8080/',
  grafanaHost: 'http://10.139.7.119:3000/'
  // grafanaHost: 'http://10.139.12.21:3000/'
};

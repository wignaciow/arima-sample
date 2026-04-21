import { AppEnvironment } from "./models/environment.model";

export const environment: AppEnvironment = {
  production: false,
  api: {
    core: 'http://localhost:8081/api',
    reader: 'http://localhost:8082/api',
    reports: 'http://localhost:8083/api',
  },
  keycloak: {
    url: 'http://localhost:8080',
    realm: 'proyect-sample',
    clientId: 'proyect-sample-web',
  },
};
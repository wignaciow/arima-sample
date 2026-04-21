export interface AppEnvironment {
  production: boolean;
  api: ApiServices;
  keycloak: KeycloakConfig;
}

export interface ApiServices {
  core: string;
  reader: string;
  reports: string;
}
  
export interface KeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
}
  
  
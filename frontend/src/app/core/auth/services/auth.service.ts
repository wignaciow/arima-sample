import { Injectable, signal, computed } from '@angular/core';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import { keycloakConfig } from '../keycloak/keycloak.config';
import { AuthUser } from '../auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly keycloak = new Keycloak({
    url: keycloakConfig.url,
    realm: keycloakConfig.realm,
    clientId: keycloakConfig.clientId,
  });

  private readonly _initialized = signal(false);
  private readonly _authenticated = signal(false);
  private readonly _user = signal<AuthUser | null>(null);

  readonly initialized = computed(() => this._initialized());
  readonly authenticated = computed(() => this._authenticated());
  readonly user = computed(() => this._user());

  async init(): Promise<void> {
    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required',
        pkceMethod: 'S256',
        checkLoginIframe: false,
        redirectUri: window.location.origin,
      });

      this._authenticated.set(authenticated);

      if (authenticated) {
        await this.loadUserData();
      } else {
        this._user.set(null);
      }

      this._initialized.set(true);
    } catch (error) {
      console.error('Error initializing Keycloak', error);
      this._authenticated.set(false);
      this._user.set(null);
      this._initialized.set(true);
    }
  }

  async login(): Promise<void> {
    await this.keycloak.login({
      redirectUri: `${window.location.origin}/app/dashboard`,
    });
  }

  async logout(): Promise<void> {
    this._authenticated.set(false);
    this._user.set(null);

    await this.keycloak.logout({
      redirectUri: `${window.location.origin}/auth/login`,
    });
  }

  isAuthenticated(): boolean {
    return this._authenticated();
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  getUsername(): string | undefined {
    return this._user()?.username;
  }

  getUserRoles(): string[] {
    return this._user()?.roles ?? [];
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  async refreshToken(minValidity = 30): Promise<boolean> {
    try {
      if (!this._authenticated()) {
        return false;
      }

      const refreshed = await this.keycloak.updateToken(minValidity);
      return refreshed;
    } catch (error) {
      console.error('Error refreshing token', error);
      this._authenticated.set(false);
      this._user.set(null);
      return false;
    }
  }

  private async loadUserData(): Promise<void> {
    const profile: KeycloakProfile = await this.keycloak.loadUserProfile();
    const parsedToken = this.keycloak.tokenParsed as any;

    const roles: string[] = parsedToken?.realm_access?.roles ?? [];

    const user: AuthUser = {
      id: parsedToken?.sub ?? '',
      username: profile.username ?? parsedToken?.preferred_username ?? '',
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      fullName:
        `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim() ||
        profile.username ||
        parsedToken?.preferred_username ||
        '',
      roles,
    };

    this._user.set(user);
  }
}

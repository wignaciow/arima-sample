import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="layout">
      <aside class="sidebar">
        <h2>Project Sample</h2>

        <nav>
          <a routerLink="/app/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/app/procurement" routerLinkActive="active">Procurement</a>
          <a routerLink="/app/reports" routerLinkActive="active">Reports</a>
        </nav>

        <div class="user-box" *ngIf="authService.user() as user">
          <p>
            <strong>{{ user.fullName || user.username }}</strong>
          </p>
          <p>{{ user.email }}</p>
          <button type="button" (click)="logout()">Cerrar sesión</button>
        </div>
      </aside>

      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .layout {
        min-height: 100vh;
        display: grid;
        grid-template-columns: 260px 1fr;
      }

      .sidebar {
        padding: 24px;
        border-right: 1px solid #e5e7eb;
        background: #fafafa;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      nav {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      nav a {
        text-decoration: none;
        color: #222;
        padding: 10px 12px;
        border-radius: 8px;
      }

      nav a.active {
        background: #e9eefc;
        font-weight: 600;
      }

      .content {
        padding: 32px;
      }

      .user-box {
        margin-top: auto;
        padding-top: 24px;
        border-top: 1px solid #e5e7eb;
      }

      button {
        margin-top: 12px;
        padding: 10px 14px;
        border: 0;
        border-radius: 8px;
        cursor: pointer;
      }
    `,
  ],
})
export class LayoutComponent {
  readonly authService = inject(AuthService);

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}

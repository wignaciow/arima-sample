import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h1>Dashboard</h1>
      <p>Bienvenido a la página principal del portfolio.</p>

      <div *ngIf="authService.user() as user">
        <p><strong>Usuario:</strong> {{ user.fullName || user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Roles:</strong> {{ user.roles.join(', ') || 'Sin roles' }}</p>
      </div>
    </section>
  `,
})
export class DashboardComponent {
  readonly authService = inject(AuthService);
}

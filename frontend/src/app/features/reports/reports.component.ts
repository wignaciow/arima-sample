import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h1>Reports</h1>
      <p>Esta sección servirá para mostrar reportes y vistas analíticas.</p>
    </section>
  `,
})
export class ReportsComponent {}

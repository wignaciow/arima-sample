import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppContextSelectorComponent } from '../../shared/components/app-context/app-context-selector.component';

@Component({
  selector: 'app-procurement',
  standalone: true,
  imports: [RouterModule, AppContextSelectorComponent],
  templateUrl: './procurement.component.html',
  styleUrl: './procurement.component.scss',
})
export class ProcurementComponent {
  private readonly router = inject(Router);

  protected isEditorRoute(): boolean {
    //define las rutas validas
    return /\/app\/procurement(\/new|\/[^/]+\/edit)$/.test(this.router.url);
  }
}
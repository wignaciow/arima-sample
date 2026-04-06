import { Routes } from '@angular/router';

export const PROCUREMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/procurement-list/procurement-list.component').then(
        (m) => m.ProcurementListComponent,
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/procurement-edit/procurement-form.component').then(
        (m) => m.ProcurementFormComponent,
      ),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/procurement-edit/procurement-form.component').then(
        (m) => m.ProcurementFormComponent,
      ),
  },
];

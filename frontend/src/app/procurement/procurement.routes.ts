import { Routes } from "@angular/router";
import { ProcurementListComponent } from "./procurement-list/procurement-list.component";
import { ProcurementFormComponent } from "./procurement-edit/procurement-form.component";


export const PROCUREMENT_ROUTES: Routes = [
  {
    path: "",
    component: ProcurementListComponent,
  },
  {
    path: "new",
    component: ProcurementFormComponent,
  },
  {
    path: ":id/edit",
    component: ProcurementFormComponent,
  },
];

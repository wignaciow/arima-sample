import { Routes } from "@angular/router";
import { PROCUREMENT_ROUTES } from "./procurement/procurement.routes";


export const appRoutes: Routes = [
  {
    path: "procurement",
    children: PROCUREMENT_ROUTES,
  },
  {
    path: "",
    redirectTo: "procurement",
    pathMatch: "full",
  },
];

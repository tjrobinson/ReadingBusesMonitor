import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NextBusComponent } from "./next-bus/next-bus.component";

const routes: Routes = [
  {
    path: "next-bus",
    component: NextBusComponent,
    data: { title: "Next Bus" }
  },
  { path: "", redirectTo: "/next-bus", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

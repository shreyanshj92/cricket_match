import { AppComponent } from "./app.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TeamFormationComponent } from "./team-formation/team-formation.component";

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    children: [
      { path: "teamformation", component: TeamFormationComponent },
      { path: "home", component: MainPageComponent },
      { path: "", redirectTo: "home", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { AppComponent } from "./app.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TeamFormationComponent } from "./team-formation/team-formation.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { RulesComponent } from "./rules/rules.component";
import { QuestionsComponent } from "./questions/questions.component";

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    children: [
      { path: "teamformation", component: TeamFormationComponent },
      { path: "home", component: MainPageComponent },
      { path: "rules", component: RulesComponent },
      {
        path: "scoreboard",
        component: ScoreboardComponent,
        children: [{ path: "", component: QuestionsComponent }]
      },
      { path: "", redirectTo: "home", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

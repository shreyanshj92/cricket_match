import { DashboardModule } from "./dashboard/dashboard.module";
import { AppComponent } from "./app.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TeamFormationComponent } from "./team-formation/team-formation.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { QuestionsComponent } from "./questions/questions.component";
import { RulesComponent } from "./rules/rules.component";
import { QuestionListComponent } from "./question-list/question-list.component";
import { UpdateQuestionsComponent } from "./update-questions/update-questions.component";
import { ScorecartComponent } from "./scorecart/scorecart.component";

const routes: Routes = [
  {
    path: "",
    component: AppComponent
  },
  { path: "teamformation", component: TeamFormationComponent },
  { path: "home", component: MainPageComponent },
  { path: "rules", component: RulesComponent },
  {
    path: "scoreboard",
    component: ScoreboardComponent,
    children: [
      { path: "", component: QuestionsComponent },
      { path: "scorecard", component: ScorecartComponent }
    ]
  },
  { path: "question-list", component: QuestionListComponent },
  { path: "scorecard", component: ScorecartComponent },
  { path: "question-add-form", component: UpdateQuestionsComponent },

  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

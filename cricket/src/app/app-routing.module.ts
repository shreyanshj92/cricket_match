import { AppComponent } from "./app.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TeamFormationComponent } from "./team-formation/team-formation.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { RulesComponent } from "./rules/rules.component";
import { QuestionsComponent } from "./questions/questions.component";
import { QuestionListComponent } from "./question-list/question-list.component";
import { UpdateQuestionsComponent } from "./update-questions/update-questions.component";

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
      { path: "question-list", component: QuestionListComponent },
      { path: "question-add-form", component: UpdateQuestionsComponent },
      { path: "**", redirectTo: "home", pathMatch: "full" }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

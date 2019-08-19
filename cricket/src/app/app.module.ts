import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TeamFormationComponent } from "./team-formation/team-formation.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { RulesComponent } from './rules/rules.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  declarations: [AppComponent, TeamFormationComponent, MainPageComponent, ScoreboardComponent, RulesComponent, QuestionsComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TeamFormationComponent } from "./team-formation/team-formation.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { ScoreboardComponent } from "./scoreboard/scoreboard.component";
import { RulesComponent } from "./rules/rules.component";
import { QuestionsComponent } from "./questions/questions.component";
import { UpdateQuestionsComponent } from "./update-questions/update-questions.component";
import { QuestionListComponent } from "./question-list/question-list.component";
import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { HttpClientModule } from "@angular/common/http";
import { QuestionState } from "./+state/cricket.state";

@NgModule({
  declarations: [
    AppComponent,
    TeamFormationComponent,
    MainPageComponent,
    ScoreboardComponent,
    RulesComponent,
    QuestionsComponent,
    UpdateQuestionsComponent,
    QuestionListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([QuestionState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

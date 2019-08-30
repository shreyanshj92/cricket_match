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
import { QuestionState } from "./+state/question.state";
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TeamState } from "./+state/teamformation/teamformation.state";
import { ScoreCardState } from "./+state/scoreboard/scoreboard.state";
import { environment } from "src/environments/environment";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardRoutingModule } from "./dashboard/dashboard-routing.module";
import { ScorecartComponent } from "./scorecart/scorecart.component";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";

@NgModule({
  declarations: [
    AppComponent,
    TeamFormationComponent,
    MainPageComponent,
    ScoreboardComponent,
    RulesComponent,
    QuestionsComponent,
    UpdateQuestionsComponent,
    QuestionListComponent,
    DashboardComponent,
    ScorecartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([QuestionState, TeamState, ScoreCardState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

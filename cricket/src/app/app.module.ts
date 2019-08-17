import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TeamFormationComponent } from "./team-formation/team-formation.component";
import { MainPageComponent } from "./main-page/main-page.component";

@NgModule({
  declarations: [AppComponent, TeamFormationComponent, MainPageComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

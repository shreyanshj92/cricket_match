import { Component, OnInit } from "@angular/core";
import { AppSettings } from "../Static/constants/appsetting";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.scss"]
})
export class MainPageComponent implements OnInit {
  title = AppSettings.MAIN_PAGE_TITLE;
  constructor() {}

  ngOnInit() {}
}

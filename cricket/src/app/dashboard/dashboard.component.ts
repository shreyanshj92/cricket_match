import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  // tslint:disable-next-line: no-shadowed-variable
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}
  navigateToHome(): void {
    this.router.navigate(["../home"], {
      relativeTo: this.route
    });
  }
  navigateToTeamFormation(): void {
    this.router.navigate(["../teamformation"], {
      relativeTo: this.route
    });
  }
  navigateToRule(): void {
    this.router.navigate(["../rules"], {
      relativeTo: this.route
    });
  }
  navigateToScoreboard(): void {
    this.router.navigate(["../scorecard"], {
      relativeTo: this.route
    });
  }
  navigateToQuestionList(): void {
    this.router.navigate(["../question-list"], {
      relativeTo: this.route
    });
  }
  navigateToAddQuestion(): void {
    this.router.navigate(["../question-add-form"], {
      relativeTo: this.route
    });
  }
}

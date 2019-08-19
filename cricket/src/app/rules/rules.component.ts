import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-rules",
  templateUrl: "./rules.component.html",
  styleUrls: ["./rules.component.scss"]
})
export class RulesComponent implements OnInit {
  rules = [
    {
      id: 1,
      rule: "Maximum 6 players should participet."
    },
    {
      id: 2,
      rule: "1 captain and 1 allrounder must be in your team."
    },
    {
      id: 3,
      rule: "2 batsman and 2 bowler must be in your team."
    },
    {
      id: 4,
      rule: "you have option to choose your team name."
    },
    {
      id: 5,
      rule: "1 kid must be in your team(age should be < 12 yrs)"
    },
    {
      id: 6,
      rule: "Each team bat and bowl 6 overs."
    },
    {
      id: 7,
      rule:
        "If anyone have queries discuss before starting your match. We will not consider it in the middle of match."
    }
  ];
  constructor() {}

  ngOnInit() {}
}

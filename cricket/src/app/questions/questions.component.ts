import { Component, OnInit } from "@angular/core";
import { ScoreCardService } from "../services/score-card.service";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.scss"]
})
export class QuestionsComponent implements OnInit {
  // nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  questionDeepCopy = [];
  questions = [];

  ranQuesDispaly: any;
  error: string;
  displayAnswer = false;
  startImageHide = true;
  constructor(private scoreCardService: ScoreCardService) {}

  ngOnInit() {
    this.questions = this.scoreCardService.getQuestions().questions;
    this.questionDeepCopy = JSON.parse(JSON.stringify(this.questions));
  }
  nextQuestion(questionObj: any): void {
    this.displayAnswer = false;
    this.startImageHide = false;
    var i = this.questions.length,
      j = 0;
    if (i) {
      j = Math.floor(Math.random() * (i + 1));
      if (this.questions[j]) {
        this.ranQuesDispaly = this.questions[j];
      } else {
        this.ranQuesDispaly = undefined;
        this.error = "Click here for next question";
      }
      this.questions.splice(j, 1);
    } else {
      this.ranQuesDispaly = undefined;
    }

    this.scoreCardService.updateScore(questionObj);
  }
  showAnswer(): void {
    this.displayAnswer = true;
  }
  catchOut() {
    const questionObj = {
      question: "bowled",
      answer: "Out",
      offeredRun: 0
    };
    this.nextQuestion(questionObj);
  }
}

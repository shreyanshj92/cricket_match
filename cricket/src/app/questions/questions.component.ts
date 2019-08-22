import { Component, OnInit } from "@angular/core";
import { ScoreCardService } from "../services/score-card.service";
import Swal from "sweetalert2";

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
    this.scoreCardService.fetchQuestions().subscribe((questionList: any) => {
      this.questions = questionList;
    });
    this.questionDeepCopy = JSON.parse(JSON.stringify(this.questions));
  }
  nextQuestion(questionObj: any): void {
    this.displayAnswer = false;
    this.startImageHide = false;
    const i = this.questions.length;
    let j = 0;
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
      answer: "bowled",
      offeredRun: 0
    };
    Swal.fire({
      type: "error",
      title: "Oops... Out",
      showConfirmButton: false,
      timer: 1500
    });
    this.nextQuestion(questionObj);
  }
}

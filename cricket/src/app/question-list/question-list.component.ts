import { QuestionModel } from "./../services/models/question.model";
import { ScoreCardService } from "./../services/score-card.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import {
  DeleteQuestion,
  GetQuestions,
  SetSelectedQuestion,
  AddQuestion
} from "../+state/cricket.actions";
import { QuestionState } from "../+state/cricket.state";
@Component({
  selector: "app-question-list",
  templateUrl: "./question-list.component.html",
  styleUrls: ["./question-list.component.scss"]
})
export class QuestionListComponent implements OnInit {
  @Select(QuestionState.getQuestionList) questions: Observable<QuestionModel[]>;
  constructor(
    private scoreCardService: ScoreCardService,
    private store: Store
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetQuestions());
  }
  deleteQuestion(id: number) {
    const resp = confirm(`Are you sure to delete ID: ${id}`);
    if (resp) {
      this.store.dispatch(new DeleteQuestion(id));
    }
  }

  editQuestion(payload: QuestionModel) {
    console.log(payload);
    this.store.dispatch(new SetSelectedQuestion(payload));
  }
}

import { QuestionModel } from "./../services/models/question.model";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import {
  DeleteQuestion,
  GetQuestions,
  SetSelectedQuestion,
  AddQuestion
} from "../+state/question.actions";
import { QuestionState } from "../+state/question.state";

@Component({
  selector: "app-question-list",
  templateUrl: "./question-list.component.html",
  styleUrls: ["./question-list.component.scss"]
})
export class QuestionListComponent implements OnInit {
  @Select(QuestionState.getQuestionList) questions: Observable<QuestionModel[]>;

  constructor(private store: Store) {}

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
    this.store.dispatch(new SetSelectedQuestion(payload));
  }
}

import { ScoreCardService } from "./../services/score-card.service";
import { QuestionModel } from "./../services/models/question.model";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store, Select } from "@ngxs/store";
import {
  AddQuestion,
  SetSelectedQuestion,
  UpdateQuestion
} from "../+state/cricket.actions";
import { Observable } from "rxjs";
import { QuestionState } from "../+state/cricket.state";

@Component({
  selector: "app-update-questions",
  templateUrl: "./update-questions.component.html",
  styleUrls: ["./update-questions.component.scss"]
})
export class UpdateQuestionsComponent implements OnInit {
  @Select(QuestionState.getSelectedQuestion) selectedQuestion: Observable<
    QuestionModel
  >;
  questionForm: FormGroup;
  editQuestion = false;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store,
    private router: Router,
    private scoreCardService: ScoreCardService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.selectedQuestion.subscribe(question => {
      if (question) {
        this.questionForm.patchValue({
          id: question.id,
          question: question.question,
          answer: question.answer,
          offeredRun: question.offeredRun
        });
        this.editQuestion = true;
      } else {
        this.editQuestion = false;
      }
    });
  }

  createForm() {
    this.questionForm = this.fb.group({
      id: [""],
      question: ["", Validators.required],
      answer: ["", Validators.required],
      offeredRun: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.editQuestion) {
      this.store
        .dispatch(
          new UpdateQuestion(
            this.questionForm.value,
            this.questionForm.value.id
          )
        )
        .subscribe(() => {
          this.clearForm();
        });
    } else {
      this.store
        .dispatch(new AddQuestion(this.questionForm.value))
        .subscribe(() => {
          this.clearForm();
        });
    }
    alert("Thankyou, Question saved successfully.");
  }

  clearForm() {
    this.questionForm.reset();
    this.store.dispatch(new SetSelectedQuestion(null));
  }
}

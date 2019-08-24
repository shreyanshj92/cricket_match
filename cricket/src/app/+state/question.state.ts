import { State, Action, StateContext, Selector } from "@ngxs/store";
import { QuestionModel } from "../services/models/question.model";
import {
  AddQuestion,
  DeleteQuestion,
  GetQuestions,
  SetSelectedQuestion,
  UpdateQuestion
} from "./question.actions";
import { tap } from "rxjs/operators";
import { QuestionUpdateService } from "../services/question-update/question-update.service";

export class QuestionStateModel {
  questions: QuestionModel[];
  selectedQuestion: QuestionModel;
}

@State<QuestionStateModel>({
  name: "questions",
  defaults: {
    questions: [],
    selectedQuestion: null
  }
})
export class QuestionState {
  constructor(private questionUpdateService: QuestionUpdateService) {}

  @Selector()
  static getQuestionList(state: QuestionStateModel) {
    return state.questions;
  }

  @Selector()
  static getSelectedQuestion(state: QuestionStateModel) {
    return state.selectedQuestion;
  }

  @Action(GetQuestions)
  geQuestions({ getState, setState }: StateContext<QuestionStateModel>) {
    return this.questionUpdateService.fetchQuestions().pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          questions: result
        });
      })
    );
  }

  @Action(AddQuestion)
  addQuestion(
    { getState, patchState }: StateContext<QuestionStateModel>,
    { payload }: AddQuestion
  ) {
    return this.questionUpdateService.addQuestion(payload).pipe(
      tap(result => {
        const state = getState();
        patchState({
          questions: [...state.questions, result]
        });
      })
    );
  }

  @Action(UpdateQuestion)
  updateQuestion(
    { getState, setState }: StateContext<QuestionStateModel>,
    { payload, id }: UpdateQuestion
  ) {
    return this.questionUpdateService.updateQuestion(payload, id).pipe(
      tap(result => {
        const state = getState();
        const questionList = [...state.questions];
        const questionIndex = questionList.findIndex(item => item.id === id);
        questionList[questionIndex] = result;
        setState({
          ...state,
          questions: questionList
        });
      })
    );
  }

  @Action(DeleteQuestion)
  deleteQuestion(
    { getState, setState }: StateContext<QuestionStateModel>,
    { id }: DeleteQuestion
  ) {
    return this.questionUpdateService.deleteQuestion(id).pipe(
      tap(() => {
        const state = getState();
        const filteredArray = state.questions.filter(item => item.id !== id);
        setState({
          ...state,
          questions: filteredArray
        });
      })
    );
  }

  @Action(SetSelectedQuestion)
  setSelectedQuestionId(
    { getState, setState }: StateContext<QuestionStateModel>,
    { payload }: SetSelectedQuestion
  ) {
    const state = getState();
    console.log(state);
    setState({
      ...state,
      selectedQuestion: payload
    });
  }
}

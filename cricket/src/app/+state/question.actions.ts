import { QuestionModel } from "../services/models/question.model";
export class AddQuestion {
  static readonly type = "[USER] Add";

  constructor(public payload: QuestionModel) {}
}

export class GetQuestions {
  static readonly type = "[USER] Get";
}

export class UpdateQuestion {
  static readonly type = "[USER] Update";

  constructor(public payload: QuestionModel, public id: number) {}
}

export class DeleteQuestion {
  static readonly type = "[USER] Delete";

  constructor(public id: number) {}
}

export class SetSelectedQuestion {
  static readonly type = "[USER] Set";

  constructor(public payload: QuestionModel) {}
}

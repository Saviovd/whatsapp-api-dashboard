export interface QuestionnaireItem {
  question: string;
  answer: string;
}

export interface Driver {
  _id: string;
  name: string;
  index?: number;
  cpf: string;
  phone: string;
  registerDate?: string;
  finalized?: boolean;
  questionnaire: QuestionnaireItem[];
}

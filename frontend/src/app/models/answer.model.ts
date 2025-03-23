import { Question } from './question.model';

export interface Answer {
  question: Question;
  userAnswer: number;
}
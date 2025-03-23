import { Question } from './question.model';

export interface Result {
  question: Question;
  userAnswer: number;
  correctAnswer: number;
  correct: boolean;
}
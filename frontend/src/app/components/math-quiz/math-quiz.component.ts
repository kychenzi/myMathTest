import { Component, OnInit } from '@angular/core';
import { MathQuizService } from '../../services/math-quiz.service';
import { Question } from '../../models/question.model';
import { Answer } from '../../models/answer.model';
import { Result } from '../../models/result.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-math-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './math-quiz.component.html',
  styleUrls: ['./math-quiz.component.css']
})
export class MathQuizComponent implements OnInit {
  questions: Question[] = [];
  answers: number[] = new Array(10).fill(0);
  results: Result[] | null = null;
  submitted = false;

  constructor(private quizService: MathQuizService) { }

  ngOnInit() {
    this.loadQuiz();
  }

  loadQuiz() {
    this.quizService.getQuiz().subscribe(questions => {
      this.questions = questions;
      this.answers = new Array(questions.length).fill(0);
      this.results = null;
      this.submitted = false;
    });
  }

  submitQuiz() {
    const answers: Answer[] = this.questions.map((question, index) => ({
      question,
      userAnswer: this.answers[index]
    }));

    this.quizService.submitAnswers(answers).subscribe(results => {
      this.results = results;
      this.submitted = true;
    });
  }

  getQuestionText(question: Question): string {
    return `${question.num1} ${question.operator} ${question.num2} = `;
  }
}
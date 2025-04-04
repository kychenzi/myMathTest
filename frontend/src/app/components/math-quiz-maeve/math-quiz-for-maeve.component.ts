import { Component, OnInit } from '@angular/core';
import { MathQuizService } from '../../services/math-quiz.service';
import { Question } from '../../models/question.model';
import { Answer } from '../../models/answer.model';
import { Result } from '../../models/result.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-math-quiz-for-maeve',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './math-quiz-for-maeve.component.html',
  styleUrls: ['./math-quiz-for-maeve.component.css']
})
export class MathQuizForMaeveComponent implements OnInit {
  questions: Question[] = [];
  answers: number[] = new Array(10).fill(0);
  results: Result[] | null = null;
  submitted = false;
  startTime: number | null = null; // 開始時間（毫秒）
  timeTaken: string | null = null; // 所花時間（格式化後）

  constructor(private quizService: MathQuizService) { }

  ngOnInit() {
    this.loadQuiz();
  }

  loadQuiz() {
    this.quizService.getQuizForMaeve().subscribe(questions => {
      this.questions = questions;
      this.answers = new Array(questions.length).fill(0);
      this.results = null;
      this.submitted = false;
      this.startTime = Date.now(); // 記錄開始時間
      this.timeTaken = null;
    });
  }

  submitQuiz() {
    const endTime = Date.now(); // 記錄結束時間
    const timeDiff = (endTime - (this.startTime || 0)) / 1000; // 計算秒數
    this.timeTaken = timeDiff.toFixed(2) + ' 秒'; // 格式化為秒，保留兩位小數
    
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
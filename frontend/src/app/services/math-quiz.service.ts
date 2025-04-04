import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';
import { Answer } from '../models/answer.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class MathQuizService {
  private apiUrl = 'http://localhost:8080/api/quiz'; // 根據你的 Spring Boot 服務地址修改

  constructor(private http: HttpClient) { }

  getQuiz(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/generate`);
  }

  getQuizForBaron(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/generateForBaron`);
  }

  getQuizForMaeve(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/generateForMaeve`);
  }


  submitAnswers(answers: Answer[]): Observable<Result[]> {
    return this.http.post<Result[]>(`${this.apiUrl}/submit`, answers);
  }
}
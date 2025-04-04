// import { Routes } from '@angular/router';
//
// export const routes: Routes = [];

import { Routes } from '@angular/router';
import { MathQuizComponent } from './components/math-quiz/math-quiz.component';
import { MathQuizForBaronComponent } from './components/math-quiz-baron/math-quiz-for-baron.component';
import { MathQuizForMaeveComponent } from './components/math-quiz-maeve/math-quiz-for-maeve.component';

export const routes: Routes = [
  { path: '', component: MathQuizComponent },
  { path: 'baron', component: MathQuizForBaronComponent },
  { path: 'maeve', component: MathQuizForMaeveComponent }
];

package com.kuangyu.myMathTest.controller;

import com.kuangyu.myMathTest.model.Answer;
import com.kuangyu.myMathTest.model.Question;
import com.kuangyu.myMathTest.model.Result;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class MathQuizController {
    private final Random random = new Random();

    @GetMapping("/generate")
    public List<Question> generateQuiz() {
        List<Question> quiz = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            quiz.add(generateQuestion());
        }
        return quiz;
    }

    @PostMapping("/submit")
    public List<Result> submitQuiz(@RequestBody List<Answer> answers) {
        List<Result> results = new ArrayList<>();
        for (Answer answer : answers) {
            int correctAnswer = calculateAnswer(answer.getQuestion());
            results.add(new Result(answer.getQuestion(), answer.getUserAnswer(), correctAnswer, answer.getUserAnswer() == correctAnswer));
        }
        return results;
    }

    private Question generateQuestion() {
        //陳柏榕
        char[] operators = {'+', '-', '*', '/'};
        char operator = operators[random.nextInt(operators.length)];
        int num1 = 0;
        int num2 = 0;
        int tmp = 0;
        switch (operator) {
            case '*':
                num1 = random.nextInt(1000);
                num2 = random.nextInt(10) + 1; // 防止乘以 0
                break;
            case '/':
                num1 = random.nextInt(900) + 100;
                num2 = random.nextInt(10) + 1; // 防止除以 0
                break;
            case '+':
                num1 = random.nextInt(1000) + 10;
                num2 = random.nextInt(1000) + 1; // 防止除以 0
                break;
            case '-':
                num1 = random.nextInt(1000);
                num2 = random.nextInt(1000);
                if (num1 < num2) {
                    tmp = num1;
                    num1 = num2;
                    num2 = tmp;
                } // 防止小減大
                break;
        }

        //陳美伊
//        char[] operators = {'+', '-', '*'};
//        char operator = operators[random.nextInt(operators.length)];
//        int num1 = 0;
//        int num2 = 0;
//        int tmp = 0;
//        switch (operator) {
//            case '*':
//                num1 = random.nextInt(10);
//                num2 = random.nextInt(10); // 防止乘以 0
//                break;
//            case '+':
//                num1 = random.nextInt(1000) + 10;
//                num2 = random.nextInt(1000) + 1; // 防止除以 0
//                break;
//            case '-':
//                num1 = random.nextInt(1000);
//                num2 = random.nextInt(1000);
//                if (num1 < num2) {
//                    tmp = num1;
//                    num1 = num2;
//                    num2 = tmp;
//                } // 防止小減大
//                break;
//        }
        return new Question(num1, num2, operator);
    }

    private int calculateAnswer(Question question) {
        return switch (question.getOperator()) {
            case '+' -> question.getNum1() + question.getNum2();
            case '-' -> question.getNum1() - question.getNum2();
            case '*' -> question.getNum1() * question.getNum2();
            case '/' -> question.getNum1() / question.getNum2();
            default -> 0;
        };
    }
}

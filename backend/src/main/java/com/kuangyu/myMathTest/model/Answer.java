package com.kuangyu.myMathTest.model;

public class Answer {
    private Question question;
    private int userAnswer;

    public Answer() {}

    public Answer(Question question, int userAnswer) {
        this.question = question;
        this.userAnswer = userAnswer;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public int getUserAnswer() {
        return userAnswer;
    }

    public void setUserAnswer(int userAnswer) {
        this.userAnswer = userAnswer;
    }
}

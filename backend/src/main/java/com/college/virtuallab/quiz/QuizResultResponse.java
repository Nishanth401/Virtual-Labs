package com.college.virtuallab.quiz;

import java.util.List;

public class QuizResultResponse {
    private Long attemptId;
    private Integer score;
    private Integer totalQuestions;
    private Integer percentage;
    private boolean passed;
    private List<QuestionReview> reviews;

    public static class QuestionReview {
        private String questionText;
        private List<String> options;
        private Integer selectedOptionIndex;
        private Integer correctOptionIndex;
        private boolean isCorrect;
        private String explanation;

        public QuestionReview(String questionText, List<String> options, Integer selectedOptionIndex, Integer correctOptionIndex, boolean isCorrect, String explanation) {
            this.questionText = questionText;
            this.options = options;
            this.selectedOptionIndex = selectedOptionIndex;
            this.correctOptionIndex = correctOptionIndex;
            this.isCorrect = isCorrect;
            this.explanation = explanation;
        }

        public String getQuestionText() {
            return questionText;
        }

        public List<String> getOptions() {
            return options;
        }

        public Integer getSelectedOptionIndex() {
            return selectedOptionIndex;
        }

        public Integer getCorrectOptionIndex() {
            return correctOptionIndex;
        }

        public boolean isCorrect() {
            return isCorrect;
        }

        public String getExplanation() {
            return explanation;
        }
    }

    public QuizResultResponse(Long attemptId, Integer score, Integer totalQuestions, Integer percentage, boolean passed, List<QuestionReview> reviews) {
        this.attemptId = attemptId;
        this.score = score;
        this.totalQuestions = totalQuestions;
        this.percentage = percentage;
        this.passed = passed;
        this.reviews = reviews;
    }

    public Long getAttemptId() {
        return attemptId;
    }

    public Integer getScore() {
        return score;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public Integer getPercentage() {
        return percentage;
    }

    public boolean isPassed() {
        return passed;
    }

    public List<QuestionReview> getReviews() {
        return reviews;
    }
}

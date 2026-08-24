package com.college.virtuallab.quiz;

import com.college.virtuallab.common.ResourceNotFoundException;
import com.college.virtuallab.experiment.Experiment;
import com.college.virtuallab.progress.ProgressService;
import com.college.virtuallab.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final ProgressService progressService;

    public QuizService(QuizRepository quizRepository, QuizAttemptRepository quizAttemptRepository, ProgressService progressService) {
        this.quizRepository = quizRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.progressService = progressService;
    }

    public Quiz getQuizByExperimentSlug(String experimentSlug) {
        return quizRepository.findByExperimentSlug(experimentSlug)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found for experiment: " + experimentSlug));
    }

    public QuizResultResponse submitQuiz(Long quizId, QuizSubmitRequest request, User user) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        List<Question> questions = quiz.getQuestions();
        Map<Integer, Integer> answers = request.getAnswers();

        int correctCount = 0;
        List<QuizResultResponse.QuestionReview> reviews = new ArrayList<>();

        for (int i = 0; i < questions.size(); i++) {
            Question q = questions.get(i);
            Integer selectedOption = answers != null ? answers.get(i) : null;
            boolean isCorrect = selectedOption != null && selectedOption.equals(q.getCorrectOptionIndex());

            if (isCorrect) {
                correctCount++;
            }

            reviews.add(new QuizResultResponse.QuestionReview(
                    q.getQuestionText(),
                    q.getOptions(),
                    selectedOption,
                    q.getCorrectOptionIndex(),
                    isCorrect,
                    q.getExplanation()
            ));
        }

        int total = questions.size();
        int percentage = total > 0 ? (int) Math.round(((double) correctCount / total) * 100) : 0;
        boolean passed = percentage >= quiz.getPassingScorePercentage();

        QuizAttempt attempt = new QuizAttempt(user, quiz, correctCount, total, percentage, passed);
        QuizAttempt savedAttempt = quizAttemptRepository.save(attempt);

        // Update student progress record
        Experiment experiment = quiz.getExperiment();
        if (experiment != null) {
            progressService.recordQuizAttempt(user, experiment, percentage, passed);
        }

        return new QuizResultResponse(
                savedAttempt.getId(),
                correctCount,
                total,
                percentage,
                passed,
                reviews
        );
    }

    public List<QuizAttempt> getUserAttempts(Long userId) {
        return quizAttemptRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }
}

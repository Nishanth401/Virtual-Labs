package com.college.virtuallab.quiz;

import com.college.virtuallab.common.ApiResponse;
import com.college.virtuallab.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
@Tag(name = "Self-Assessment Quizzes", description = "Endpoints for experiment quizzes, submissions, and grading")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/experiment/{slug}")
    @Operation(summary = "Get quiz questions for a specific experiment slug")
    public ResponseEntity<ApiResponse<Quiz>> getQuizByExperiment(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(quizService.getQuizByExperimentSlug(slug)));
    }

    @PostMapping("/{quizId}/submit")
    @Operation(summary = "Submit quiz answers and receive instant scoring and explanations")
    public ResponseEntity<ApiResponse<QuizResultResponse>> submitQuiz(
            @PathVariable Long quizId,
            @RequestBody QuizSubmitRequest request,
            @AuthenticationPrincipal User user) {
        QuizResultResponse response = quizService.submitQuiz(quizId, request, user);
        return ResponseEntity.ok(ApiResponse.ok("Quiz evaluated successfully", response));
    }

    @GetMapping("/my-attempts")
    @Operation(summary = "Get quiz attempt history for the logged-in student")
    public ResponseEntity<ApiResponse<List<QuizAttempt>>> getMyAttempts(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.ok(quizService.getUserAttempts(user.getId())));
    }
}

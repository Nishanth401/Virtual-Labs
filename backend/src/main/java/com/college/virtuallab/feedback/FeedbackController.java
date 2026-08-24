package com.college.virtuallab.feedback;

import com.college.virtuallab.common.ApiResponse;
import com.college.virtuallab.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
@Tag(name = "Feedback & Reviews", description = "Endpoints for student feedback and ratings submission")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @PostMapping
    @Operation(summary = "Submit student feedback or review")
    public ResponseEntity<ApiResponse<Feedback>> submitFeedback(
            @RequestBody Feedback feedback,
            @AuthenticationPrincipal User user) {
        Feedback saved = feedbackService.submitFeedback(feedback, user);
        return ResponseEntity.ok(ApiResponse.ok("Feedback submitted successfully", saved));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('FACULTY', 'DEPARTMENT_ADMIN')")
    @Operation(summary = "View all submitted feedbacks (Faculty/Admin only)")
    public ResponseEntity<ApiResponse<List<Feedback>>> getAllFeedbacks() {
        return ResponseEntity.ok(ApiResponse.ok(feedbackService.getAllFeedbacks()));
    }
}

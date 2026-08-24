package com.college.virtuallab.progress;

import com.college.virtuallab.common.ApiResponse;
import com.college.virtuallab.experiment.Experiment;
import com.college.virtuallab.experiment.ExperimentService;
import com.college.virtuallab.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/progress")
@Tag(name = "Student Progress", description = "Endpoints for tracking student completed experiments, ratings, and time spent")
public class ProgressController {

    private final ProgressService progressService;
    private final ExperimentService experimentService;

    public ProgressController(ProgressService progressService, ExperimentService experimentService) {
        this.progressService = progressService;
        this.experimentService = experimentService;
    }

    @GetMapping
    @Operation(summary = "Get current logged-in student progress history")
    public ResponseEntity<ApiResponse<List<StudentProgress>>> getMyProgress(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.ok(progressService.getUserProgress(user.getId())));
    }

    @PostMapping("/experiments/{slug}")
    @Operation(summary = "Update progress or submit ratings/feedback for an experiment")
    public ResponseEntity<ApiResponse<StudentProgress>> updateProgress(
            @PathVariable String slug,
            @RequestBody ProgressUpdateRequest request,
            @AuthenticationPrincipal User user) {
        Experiment experiment = experimentService.getExperimentBySlug(slug);
        StudentProgress progress = progressService.updateExperimentProgress(user, experiment, request);
        return ResponseEntity.ok(ApiResponse.ok("Progress updated successfully", progress));
    }
}

package com.college.virtuallab.experiment;

import com.college.virtuallab.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/experiments")
@Tag(name = "Experiments", description = "Endpoints for laboratory experiments, theory, simulation instructions, and procedures")
public class ExperimentController {

    private final ExperimentService experimentService;

    public ExperimentController(ExperimentService experimentService) {
        this.experimentService = experimentService;
    }

    @GetMapping
    @Operation(summary = "Get all experiments with optional lab filter")
    public ResponseEntity<ApiResponse<List<Experiment>>> getExperiments(@RequestParam(required = false) String labSlug) {
        if (labSlug != null && !labSlug.isEmpty()) {
            return ResponseEntity.ok(ApiResponse.ok(experimentService.getExperimentsByLab(labSlug)));
        }
        return ResponseEntity.ok(ApiResponse.ok(experimentService.getAllExperiments()));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get experiment workspace details by slug (e.g., stack-operations, bubble-sort)")
    public ResponseEntity<ApiResponse<Experiment>> getExperimentBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(experimentService.getExperimentBySlug(slug)));
    }
}

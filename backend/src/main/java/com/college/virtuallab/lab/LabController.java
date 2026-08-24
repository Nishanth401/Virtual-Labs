package com.college.virtuallab.lab;

import com.college.virtuallab.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/labs")
@Tag(name = "Virtual Labs", description = "Endpoints for department laboratory catalogues and metadata")
public class LabController {

    private final LabService labService;

    public LabController(LabService labService) {
        this.labService = labService;
    }

    @GetMapping
    @Operation(summary = "Get all virtual labs with optional category filter")
    public ResponseEntity<ApiResponse<List<Lab>>> getAllLabs(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return ResponseEntity.ok(ApiResponse.ok(labService.getLabsByCategory(category)));
        }
        return ResponseEntity.ok(ApiResponse.ok(labService.getAllLabs()));
    }

    @GetMapping("/{slug}")
    @Operation(summary = "Get specific lab and its experiments by slug (e.g. data-structures)")
    public ResponseEntity<ApiResponse<Lab>> getLabBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.ok(labService.getLabBySlug(slug)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('FACULTY', 'LAB_ADMIN', 'DEPARTMENT_ADMIN')")
    @Operation(summary = "Create a new virtual lab (Faculty/Admin only)")
    public ResponseEntity<ApiResponse<Lab>> createLab(@RequestBody Lab lab) {
        return ResponseEntity.ok(ApiResponse.ok("Lab created successfully", labService.createLab(lab)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('FACULTY', 'LAB_ADMIN', 'DEPARTMENT_ADMIN')")
    @Operation(summary = "Update an existing virtual lab (Faculty/Admin only)")
    public ResponseEntity<ApiResponse<Lab>> updateLab(@PathVariable Long id, @RequestBody Lab lab) {
        return ResponseEntity.ok(ApiResponse.ok("Lab updated successfully", labService.updateLab(id, lab)));
    }
}

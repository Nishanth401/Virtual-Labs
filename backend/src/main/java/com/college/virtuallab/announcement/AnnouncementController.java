package com.college.virtuallab.announcement;

import com.college.virtuallab.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/announcements")
@Tag(name = "Announcements & Notices", description = "Endpoints for department news, circulars, workshops, and exam schedules")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

    @GetMapping
    @Operation(summary = "Get department announcements with optional category filter")
    public ResponseEntity<ApiResponse<List<Announcement>>> getAnnouncements(@RequestParam(required = false) String category) {
        if (category != null && !category.isEmpty()) {
            return ResponseEntity.ok(ApiResponse.ok(announcementService.getAnnouncementsByCategory(category)));
        }
        return ResponseEntity.ok(ApiResponse.ok(announcementService.getAllAnnouncements()));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('FACULTY', 'DEPARTMENT_ADMIN')")
    @Operation(summary = "Publish a new announcement (Faculty/Admin only)")
    public ResponseEntity<ApiResponse<Announcement>> createAnnouncement(@RequestBody Announcement announcement) {
        return ResponseEntity.ok(ApiResponse.ok("Announcement published successfully", announcementService.createAnnouncement(announcement)));
    }
}

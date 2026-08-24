package com.college.virtuallab.department;

import com.college.virtuallab.common.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@Tag(name = "Department & Curriculum", description = "Endpoints for department overview and semester courses")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping("/departments")
    @Operation(summary = "Get list of engineering departments")
    public ResponseEntity<ApiResponse<List<Department>>> getDepartments() {
        return ResponseEntity.ok(ApiResponse.ok(departmentService.getAllDepartments()));
    }

    @GetMapping("/departments/{code}")
    @Operation(summary = "Get specific department details by code (e.g., AIDS)")
    public ResponseEntity<ApiResponse<Department>> getDepartment(@PathVariable String code) {
        return ResponseEntity.ok(ApiResponse.ok(departmentService.getDepartmentByCode(code)));
    }

    @GetMapping("/courses")
    @Operation(summary = "Get all department curriculum courses with optional semester filter")
    public ResponseEntity<ApiResponse<List<Course>>> getCourses(@RequestParam(required = false) Integer semester) {
        if (semester != null) {
            return ResponseEntity.ok(ApiResponse.ok(departmentService.getCoursesBySemester(semester)));
        }
        return ResponseEntity.ok(ApiResponse.ok(departmentService.getAllCourses()));
    }

    @GetMapping("/courses/{code}")
    @Operation(summary = "Get course details by course code (e.g., CS301)")
    public ResponseEntity<ApiResponse<Course>> getCourse(@PathVariable String code) {
        return ResponseEntity.ok(ApiResponse.ok(departmentService.getCourseByCode(code)));
    }
}

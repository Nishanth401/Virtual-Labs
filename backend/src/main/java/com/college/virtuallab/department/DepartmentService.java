package com.college.virtuallab.department;

import com.college.virtuallab.common.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final CourseRepository courseRepository;

    public DepartmentService(DepartmentRepository departmentRepository, CourseRepository courseRepository) {
        this.departmentRepository = departmentRepository;
        this.courseRepository = courseRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentByCode(String code) {
        return departmentRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Department not found with code: " + code));
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getCoursesBySemester(Integer semester) {
        return courseRepository.findBySemester(semester);
    }

    public Course getCourseByCode(String code) {
        return courseRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with code: " + code));
    }

    @Transactional
    public Department saveDepartment(Department department) {
        return departmentRepository.save(department);
    }

    @Transactional
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }
}

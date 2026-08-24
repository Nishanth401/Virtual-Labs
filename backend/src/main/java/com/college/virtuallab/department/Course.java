package com.college.virtuallab.department;

import com.college.virtuallab.common.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "courses")
public class Course extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    private Integer semester;

    private Double credits;

    private String type; // Foundation, Core, Advanced, Elective

    @Column(columnDefinition = "TEXT")
    private String description;

    private Integer resourcesCount = 0;

    private String icon;

    private boolean isLab = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    @JsonIgnore
    private Department department;

    public Course() {
    }

    public Course(String code, String name, Integer semester, Double credits, String type, String description, Integer resourcesCount, String icon, boolean isLab) {
        this.code = code;
        this.name = name;
        this.semester = semester;
        this.credits = credits;
        this.type = type;
        this.description = description;
        this.resourcesCount = resourcesCount;
        this.icon = icon;
        this.isLab = isLab;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public Double getCredits() {
        return credits;
    }

    public void setCredits(Double credits) {
        this.credits = credits;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getResourcesCount() {
        return resourcesCount;
    }

    public void setResourcesCount(Integer resourcesCount) {
        this.resourcesCount = resourcesCount;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public boolean isLab() {
        return isLab;
    }

    public void setLab(boolean lab) {
        isLab = lab;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
}

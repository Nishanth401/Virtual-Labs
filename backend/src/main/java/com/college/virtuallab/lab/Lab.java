package com.college.virtuallab.lab;

import com.college.virtuallab.common.BaseEntity;
import com.college.virtuallab.experiment.Experiment;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "labs")
public class Lab extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String slug; // e.g., 'data-structures', 'ml-lab', 'dbms-lab'

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String broadArea; // e.g., 'Computer Science & Engineering', 'Artificial Intelligence'

    private String category; // 'Core', 'Advanced', 'Foundation', 'Elective'

    private String difficulty; // 'Beginner', 'Intermediate', 'Advanced'

    private Integer estimatedHours = 6;

    private boolean available = true;

    private String icon; // Icon identifier

    @ElementCollection
    @CollectionTable(name = "lab_tags", joinColumns = @JoinColumn(name = "lab_id"))
    @Column(name = "tag")
    private List<String> tags = new ArrayList<>();

    @OneToMany(mappedBy = "lab", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Experiment> experiments = new ArrayList<>();

    public Lab() {
    }

    public Lab(String slug, String name, String description, String broadArea, String category, String difficulty, Integer estimatedHours, boolean available, String icon) {
        this.slug = slug;
        this.name = name;
        this.description = description;
        this.broadArea = broadArea;
        this.category = category;
        this.difficulty = difficulty;
        this.estimatedHours = estimatedHours;
        this.available = available;
        this.icon = icon;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBroadArea() {
        return broadArea;
    }

    public void setBroadArea(String broadArea) {
        this.broadArea = broadArea;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public Integer getEstimatedHours() {
        return estimatedHours;
    }

    public void setEstimatedHours(Integer estimatedHours) {
        this.estimatedHours = estimatedHours;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public List<Experiment> getExperiments() {
        return experiments;
    }

    public void setExperiments(List<Experiment> experiments) {
        this.experiments = experiments;
    }
}

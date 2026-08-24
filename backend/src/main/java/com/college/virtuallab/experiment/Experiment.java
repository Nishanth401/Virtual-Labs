package com.college.virtuallab.experiment;

import com.college.virtuallab.common.BaseEntity;
import com.college.virtuallab.lab.Lab;
import com.college.virtuallab.quiz.Quiz;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "experiments")
public class Experiment extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String objective;

    @Column(columnDefinition = "TEXT")
    private String prerequisites;

    @Column(columnDefinition = "TEXT")
    private String theoryMarkdown;

    @ElementCollection
    @CollectionTable(name = "experiment_procedures", joinColumns = @JoinColumn(name = "experiment_id"))
    @Column(name = "step", columnDefinition = "TEXT")
    private List<String> procedureSteps = new ArrayList<>();

    private String simulatorId;

    @Column(columnDefinition = "TEXT")
    private String codeSnippet;

    @Column(columnDefinition = "TEXT")
    private String expectedOutput;

    @Column(columnDefinition = "TEXT")
    private String learningOutcome;

    private Integer sequenceOrder = 1;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lab_id")
    @JsonBackReference
    private Lab lab;

    @OneToOne(mappedBy = "experiment", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Quiz quiz;

    public Experiment() {
    }

    public Experiment(String slug, String title, String objective, String prerequisites, String theoryMarkdown, String simulatorId, String codeSnippet, String expectedOutput, String learningOutcome, Integer sequenceOrder) {
        this.slug = slug;
        this.title = title;
        this.objective = objective;
        this.prerequisites = prerequisites;
        this.theoryMarkdown = theoryMarkdown;
        this.simulatorId = simulatorId;
        this.codeSnippet = codeSnippet;
        this.expectedOutput = expectedOutput;
        this.learningOutcome = learningOutcome;
        this.sequenceOrder = sequenceOrder;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getObjective() {
        return objective;
    }

    public void setObjective(String objective) {
        this.objective = objective;
    }

    public String getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(String prerequisites) {
        this.prerequisites = prerequisites;
    }

    public String getTheoryMarkdown() {
        return theoryMarkdown;
    }

    public void setTheoryMarkdown(String theoryMarkdown) {
        this.theoryMarkdown = theoryMarkdown;
    }

    public List<String> getProcedureSteps() {
        return procedureSteps;
    }

    public void setProcedureSteps(List<String> procedureSteps) {
        this.procedureSteps = procedureSteps;
    }

    public String getSimulatorId() {
        return simulatorId;
    }

    public void setSimulatorId(String simulatorId) {
        this.simulatorId = simulatorId;
    }

    public String getCodeSnippet() {
        return codeSnippet;
    }

    public void setCodeSnippet(String codeSnippet) {
        this.codeSnippet = codeSnippet;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }

    public String getLearningOutcome() {
        return learningOutcome;
    }

    public void setLearningOutcome(String learningOutcome) {
        this.learningOutcome = learningOutcome;
    }

    public Integer getSequenceOrder() {
        return sequenceOrder;
    }

    public void setSequenceOrder(Integer sequenceOrder) {
        this.sequenceOrder = sequenceOrder;
    }

    public Lab getLab() {
        return lab;
    }

    public void setLab(Lab lab) {
        this.lab = lab;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
}

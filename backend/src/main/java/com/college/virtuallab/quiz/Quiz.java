package com.college.virtuallab.quiz;

import com.college.virtuallab.common.BaseEntity;
import com.college.virtuallab.experiment.Experiment;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quizzes")
public class Quiz extends BaseEntity {

    @Column(nullable = false)
    private String title;

    private Integer passingScorePercentage = 75;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "experiment_id")
    @JsonBackReference
    private Experiment experiment;

    @OneToMany(mappedBy = "quiz", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Question> questions = new ArrayList<>();

    public Quiz() {
    }

    public Quiz(String title, Integer passingScorePercentage) {
        this.title = title;
        this.passingScorePercentage = passingScorePercentage;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getPassingScorePercentage() {
        return passingScorePercentage;
    }

    public void setPassingScorePercentage(Integer passingScorePercentage) {
        this.passingScorePercentage = passingScorePercentage;
    }

    public Experiment getExperiment() {
        return experiment;
    }

    public void setExperiment(Experiment experiment) {
        this.experiment = experiment;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }
}

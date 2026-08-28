package com.college.virtuallab.progress;

import com.college.virtuallab.common.BaseEntity;
import com.college.virtuallab.experiment.Experiment;
import com.college.virtuallab.user.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_progress", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "experiment_id"})
})
public class StudentProgress extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "password"})
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "experiment_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Experiment experiment;

    private boolean completed = false;
    private LocalDateTime completedAt;
    private Integer timeSpentSeconds = 0;
    private Integer rating;
    
    @Column(columnDefinition = "TEXT")
    private String feedbackComments;
    
    private Integer lastQuizScorePercentage;

    public StudentProgress() {
    }

    public StudentProgress(User user, Experiment experiment) {
        this.user = user;
        this.experiment = experiment;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Experiment getExperiment() {
        return experiment;
    }

    public void setExperiment(Experiment experiment) {
        this.experiment = experiment;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public Integer getTimeSpentSeconds() {
        return timeSpentSeconds;
    }

    public void setTimeSpentSeconds(Integer timeSpentSeconds) {
        this.timeSpentSeconds = timeSpentSeconds;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getFeedbackComments() {
        return feedbackComments;
    }

    public void setFeedbackComments(String feedbackComments) {
        this.feedbackComments = feedbackComments;
    }

    public Integer getLastQuizScorePercentage() {
        return lastQuizScorePercentage;
    }

    public void setLastQuizScorePercentage(Integer lastQuizScorePercentage) {
        this.lastQuizScorePercentage = lastQuizScorePercentage;
    }
}

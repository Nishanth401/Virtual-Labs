package com.college.virtuallab.progress;

import com.college.virtuallab.experiment.Experiment;
import com.college.virtuallab.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ProgressService {

    private final ProgressRepository progressRepository;

    public ProgressService(ProgressRepository progressRepository) {
        this.progressRepository = progressRepository;
    }

    public List<StudentProgress> getUserProgress(Long userId) {
        return progressRepository.findByUserId(userId);
    }

    public StudentProgress updateExperimentProgress(User user, Experiment experiment, ProgressUpdateRequest request) {
        StudentProgress progress = progressRepository.findByUserIdAndExperimentId(user.getId(), experiment.getId())
                .orElse(new StudentProgress(user, experiment));

        if (request.isCompleted()) {
            progress.setCompleted(true);
            if (progress.getCompletedAt() == null) {
                progress.setCompletedAt(LocalDateTime.now());
            }
        }

        if (request.getTimeSpentSeconds() != null) {
            int current = progress.getTimeSpentSeconds() != null ? progress.getTimeSpentSeconds() : 0;
            progress.setTimeSpentSeconds(current + request.getTimeSpentSeconds());
        }

        if (request.getRating() != null) {
            progress.setRating(request.getRating());
        }

        if (request.getFeedbackComments() != null) {
            progress.setFeedbackComments(request.getFeedbackComments());
        }

        return progressRepository.save(progress);
    }

    public void recordQuizAttempt(User user, Experiment experiment, Integer scorePercentage, boolean passed) {
        StudentProgress progress = progressRepository.findByUserIdAndExperimentId(user.getId(), experiment.getId())
                .orElse(new StudentProgress(user, experiment));

        progress.setLastQuizScorePercentage(scorePercentage);
        if (passed) {
            progress.setCompleted(true);
            if (progress.getCompletedAt() == null) {
                progress.setCompletedAt(LocalDateTime.now());
            }
        }

        progressRepository.save(progress);
    }
}

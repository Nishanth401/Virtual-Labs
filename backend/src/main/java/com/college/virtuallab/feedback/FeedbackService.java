package com.college.virtuallab.feedback;

import com.college.virtuallab.user.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackService(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAllByOrderByCreatedAtDesc();
    }

    public Feedback submitFeedback(Feedback feedback, User user) {
        if (user != null) {
            feedback.setUser(user);
            if (feedback.getStudentName() == null || feedback.getStudentName().isEmpty()) {
                feedback.setStudentName(user.getFullName());
            }
            if (feedback.getStudentEmail() == null || feedback.getStudentEmail().isEmpty()) {
                feedback.setStudentEmail(user.getEmail());
            }
            if (feedback.getDepartment() == null || feedback.getDepartment().isEmpty()) {
                feedback.setDepartment(user.getDepartment());
            }
        }
        return feedbackRepository.save(feedback);
    }
}

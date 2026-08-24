package com.college.virtuallab.quiz;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<QuizAttempt> findByQuizId(Long quizId);
}

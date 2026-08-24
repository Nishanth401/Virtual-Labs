package com.college.virtuallab.progress;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProgressRepository extends JpaRepository<StudentProgress, Long> {
    Optional<StudentProgress> findByUserIdAndExperimentId(Long userId, Long experimentId);
    List<StudentProgress> findByUserId(Long userId);
    List<StudentProgress> findByUserIdAndCompleted(Long userId, boolean completed);
}

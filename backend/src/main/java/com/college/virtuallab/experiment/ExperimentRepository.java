package com.college.virtuallab.experiment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExperimentRepository extends JpaRepository<Experiment, Long> {
    Optional<Experiment> findBySlug(String slug);
    List<Experiment> findByLabSlugOrderBySequenceOrderAsc(String labSlug);
}

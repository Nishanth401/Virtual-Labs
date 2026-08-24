package com.college.virtuallab.lab;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LabRepository extends JpaRepository<Lab, Long> {
    Optional<Lab> findBySlug(String slug);
    List<Lab> findByCategory(String category);
    List<Lab> findByBroadArea(String broadArea);
    List<Lab> findByAvailable(boolean available);
}

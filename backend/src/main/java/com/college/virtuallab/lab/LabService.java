package com.college.virtuallab.lab;

import com.college.virtuallab.common.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class LabService {

    private final LabRepository labRepository;

    public LabService(LabRepository labRepository) {
        this.labRepository = labRepository;
    }

    public List<Lab> getAllLabs() {
        return labRepository.findAll();
    }

    public Lab getLabBySlug(String slug) {
        return labRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Lab not found with slug: " + slug));
    }

    public List<Lab> getLabsByCategory(String category) {
        return labRepository.findByCategory(category);
    }

    @Transactional
    public Lab createLab(Lab lab) {
        return labRepository.save(lab);
    }

    @Transactional
    public Lab updateLab(Long id, Lab labDetails) {
        Lab lab = labRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lab not found with id: " + id));

        lab.setName(labDetails.getName());
        lab.setDescription(labDetails.getDescription());
        lab.setCategory(labDetails.getCategory());
        lab.setDifficulty(labDetails.getDifficulty());
        lab.setBroadArea(labDetails.getBroadArea());
        lab.setEstimatedHours(labDetails.getEstimatedHours());
        lab.setAvailable(labDetails.isAvailable());
        lab.setTags(labDetails.getTags());

        return labRepository.save(lab);
    }
}

package com.college.virtuallab.experiment;

import com.college.virtuallab.common.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class ExperimentService {

    private final ExperimentRepository experimentRepository;

    public ExperimentService(ExperimentRepository experimentRepository) {
        this.experimentRepository = experimentRepository;
    }

    public List<Experiment> getAllExperiments() {
        return experimentRepository.findAll();
    }

    public List<Experiment> getExperimentsByLab(String labSlug) {
        return experimentRepository.findByLabSlugOrderBySequenceOrderAsc(labSlug);
    }

    public Experiment getExperimentBySlug(String slug) {
        return experimentRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Experiment not found with slug: " + slug));
    }

    @Transactional
    public Experiment createExperiment(Experiment experiment) {
        return experimentRepository.save(experiment);
    }
}

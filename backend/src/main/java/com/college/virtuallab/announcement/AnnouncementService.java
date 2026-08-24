package com.college.virtuallab.announcement;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAllByOrderByPublishDateDesc();
    }

    public List<Announcement> getAnnouncementsByCategory(String category) {
        return announcementRepository.findByCategoryOrderByPublishDateDesc(category);
    }

    @Transactional
    public Announcement createAnnouncement(Announcement announcement) {
        return announcementRepository.save(announcement);
    }
}

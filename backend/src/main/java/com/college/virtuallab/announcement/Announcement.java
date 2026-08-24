package com.college.virtuallab.announcement;

import com.college.virtuallab.common.BaseEntity;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "announcements")
public class Announcement extends BaseEntity {

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category; // 'Notice', 'Circular', 'Workshop', 'Exam', 'Event'

    private LocalDate publishDate;

    private String targetAudience; // 'All Students', 'Faculty', 'Semester 3'

    private String linkUrl;

    private boolean pinned = false;

    public Announcement() {
    }

    public Announcement(String title, String description, String category, LocalDate publishDate, String targetAudience, String linkUrl, boolean pinned) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.publishDate = publishDate;
        this.targetAudience = targetAudience;
        this.linkUrl = linkUrl;
        this.pinned = pinned;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
    }

    public String getTargetAudience() {
        return targetAudience;
    }

    public void setTargetAudience(String targetAudience) {
        this.targetAudience = targetAudience;
    }

    public String getLinkUrl() {
        return linkUrl;
    }

    public void setLinkUrl(String linkUrl) {
        this.linkUrl = linkUrl;
    }

    public boolean isPinned() {
        return pinned;
    }

    public void setPinned(boolean pinned) {
        this.pinned = pinned;
    }
}

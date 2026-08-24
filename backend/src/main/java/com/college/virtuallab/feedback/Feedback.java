package com.college.virtuallab.feedback;

import com.college.virtuallab.common.BaseEntity;
import com.college.virtuallab.user.User;
import jakarta.persistence.*;

@Entity
@Table(name = "feedbacks")
public class Feedback extends BaseEntity {

    private String studentName;
    private String studentEmail;
    private String department;
    private String subjectOrLab;
    private Integer rating; // 1 to 5

    @Column(columnDefinition = "TEXT")
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Feedback() {
    }

    public Feedback(String studentName, String studentEmail, String department, String subjectOrLab, Integer rating, String message, User user) {
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.department = department;
        this.subjectOrLab = subjectOrLab;
        this.rating = rating;
        this.message = message;
        this.user = user;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSubjectOrLab() {
        return subjectOrLab;
    }

    public void setSubjectOrLab(String subjectOrLab) {
        this.subjectOrLab = subjectOrLab;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

package com.clubportal.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.clubportal.model.Announcement;
import com.clubportal.model.Club;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {

    // Tìm thông báo theo club
    List<Announcement> findByClub(Club club);

    // Tìm thông báo đã được publish của một club
    List<Announcement> findByClubAndIsPublishedTrueOrderByPublishedDateDesc(Club club);

    // Tìm thông báo quan trọng
    List<Announcement> findByIsImportantTrueAndIsPublishedTrueOrderByPublishedDateDesc();

    // Tìm thông báo theo tiêu đề chứa keyword
    @Query("SELECT a FROM Announcement a WHERE LOWER(a.title) LIKE LOWER(CONCAT('%', :keyword, '%')) AND a.isPublished = true")
    List<Announcement> findByTitleContainingIgnoreCaseAndIsPublishedTrue(@Param("keyword") String keyword);

    // Tìm thông báo theo khoảng thời gian
    List<Announcement> findByPublishedDateBetweenAndIsPublishedTrueOrderByPublishedDateDesc(
            LocalDateTime startDate, LocalDateTime endDate);

    // Đếm số lượng thông báo đã publish của club
    long countByClubAndIsPublishedTrue(Club club);

    // Tìm thông báo mới nhất của club
    @Query("SELECT a FROM Announcement a WHERE a.club = :club AND a.isPublished = true ORDER BY a.publishedDate DESC")
    List<Announcement> findLatestAnnouncementsByClub(@Param("club") Club club);
}
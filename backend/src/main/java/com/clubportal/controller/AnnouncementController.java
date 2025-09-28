package com.clubportal.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clubportal.dto.AnnouncementDTO;
import com.clubportal.service.AnnouncementService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins = "http://localhost:3000")
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    // Lấy tất cả thông báo đã publish
    @GetMapping
    public ResponseEntity<List<AnnouncementDTO>> getAllPublishedAnnouncements() {
        List<AnnouncementDTO> announcements = announcementService.getAllPublishedAnnouncements();
        return ResponseEntity.ok(announcements);
    }

    // Lấy thông báo theo club
    @GetMapping("/club/{clubId}")
    public ResponseEntity<List<AnnouncementDTO>> getAnnouncementsByClub(@PathVariable Long clubId) {
        List<AnnouncementDTO> announcements = announcementService.getAnnouncementsByClub(clubId);
        return ResponseEntity.ok(announcements);
    }

    // Lấy thông báo quan trọng
    @GetMapping("/important")
    public ResponseEntity<List<AnnouncementDTO>> getImportantAnnouncements() {
        List<AnnouncementDTO> announcements = announcementService.getImportantAnnouncements();
        return ResponseEntity.ok(announcements);
    }

    // Lấy thông báo theo ID
    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementDTO> getAnnouncementById(@PathVariable Long id) {
        Optional<AnnouncementDTO> announcement = announcementService.getAnnouncementById(id);
        return announcement.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Tạo thông báo mới
    @PostMapping
    public ResponseEntity<AnnouncementDTO> createAnnouncement(@Valid @RequestBody AnnouncementDTO announcementDTO) {
        Optional<AnnouncementDTO> createdAnnouncement = announcementService.createAnnouncement(announcementDTO);
        return createdAnnouncement.map(announcement -> ResponseEntity.status(HttpStatus.CREATED).body(announcement))
                .orElse(ResponseEntity.badRequest().build());
    }

    // Cập nhật thông báo
    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementDTO> updateAnnouncement(@PathVariable Long id,
            @Valid @RequestBody AnnouncementDTO announcementDTO) {
        Optional<AnnouncementDTO> updatedAnnouncement = announcementService.updateAnnouncement(id, announcementDTO);
        return updatedAnnouncement.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Xóa thông báo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long id) {
        boolean deleted = announcementService.deleteAnnouncement(id);
        return deleted ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    // Publish thông báo
    @PutMapping("/{id}/publish")
    public ResponseEntity<AnnouncementDTO> publishAnnouncement(@PathVariable Long id) {
        Optional<AnnouncementDTO> publishedAnnouncement = announcementService.publishAnnouncement(id);
        return publishedAnnouncement.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Tìm kiếm thông báo theo tiêu đề
    @GetMapping("/search")
    public ResponseEntity<List<AnnouncementDTO>> searchAnnouncements(@RequestParam String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<AnnouncementDTO> announcements = announcementService.searchAnnouncementsByTitle(keyword.trim());
        return ResponseEntity.ok(announcements);
    }

    // Exception handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Đã xảy ra lỗi: " + e.getMessage());
    }
}
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

import com.clubportal.dto.ClubDTO;
import com.clubportal.service.ClubService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/clubs")
@CrossOrigin(origins = "http://localhost:3000")
public class ClubController {

    @Autowired
    private ClubService clubService;

    // Lấy tất cả clubs
    @GetMapping
    public ResponseEntity<List<ClubDTO>> getAllClubs() {
        List<ClubDTO> clubs = clubService.getAllClubs();
        return ResponseEntity.ok(clubs);
    }

    // Lấy clubs đang hoạt động
    @GetMapping("/active")
    public ResponseEntity<List<ClubDTO>> getActiveClubs() {
        List<ClubDTO> clubs = clubService.getActiveClubs();
        return ResponseEntity.ok(clubs);
    }

    // Lấy club theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ClubDTO> getClubById(@PathVariable Long id) {
        Optional<ClubDTO> club = clubService.getClubById(id);
        return club.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Tạo club mới
    @PostMapping
    public ResponseEntity<ClubDTO> createClub(@Valid @RequestBody ClubDTO clubDTO) {
        try {
            ClubDTO createdClub = clubService.createClub(clubDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdClub);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    // Cập nhật club
    @PutMapping("/{id}")
    public ResponseEntity<ClubDTO> updateClub(@PathVariable Long id, @Valid @RequestBody ClubDTO clubDTO) {
        Optional<ClubDTO> updatedClub = clubService.updateClub(id, clubDTO);
        return updatedClub.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Xóa club
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClub(@PathVariable Long id) {
        boolean deleted = clubService.deleteClub(id);
        return deleted ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    // Tìm kiếm club theo tên
    @GetMapping("/search")
    public ResponseEntity<List<ClubDTO>> searchClubs(@RequestParam String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<ClubDTO> clubs = clubService.searchClubsByName(keyword.trim());
        return ResponseEntity.ok(clubs);
    }

    // Exception handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Đã xảy ra lỗi: " + e.getMessage());
    }
}
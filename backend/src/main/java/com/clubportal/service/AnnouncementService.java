package com.clubportal.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clubportal.dto.AnnouncementDTO;
import com.clubportal.model.Announcement;
import com.clubportal.model.Club;
import com.clubportal.repository.AnnouncementRepository;
import com.clubportal.repository.ClubRepository;

@Service
public class AnnouncementService {

    @Autowired
    private AnnouncementRepository announcementRepository;

    @Autowired
    private ClubRepository clubRepository;

    // Lấy tất cả thông báo đã publish
    public List<AnnouncementDTO> getAllPublishedAnnouncements() {
        return announcementRepository.findAll().stream()
                .filter(announcement -> announcement.getIsPublished())
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Lấy thông báo theo club
    public List<AnnouncementDTO> getAnnouncementsByClub(Long clubId) {
        Optional<Club> club = clubRepository.findById(clubId);
        if (club.isPresent()) {
            return announcementRepository.findByClubAndIsPublishedTrueOrderByPublishedDateDesc(club.get()).stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    // Lấy thông báo quan trọng
    public List<AnnouncementDTO> getImportantAnnouncements() {
        return announcementRepository.findByIsImportantTrueAndIsPublishedTrueOrderByPublishedDateDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Lấy thông báo theo ID
    public Optional<AnnouncementDTO> getAnnouncementById(Long id) {
        return announcementRepository.findById(id)
                .map(this::convertToDTO);
    }

    // Tạo thông báo mới
    public Optional<AnnouncementDTO> createAnnouncement(AnnouncementDTO announcementDTO) {
        Optional<Club> club = clubRepository.findById(announcementDTO.getClubId());
        if (club.isPresent()) {
            Announcement announcement = convertToEntity(announcementDTO, club.get());
            Announcement savedAnnouncement = announcementRepository.save(announcement);
            return Optional.of(convertToDTO(savedAnnouncement));
        }
        return Optional.empty();
    }

    // Cập nhật thông báo
    public Optional<AnnouncementDTO> updateAnnouncement(Long id, AnnouncementDTO announcementDTO) {
        return announcementRepository.findById(id)
                .map(existingAnnouncement -> {
                    updateAnnouncementFields(existingAnnouncement, announcementDTO);
                    Announcement updatedAnnouncement = announcementRepository.save(existingAnnouncement);
                    return convertToDTO(updatedAnnouncement);
                });
    }

    // Xóa thông báo
    public boolean deleteAnnouncement(Long id) {
        if (announcementRepository.existsById(id)) {
            announcementRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Publish thông báo
    public Optional<AnnouncementDTO> publishAnnouncement(Long id) {
        return announcementRepository.findById(id)
                .map(announcement -> {
                    announcement.setIsPublished(true);
                    announcement.setPublishedDate(LocalDateTime.now());
                    Announcement updatedAnnouncement = announcementRepository.save(announcement);
                    return convertToDTO(updatedAnnouncement);
                });
    }

    // Tìm kiếm thông báo theo tiêu đề
    public List<AnnouncementDTO> searchAnnouncementsByTitle(String keyword) {
        return announcementRepository.findByTitleContainingIgnoreCaseAndIsPublishedTrue(keyword).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Chuyển đổi Entity sang DTO
    private AnnouncementDTO convertToDTO(Announcement announcement) {
        AnnouncementDTO dto = new AnnouncementDTO();
        dto.setId(announcement.getId());
        dto.setTitle(announcement.getTitle());
        dto.setContent(announcement.getContent());
        dto.setAuthor(announcement.getAuthor());
        dto.setIsImportant(announcement.getIsImportant());
        dto.setIsPublished(announcement.getIsPublished());
        dto.setPublishedDate(announcement.getPublishedDate());
        dto.setCreatedAt(announcement.getCreatedAt());
        dto.setUpdatedAt(announcement.getUpdatedAt());
        dto.setClubId(announcement.getClub().getId());
        dto.setClubName(announcement.getClub().getName());
        return dto;
    }

    // Chuyển đổi DTO sang Entity
    private Announcement convertToEntity(AnnouncementDTO dto, Club club) {
        Announcement announcement = new Announcement();
        announcement.setTitle(dto.getTitle());
        announcement.setContent(dto.getContent());
        announcement.setAuthor(dto.getAuthor());
        announcement.setIsImportant(dto.getIsImportant() != null ? dto.getIsImportant() : false);
        announcement.setIsPublished(dto.getIsPublished() != null ? dto.getIsPublished() : false);
        announcement.setClub(club);
        return announcement;
    }

    // Cập nhật thông tin thông báo
    private void updateAnnouncementFields(Announcement existingAnnouncement, AnnouncementDTO dto) {
        if (dto.getTitle() != null) {
            existingAnnouncement.setTitle(dto.getTitle());
        }
        if (dto.getContent() != null) {
            existingAnnouncement.setContent(dto.getContent());
        }
        if (dto.getAuthor() != null) {
            existingAnnouncement.setAuthor(dto.getAuthor());
        }
        if (dto.getIsImportant() != null) {
            existingAnnouncement.setIsImportant(dto.getIsImportant());
        }
        if (dto.getIsPublished() != null) {
            existingAnnouncement.setIsPublished(dto.getIsPublished());
        }
    }
}
package com.clubportal.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clubportal.dto.ClubDTO;
import com.clubportal.model.Club;
import com.clubportal.repository.AnnouncementRepository;
import com.clubportal.repository.ClubRepository;

@Service
public class ClubService {

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private AnnouncementRepository announcementRepository;

    // Lấy tất cả clubs
    public List<ClubDTO> getAllClubs() {
        return clubRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Lấy clubs đang hoạt động
    public List<ClubDTO> getActiveClubs() {
        return clubRepository.findByIsActiveTrue().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Lấy club theo ID
    public Optional<ClubDTO> getClubById(Long id) {
        return clubRepository.findById(id)
                .map(this::convertToDTO);
    }

    // Tạo club mới
    public ClubDTO createClub(ClubDTO clubDTO) {
        Club club = convertToEntity(clubDTO);
        Club savedClub = clubRepository.save(club);
        return convertToDTO(savedClub);
    }

    // Cập nhật club
    public Optional<ClubDTO> updateClub(Long id, ClubDTO clubDTO) {
        return clubRepository.findById(id)
                .map(existingClub -> {
                    updateClubFields(existingClub, clubDTO);
                    Club updatedClub = clubRepository.save(existingClub);
                    return convertToDTO(updatedClub);
                });
    }

    // Xóa club
    public boolean deleteClub(Long id) {
        if (clubRepository.existsById(id)) {
            clubRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Tìm kiếm club theo tên
    public List<ClubDTO> searchClubsByName(String keyword) {
        return clubRepository.findByNameContainingIgnoreCase(keyword).stream()
                .map(this::convertToDTO)
                .collect((Collectors.toList()));
    }

    // Chuyển đổi Entity sang DTO
    private ClubDTO convertToDTO(Club club) {
        ClubDTO dto = new ClubDTO();
        dto.setId(club.getId());
        dto.setName(club.getName());
        dto.setDescription(club.getDescription());
        dto.setLogoUrl(club.getLogoUrl());
        dto.setFoundedDate(club.getFoundedDate());
        dto.setContactEmail(club.getContactEmail());
        dto.setContactPhone(club.getContactPhone());
        dto.setAddress(club.getAddress());
        dto.setIsActive(club.getIsActive());
        dto.setCreatedAt(club.getCreatedAt());
        dto.setUpdatedAt(club.getUpdatedAt());

        // Đếm số lượng thông báo
        int announcementCount = (int) announcementRepository.countByClubAndIsPublishedTrue(club);
        dto.setAnnouncementCount(announcementCount);

        return dto;
    }

    // Chuyển đổi DTO sang Entity
    private Club convertToEntity(ClubDTO dto) {
        Club club = new Club();
        club.setName(dto.getName());
        club.setDescription(dto.getDescription());
        club.setLogoUrl(dto.getLogoUrl());
        club.setFoundedDate(dto.getFoundedDate());
        club.setContactEmail(dto.getContactEmail());
        club.setContactPhone(dto.getContactPhone());
        club.setAddress(dto.getAddress());
        club.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);
        return club;
    }

    // Cập nhật thông tin club
    private void updateClubFields(Club existingClub, ClubDTO dto) {
        if (dto.getName() != null) {
            existingClub.setName(dto.getName());
        }
        if (dto.getDescription() != null) {
            existingClub.setDescription(dto.getDescription());
        }
        if (dto.getLogoUrl() != null) {
            existingClub.setLogoUrl(dto.getLogoUrl());
        }
        if (dto.getFoundedDate() != null) {
            existingClub.setFoundedDate(dto.getFoundedDate());
        }
        if (dto.getContactEmail() != null) {
            existingClub.setContactEmail(dto.getContactEmail());
        }
        if (dto.getContactPhone() != null) {
            existingClub.setContactPhone(dto.getContactPhone());
        }
        if (dto.getAddress() != null) {
            existingClub.setAddress(dto.getAddress());
        }
        if (dto.getIsActive() != null) {
            existingClub.setIsActive(dto.getIsActive());
        }
    }
}
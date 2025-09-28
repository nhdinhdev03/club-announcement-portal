package com.clubportal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.clubportal.model.Club;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {

    // Tìm club theo tên
    Optional<Club> findByName(String name);

    // Tìm các club đang hoạt động
    List<Club> findByIsActiveTrue();

    // Tìm club theo tên chứa keyword (không phân biệt hoa thường)
    @Query("SELECT c FROM Club c WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Club> findByNameContainingIgnoreCase(@Param("keyword") String keyword);

    // Tìm club theo email liên hệ
    Optional<Club> findByContactEmail(String contactEmail);

    // Đếm số lượng club đang hoạt động
    long countByIsActiveTrue();
}
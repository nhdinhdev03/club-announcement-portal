import axios from "axios";

// Sử dụng proxy của Vite - chỉ cần /api prefix
const API_BASE_URL = "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Club API
export const clubAPI = {
  // Lấy tất cả clubs
  getAllClubs: () => api.get("/clubs"),

  // Lấy clubs đang hoạt động
  getActiveClubs: () => api.get("/clubs/active"),

  // Lấy club theo ID
  getClubById: (id) => api.get(`/clubs/${id}`),

  // Tạo club mới
  createClub: (clubData) => api.post("/clubs", clubData),

  // Cập nhật club
  updateClub: (id, clubData) => api.put(`/clubs/${id}`, clubData),

  // Xóa club
  deleteClub: (id) => api.delete(`/clubs/${id}`),

  // Tìm kiếm club
  searchClubs: (keyword) =>
    api.get(`/clubs/search?keyword=${encodeURIComponent(keyword)}`),
};

// Announcement API
export const announcementAPI = {
  // Lấy tất cả thông báo đã publish
  getAllPublishedAnnouncements: () => api.get("/announcements"),

  // Lấy thông báo theo club
  getAnnouncementsByClub: (clubId) => api.get(`/announcements/club/${clubId}`),

  // Lấy thông báo quan trọng
  getImportantAnnouncements: () => api.get("/announcements/important"),

  // Lấy thông báo theo ID
  getAnnouncementById: (id) => api.get(`/announcements/${id}`),

  // Tạo thông báo mới
  createAnnouncement: (announcementData) =>
    api.post("/announcements", announcementData),

  // Cập nhật thông báo
  updateAnnouncement: (id, announcementData) =>
    api.put(`/announcements/${id}`, announcementData),

  // Xóa thông báo
  deleteAnnouncement: (id) => api.delete(`/announcements/${id}`),

  // Publish thông báo
  publishAnnouncement: (id) => api.put(`/announcements/${id}/publish`),

  // Tìm kiếm thông báo
  searchAnnouncements: (keyword) =>
    api.get(`/announcements/search?keyword=${encodeURIComponent(keyword)}`),
};

export default api;

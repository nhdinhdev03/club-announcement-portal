import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import {
  FaArrowLeft,
  FaBullhorn,
  FaClock,
  FaExclamationTriangle,
  FaUser,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { announcementAPI } from "../services/api";

const AnnouncementDetailPage = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnnouncement();
  }, [id]);

  const fetchAnnouncement = async () => {
    try {
      setLoading(true);
      const response = await announcementAPI.getAnnouncementById(id);
      setAnnouncement(response.data);
    } catch (err) {
      setError("Không thể tải thông tin thông báo. Vui lòng thử lại sau.");
      console.error("Error fetching announcement:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa rõ";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Đang tải thông tin thông báo...</p>
      </Container>
    );
  }

  if (error || !announcement) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error || "Không tìm thấy thông báo"}</Alert>
        <Link to="/announcements">
          <Button variant="outline-primary">
            <FaArrowLeft className="me-2" />
            Quay lại danh sách
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Back Button */}
      <div className="mb-3">
        <Link to="/announcements">
          <Button variant="outline-primary" size="sm">
            <FaArrowLeft className="me-2" />
            Quay lại danh sách
          </Button>
        </Link>
      </div>

      <Row>
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              {/* Header */}
              <div className="mb-4">
                <div className="d-flex align-items-start mb-3">
                  {announcement.isImportant && (
                    <FaExclamationTriangle className="text-danger me-2 mt-1" />
                  )}
                  <h1 className="mb-0">{announcement.title}</h1>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                  <Link to={`/clubs/${announcement.clubId}`}>
                    <Badge bg="primary" className="text-decoration-none">
                      {announcement.clubName}
                    </Badge>
                  </Link>
                  {announcement.isImportant && (
                    <Badge bg="danger">Quan trọng</Badge>
                  )}
                  {announcement.isPublished && (
                    <Badge bg="success">Đã đăng</Badge>
                  )}
                </div>

                <div className="text-muted small">
                  <div className="d-flex flex-wrap gap-3">
                    {announcement.author && (
                      <div className="d-flex align-items-center">
                        <FaUser className="me-1" />
                        <span>Tác giả: {announcement.author}</span>
                      </div>
                    )}
                    <div className="d-flex align-items-center">
                      <FaClock className="me-1" />
                      <span>
                        Đăng:{" "}
                        {formatDate(
                          announcement.publishedDate || announcement.createdAt
                        )}
                      </span>
                    </div>
                    {announcement.updatedAt &&
                      announcement.updatedAt !== announcement.createdAt && (
                        <div className="d-flex align-items-center">
                          <FaClock className="me-1" />
                          <span>
                            Cập nhật: {formatDate(announcement.updatedAt)}
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              <hr />

              {/* Content */}
              <div className="announcement-content">
                <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                  {announcement.content}
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Related Actions */}
          <div className="mt-4 text-center">
            <Link to={`/clubs/${announcement.clubId}`}>
              <Button variant="outline-primary">
                <FaBullhorn className="me-2" />
                Xem thêm thông báo từ {announcement.clubName}
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AnnouncementDetailPage;

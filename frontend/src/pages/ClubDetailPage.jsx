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
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import AnnouncementCard from "../components/AnnouncementCard";
import { announcementAPI, clubAPI } from "../services/api";

const ClubDetailPage = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClubData();
  }, [id]);

  const fetchClubData = async () => {
    try {
      setLoading(true);
      const [clubResponse, announcementsResponse] = await Promise.all([
        clubAPI.getClubById(id),
        announcementAPI.getAnnouncementsByClub(id),
      ]);

      setClub(clubResponse.data);
      setAnnouncements(announcementsResponse.data);
    } catch (err) {
      setError("Không thể tải thông tin câu lạc bộ. Vui lòng thử lại sau.");
      console.error("Error fetching club data:", err);
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
    });
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Đang tải thông tin câu lạc bộ...</p>
      </Container>
    );
  }

  if (error || !club) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error || "Không tìm thấy câu lạc bộ"}</Alert>
        <Link to="/clubs">
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
        <Link to="/clubs">
          <Button variant="outline-primary" size="sm">
            <FaArrowLeft className="me-2" />
            Quay lại danh sách
          </Button>
        </Link>
      </div>

      <Row>
        <Col lg={8}>
          {/* Club Info */}
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex align-items-start mb-3">
                {club.logoUrl && (
                  <img
                    src={club.logoUrl}
                    alt={`${club.name} logo`}
                    className="club-logo me-3"
                    style={{ width: "80px", height: "80px" }}
                  />
                )}
                <div className="flex-grow-1">
                  <h1 className="mb-2">{club.name}</h1>
                  <div className="mb-2">
                    {club.isActive ? (
                      <Badge bg="success" className="me-2">
                        Đang hoạt động
                      </Badge>
                    ) : (
                      <Badge bg="secondary" className="me-2">
                        Tạm dừng
                      </Badge>
                    )}
                    <Badge bg="info">{announcements.length} thông báo</Badge>
                  </div>
                </div>
              </div>

              {club.description && (
                <div className="mb-3">
                  <h5>Giới thiệu</h5>
                  <p>{club.description}</p>
                </div>
              )}

              <div className="mb-3">
                <h5>Thông tin liên hệ</h5>
                <div className="row">
                  {club.contactEmail && (
                    <div className="col-md-6 mb-2">
                      <FaEnvelope className="me-2 text-muted" />
                      <a href={`mailto:${club.contactEmail}`}>
                        {club.contactEmail}
                      </a>
                    </div>
                  )}
                  {club.contactPhone && (
                    <div className="col-md-6 mb-2">
                      <FaPhone className="me-2 text-muted" />
                      <a href={`tel:${club.contactPhone}`}>
                        {club.contactPhone}
                      </a>
                    </div>
                  )}
                  {club.address && (
                    <div className="col-12 mb-2">
                      <FaMapMarkerAlt className="me-2 text-muted" />
                      {club.address}
                    </div>
                  )}
                </div>
              </div>

              {club.foundedDate && (
                <div>
                  <strong>Ngày thành lập:</strong>{" "}
                  {formatDate(club.foundedDate)}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Quick Stats */}
          <Card className="mb-4">
            <Card.Body className="text-center">
              <FaBullhorn size={40} className="text-primary mb-3" />
              <h3 className="mb-1">{announcements.length}</h3>
              <p className="text-muted mb-0">Thông báo đã đăng</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Announcements */}
      <Row>
        <Col>
          <h2 className="mb-4">
            <FaBullhorn className="me-2" />
            Thông báo từ {club.name}
          </h2>

          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
              />
            ))
          ) : (
            <Card>
              <Card.Body className="text-center py-5">
                <FaBullhorn size={48} className="text-muted mb-3" />
                <h5>Chưa có thông báo nào</h5>
                <p className="text-muted">
                  {club.name} chưa đăng thông báo nào
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ClubDetailPage;

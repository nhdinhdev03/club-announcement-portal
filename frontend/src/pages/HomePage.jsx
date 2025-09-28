import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { FaArrowRight, FaBullhorn, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import AnnouncementCard from "../components/AnnouncementCard.jsx";
import { announcementAPI, clubAPI } from "../services/api";

const HomePage = () => {
  const [stats, setStats] = useState({ clubs: 0, announcements: 0 });
  const [recentAnnouncements, setRecentAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Lấy thống kê
      const [clubsResponse, announcementsResponse] = await Promise.all([
        clubAPI.getActiveClubs(),
        announcementAPI.getAllPublishedAnnouncements(),
      ]);

      setStats({
        clubs: clubsResponse.data.length,
        announcements: announcementsResponse.data.length,
      });

      // Lấy 5 thông báo mới nhất
      const sortedAnnouncements = announcementsResponse.data
        .sort(
          (a, b) =>
            new Date(b.publishedDate || b.createdAt) -
            new Date(a.publishedDate || a.createdAt)
        )
        .slice(0, 5);

      setRecentAnnouncements(sortedAnnouncements);
    } catch (err) {
      setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Đang tải...</p>
      </Container>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className="display-4 mb-4">Club Announcement Portal</h1>
              <p className="lead mb-4">
                Hệ thống quản lý câu lạc bộ và thông báo tập trung
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/clubs">
                  <Button variant="light" size="lg">
                    <FaUsers className="me-2" />
                    Xem câu lạc bộ
                  </Button>
                </Link>
                <Link to="/announcements">
                  <Button variant="outline-light" size="lg">
                    <FaBullhorn className="me-2" />
                    Xem thông báo
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <Container className="my-5">
        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        <Row className="mb-5">
          <Col md={6}>
            <Card className="stats-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <FaUsers className="text-primary" size={40} />
                  <div className="ms-3">
                    <h3 className="mb-0">{stats.clubs}</h3>
                    <p className="text-muted mb-0">Câu lạc bộ hoạt động</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="stats-card">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <FaBullhorn className="text-success" size={40} />
                  <div className="ms-3">
                    <h3 className="mb-0">{stats.announcements}</h3>
                    <p className="text-muted mb-0">Thông báo đã đăng</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Announcements */}
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Thông báo mới nhất</h2>
              <Link to="/announcements">
                <Button variant="outline-primary">
                  Xem tất cả
                  <FaArrowRight className="ms-2" />
                </Button>
              </Link>
            </div>

            {recentAnnouncements.length > 0 ? (
              recentAnnouncements.map((announcement) => (
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
                    Các thông báo mới sẽ hiển thị tại đây
                  </p>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;

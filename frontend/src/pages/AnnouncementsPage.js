import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { FaBullhorn, FaExclamationTriangle, FaSearch } from "react-icons/fa";
import AnnouncementCard from "../components/AnnouncementCard";
import { announcementAPI } from "../services/api";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, important
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, [filter]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      let response;

      if (filter === "important") {
        response = await announcementAPI.getImportantAnnouncements();
      } else {
        response = await announcementAPI.getAllPublishedAnnouncements();
      }

      setAnnouncements(response.data);
    } catch (err) {
      setError("Không thể tải danh sách thông báo. Vui lòng thử lại sau.");
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchAnnouncements();
      return;
    }

    try {
      setSearching(true);
      const response = await announcementAPI.searchAnnouncements(searchTerm);
      setAnnouncements(response.data);
    } catch (err) {
      setError("Không thể tìm kiếm thông báo. Vui lòng thử lại sau.");
      console.error("Error searching announcements:", err);
    } finally {
      setSearching(false);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    fetchAnnouncements();
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Đang tải danh sách thông báo...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-4">
            <FaBullhorn className="me-2" />
            Thông báo
          </h1>

          {/* Filter Buttons */}
          <ButtonGroup className="mb-3" size="sm">
            <Button
              variant={filter === "all" ? "primary" : "outline-primary"}
              onClick={() => setFilter("all")}
            >
              <FaBullhorn className="me-1" />
              Tất cả
            </Button>
            <Button
              variant={filter === "important" ? "danger" : "outline-danger"}
              onClick={() => setFilter("important")}
            >
              <FaExclamationTriangle className="me-1" />
              Quan trọng
            </Button>
          </ButtonGroup>

          {/* Search Form */}
          <Form onSubmit={handleSearch}>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Tìm kiếm thông báo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                variant="outline-primary"
                type="submit"
                disabled={searching}
              >
                {searching ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <FaSearch />
                )}
              </Button>
              {searchTerm && (
                <Button variant="outline-secondary" onClick={resetSearch}>
                  Xóa
                </Button>
              )}
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      <Row>
        <Col>
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
              />
            ))
          ) : (
            <div className="text-center py-5">
              <FaBullhorn size={48} className="text-muted mb-3" />
              <h5>
                {searchTerm
                  ? `Không tìm thấy thông báo nào với từ khóa "${searchTerm}"`
                  : filter === "important"
                  ? "Chưa có thông báo quan trọng nào"
                  : "Chưa có thông báo nào"}
              </h5>
              <p className="text-muted">
                {searchTerm
                  ? "Thử tìm kiếm với từ khóa khác"
                  : "Các thông báo sẽ hiển thị tại đây khi có"}
              </p>
              {searchTerm && (
                <Button variant="outline-primary" onClick={resetSearch}>
                  Xem tất cả thông báo
                </Button>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AnnouncementsPage;

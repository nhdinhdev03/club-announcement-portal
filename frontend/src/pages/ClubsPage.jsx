import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import { FaSearch, FaUsers } from "react-icons/fa";
import ClubCard from "../components/ClubCard";
import { clubAPI } from "../services/api";

const ClubsPage = () => {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      const response = await clubAPI.getActiveClubs();
      setClubs(response.data);
    } catch (err) {
      setError("Không thể tải danh sách câu lạc bộ. Vui lòng thử lại sau.");
      console.error("Error fetching clubs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      fetchClubs();
      return;
    }

    try {
      setSearching(true);
      const response = await clubAPI.searchClubs(searchTerm);
      setClubs(response.data);
    } catch (err) {
      setError("Không thể tìm kiếm câu lạc bộ. Vui lòng thử lại sau.");
      console.error("Error searching clubs:", err);
    } finally {
      setSearching(false);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    fetchClubs();
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Đang tải danh sách câu lạc bộ...</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-4">
            <FaUsers className="me-2" />
            Danh sách câu lạc bộ
          </h1>

          {/* Search Form */}
          <Form onSubmit={handleSearch}>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Tìm kiếm câu lạc bộ..."
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
        {clubs.length > 0 ? (
          clubs.map((club) => (
            <Col key={club.id} md={6} lg={4} className="mb-4">
              <ClubCard club={club} />
            </Col>
          ))
        ) : (
          <Col>
            <div className="text-center py-5">
              <FaUsers size={48} className="text-muted mb-3" />
              <h5>
                {searchTerm
                  ? `Không tìm thấy câu lạc bộ nào với từ khóa "${searchTerm}"`
                  : "Chưa có câu lạc bộ nào"}
              </h5>
              <p className="text-muted">
                {searchTerm
                  ? "Thử tìm kiếm với từ khóa khác"
                  : "Các câu lạc bộ sẽ hiển thị tại đây khi có"}
              </p>
              {searchTerm && (
                <Button variant="outline-primary" onClick={resetSearch}>
                  Xem tất cả câu lạc bộ
                </Button>
              )}
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ClubsPage;

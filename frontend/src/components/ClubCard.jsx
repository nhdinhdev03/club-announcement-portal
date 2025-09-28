import { Badge, Button, Card } from "react-bootstrap";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

const ClubCard = ({ club }) => {
  return (
    <Card className="club-card h-100">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          {club.logoUrl && (
            <img
              src={club.logoUrl}
              alt={`${club.name} logo`}
              className="club-logo me-3"
            />
          )}
          <div>
            <Card.Title className="mb-1">{club.name}</Card.Title>
            <div>
              {club.isActive ? (
                <Badge bg="success">Đang hoạt động</Badge>
              ) : (
                <Badge bg="secondary">Tạm dừng</Badge>
              )}
              <Badge bg="info" className="ms-2">
                {club.announcementCount} thông báo
              </Badge>
            </div>
          </div>
        </div>

        <Card.Text className="flex-grow-1">
          {club.description || "Chưa có mô tả"}
        </Card.Text>

        <div className="mb-3">
          {club.contactEmail && (
            <div className="text-muted small mb-1">
              <FaEnvelope className="me-1" />
              {club.contactEmail}
            </div>
          )}
          {club.contactPhone && (
            <div className="text-muted small mb-1">
              <FaPhone className="me-1" />
              {club.contactPhone}
            </div>
          )}
          {club.address && (
            <div className="text-muted small">
              <FaMapMarkerAlt className="me-1" />
              {club.address}
            </div>
          )}
        </div>

        <div className="mt-auto">
          <Link to={`/clubs/${club.id}`}>
            <Button variant="outline-primary" size="sm">
              <FaUsers className="me-1" />
              Xem chi tiết
            </Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ClubCard;
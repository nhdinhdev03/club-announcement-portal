import { Badge, Card } from "react-bootstrap";
import { FaClock, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const AnnouncementCard = ({ announcement }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card
      className={`announcement-card mb-3 ${
        announcement.isImportant ? "important" : ""
      }`}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="flex-grow-1">
            <Card.Title className="mb-2">
              {announcement.isImportant && (
                <FaExclamationTriangle className="text-danger me-2" />
              )}
              <Link
                to={`/announcements/${announcement.id}`}
                className="text-decoration-none"
              >
                {announcement.title}
              </Link>
            </Card.Title>
            <div className="d-flex align-items-center mb-2">
              <Badge bg="primary" className="me-2">
                {announcement.clubName}
              </Badge>
              {announcement.isImportant && (
                <Badge bg="danger" className="me-2">
                  Quan trọng
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Card.Text className="text-muted">
          {announcement.content.length > 200
            ? announcement.content.substring(0, 200) + "..."
            : announcement.content}
        </Card.Text>

        <div className="d-flex justify-content-between align-items-center text-muted small">
          <div>
            {announcement.author && <span>Tác giả: {announcement.author}</span>}
          </div>
          <div className="d-flex align-items-center">
            <FaClock className="me-1" />
            {formatDate(announcement.publishedDate || announcement.createdAt)}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AnnouncementCard;

import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { FaBullhorn, FaEdit, FaPlus, FaTrash, FaUsers } from "react-icons/fa";
import { announcementAPI, clubAPI } from "../services/api";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("clubs");
  const [clubs, setClubs] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'club' or 'announcement'
  const [editingItem, setEditingItem] = useState(null);

  // Form states
  const [clubForm, setClubForm] = useState({
    name: "",
    description: "",
    logoUrl: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    foundedDate: "",
    isActive: true,
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
    author: "",
    clubId: "",
    isImportant: false,
    isPublished: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [clubsResponse, announcementsResponse] = await Promise.all([
        clubAPI.getAllClubs(),
        announcementAPI.getAllPublishedAnnouncements(),
      ]);

      setClubs(clubsResponse.data);
      setAnnouncements(announcementsResponse.data);
    } catch (err) {
      setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);

    if (type === "club") {
      if (item) {
        setClubForm({
          name: item.name || "",
          description: item.description || "",
          logoUrl: item.logoUrl || "",
          contactEmail: item.contactEmail || "",
          contactPhone: item.contactPhone || "",
          address: item.address || "",
          foundedDate: item.foundedDate ? item.foundedDate.split("T")[0] : "",
          isActive: item.isActive !== undefined ? item.isActive : true,
        });
      } else {
        setClubForm({
          name: "",
          description: "",
          logoUrl: "",
          contactEmail: "",
          contactPhone: "",
          address: "",
          foundedDate: "",
          isActive: true,
        });
      }
    } else {
      if (item) {
        setAnnouncementForm({
          title: item.title || "",
          content: item.content || "",
          author: item.author || "",
          clubId: item.clubId || "",
          isImportant: item.isImportant || false,
          isPublished: item.isPublished || false,
        });
      } else {
        setAnnouncementForm({
          title: "",
          content: "",
          author: "",
          clubId: "",
          isImportant: false,
          isPublished: false,
        });
      }
    }

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setModalType("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modalType === "club") {
        const formData = {
          ...clubForm,
          foundedDate: clubForm.foundedDate
            ? new Date(clubForm.foundedDate).toISOString()
            : null,
        };

        if (editingItem) {
          await clubAPI.updateClub(editingItem.id, formData);
        } else {
          await clubAPI.createClub(formData);
        }
      } else {
        if (editingItem) {
          await announcementAPI.updateAnnouncement(
            editingItem.id,
            announcementForm
          );
        } else {
          await announcementAPI.createAnnouncement(announcementForm);
        }
      }

      handleCloseModal();
      fetchData();
    } catch (err) {
      setError("Không thể lưu dữ liệu. Vui lòng thử lại.");
      console.error("Error saving data:", err);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa?")) {
      return;
    }

    try {
      if (type === "club") {
        await clubAPI.deleteClub(id);
      } else {
        await announcementAPI.deleteAnnouncement(id);
      }

      fetchData();
    } catch (err) {
      setError("Không thể xóa. Vui lòng thử lại.");
      console.error("Error deleting:", err);
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
    <Container className="py-4">
      <h1 className="mb-4">Trang quản lý</h1>

      {error && (
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      {/* Tab Navigation */}
      <div className="mb-4">
        <Button
          variant={activeTab === "clubs" ? "primary" : "outline-primary"}
          className="me-2"
          onClick={() => setActiveTab("clubs")}
        >
          <FaUsers className="me-1" />
          Quản lý Câu lạc bộ ({clubs.length})
        </Button>
        <Button
          variant={
            activeTab === "announcements" ? "primary" : "outline-primary"
          }
          onClick={() => setActiveTab("announcements")}
        >
          <FaBullhorn className="me-1" />
          Quản lý Thông báo ({announcements.length})
        </Button>
      </div>

      {/* Clubs Tab */}
      {activeTab === "clubs" && (
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Danh sách câu lạc bộ</h5>
            <Button
              variant="success"
              size="sm"
              onClick={() => handleShowModal("club")}
            >
              <FaPlus className="me-1" />
              Thêm mới
            </Button>
          </Card.Header>
          <Card.Body className="p-0">
            <Table responsive striped hover className="mb-0">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Trạng thái</th>
                  <th>Số thông báo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {clubs.map((club) => (
                  <tr key={club.id}>
                    <td>
                      <strong>{club.name}</strong>
                      {club.description && (
                        <div className="text-muted small">
                          {club.description.substring(0, 50)}...
                        </div>
                      )}
                    </td>
                    <td>{club.contactEmail || "-"}</td>
                    <td>
                      <Badge bg={club.isActive ? "success" : "secondary"}>
                        {club.isActive ? "Hoạt động" : "Tạm dừng"}
                      </Badge>
                    </td>
                    <td>{club.announcementCount || 0}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-1"
                        onClick={() => handleShowModal("club", club)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete("club", club.id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* Announcements Tab */}
      {activeTab === "announcements" && (
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Danh sách thông báo</h5>
            <Button
              variant="success"
              size="sm"
              onClick={() => handleShowModal("announcement")}
            >
              <FaPlus className="me-1" />
              Thêm mới
            </Button>
          </Card.Header>
          <Card.Body className="p-0">
            <Table responsive striped hover className="mb-0">
              <thead>
                <tr>
                  <th>Tiêu đề</th>
                  <th>Câu lạc bộ</th>
                  <th>Tác giả</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((announcement) => (
                  <tr key={announcement.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        {announcement.isImportant && (
                          <Badge bg="danger" className="me-2">
                            !
                          </Badge>
                        )}
                        <div>
                          <strong>{announcement.title}</strong>
                          <div className="text-muted small">
                            {announcement.content.substring(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{announcement.clubName}</td>
                    <td>{announcement.author || "-"}</td>
                    <td>
                      <Badge
                        bg={announcement.isPublished ? "success" : "warning"}
                      >
                        {announcement.isPublished ? "Đã đăng" : "Nháp"}
                      </Badge>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-1"
                        onClick={() =>
                          handleShowModal("announcement", announcement)
                        }
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() =>
                          handleDelete("announcement", announcement.id)
                        }
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}

      {/* Modal for Club/Announcement Form */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingItem ? "Chỉnh sửa" : "Thêm mới"}{" "}
            {modalType === "club" ? "câu lạc bộ" : "thông báo"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {modalType === "club" ? (
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tên câu lạc bộ *</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={clubForm.name}
                      onChange={(e) =>
                        setClubForm({ ...clubForm, name: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email liên hệ</Form.Label>
                    <Form.Control
                      type="email"
                      value={clubForm.contactEmail}
                      onChange={(e) =>
                        setClubForm({
                          ...clubForm,
                          contactEmail: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      value={clubForm.contactPhone}
                      onChange={(e) =>
                        setClubForm({
                          ...clubForm,
                          contactPhone: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Ngày thành lập</Form.Label>
                    <Form.Control
                      type="date"
                      value={clubForm.foundedDate}
                      onChange={(e) =>
                        setClubForm({
                          ...clubForm,
                          foundedDate: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      value={clubForm.address}
                      onChange={(e) =>
                        setClubForm({ ...clubForm, address: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>URL Logo</Form.Label>
                    <Form.Control
                      type="url"
                      value={clubForm.logoUrl}
                      onChange={(e) =>
                        setClubForm({ ...clubForm, logoUrl: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={clubForm.description}
                      onChange={(e) =>
                        setClubForm({
                          ...clubForm,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Check
                    type="checkbox"
                    label="Đang hoạt động"
                    checked={clubForm.isActive}
                    onChange={(e) =>
                      setClubForm({ ...clubForm, isActive: e.target.checked })
                    }
                  />
                </Col>
              </Row>
            ) : (
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tiêu đề *</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={announcementForm.title}
                      onChange={(e) =>
                        setAnnouncementForm({
                          ...announcementForm,
                          title: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Câu lạc bộ *</Form.Label>
                    <Form.Select
                      required
                      value={announcementForm.clubId}
                      onChange={(e) =>
                        setAnnouncementForm({
                          ...announcementForm,
                          clubId: e.target.value,
                        })
                      }
                    >
                      <option value="">Chọn câu lạc bộ</option>
                      {clubs.map((club) => (
                        <option key={club.id} value={club.id}>
                          {club.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tác giả</Form.Label>
                    <Form.Control
                      type="text"
                      value={announcementForm.author}
                      onChange={(e) =>
                        setAnnouncementForm({
                          ...announcementForm,
                          author: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nội dung *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      required
                      value={announcementForm.content}
                      onChange={(e) =>
                        setAnnouncementForm({
                          ...announcementForm,
                          content: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Check
                    type="checkbox"
                    label="Thông báo quan trọng"
                    checked={announcementForm.isImportant}
                    onChange={(e) =>
                      setAnnouncementForm({
                        ...announcementForm,
                        isImportant: e.target.checked,
                      })
                    }
                  />
                </Col>
                <Col md={6}>
                  <Form.Check
                    type="checkbox"
                    label="Đăng ngay"
                    checked={announcementForm.isPublished}
                    onChange={(e) =>
                      setAnnouncementForm({
                        ...announcementForm,
                        isPublished: e.target.checked,
                      })
                    }
                  />
                </Col>
              </Row>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              {editingItem ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminPage;

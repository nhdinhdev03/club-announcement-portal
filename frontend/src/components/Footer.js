import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Club Announcement Portal</h5>
            <p className="mb-0">Hệ thống quản lý câu lạc bộ và thông báo</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p className="mb-0">© 2024 Club Portal. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

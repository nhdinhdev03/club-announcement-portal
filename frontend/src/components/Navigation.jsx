import { Container, Nav, Navbar } from "react-bootstrap";
import { FaBullhorn, FaCog, FaHome, FaUsers } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <FaUsers className="me-2" />
            Club Portal
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <FaHome className="me-1" />
                Trang chủ
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/clubs">
              <Nav.Link>
                <FaUsers className="me-1" />
                Câu lạc bộ
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/announcements">
              <Nav.Link>
                <FaBullhorn className="me-1" />
                Thông báo
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin">
              <Nav.Link>
                <FaCog className="me-1" />
                Quản lý
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

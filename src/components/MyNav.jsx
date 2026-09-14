import { Container, Navbar, Nav, Form } from "react-bootstrap";

function MyNav({ search, setSearch }) {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">EpiBooks</Navbar.Brand>
        <Nav className="ms-auto me-3">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">About</Nav.Link>
          <Nav.Link href="#">Browse</Nav.Link>
        </Nav>
        <Form.Control
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Container>
    </Navbar>
  );
}

export default MyNav;
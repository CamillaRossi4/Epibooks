import { useState } from "react";
import romance from "../Books/romance.json";
import { Container, Row, Col } from "react-bootstrap";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";

function AllTheBooks({ search }) {
  const [selected, setSelected] = useState("");

  return (
    <Container className="my-5">
      <Row>
        <Col md={8}>
          <Row>
            {romance
              .filter((book) =>
                book.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((book) => (
                <Col xs={12} sm={6} md={4} key={book.asin} className="mb-4">
                  <SingleBook
                    book={book}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Col>
              ))}
          </Row>
        </Col>
        <Col md={4}>
          <CommentArea asin={selected} />
        </Col>
      </Row>
    </Container>
  );
}

export default AllTheBooks;
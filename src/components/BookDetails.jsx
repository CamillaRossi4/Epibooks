import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import romance from "../Books/romance.json";
import CommentArea from "./CommentArea";

function BookDetails() {
  const { asin } = useParams();
  const book = romance.find((book) => book.asin === asin);

  if (!book) {
    return <h2>Book not found</h2>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={5}>
          <Card>
            <Card.Img variant="top" src={book.img} />
          </Card>
        </Col>
        <Col md={7}>
          <h2>{book.title}</h2>
          <p>€ {book.price}</p>
          <p>Category: {book.category}</p>
          <CommentArea asin={book.asin} />
        </Col>
      </Row>
    </Container>
  );
}

export default BookDetails;
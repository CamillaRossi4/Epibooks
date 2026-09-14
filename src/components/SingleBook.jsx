import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function SingleBook({ book, selected, setSelected }) {
  return (
    <Card
      data-testid="book-card"
      className="h-100 book-card"
      onClick={() => setSelected(book.asin)}
      style={{ border: selected === book.asin ? "3px solid red" : "none" }}
    >
      <div className="book-cover">
        <Card.Img variant="top" src={book.img} />
      </div>
      <Card.Body>
        <p className="book-category">{book.category}</p>
        <Card.Title>{book.title}</Card.Title>
        <div className="book-info">
          <Card.Text>€ {book.price}</Card.Text>
          <Link to={`/book/${book.asin}`}>
            <Button>View</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SingleBook;
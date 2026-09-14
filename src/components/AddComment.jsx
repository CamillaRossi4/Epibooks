import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddComment({ asin, getComments }) {
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState("1");

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          body: JSON.stringify({
            comment: comment,
            rate: rate,
            elementId: asin,
          }),
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTY1Yzg5ZDA2NDFkYTAwMTUwZTNhMzkiLCJpYXQiOjE3ODkzNjk2NDcsImV4cCI6MTc5MDU3OTI0N30.tIA5_ZCsqOX4jLPL7h-vNBKCAZrI-fITwTdUJ6fNRj0",
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Errore nell'invio della recensione");
      }
      setComment("");
      setRate("1");
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form className="mt-4" onSubmit={sendComment}>
      <Form.Group className="mb-3">
        <Form.Label>Write a review</Form.Label>
        <Form.Control
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <Form.Select value={rate} onChange={(e) => setRate(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Select>
      </Form.Group>
      <Button type="submit">Send review</Button>
    </Form>
  );
}

export default AddComment;
import { useEffect, useState } from "react";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";

function CommentArea({ asin }) {
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    if (!asin) {
      setComments([]);
      return;
    }
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/books/${asin}/comments/`,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTY1Yzg5ZDA2NDFkYTAwMTUwZTNhMzkiLCJpYXQiOjE3ODkzNjk2NDcsImV4cCI6MTc5MDU3OTI0N30.tIA5_ZCsqOX4jLPL7h-vNBKCAZrI-fITwTdUJ6fNRj0",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Errore nel recupero delle recensioni");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, [asin]);

  return (
    <div className="comment-area">
      <p className="comment-label">Readers</p>
      <h4>Reviews</h4>
      {!asin && <p className="comment-empty">Select a book to read the reviews.</p>}
      {asin && (
        <>
          <CommentsList comments={comments} />
          <AddComment asin={asin} getComments={getComments} />
        </>
      )}
    </div>
  );
}

export default CommentArea;
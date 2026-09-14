import { useCallback, useEffect, useState } from "react";
import CommentsList from "./CommentsList";
import AddComment from "./AddComment";

function CommentArea({ asin }) {
  const [comments, setComments] = useState([]);

  const getComments = useCallback(async () => {
    if (!asin) {
      return;
    }

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/books/${asin}/comments/`,
        {
          headers: {
            Authorization: "Bearer IL_TUO_TOKEN",
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
  }, [asin]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <div className="comment-area">
      <p className="comment-label">Readers</p>
      <h4>Reviews</h4>
      {!asin && (
        <p className="comment-empty">
          Select a book to read the reviews.
        </p>
      )}
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
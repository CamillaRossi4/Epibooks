function SingleComment({ comment }) {
  return (
    <div data-testid="single-comment">
      <p>{comment.comment}</p>
      <small>Rating: {comment.rate}/5</small>
    </div>
  );
}

export default SingleComment;
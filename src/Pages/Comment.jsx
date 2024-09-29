import React from "react";

const Comment = ({
  addComment,
  commentText,
  setCommentText,
  allComment,
  fullName,
  setFullName,
}) => {
  return (
    <div>
      <div className="sidebar-item comments">
        <div className="sidebar-heading">
          <h2>4 comments</h2>
        </div>
        <div className="content">
          <ul>
            {allComment.length > 0 ? (
              allComment.map((item) => {
                const { fullName, commentText, date } = item;
                return (
                  <li key={item.id}>
                    <div className="author-thumb">
                      <img src="assets/images/comment-author-01.jpg" alt="" />
                    </div>
                    <div className="right-content">
                      <h4>
                        {fullName}
                        <span>{date}</span>
                      </h4>
                      <p>{commentText}</p>
                    </div>
                  </li>
                );
              })
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </ul>
        </div>
      </div>

      <div className="sidebar-item submit-comment">
        <div className="sidebar-heading">
          <h2>Your comment</h2>
        </div>
        <div className="content">
          <form id="comment" onSubmit={addComment}>
            <div className="row">
              {/* Name input */}
              <div className="col-md-6 col-sm-12">
                <fieldset>
                  <input
                    name="name"
                    type="text"
                    id="name"
                    placeholder="Your name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </fieldset>
              </div>
              {/* Comment input */}
              <div className="col-lg-12">
                <fieldset>
                  <textarea
                    name="message"
                    rows={6}
                    id="message"
                    placeholder="Type your comment"
                    required
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </fieldset>
              </div>
              {/* Submit button */}
              <div className="col-lg-12">
                <fieldset>
                  <button
                    type="submit"
                    id="form-submit"
                    className="main-button"
                  >
                    Submit
                  </button>
                </fieldset>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Comment;

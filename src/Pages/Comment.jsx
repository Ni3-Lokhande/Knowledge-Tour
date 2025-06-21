
import React, { useState } from "react";
import "./Comment.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Comment = ({
  addComment,
  commentText,
  setCommentText,
  allComment,
  fullName,
  setFullName,
}) => {
  const [showAll, setShowAll] = useState(false);

  const visibleComments = showAll ? allComment : allComment.slice(0, 4);

  return (
    <div>
      <div className="sidebar-item comments">
        <div className="sidebar-heading">
          <h2>{allComment.length} {allComment.length === 1 ? 'comment' : 'comments'}</h2>
        </div>
        <div className="content">
          <ul>
            {allComment.length > 0 ? (
              visibleComments.map((item) => {
                const { fullName, commentText, date, id } = item;
                return (
                  <li key={id}>
                    <div className="author-thumb">
                      <FontAwesomeIcon icon={faUser} size="1x" />
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

          {/* Show More Comments Button */}
          {allComment.length > 4 && !showAll && (
            <div className="show-more-wrapper">
              <button className="show-more-btn" onClick={() => setShowAll(true)}>
                Show More Comments
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-item submit-comment">
        <div className="sidebar-heading">
          <h2>Your comment</h2>
        </div>
        <div className="content">
          <form id="comment" onSubmit={addComment}>
            <div className="row">
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
              <div className="col-lg-12">
                <fieldset>
                  <button type="submit" id="form-submit" className="main-button">
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


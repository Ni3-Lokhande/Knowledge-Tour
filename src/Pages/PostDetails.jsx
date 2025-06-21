

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  Timestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { fireDb } from "../Firebase/FirebaseConfig";
import Comment from "./Comment";
import Loader from "../Component/Loader";
import MyContext from "../context/MyContext";
import SearchDialogBox from "../Component/SearchDialogBox";
import toast from "react-hot-toast";
import "./PostDetail.css";

const PostDetails = () => {
  const { id } = useParams();
  const context = useContext(MyContext);
  const { loading, setLoading } = context;

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [fullName, setFullName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Function to fetch post details
  const getPostDetails = async () => {
    setLoading(true);
    try {
      const docRef = doc(fireDb, "blogPost", id);
      const postSnap = await getDoc(docRef);
      if (postSnap.exists()) {
        setPost(postSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch comments
  const getComments = async () => {
    try {
      const q = query(
        collection(fireDb, `blogPost/${id}/comment`),
        orderBy("time")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedComments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(fetchedComments);
      });
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Add a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!fullName || !commentText) {
      toast.error("Both name and comment are required");
      return;
    }
    try {
      const commentRef = collection(fireDb, `blogPost/${id}/comment`);
      await addDoc(commentRef, {
        fullName,
        commentText,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      });
      setFullName("");
      setCommentText("");
      toast.success("Comment added");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  useEffect(() => {
    getPostDetails();
    const unsubscribe = getComments();

    // Clean up the subscription if `unsubscribe` exists
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [id]);

  return (
    <div
      className="container post-detail-container"
      style={{ paddingTop: "100px" }}
    >
      <section className="post-detail-section">
        <div className="post-detail-content">
          {loading ? (
            <Loader />
          ) : (
            post && (
              <div className="post-detail-wrapper">
                <div className="post-detail-header">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="post-detail-image"
                  />
                  <div className="post-detail-info">
                    <span className="post-detail-category">
                      {post.category}
                    </span>
                    <h2 className="post-detail-title">{post.title}</h2>
                    <ul className="post-detail-meta">
                      <li>Admin</li>
                      <li>
                        {new Date(
                          post.createdAt.seconds * 1000
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </li>
                      <li>{comments.length} Comments</li>
                    </ul>
                  </div>
                </div>
                <div className="post-detail-body">
                  <div
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    className="post-detail-content"
                  />
                </div>
                <Comment
                  addComment={handleAddComment}
                  fullName={fullName}
                  setFullName={setFullName}
                  commentText={commentText}
                  setCommentText={setCommentText}
                  allComment={comments}
                />
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
};

export default PostDetails;

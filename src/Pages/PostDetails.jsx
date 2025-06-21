// import React, { useContext, useEffect, useState } from "react";
// import Comment from "./Comment";
// import MyContext from "../context/MyContext";
// import { useParams } from "react-router-dom";
// import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
// import { fireDb } from "../Firebase/FirebaseConfig";
// import toast from 'react-hot-toast';
// import Loader from "../Component/Loader";
// import SearchDialogBox from "../Component/SearchDialogBox";
// import './PostDetail.css';

// const PostDetails = () => {

//   const context = useContext(MyContext);
//   const {loading, setLoading} = context;
//   const params = useParams();

//   const [getBlogs, setGetBlogs] = useState();
//   const [fullName, setFullName] = useState('');
//   const [commentText, setCommentText] = useState('');
//   const [allComment, setAllComment] = useState([]);

//   function createMarkup(c) {
//     return { __html: c };
//   }

//    const formatDate = (timestamp) => {
//     if (!timestamp || !timestamp.seconds) {
//       return 'Unknown Date'; // Handle missing or incorrect date format
//     }
//     const date = new Date(timestamp.seconds * 1000);
//     return date.toLocaleString('en-US', {
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       hour12: true,
//     });
//   };

//   const getAllBlogs = async () => {
//     setLoading(true);
//     try {
//       const productTemp = await getDoc(doc(fireDb, "blogPost", params.id))
//       if (productTemp.exists()) {
//         setGetBlogs(productTemp.data());
//       } else {
//         console.log("Document does not exist");
//       }
//       setLoading(false)

//     } catch (error) {
//       console.log(error);
//       setLoading(false)
//     };
//   }

//   const addComment = async (e) => {
//     e.preventDefault();  // Prevent form from submitting and reloading the page
//     if (!fullName || !commentText) {
//       toast.error("Name and comment are required");
//       return;
//     }

//     const commentRef = collection(fireDb, `blogPost/${params.id}/comment`);
//     try {
//       await addDoc(commentRef, {
//         fullName,
//         commentText,
//         time: Timestamp.now(),
//         date: new Date().toLocaleString("en-US", {
//           month: "long",
//           day: "2-digit",
//           year: "numeric",
//         }),
//       });
//       toast.success("Comment added successfully");
//       setFullName("");
//       setCommentText("");
//     } catch (error) {
//       console.error("Error adding comment: ", error);
//       toast.error("Failed to add comment");
//     }
//   };

//   const getComment = async () => {
//     try {
//       const q = query(
//         collection(fireDb, `blogPost/${params.id}/comment`),
//         orderBy('time')
//       );
//       const data = onSnapshot(q, (QuerySnapshot) => {
//         let productsArray = [];
//         QuerySnapshot.forEach((doc) => {
//           productsArray.push({...doc.data(), id: doc.id });
//         });
//         setAllComment(productsArray)
//         console.log(productsArray);
//       });
//       return () => data;
//     } catch (error) {
//       console.log(error);

//     }
//   }

//   useEffect(() => {
//     getAllBlogs();
//     getComment();
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div style={{paddingTop:"10px"}}>

//       <section className="blog-posts grid-system" >
//         <div className="container">
//           {loading
//           ?
//           <Loader />
//         :
//         <div className="row">
//             <div className="col-lg-8">
//               <div className="all-blog-posts">
//                 <div className="row">
//                   <div className="col-lg-12">
//                     <div className="blog-post">
//                       <div className="blog-thumb">
//                         <img src={getBlogs?.image} alt />
//                       </div>
//                       <div className="down-content">
//                         <span>{getBlogs?.category}</span>
//                         <a href="#">
//                           <h4>{getBlogs?.title}</h4>
//                         </a>
//                         <ul className="post-info">
//                           <li>
//                             <a href="#">Admin</a>
//                           </li>
//                           <li>
//                             <a href="#">{formatDate(getBlogs?.createdAt)}</a>
//                           </li>
//                           <li>
//                             <a href="#">10 Comments</a>
//                           </li>
//                         </ul>
//                           <p dangerouslySetInnerHTML={createMarkup(getBlogs?.content)}/>

//                         <div className="post-options">
//                           <div className="row">
//                             <div className="col-6">
//                               <ul className="post-tags">
//                                 <li>
//                                   <i className="fa fa-tags" />
//                                 </li>
//                                 <li>
//                                   <a href="#">Best Templates</a>,
//                                 </li>
//                                 <li>
//                                   <a href="#">TemplateMo</a>
//                                 </li>
//                               </ul>
//                             </div>
//                             <div className="col-6">
//                               <ul className="post-share">
//                                 <li>
//                                   <i className="fa fa-share-alt" />
//                                 </li>
//                                 <li>
//                                   <a href="#">Facebook</a>,
//                                 </li>
//                                 <li>
//                                   <a href="#"> Twitter</a>
//                                 </li>
//                               </ul>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                 <div className="col-lg-12">
//                   <Comment
//                    addComment={addComment}
//                    commentText={commentText}
//                    setCommentText={setCommentText}
//                    allComment={allComment}
//                    fullName={fullName}
//                    setFullName={setFullName} />
//                 </div>

//                 </div>
//               </div>
//             </div>

//           </div>
//           }
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PostDetails;

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

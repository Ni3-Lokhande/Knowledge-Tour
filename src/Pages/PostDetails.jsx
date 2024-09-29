
import React, { useContext, useEffect, useState } from "react";
import Comment from "./Comment";
import MyContext from "../context/MyContext";
import { useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { fireDb } from "../Firebase/FirebaseConfig";
import toast from 'react-hot-toast';
import Loader from "../Component/Loader";
import SearchDialogBox from "../Component/SearchDialogBox";
import './PostDetail.css';

const PostDetails = () => {

  const context = useContext(MyContext);
  const {loading, setLoading} = context;
  const params = useParams();
 
  const [getBlogs, setGetBlogs] = useState();
  const [fullName, setFullName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [allComment, setAllComment] = useState([]);


  function createMarkup(c) {
    return { __html: c };
  }

   const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.seconds) {
      return 'Unknown Date'; // Handle missing or incorrect date format
    }
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const getAllBlogs = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDb, "blogPost", params.id))
      if (productTemp.exists()) {
        setGetBlogs(productTemp.data());
      } else {
        console.log("Document does not exist");
      }
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false) 
    };
  }


  const addComment = async (e) => {
    e.preventDefault();  // Prevent form from submitting and reloading the page
    if (!fullName || !commentText) {
      toast.error("Name and comment are required");
      return;
    }
  
    const commentRef = collection(fireDb, `blogPost/${params.id}/comment`);
    try {
      await addDoc(commentRef, {
        fullName,
        commentText,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }),
      });
      toast.success("Comment added successfully");
      setFullName("");
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment: ", error);
      toast.error("Failed to add comment");
    }
  };
  


  const getComment = async () => {
    try {
      const q = query(
        collection(fireDb, `blogPost/${params.id}/comment`),
        orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({...doc.data(), id: doc.id });
        });
        setAllComment(productsArray)
        console.log(productsArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getAllBlogs();
    getComment();
    window.scrollTo(0, 0);
  }, []);


  return (
    <div style={{paddingTop:"10px"}}>
      {/* Page Content */}
      {/* Banner Starts Here */}
      {/* <div className="heading-page header-text">
        <section className="page-heading">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-content">
                  <h4>Post Details</h4>
                  <h2>Single blog post</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>  */}
      {/* Banner Ends Here */}

      <section className="blog-posts grid-system" >
        <div className="container">
          {loading 
          ?
          <Loader />
        :
        <div className="row">
            <div className="col-lg-8">
              <div className="all-blog-posts">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="blog-post">
                      <div className="blog-thumb">
                        <img src={getBlogs?.image} alt />
                      </div>
                      <div className="down-content">
                        <span>{getBlogs?.category}</span>
                        <a href="#">
                          <h4>{getBlogs?.title}</h4>
                        </a>
                        <ul className="post-info">
                          <li>
                            <a href="#">Admin</a>
                          </li>
                          <li>
                            <a href="#">{formatDate(getBlogs?.createdAt)}</a>
                          </li>
                          <li>
                            <a href="#">10 Comments</a>
                          </li>
                        </ul>
                          <p dangerouslySetInnerHTML={createMarkup(getBlogs?.content)} /> 
                      
                        <div className="post-options">
                          <div className="row">
                            <div className="col-6">
                              <ul className="post-tags">
                                <li>
                                  <i className="fa fa-tags" />
                                </li>
                                <li>
                                  <a href="#">Best Templates</a>,
                                </li>
                                <li>
                                  <a href="#">TemplateMo</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-6">
                              <ul className="post-share">
                                <li>
                                  <i className="fa fa-share-alt" />
                                </li>
                                <li>
                                  <a href="#">Facebook</a>,
                                </li>
                                <li>
                                  <a href="#"> Twitter</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                <div className="col-lg-12">
                  <Comment
                   addComment={addComment}
                   commentText={commentText}
                   setCommentText={setCommentText}
                   allComment={allComment}
                   fullName={fullName}
                   setFullName={setFullName} />
                </div>

                </div>
              </div>
            </div>
            {/* <div className="col-lg-4">
              <div className="sidebar">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="sidebar-item search">
                      <form id="search_form" name="gs" method="GET" action="#">
                        <input
                          type="text"
                          name="q"
                          className="searchText"
                          placeholder="type to search..."
                          autoComplete="on"
                        />
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="sidebar-item recent-posts">
                      <div className="sidebar-heading">
                        <h2>Recent Posts</h2>
                      </div>
                      <div className="content">
                        <ul>
                          <li>
                            <a href="post-details.html">
                              <h5>
                                Vestibulum id turpis porttitor sapien facilisis
                                scelerisque
                              </h5>
                              <span>May 31, 2020</span>
                            </a>
                          </li>
                          <li>
                            <a href="post-details.html">
                              <h5>
                                Suspendisse et metus nec libero ultrices varius
                                eget in risus
                              </h5>
                              <span>May 28, 2020</span>
                            </a>
                          </li>
                          <li>
                            <a href="post-details.html">
                              <h5>
                                Swag hella echo park leggings, shaman cornhole
                                ethical coloring
                              </h5>
                              <span>May 14, 2020</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="sidebar-item categories">
                      <div className="sidebar-heading">
                        <h2>Categories</h2>
                      </div>
                      <div className="content">
                        <ul>
                          <li>
                            <a href="#">- Nature Lifestyle</a>
                          </li>
                          <li>
                            <a href="#">- Awesome Layouts</a>
                          </li>
                          <li>
                            <a href="#">- Creative Ideas</a>
                          </li>
                          <li>
                            <a href="#">- Responsive Templates</a>
                          </li>
                          <li>
                            <a href="#">- HTML5 / CSS3 Templates</a>
                          </li>
                          <li>
                            <a href="#">- Creative &amp; Unique</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="sidebar-item tags">
                      <div className="sidebar-heading">
                        <h2>Tag Clouds</h2>
                      </div>
                      <div className="content">
                        <ul>
                          <li>
                            <a href="#">Lifestyle</a>
                          </li>
                          <li>
                            <a href="#">Creative</a>
                          </li>
                          <li>
                            <a href="#">HTML5</a>
                          </li>
                          <li>
                            <a href="#">Inspiration</a>
                          </li>
                          <li>
                            <a href="#">Motivation</a>
                          </li>
                          <li>
                            <a href="#">PSD</a>
                          </li>
                          <li>
                            <a href="#">Responsive</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <SearchDialogBox />
          </div>
          }
        </div>
      </section>
    </div>
  );
};

export default PostDetails;

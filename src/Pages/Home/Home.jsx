

import React, { useContext, useState, useEffect, useRef } from "react";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import SearchDialogBox from "../../Component/SearchDialogBox";
import { collection, getDocs } from "firebase/firestore";
import { fireDb } from "../../Firebase/FirebaseConfig";
import Slider_banner from "./Slider_banner";
import "./Home.css";

const Home = () => {
  const { getAllBlog } = useContext(MyContext);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [commentCounts, setCommentCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;
  const blogContainerRef = useRef(null); // 📍 Scroll target

  const filteredBlogs = selectedCategory
    ? getAllBlog.filter((blog) => blog.category === selectedCategory)
    : getAllBlog;

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const displayedBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Fetch comment counts
  const fetchCommentCounts = async (blogs) => {
    const counts = {};
    for (const blog of blogs) {
      const commentRef = collection(fireDb, `blogPost/${blog.id}/comment`);
      const commentSnap = await getDocs(commentRef);
      counts[blog.id] = commentSnap.size;
    }
    setCommentCounts(counts);
  };

  useEffect(() => {
    if (getAllBlog.length > 0) {
      fetchCommentCounts(displayedBlogs);
    }
  }, [getAllBlog, selectedCategory, currentPage]);

  return (
    <div>
      <Slider_banner />

      <section className="blog-posts grid-system" ref={blogContainerRef}>
        <div className="container">
          <div className="row">
            {/* Blog Section */}
            <div className="col-lg-8">
              <div className="all-blog-posts">
                <div className="row">
                  {displayedBlogs.length > 0 ? (
                    displayedBlogs.map((item, index) => {
                      const { image, createdAt, title, id, category, createdBy } = item;
                      return (
                        <div className="col-lg-6" key={index}>
                          <div className="blog-post">
                            <div className="blog-thumb">
                              <img
                                src={image}
                                alt={title}
                                style={{
                                  width: "100%",
                                  height: "250px",
                                  objectFit: "cover",
                                  cursor: "pointer",
                                }}
                                onClick={() => navigate(`/post-details/${id}`)}
                              />
                            </div>
                            <div className="down-content">
                              <span>{category}</span>
                              <a
                                onClick={() => navigate(`/post-details/${id}`)}
                                style={{ cursor: "pointer" }}
                              >
                                <h4>{title}</h4>
                              </a>
                              <ul className="post-info">
                                <li><a href="#">{createdBy || "Admin"}</a></li>
                                <li><a href="#">{formatDate(createdAt)}</a></li>
                                <li>
                                  <a href="#">
                                    {commentCounts[id] !== undefined
                                      ? `${commentCounts[id]} Comment${
                                          commentCounts[id] !== 1 ? "s" : ""
                                        }`
                                      : "Loading..."}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p>No blogs available.</p>
                  )}

                  {/* Pagination */}
                  <div className="col-lg-12">
                    <ul className="pagination-custom">
                      <li>
                        <button
                          onClick={() => {
                            if (currentPage > 1) {
                              setCurrentPage(currentPage - 1);
                              blogContainerRef.current?.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          disabled={currentPage === 1}
                        >
                          &laquo;
                        </button>
                      </li>

                      {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i}>
                          <button
                            className={currentPage === i + 1 ? "active" : ""}
                            onClick={() => {
                              setCurrentPage(i + 1);
                              blogContainerRef.current?.scrollIntoView({ behavior: "smooth" });
                            }}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}

                      <li>
                        <button
                          onClick={() => {
                            if (currentPage < totalPages) {
                              setCurrentPage(currentPage + 1);
                              blogContainerRef.current?.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          disabled={currentPage === totalPages}
                        >
                          &raquo;
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <SearchDialogBox />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

// import React, { useContext, useState, useEffect } from "react";
// import Slider_banner from "./Slider_banner";
// import MyContext from "../../context/MyContext";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";
// import SearchDialogBox from "../../Component/SearchDialogBox";
// import { collection, getDocs } from "firebase/firestore";
// import { fireDb } from "../../Firebase/FirebaseConfig";

// const Home = () => {
//   const context = useContext(MyContext);
//   const { getAllBlog } = context;
//   const navigate = useNavigate();
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [commentCounts, setCommentCounts] = useState({});

//   // Function to format the date
//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp.seconds * 1000);
//     return date.toLocaleString("en-US", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   // Filter blogs based on the selected category
//   const filteredBlogs = selectedCategory
//     ? getAllBlog.filter((blog) => blog.category === selectedCategory)
//     : getAllBlog.slice(0, 6); // Show the latest 6 blogs if no category is selected

//   const fetchCommentCounts = async (blogs) => {
//     const counts = {};
//     for (const blog of blogs) {
//       const commentRef = collection(fireDb, `blogPost/${blog.id}/comment`);
//       const commentSnap = await getDocs(commentRef);
//       counts[blog.id] = commentSnap.size;
//     }
//     setCommentCounts(counts);
//   };

//   useEffect(() => {
//     if (getAllBlog.length > 0) {
//       const blogsToCheck = selectedCategory
//         ? getAllBlog.filter((blog) => blog.category === selectedCategory)
//         : getAllBlog.slice(0, 6);
//       fetchCommentCounts(blogsToCheck);
//     }
//   }, [getAllBlog, selectedCategory]);

//   return (
//     <div>
//       <div>
//         {/* Page Content */}

//         <Slider_banner />

//         <section className="blog-posts grid-system">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-8">
//                 <div className="all-blog-posts">
//                   <div className="row">
//                     {filteredBlogs.length > 0 ? (
//                       filteredBlogs.map((item, index) => {
//                         const { image, createdAt, title, id, category } = item;
//                         return (
//                           <div className="col-lg-6" key={index}>
//                             <div className="blog-post">
//                               <div className="blog-thumb">
//                                 <img
//                                   src={image}
//                                   alt={title}
//                                   style={{
//                                     width: "100%", // Set to fill the container width
//                                     height: "250px", // Set a fixed height for uniformity
//                                     objectFit: "cover", // Ensures the image covers the entire area without distortion
//                                   }}
//                                   onClick={() =>
//                                     navigate(`/post-details/${id}`)
//                                   }
//                                 />
//                               </div>
//                               <div className="down-content">
//                                 <span>{category}</span>
//                                 <a
//                                   onClick={() =>
//                                     navigate(`/post-details/${id}`)
//                                   }
//                                   style={{ cursor: "pointer" }}
//                                 >
//                                   <h4>{title}</h4>
//                                 </a>
//                                 <ul className="post-info">
//                                   <li>
//                                     <a href="#">Admin</a>
//                                   </li>
//                                   <li>
//                                     <a href="#">{formatDate(createdAt)}</a>
//                                   </li>
//                                   <li>
//                                     <a href="#">
//                                       {commentCounts[item.id] !== undefined
//                                         ? `${commentCounts[item.id]} Comment${
//                                             commentCounts[item.id] !== 1
//                                               ? "s"
//                                               : ""
//                                           }`
//                                         : "Loading..."}
//                                     </a>
//                                   </li>
//                                 </ul>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })
//                     ) : (
//                       <p>No blogs available.</p>
//                     )}

//                     <div className="col-lg-12">
//                       <ul className="page-numbers">
//                         <li>
//                           <a href="#">1</a>
//                         </li>
//                         <li className="active">
//                           <a href="#">2</a>
//                         </li>
//                         <li>
//                           <a href="#">3</a>
//                         </li>
//                         <li>
//                           <a href="#">
//                             <i className="fa fa-angle-double-right" />
//                           </a>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <SearchDialogBox />
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useContext, useState, useEffect } from "react";
import Slider_banner from "./Slider_banner";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import SearchDialogBox from "../../Component/SearchDialogBox";
import { collection, getDocs } from "firebase/firestore";
import { fireDb } from "../../Firebase/FirebaseConfig";

const Home = () => {
  const { getAllBlog } = useContext(MyContext);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [commentCounts, setCommentCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  // Format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Filter and paginate blogs
  const filteredBlogs = selectedCategory
    ? getAllBlog.filter((blog) => blog.category === selectedCategory)
    : getAllBlog;

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const endIndex = startIndex + blogsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

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
      fetchCommentCounts(paginatedBlogs);
    }
  }, [getAllBlog, selectedCategory, currentPage]);

  return (
    <div>
      <Slider_banner />

      <section className="blog-posts grid-system">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="all-blog-posts">
                <div className="row">
                  {paginatedBlogs.length > 0 ? (
                    paginatedBlogs.map((item, index) => {
                      const { image, createdAt, title, id, category } = item;
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
                                <li>
                                  <a href="#">Admin</a>
                                </li>
                                <li>
                                  <a href="#">{formatDate(createdAt)}</a>
                                </li>
                                <li>
                                  <a href="#">
                                    {commentCounts[item.id] !== undefined
                                      ? `${commentCounts[item.id]} Comment${
                                          commentCounts[item.id] !== 1
                                            ? "s"
                                            : ""
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
                          onClick={() =>
                            currentPage > 1 && setCurrentPage(currentPage - 1)
                          }
                          disabled={currentPage === 1}
                        >
                          &laquo;
                        </button>
                      </li>

                      {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i}>
                          <button
                            className={currentPage === i + 1 ? "active" : ""}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}

                      <li>
                        <button
                          onClick={() =>
                            currentPage < totalPages &&
                            setCurrentPage(currentPage + 1)
                          }
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

            <SearchDialogBox />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

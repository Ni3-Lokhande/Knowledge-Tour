import React, { useContext, useState } from "react";
import Slider_banner from "./Slider_banner";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import SearchDialogBox from "../../Component/SearchDialogBox";

const Home = () => {
  const context = useContext(MyContext);
  const { getAllBlog } = context;
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  // Function to format the date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // hour12: true,
    });
  };

  // Filter blogs based on the selected category
  const filteredBlogs = selectedCategory
    ? getAllBlog.filter((blog) => blog.category === selectedCategory)
    : getAllBlog.slice(0, 6); // Show the latest 6 blogs if no category is selected

  return (
    <div>
      <div>
        {/* Page Content */}

        <Slider_banner />

        <section className="blog-posts grid-system">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="all-blog-posts">
                  <div className="row">
                    {filteredBlogs.length > 0 ? (
                      filteredBlogs.map((item, index) => {
                        const { image, createdAt, title, id, category } = item;
                        return (
                          <div className="col-lg-6" key={index}>
                            <div className="blog-post">
                              <div className="blog-thumb">
                                <img
                                  src={image}
                                  alt={title}
                                  style={{
                                    width: "100%", // Set to fill the container width
                                    height: "250px", // Set a fixed height for uniformity
                                    objectFit: "cover", // Ensures the image covers the entire area without distortion
                                  }}
                                  onClick={() =>
                                    navigate(`/post-details/${id}`)
                                  }
                                />
                              </div>
                              <div className="down-content">
                                <span>{category}</span>
                                <a
                                  onClick={() =>
                                    navigate(`/post-details/${id}`)
                                  }
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
                                    <a href="#">12 Comments</a>
                                  </li>
                                </ul>
                                {/* <p>
                                  Nullam nibh mi, tincidunt sed sapien ut,
                                  rutrum hendrerit velit. Integer auctor a
                                  mauris sit amet eleifend.
                                </p> */}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p>No blogs available.</p>
                    )}

                    <div className="col-lg-12">
                      <ul className="page-numbers">
                        <li>
                          <a href="#">1</a>
                        </li>
                        <li className="active">
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#">3</a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-angle-double-right" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
               <SearchDialogBox />
              {/* <div className="col-lg-4">
                <div className="sidebar">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="sidebar-item search">
                        <form
                          id="search_form"
                          name="gs"
                          method="GET"
                          action="#"
                        >
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
                                <img
                                  src="https://im.rediff.com/news/2023/aug/25pawar.jpg"
                                  alt="Recent post 1"
                                  className="recent-posts__image"
                                />
                                <div className="recent-posts__details">
                                  <h5>
                                    Vestibulum id turpis porttitor sapien
                                    facilisis scelerisque
                                  </h5>
                                  <span>May 31, 2020</span>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="post-details.html">
                                <img
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQnguSkpDRE1hNy4oMw9QpH5GlJG8DQ-420Q&s"
                                  alt="Recent post 2"
                                  className="recent-posts__image"
                                />
                                <div className="recent-posts__details">
                                  <h5>
                                    Suspendisse et metus nec libero ultrices
                                    varius eget in risus
                                  </h5>
                                  <span>May 28, 2020</span>
                                </div>
                              </a>
                            </li>
                            <li>
                              <a href="post-details.html">
                                <img
                                  src="https://cdn.dnaindia.com/sites/default/files/2024/08/14/2646152-work-2024-08-14t165912.093.jpg?im=FitAndFill=(1200,900)"
                                  alt="Recent post 3"
                                  className="recent-posts__image"
                                />
                                <div className="recent-posts__details">
                                  <h5>
                                    Swag hella echo park leggings, shaman
                                    cornhole ethical coloring
                                  </h5>
                                  <span>May 14, 2020</span>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

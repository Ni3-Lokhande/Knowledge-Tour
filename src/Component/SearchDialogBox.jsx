import React, { useState, useContext } from "react";
import "./Search.css";
import MyContext from "../context/MyContext";

const SearchDialogBox = () => {
  const { getAllBlog } = useContext(MyContext); // Fetching blogs from MyContext
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const filteredBlogs = getAllBlog
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 8); // Limit to only 8 blogs

  return (
    <div className="col-lg-4">
      <div className="sidebar">
        <div className="row">
          {/* Search Form */}
          <div className="col-lg-12">
            <div className="sidebar-item search">
              <form id="search_form" name="gs" method="GET" action="#">
                <input
                  type="text"
                  name="q"
                  className="searchText"
                  placeholder="type to search..."
                  autoComplete="on"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Update search input
                />
              </form>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="col-lg-12">
            <div className="sidebar-item recent-posts">
              <div className="sidebar-heading">
                <h2>Recent Posts</h2>
              </div>
              <div className="content">
                <ul>
                  {filteredBlogs.map((blog, index) => (
                    <li key={index}>
                      <a href={`/post-details/${blog.id}`}>
                        <img
                          src={blog.image}
                          alt={`Recent post ${index + 1}`}
                          className="recent-posts__image"
                        />
                        <div className="recent-posts__details">
                          <h5>{blog.title}</h5>
                          <span>
                            {new Date(
                              blog.createdAt.seconds * 1000
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDialogBox;


import React, { useContext, useEffect, useState } from "react";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { collection, getDocs } from "firebase/firestore";
import { fireDb } from "../../Firebase/FirebaseConfig";
import "./Slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider_banner = () => {
  const context = useContext(MyContext);
  const { getAllBlog } = context;
  const navigate = useNavigate();
  const [commentCounts, setCommentCounts] = useState({}); // blogID -> count

  // Fetch comment counts for each blog
  const fetchCommentCounts = async () => {
    const counts = {};
    for (const blog of getAllBlog.slice(0, 6)) {
      const commentRef = collection(fireDb, `blogPost/${blog.id}/comment`);
      const commentSnap = await getDocs(commentRef);
      counts[blog.id] = commentSnap.size;
    }
    setCommentCounts(counts);
  };

  useEffect(() => {
    if (getAllBlog.length > 0) {
      fetchCommentCounts();
    }
  }, [getAllBlog]);

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="slider-banner">
      <div className="slider-banner__container">
        <Slider {...settings}>
          {getAllBlog &&
            getAllBlog.slice(0, 6).map((blog, index) => (
              <div className="slider-banner__item" key={index}>
                <img
                  className="slider-banner__image"
                  src={blog.image}
                  alt={blog.title}
                />
                <div className="slider-banner__content">
                  <div className="slider-banner__main-content">
                    <div className="slider-banner__category">
                      <span>{blog.category}</span>
                    </div>
                    <a
                      onClick={() => navigate(`/post-details/${blog.id}`)}
                      className="slider-banner__title"
                      style={{ cursor: "pointer" }}
                    >
                      <h4>{blog.title}</h4>
                    </a>
                    <ul className="slider-banner__info">
                      <li className="slider-banner__info-item">
                        <a href="#">Admin</a>  
                      </li>
                      <li className="slider-banner__info-item">
                        <a href="#">
                          {new Date(
                            blog.createdAt.seconds * 1000
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </a>
                      </li>
                      <li className="slider-banner__info-item">
                        <a href="#">
                          {commentCounts[blog.id] !== undefined
                            ? `${commentCounts[blog.id]} Comment${
                                commentCounts[blog.id] !== 1 ? "s" : ""
                              }`
                            : "Loading..."}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slider_banner;


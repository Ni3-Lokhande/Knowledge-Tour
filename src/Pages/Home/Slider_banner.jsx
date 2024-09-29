
// import React from 'react'

// const Slider_banner = () => {
//   return (
//     <div>
//       {/* Banner Starts Here */}
//       <div className="main-banner header-text">
//         <div className="container-fluid">
//           <div className="owl-banner owl-carousel">
//             <div className="item">
//               <img src="assets/images/banner-item-02.jpg" alt />
//               <div className="item-content">
//                 <div className="main-content">
//                   <div className="meta-category">
//                     <span>Nature</span>
//                   </div>
//                   <a href="post-details.html">
//                     <h4>Donec porttitor augue at velit</h4>
//                   </a>
//                   <ul className="post-info">
//                     <li>
//                       <a href="#">Admin</a>
//                     </li>
//                     <li>
//                       <a href="#">May 14, 2020</a>
//                     </li>
//                     <li>
//                       <a href="#">24 Comments</a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="item">
//               <img src="assets/images/banner-item-03.jpg" alt />
//               <div className="item-content">
//                 <div className="main-content">
//                   <div className="meta-category">
//                     <span>Lifestyle</span>
//                   </div>
//                   <a href="post-details.html">
//                     <h4>Best HTML Templates on TemplateMo</h4>
//                   </a>
//                   <ul className="post-info">
//                     <li>
//                       <a href="#">Admin</a>
//                     </li>
//                     <li>
//                       <a href="#">May 16, 2020</a>
//                     </li>
//                     <li>
//                       <a href="#">36 Comments</a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="item">
//               <img src="assets/images/banner-item-04.jpg" alt />
//               <div className="item-content">
//                 <div className="main-content">
//                   <div className="meta-category">
//                     <span>Fashion</span>
//                   </div>
//                   <a href="post-details.html">
//                     <h4>Responsive and Mobile Ready Layouts</h4>
//                   </a>
//                   <ul className="post-info">
//                     <li>
//                       <a href="#">Admin</a>
//                     </li>
//                     <li>
//                       <a href="#">May 18, 2020</a>
//                     </li>
//                     <li>
//                       <a href="#">48 Comments</a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="item">
//               <img src="assets/images/banner-item-05.jpg" alt />
//               <div className="item-content">
//                 <div className="main-content">
//                   <div className="meta-category">
//                     <span>Nature</span>
//                   </div>
//                   <a href="post-details.html">
//                     <h4>Cras congue sed augue id ullamcorper</h4>
//                   </a>
//                   <ul className="post-info">
//                     <li>
//                       <a href="#">Admin</a>
//                     </li>
//                     <li>
//                       <a href="#">May 24, 2020</a>
//                     </li>
//                     <li>
//                       <a href="#">64 Comments</a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//             <div className="item">
//               <img src="assets/images/banner-item-06.jpg" alt />
//               <div className="item-content">
//                 <div className="main-content">
//                   <div className="meta-category">
//                     <span>Lifestyle</span>
//                   </div>
//                   <a href="post-details.html">
//                     <h4>Suspendisse nec aliquet ligula</h4>
//                   </a>
//                   <ul className="post-info">
//                     <li>
//                       <a href="#">Admin</a>
//                     </li>
//                     <li>
//                       <a href="#">May 26, 2020</a>
//                     </li>
//                     <li>
//                       <a href="#">72 Comments</a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Banner Ends Here */}
//     </div>

//   )
// }

// export default Slider_banner



import React, { useContext } from 'react';
import MyContext from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import './Slider.css';
// Import slick carousel CSS (if not already done globally)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider_banner = () => {
  const context = useContext(MyContext);
  const { getAllBlog } = context;
  const navigate = useNavigate();

  // Slick carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show 3 slides in a row
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 slides on medium screens
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Show 1 slide on small screens
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="slider-banner" >
      {/* Banner Starts Here */}
      <div className="slider-banner__container" >
        <Slider {...settings}>
          {getAllBlog && getAllBlog.slice(0, 6).map((blog, index) => (
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
                    style={{ cursor: 'pointer' }}
                  >
                    <h4>{blog.title}</h4>
                  </a>
                  <ul className="slider-banner__info">
                    <li className="slider-banner__info-item">
                      <a href="#">Admin</a>
                    </li>
                    <li className="slider-banner__info-item">
                      <a href="#">{new Date(blog.createdAt.seconds * 1000).toLocaleDateString()}</a>
                    </li>
                    <li className="slider-banner__info-item">
                      <a href="#">24 Comments</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* Banner Ends Here */}
    </div>
  );
};

export default Slider_banner;

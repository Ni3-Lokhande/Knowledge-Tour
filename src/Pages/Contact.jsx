// import React from "react";

// const Contact = () => {
//   return (
//     <div>
//       {/* Page Content */}
//       {/* Banner Starts Here */}
//       <div className="heading-page header-text">
//         <section className="page-heading">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="text-content">
//                   <h4>contact us</h4>
//                   <h2>let’s stay in touch!</h2>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//       {/* Banner Ends Here */}
//       <section className="contact-us">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="down-contact">
//                 <div className="row">
//                   <div className="col-lg-8">
//                     <div className="sidebar-item contact-form">
//                       <div className="sidebar-heading">
//                         <h2>Send us a message</h2>
//                       </div>
//                       <div className="content">
//                         <form id="contact" action method="post">
//                           <div className="row">
//                             <div className="col-md-6 col-sm-12">
//                               <fieldset>
//                                 <input
//                                   name="name"
//                                   type="text"
//                                   id="name"
//                                   placeholder="Your name"
//                                   required
//                                 />
//                               </fieldset>
//                             </div>
//                             <div className="col-md-6 col-sm-12">
//                               <fieldset>
//                                 <input
//                                   name="email"
//                                   type="text"
//                                   id="email"
//                                   placeholder="Your email"
//                                   required
//                                 />
//                               </fieldset>
//                             </div>
//                             <div className="col-md-12 col-sm-12">
//                               <fieldset>
//                                 <input
//                                   name="subject"
//                                   type="text"
//                                   id="subject"
//                                   placeholder="Subject"
//                                 />
//                               </fieldset>
//                             </div>
//                             <div className="col-lg-12">
//                               <fieldset>
//                                 <textarea
//                                   name="message"
//                                   rows={6}
//                                   id="message"
//                                   placeholder="Your Message"
//                                   required
//                                   defaultValue={""}
//                                 />
//                               </fieldset>
//                             </div>
//                             <div className="col-lg-12">
//                               <fieldset>
//                                 <button
//                                   type="submit"
//                                   id="form-submit"
//                                   className="main-button"
//                                 >
//                                   Send Message
//                                 </button>
//                               </fieldset>
//                             </div>
//                           </div>
//                         </form>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-4">
//                     <div className="sidebar-item contact-information">
//                       <div className="sidebar-heading">
//                         <h2>contact information</h2>
//                       </div>
//                       <div className="content">
//                         <ul>
//                           <li>
//                             <h5>+91-7020380225</h5>
//                             <span>PHONE NUMBER</span>
//                           </li>
//                           <li>
//                             <h5>info@company.com</h5>
//                             <span>EMAIL ADDRESS</span>
//                           </li>
//                           <li>
//                             <h5>
//                               123 Aenean id posuere dui,
//                               <br />
//                               Praesent laoreet 10660
//                             </h5>
//                             <span>STREET ADDRESS</span>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-12">
//               <div id="map">
//                 <iframe
//                   src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed"
//                   width="100%"
//                   height="450px"
//                   frameBorder={0}
//                   style={{ border: 0 }}
//                   allowFullScreen
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Contact;







// .slider-banner {
//    padding-top: 100px;
//  }
 
//  /* Container to hold the carousel content */
//  .slider-banner__container {
//    padding: 0 10px;
//    margin-bottom: -24px;
//  }
 
//  /* Slider item container */
//  .slider-banner__item {
//    position: relative;
//     padding: 10px;
//    text-align: center;
//    box-sizing: border-box;
//    overflow: hidden; /* Ensure the overlay stays within the bounds */
//  }
 
//  .slider-banner__item::before {
//    content: '';
//    position: absolute;
//    top: 0;
//    left: 0;
//    width: 100%;
//    height: 100%;
//    background-color: rgba(0, 0, 0, 0.4); /* Dark overlay */
//    z-index: 1;
//  }
 
//  /* Content inside the item */
//  .slider-banner__content {
//    position: absolute;
//    bottom: 40px;
//    left: 40px;
//    z-index: 2; /* Ensures the content is above the dark overlay */
//    color: #fff;
//    opacity: 1; /* Bright content */
//    transition: opacity 0.3s ease;
//  }
 
//  /* Category styling */
//  .slider-banner__category span {
//    color: #f48840;
//    font-size: 18px;
//    text-transform: uppercase;
//    font-weight: 900;
//    letter-spacing: 0.25px;
//  }
 
//  /* Blog post title */
//  .slider-banner__title h4 {
//    font-size: 24px;
//    font-weight: 900;
//    color: #fff;
//    letter-spacing: 0.5px;
//    text-transform: capitalize;
//    margin: 10px 0 12px 0;
//  }
 
//  /* Info list inside the slider item (author, date, comments) */
//  .slider-banner__info {
//    list-style: none;
//    padding: 0;
//    margin: 0;
//  }
 
//  .slider-banner__info-item {
//    display: inline-block;
//    margin-right: 8px;
//    color: #fff;
//  }
 
//  .slider-banner__info-item:after {
//    content: '|';
//    color: #fff;
//    margin-left: 8px;
//  }
 
//  /* Remove separator for the last item */
//  .slider-banner__info-item:last-child:after {
//    display: none;
//  }
 
//  /* Links inside the info list */
//  .slider-banner__info-item a {
//    font-size: 14px;
//    color: #fff;
//    font-weight: 500;
//    transition: color 0.3s;
//  }
 
//  .slider-banner__info-item a:hover {
//    color: #f48840;
//  }
 
//  /* Image settings to ensure proper display */
//  .slider-banner__image {
//    width: 100%;
//    height: 420px;
//    display: block;
//    margin: 0 auto; object-fit: cover;
//    opacity: 0.6; /* Darker image */
//    filter: brightness(0.7); /* Adjust brightness to make it look darker */
//    transition: opacity 0.3s ease, filter 0.3s ease; /* Smooth transition */
//  }
 
//  .slider-banner__item:hover .slider-banner__image {
//    opacity: 0.8; /* Brighten the image slightly */
//    filter: brightness(1); /* Remove the darkening effect */  opacity: 0.8; /* Brighten the image slightly */
   
//  }
 
//  /* Slick carousel navigation controls */
//  .slider-banner .slick-prev, 
//  .slider-banner .slick-next {
//    position: absolute;
//    top: 50%;
//    transform: translateY(-50%);
//    z-index: 1;
//    background-color: rgba(250, 250, 250, 0.3);
//    width: 60px;
//    height: 60px;
//    line-height: 60px;
//    text-align: center;
//    font-size: 36px;
//    color: #fff;
//    border: none;
//    outline: none;
//    cursor: pointer;
//  }
 
//  .slider-banner .slick-prev {
//    left: 40px;
//  }
 
//  .slider-banner .slick-next {
//    right: 40px;
//  }
 
//  .slider-banner .slick-prev:hover,
//  .slider-banner .slick-next:hover {
//    background-color: rgba(250, 250, 250, 0.5);
//  }
 
//  /* Dots styling (if using dots) */
//  .slider-banner .slick-dots li button:before {
//    font-size: 12px;
//    color: #fff;
//  }
 
//  .slider-banner .slick-dots li.slick-active button:before {
//    color: #f48840;
//  }
 




// <div className="col-lg-12">
//                       <div className="sidebar-item categories">
//                         <div className="sidebar-heading">
//                           <h2>Categories</h2>
//                         </div>
//                         <div className="content">
//                           <ul>
//                             <li onClick={() => setSelectedCategory("Sport")}>
//                               <a href="#">- Sport</a>
//                             </li>
//                             <li onClick={() => setSelectedCategory("Business")}>
//                               <a href="#">- Business</a>
//                             </li>
//                             <li
//                               onClick={() =>
//                                 setSelectedCategory("Bollywood Hangama")
//                               }
//                             >
//                               <a href="#">- Bollywood Hangama</a>
//                             </li>
//                             <li onClick={() => setSelectedCategory("Health")}>
//                               <a href="#">- Health</a>
//                             </li>
//                             <li
//                               onClick={() =>
//                                 setSelectedCategory("Science & Tech")
//                               }
//                             >
//                               <a href="#">- Science &amp; Tech</a>
//                             </li>
//                             <li onClick={() => setSelectedCategory("Politics")}>
//                               <a href="#">- Politics</a>
//                             </li>
//                             <li
//                               onClick={() => setSelectedCategory("Gov-Schemes")}
//                             >
//                               <a href="#">- Gov-Schemes</a>
//                             </li>
//                             <li onClick={() => setSelectedCategory("Crime")}>
//                               <a href="#">- Crime</a>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-12">
//                       <div className="sidebar-item tags">
//                         <div className="sidebar-heading">
//                           <h2>Tag Clouds</h2>
//                         </div>
//                         <div className="content">
//                           <ul>
//                             <li>
//                               <a href="#">Lifestyle</a>
//                             </li>
//                             <li>
//                               <a href="#">Creative</a>
//                             </li>
//                             <li>
//                               <a href="#">HTML5</a>
//                             </li>
//                             <li>
//                               <a href="#">Inspiration</a>
//                             </li>
//                             <li>
//                               <a href="#">Motivation</a>
//                             </li>
//                             <li>
//                               <a href="#">PSD</a>
//                             </li>
//                             <li>
//                               <a href="#">Responsive</a>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>




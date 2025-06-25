
import React, { useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import { FcBusinessman } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';
import ShareDialogBox from './ShareDialogBox';
import './Header.css';

const Header = () => {

   

    const [isOpen, setIsOpen] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);

    const toggleNavbar = () => setIsOpen(!isOpen);
    const toggleShareModal = () => setShareModalOpen(!shareModalOpen);

    const closeNavbar = () => setIsOpen(false);

    const admin = localStorage.getItem('admin');

    return (
        <header >
            <nav className="navbar navbar-expand-lg navbar-light ">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        <h2>Knowledge Tour<em>.</em></h2>
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleNavbar}
                        aria-controls="navbarResponsive"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarResponsive">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink
                                    exact
                                    className="nav-link"
                                    to="/"
                                    activeClassName="active"
                                    onClick={closeNavbar}
                                >
                                    Home
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    to="/admin-login"
                                    activeClassName="active"
                                    onClick={closeNavbar}
                                >
                                    Admin Login
                                </NavLink>
                            </li>
                            <li className="nav-item">
                            <FaShareAlt 
                                className="share-icon" 
                                 size={24} 
                                 title="Share" 
                                 onClick={toggleShareModal}
                            />   

                            </li>
                            <li className="nav-item">
                                {admin ? (
                                    <NavLink
                                    to="/dashboard"
                                    title="Admin Dashboard"
                                    className="admin-dashboard-icon"
                                    onClick={closeNavbar}
                                >
                                    <FcBusinessman size={30} />
                                </NavLink>
                                ) : ""}
                            </li>
                        </ul>
                    </div>
                </div>
                <ShareDialogBox isOpen={shareModalOpen} toggle={toggleShareModal} />
            </nav>
        </header>
    );
};

export default Header;



// import React, { useState, useEffect } from 'react';
// import { FaShareAlt } from 'react-icons/fa';
// import { FcBusinessman } from 'react-icons/fc';
// import { NavLink, useNavigate } from 'react-router-dom';
// import ShareDialogBox from './ShareDialogBox';
// import './Header.css';

// const Header = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [shareModalOpen, setShareModalOpen] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const admin = localStorage.getItem('admin');
//         setIsLoggedIn(!!admin);
//     }, []);

//     const toggleNavbar = () => setIsOpen(!isOpen);
//     const toggleShareModal = () => setShareModalOpen(!shareModalOpen);
//     const closeNavbar = () => setIsOpen(false);

//     const handleLogout = () => {
//         localStorage.removeItem("admin");
//         localStorage.removeItem("adminName");
//         setIsLoggedIn(false);
//         navigate("/"); // Redirect to home after logout
//     };

//     return (
//         <header>
//             <nav className="navbar navbar-expand-lg navbar-light">
//                 <div className="container">
//                     <NavLink className="navbar-brand" to="/">
//                         <h2>Knowledge Tour<em>.</em></h2>
//                     </NavLink>
//                     <button
//                         className="navbar-toggler"
//                         type="button"
//                         onClick={toggleNavbar}
//                         aria-controls="navbarResponsive"
//                         aria-expanded={isOpen}
//                         aria-label="Toggle navigation"
//                     >
//                         <span className="navbar-toggler-icon" />
//                     </button>
//                     <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarResponsive">
//                         <ul className="navbar-nav">
//                             <li className="nav-item">
//                                 <NavLink
//                                     exact
//                                     className="nav-link"
//                                     to="/"
//                                     activeClassName="active"
//                                     onClick={closeNavbar}
//                                 >
//                                     Home
//                                 </NavLink>
//                             </li>
//                         </ul>
//                         <ul className="navbar-nav ml-auto">
//                             {!isLoggedIn && (
//                                 <li className="nav-item">
//                                     <NavLink
//                                         className="nav-link"
//                                         to="/admin-login"
//                                         activeClassName="active"
//                                         onClick={closeNavbar}
//                                     >
//                                         Admin Login
//                                     </NavLink>
//                                 </li>
//                             )}
//                             {isLoggedIn && (
//                                 <>
//                                     <li className="nav-item">
//                                         <NavLink
//                                             to="/dashboard"
//                                             title="Admin Dashboard"
//                                             className="admin-dashboard-icon nav-link"
//                                             onClick={closeNavbar}
//                                         >
//                                             <FcBusinessman size={30} />
//                                         </NavLink>
//                                     </li>
//                                     <li className="nav-item">
//                                         <button
//                                             className="nav-link btn btn-link"
//                                             onClick={handleLogout}
//                                             style={{ textDecoration: 'none', color: '#333' }}
//                                         >
//                                             Logout
//                                         </button>
//                                     </li>
//                                 </>
//                             )}
//                             <li className="nav-item">
//                                 <FaShareAlt
//                                     className="share-icon"
//                                     size={24}
//                                     title="Share"
//                                     onClick={toggleShareModal}
//                                     style={{ cursor: "pointer", marginTop: "8px" }}
//                                 />
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//                 <ShareDialogBox isOpen={shareModalOpen} toggle={toggleShareModal} />
//             </nav>
//         </header>
//     );
// };

// export default Header;









import React, { useContext } from "react";
import { Container, Row, Col, Card, Button, Table } from "reactstrap";
import { FaTrashAlt, FaPlus, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../context/MyContext";


const DashBoard = () => {
  
  const navigate = useNavigate();

  const context = useContext(MyContext);
  const { getAllBlog, deleteBlogs } = context;

   const adminData = JSON.parse(localStorage.getItem("admin"));
   const adminName = adminData?.name || "Admin";


  const logout = () => {
    localStorage.clear("admin");
    navigate("/");
  };

  return (
    <Container style={{paddingTop:'120px'}}>
      {/* Profile Section */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8}>
          <Card body className="d-flex flex-column align-items-center">
            {/* Div 1: Profile Image */}
            <div className="text-center mb-3" style={{ flex: "1" }}>
              <img
                src="nitin.jpg"
                alt="Profile"
                className="rounded-circle"
                style={{ width: "100px", height: '100px', objectFit: 'Cover' }}
              />
            </div>

            {/* Div 2: Profile Details */}
            <div
              style={{ flex: "2", textAlign: "left" }}
              className="text-center text-md-left mb-3"
            > 
              <h5>{adminName}</h5>
              <p>Administrator</p>
              <p>nitinlokhande1995@gmail.com</p>
              <p>Total Blogs: {getAllBlog.length}</p>
            </div>

            {/* Div 3: Buttons */}
            <div className="d-flex justify-content-center flex-wrap w-100">
              <Link to="/createblog" className="mb-2 me-2 w-100">
                <Button color="primary" className="w-100">
                  <FaPlus /> Create Blog
                </Button>
              </Link>
              <Button
                color="danger"
                className="mb-2 w-100"
                onClick={logout}
              >
                <FaSignOutAlt /> Logout
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Manage Blogs Table */}
      <Row>
        <Col xs={12}>
          <Card body>
            <Table responsive striped className="mt-3">
              <thead>
                <tr>
                  <th>S. No.</th>
                  <th>Thumbnail</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              {getAllBlog.length > 0 ? (
                getAllBlog.map((item, index) => {
                  const { image, createdAt, title, category, id } = item;
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={image}
                            alt="thumbnail"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>{title}</td>
                        <td>{category}</td>
                        <td>
                          {new Date(
                            createdAt.seconds * 1000
                          ).toLocaleDateString()}
                        </td>
                        <td>
                          <Button
                            color="danger"
                            size="sm"
                            onClick={() => deleteBlogs(id)}
                          >
                            <FaTrashAlt /> Delete
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })                     
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center">
                      <h5>No Blogs Found</h5>
                    </td>
                  </tr>
                </tbody>
              )}
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashBoard;

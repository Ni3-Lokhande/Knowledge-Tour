// import React, { useState } from 'react'
// import { Button, Card, CardBody, CardHeader, Container, Form, FormGroup, Input, Label } from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import './AdminLogin.css'
// import toast from 'react-hot-toast';
// import { auth } from '../Firebase/FirebaseConfig';

// const AdminLogin = () => {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const login = async () => {

//     if(!email || !password) {
//       return toast.error("All field are required")

//     } try {
//       const result = await signInWithEmailAndPassword(auth, email, password);
//       toast.success("Login Successful")
//       localStorage.setItem("admin", JSON.stringify(result));
//       navigate('/dashboard')
//     } catch (error) {
//         console.log(error);
//         toast.error("Login failed")

//       }
//   }

//   return (
//     <Container className="login-container">
//       <Card className="login-card">
//         <CardHeader>
//           <h3>Login Here</h3>
//         </CardHeader>
//         <CardBody>
//           <Form>
//             <FormGroup>
//               <Label for="email">Enter Email</Label>
//               <Input type="email" placeholder="Enter here" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
//             </FormGroup>
//             <FormGroup>
//               <Label for="password">Enter Password</Label>
//               <Input type="password" placeholder="Enter here" id="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
//             </FormGroup>
//             <Container className="text-center">
//               <Button color="dark" onClick={login}>Login</Button>
//               <Button color="secondary" className="ms-2" type="reset">Reset</Button>
//             </Container>
//           </Form>
//         </CardBody>
//       </Card>
//     </Container>
//   )
// }

// export default AdminLogin

import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./AdminLogin.css";
import toast from "react-hot-toast";
import { auth } from "../Firebase/FirebaseConfig";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault(); // ✅ prevent default form reload

    if (!email || !password || !name) {
      return toast.error("All fields are required");
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful");

      localStorage.setItem("admin", JSON.stringify(result.user));
      localStorage.setItem("adminName", name); // ✅ store name here
      navigate("/dashboard"); // ✅ navigate to dashboard
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <Container className="login-container">
      <Card className="login-card">
        <CardHeader>
          <h3>Login Here</h3>
        </CardHeader>
        <CardBody>
          <Form onSubmit={login}>
            <FormGroup>
              <Label for="name">Enter Your Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Enter Email</Label>
              <Input
                type="email"
                placeholder="Enter here"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Enter Password</Label>
              <Input
                type="password"
                placeholder="Enter here"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <Container className="text-center">
              <Button color="dark" type="submit">
                Login
              </Button>
              <Button color="secondary" className="ms-2" type="reset">
                Reset
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AdminLogin;

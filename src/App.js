

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Master from "./Master";
import PostDetails from "./Pages/PostDetails";
import Home from "./Pages/Home/Home";
import AdminLogin from "./authentication/AdminLogin";
import DashBoard from "./admin/DashBoard";
import CreateBlog from "./admin/CreateBlog";
import MyState from "./context/MyState";
import { Toaster } from "react-hot-toast";
import './App.css'

function App() {
  return (
    <div>

      <MyState> 
        <BrowserRouter>
        <Toaster       
         toastOptions={{
          style: {
            marginTop:'100px',
            borderRadius: '8px', // Customize border-radius if needed
            background: '#333', // Set a global background
            color: '#fff', // Text color
          },
          success: {
            style: {
              background: 'green',
            },
          },
          error: {
            style: {
              background: 'red',
            },
          },
        }}
        />  
          <Routes>

            <Route path="/" element={<Master Comp={Home} />} />   
            <Route path="/post-details/:id" element={<Master Comp={PostDetails} />}/>   
            <Route path="/admin-login" element={<Master Comp={AdminLogin} />} /> 
            <Route path='/dashboard' element={<ProtectedRouteForAdmin><Master Comp={DashBoard}/></ProtectedRouteForAdmin>} />    
            <Route path='/createblog' element={<ProtectedRouteForAdmin><Master Comp={CreateBlog}/></ProtectedRouteForAdmin>} /> 

          </Routes>

        </BrowserRouter>
      </MyState> 
    </div>
  );
}

export default App;



export const ProtectedRouteForAdmin = ({children}) => {
  const admin = JSON.parse(localStorage.getItem('admin'))
    if (admin?.user?.email === "newtest@gmail.com") {
     return children
    } else {
     return <Navigate to={'/admin-login'}/>   
    }
}





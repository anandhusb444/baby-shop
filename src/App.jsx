import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Registration from "./components/Registration";
import { BrowserRouter, Routes, Route, UNSAFE_RouteContext } from "react-router-dom";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Homepage from "./components/Homepage";
import Layout from "./Pages/Layout";
import About from "./Pages/About";
import AdminNavbar from "./Admin/Component/AdminNavbar";
import Products from "./Admin/Pages/AdminProducts";
import AdminProducts from "./Admin/Pages/AdminProducts";
import Adminmodel from "./Admin/Component/Adminmodel";
import AdminUserlist from "./Admin/Pages/AdminUserlist";
import AdminHomePage from "./Admin/Pages/Adminaboutus";



export default function App() {
  return (
    <BrowserRouter>
    <div>
      

      
      
      {/* <Routes>
        <Route path="/" element={<Layout/>}>
          
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/about" element={<About/>}/>
        </Route>
          
          <Route path="/register" element={<Registration/>}/>
          
        {/* <Route path="/shop" element={<Products/>}/> */}
        
        

      {/*</Routes> */}
      
      <AdminNavbar/>
      <Routes>
        
        <Route path="/adminproducts" element={<AdminProducts/>}/>
        <Route path="model" element={<Adminmodel/>}/>
        <Route path="userlist" element={<AdminUserlist/>}/>
        <Route path="/register" element={<Registration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Homepage/>} />
        <Route path="/adminhome" element={<AdminHomePage/>}/>
        
      </Routes>
      
    </div>

   


    </BrowserRouter>
    
  )
}
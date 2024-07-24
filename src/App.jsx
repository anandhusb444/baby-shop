import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Registration from "./components/Registration";
import {
  BrowserRouter,
  Routes,
  Route,
  UNSAFE_RouteContext,
} from "react-router-dom";
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
import AdminHomePage from "./Admin/Pages/Adminhome";
import Footer from "./Pages/Footer";
import ContactUs from "./Pages/Contactus";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        {/* <Routes>
        <Route path="/" element={<Layout/>}>
          
          
        </Route>
          
          <Route path="/register" element={<Registration/>}/>
          
        {/* <Route path="/shop" element={<Products/>}/> */}

        {/*</Routes> */}

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Homepage />} />
            
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contactUs" element={<ContactUs/>}/>
            </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          <Route path="/admin" element={<AdminNavbar />}>
            <Route path="/admin/home" element={<AdminHomePage />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/model" element={<Adminmodel />} />
            <Route path="/admin/userlist" element={<AdminUserlist />} />
          </Route>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

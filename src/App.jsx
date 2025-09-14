import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./components/Home";
import { Product } from "./components/Product";
import { Cart } from "./components/Cart";
import { Navbar } from "./components/Navbar";
import Signin from "./Signin";
import Signup from "./Signup";
import { MyOrders } from "./MyOrders";
import AdminDashboard from "./Admin/AdminDashboard";

const MainLayout = ({ searchTerm, setSearchTerm }) => (
  <>
    <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    <Outlet /> 
  </>
);

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard/>}/>

        
        <Route element={<MainLayout searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}>
          <Route path="/home" element={<Home searchTerm={searchTerm} />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/myorders" element={<MyOrders/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

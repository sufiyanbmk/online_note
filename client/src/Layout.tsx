import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Navbar";

const Layout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); 
    } else {
      navigate("/login"); 
    }
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;

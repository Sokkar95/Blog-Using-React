import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Register from "./Components/Register";
import "./style.css";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Post from "./Components/Post";
import { useState } from "react";

const App = () => {
  const [isAuth, setAuth] = useState(false);
  return (
    <>
      <Router>
        <Navbar isAuth={isAuth} setAuth={setAuth} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/reg" element={<Register />} />
          <Route
            path="/admin"
            element={<Admin isAuth={isAuth} setAuth={setAuth} />}
          />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

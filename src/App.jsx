import { useState } from "react";
import hunterLogo from "./assets/HunterCS-Logo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";

import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("isAuth");
        setIsAuth(false);
        window.location.pathname = "/login";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/createpost">CreatePost</Link>
          {!isAuth ? (
            <Link to="/login">Board Login</Link>
          ) : (
            <button onClick={signUserOut}> Log Out </button>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreatePost" element={<CreatePost />} />
          <Route path="/Login" element={<Login setIsAuth={setIsAuth} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

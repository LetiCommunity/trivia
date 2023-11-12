import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserNavbar from "./components/UserNavbar";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Activity from "./components/Activity";
import SendPackage from "./components/SendPackage";
import PublishTrip from "./components/PublishTrip";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import NoPage from "./components/NoPage";
import EditProfile from "./components/EditProfile";
import SearchTrip from "./components/SearchTrip";
import Logout from "./components/Logout";

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    let storedToken = localStorage.getItem("token");
    //It verify if the token exist and is  valid before set it in the state
    if (storedToken) {
      setToken(storedToken);
    }
  }, [token]);
  return (
    <div className="content bg-light">
      <header>
        <UserNavbar token={token} />
      </header>
      <section>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="home" element={<Home />} />
            <Route path="activity" element={<Activity token={token} />} />
            <Route
              path="send-package"
              element={<SendPackage token={token} />}
            />
            <Route
              path="publish-trip"
              element={<PublishTrip token={token} />}
            />
            <Route path="search-trip" element={<SearchTrip />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
            {token ? (
              <>
                <Route path="profile" element={<Profile token={token} />} />
                <Route
                  path="edit-profile"
                  element={<EditProfile token={token} />}
                />
                <Route path="logout" element={<Logout token={token} />} />
              </>
            ) : (
              <>
                <Route path="registration" element={<Registration />} />
                <Route path="login" element={<Login />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </section>
    </div>
  );
}

export default App;

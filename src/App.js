import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserNavbar from "./components/main/UserNavbar";
import Home from "./components/main/Home";
import Registration from "./components/authentication/Registration";
import Login from "./components/authentication/Login";
import ResetPassword from "./components/authentication/ResetPassword";
import Activity from "./components/main/Activity";
import Notification from "./components/main/Notification";
import SendPackage from "./components/main/SendPackage";
import PublishTrip from "./components/main/PublishTrip";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";
import ChangePassword from "./components/profile/ChangePassword";
import ChangeProfileImage from "./components/profile/ChangeProfileImage";
import SearchTrip from "./components/main/SearchTrip";
import Logout from "./components/authentication/Logout";
import Terms from "./components/main/Terms";

function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    //It verify if the token exist and is  valid before set it in the state
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="content bg-light">
      <header>
        <UserNavbar />
      </header>
      <section>
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="home" element={<Home />} />
            <Route path="search-trip" element={<SearchTrip />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<Home />} />
            {token ? (
              <>
                <Route path="send-package" element={<SendPackage />} />
                <Route path="publish-trip" element={<PublishTrip />} />
                <Route path="activity" element={<Activity />} />
                <Route
                  path="activity/edit-trip/:id"
                  element={<PublishTrip />}
                />
                <Route
                  path="activity/edit-package/:id"
                  element={<SendPackage />}
                />
                <Route path="notifications" element={<Notification />} />
                <Route path="profile" element={<Profile />} />
                <Route path="edit-profile" element={<EditProfile />} />
                <Route
                  path="change-profile-image"
                  element={<ChangeProfileImage />}
                />
                <Route path="change-password" element={<ChangePassword />} />
                <Route path="logout" element={<Logout />} />
              </>
            ) : (
              <>
                <Route path="registration" element={<Registration />} />
                <Route path="login" element={<Login />} />
                <Route path="reset-password" element={<ResetPassword />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </section>
    </div>
  );
}

export default App;

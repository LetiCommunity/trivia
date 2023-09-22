import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserNavbar from "./components/UserNavbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";
import SendPackage from "./components/SendPackage";
import PublishTrip from "./components/PublishTrip";
import Profile from "./components/Profile";
import Contact from "./components/Contact";
import NoPage from "./components/NoPage";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <div className="content bg-light">
      <header>
        <UserNavbar />
      </header>
      <section>
        <BrowserRouter>
          <Routes>
            <Route index path="home" element={<Home />} />
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route path="send-package" element={<SendPackage />} />
            <Route path="publish-trip" element={<PublishTrip />} />
            <Route path="profile" element={<Profile />}/>
            <Route path="edit-profile" element={<EditProfile/>}/>
            <Route path="logout" element={<PublishTrip />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </section>
      <footer className="footer bg-dark text-white">
        <Footer />
      </footer>
    </div>
  );
}

export default App;

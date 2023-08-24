import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./components/Home";
import Contact from "./components/Contact";
import NoPage from "./components/NoPage";
import Login from "./components/Login";
import Registration from "./components/Registration";

function App() {
  return (
    <div className="container-fluid bg-light">
      <section>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </section>
    </div>
  );
}

export default App;

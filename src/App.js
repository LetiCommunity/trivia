import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/UserNavbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import NoPage from "./components/NoPage";

function App() {
  return (
    <div className="container">
      <header>
        <Navbar />
      </header>
      <section>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </section>
    </div>
  );
}

export default App;

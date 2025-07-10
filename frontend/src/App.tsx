// frontend/src/App.tsx

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NavBar from "./components/NavBar";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export default function App() {
  const location = useLocation();

  return (
    <>
      <NavBar />
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          style={{ padding: "2rem", maxWidth: 800, margin: "auto" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </>
  );
}

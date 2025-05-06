import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { motion } from "framer-motion";
import GlobalStyles from "./styles/globalStyles";
import { theme } from "./styles/theme";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NavBar from "./components/NavBar";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <NavBar />
        <MainContent>
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                >
                  <Home />
                </motion.div>
              }
            />
            <Route
              path="/services"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                >
                  <Services />
                </motion.div>
              }
            />
            <Route
              path="/contact"
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                >
                  <Contact />
                </motion.div>
              }
            />
          </Routes>
        </MainContent>
      </Router>
    </ThemeProvider>
  );
};

const MainContent = styled.main`
  padding-top: 100px;
  max-width: 1200px;
  margin: auto;
  width: 90%;
  text-align: center;
`;

export default App;

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 15px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Logo = styled.h1`
  color: white;
  font-size: 2vw;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavList = styled.ul<{ isOpen: boolean }>`
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    align-items: center;
    padding: 15px;
  }
`;

const NavItem = styled.li`
  list-style: none;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5vw;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 2vw;
  }

  @media (max-width: 480px) {
    font-size: 3vw;
  }
`;

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);

  // Klick außerhalb der Navbar schließt das Menü
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Nav>
      <Logo>🚚 Umzugsfirma</Logo>
      <MobileMenuButton onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </MobileMenuButton>
      <NavList ref={navRef} isOpen={menuOpen}>
        <NavItem>
          <NavLink to="/">Startseite</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/services">Leistungen</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contact">Kontakt</NavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

export default NavBar;

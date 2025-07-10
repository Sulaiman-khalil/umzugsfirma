// frontend/src/components/NavBar.tsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.bgLight};
  align-items: center;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  position: relative;
  padding-bottom: 2px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${({ $active, theme }) =>
    $active &&
    `
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: ${theme.colors.primary};
    }
  `}
`;

const LogoutButton = styled.button`
  margin-left: auto;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.error};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    opacity: 0.9;
  }
`;

export default function NavBar() {
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Nav>
      <NavLink to="/" $active={pathname === "/"}>
        Home
      </NavLink>
      <NavLink to="/services" $active={pathname === "/services"}>
        Services
      </NavLink>
      <NavLink to="/contact" $active={pathname === "/contact"}>
        Kontakt
      </NavLink>

      {token ? (
        <>
          <NavLink to="/admin" $active={pathname === "/admin"}>
            Admin
          </NavLink>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </>
      ) : (
        <NavLink to="/login" $active={pathname === "/login"}>
          Login
        </NavLink>
      )}
    </Nav>
  );
}

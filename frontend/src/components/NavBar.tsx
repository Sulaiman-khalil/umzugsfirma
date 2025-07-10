// frontend/src/components/NavBar.tsx

import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.large};
  padding: ${({ theme }) => theme.spacing.medium};
  background-color: ${({ theme }) => theme.colors.bgLight};
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  position: relative;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.text};
  font-weight: 500;
  padding-bottom: 0.25rem;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    height: 2px;
    width: ${({ $active }) => ($active ? "100%" : "0%")};
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.2s ease-in-out;
  }

  &:hover::after {
    width: 100%;
  }
`;

export default function NavBar() {
  const { pathname } = useLocation();

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
    </Nav>
  );
}

import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.bgLight};
`;

const StyledLink = styled(Link)<{ active?: boolean }>`
  color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function NavBar() {
  const { pathname } = useLocation();
  return (
    <Nav>
      <StyledLink to="/" active={pathname === "/"}>
        Home
      </StyledLink>
      <StyledLink to="/services" active={pathname === "/services"}>
        Services
      </StyledLink>
      <StyledLink to="/contact" active={pathname === "/contact"}>
        Kontakt
      </StyledLink>
    </Nav>
  );
}

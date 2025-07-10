// frontend/src/pages/NotFound.tsx

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.large};
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const Message = styled.p`
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const HomeLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

export default function NotFound() {
  return (
    <Container>
      <Title>404 – Seite nicht gefunden</Title>
      <Message>
        Die gesuchte Seite existiert nicht oder wurde verschoben.
      </Message>
      <HomeLink to="/">Zur Startseite</HomeLink>
    </Container>
  );
}

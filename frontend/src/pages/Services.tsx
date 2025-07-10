// frontend/src/pages/Services.tsx

import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export default function Services() {
  return (
    <section>
      <Title>Unsere Services</Title>
      <ul>
        <li>Privatumzug</li>
        <li>Firmenumzug</li>
        <li>Möbelmontage</li>
      </ul>
    </section>
  );
}

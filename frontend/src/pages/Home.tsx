// frontend/src/pages/Home.tsx

import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export default function Home() {
  return (
    <section>
      <Title>Willkommen bei Umzugsfirma</Title>
      <p>Wir helfen dir, stressfrei umzuziehen.</p>
    </section>
  );
}

// frontend/src/pages/Contact.tsx

import React from "react";
import styled from "styled-components";
import ContactForm from "../components/ContactForm";

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export default function Contact() {
  return (
    <section>
      <Title>Kontakt</Title>
      <ContactForm />
    </section>
  );
}

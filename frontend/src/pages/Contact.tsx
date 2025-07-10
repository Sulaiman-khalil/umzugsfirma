import styled from "styled-components";
import ContactForm from "../components/ContactForm";

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

export default function Contact() {
  return (
    <main>
      <Title>Kontakt</Title>
      <ContactForm />
    </main>
  );
}

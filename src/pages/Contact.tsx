import React from "react";
import styled from "styled-components";

const ContactContainer = styled.div`
  text-align: center;
  max-width: 600px;
  margin: auto;
  padding: 40px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 28px;
`;

const ContactInfo = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputField = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  height: 100px;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Contact: React.FC = () => {
  return (
    <ContactContainer>
      <Heading>Kontaktiere uns</Heading>
      <ContactInfo>
        📞 <strong>Telefon:</strong> +49 123 456 789 <br />
        📧 <strong>E-Mail:</strong> info@umzugsfirma.de <br />
        🏠 <strong>Adresse:</strong> Musterstraße 1, 10115 Berlin
      </ContactInfo>
      <ContactForm>
        <InputField type="text" placeholder="Dein Name" required />
        <TextArea placeholder="Deine Nachricht" required />
        <SubmitButton type="submit">Senden</SubmitButton>
      </ContactForm>
    </ContactContainer>
  );
};

export default Contact;

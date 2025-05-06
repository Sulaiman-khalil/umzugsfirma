import React from "react";
import styled from "styled-components";

const ServicesContainer = styled.div`
  text-align: center;
  max-width: 800px;
  margin: auto;
  padding: 40px;
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ServiceItem = styled.li`
  margin-bottom: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;

  &:before {
    content: "✔";
    color: ${({ theme }) => theme.colors.primary};
    font-size: 24px;
  }
`;

const Description = styled.p`
  font-size: 20px;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Services: React.FC = () => {
  return (
    <ServicesContainer>
      <Heading>Unsere Dienstleistungen</Heading>
      <ServiceList>
        <ServiceItem>Privatumzüge – Stressfrei & schnell</ServiceItem>
        <ServiceItem>Firmenumzüge – Professionell & effizient</ServiceItem>
        <ServiceItem>
          Möbelmontage & Transport – Sicher & fachgerecht
        </ServiceItem>
        <ServiceItem>
          Entrümpelung & Haushaltsauflösung – Ordnung leicht gemacht
        </ServiceItem>
      </ServiceList>
      <Description>
        Wir sorgen für einen reibungslosen Ablauf – kontaktiere uns für dein
        individuelles Angebot!
      </Description>
    </ServicesContainer>
  );
};

export default Services;

import React from "react";
import styled from "styled-components";
import Testimonials from "../components/Testimonials";

const HomeContainer = styled.div`
  text-align: center;
  max-width: 900px;
  margin: auto;
  padding: 20px; /* Vorher war es 50px */
`;

const HeroSection = styled.div`
  background-image: url("/public/hero-banner.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black; /* Ändere von 'white' auf 'black' */
  font-size: 32px;
  font-weight: bold;
`;

const WelcomeText = styled.p`
  font-size: 22px;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

const ServiceSection = styled.div`
  margin-top: 40px;
`;

const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 18px;
  margin-top: 10px; /* Vorher war es 20px */
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

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HeroSection>Willkommen bei Ihrer Umzugsfirma!</HeroSection>
      <WelcomeText>
        Wir sorgen für einen stressfreien und effizienten Umzug.
      </WelcomeText>

      <ServiceSection>
        <h2>Unsere Dienstleistungen</h2>
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
      </ServiceSection>

      {/* Testimonials-Komponente eingebaut */}
      <Testimonials />
    </HomeContainer>
  );
};

export default Home;

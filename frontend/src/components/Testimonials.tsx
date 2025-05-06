import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const TestimonialsContainer = styled.div`
  max-width: 800px;
  margin: auto;
  text-align: center;
  padding: 40px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h2`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
`;

const Testimonial = styled(motion.div)`
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Stars = styled.div`
  font-size: 24px;
  color: #ffc107; /* Goldene Sterne */
  margin-bottom: 10px;
`;

const Testimonials: React.FC = () => {
  return (
    <TestimonialsContainer>
      <Heading>Kundenmeinungen</Heading>
      <Testimonial
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stars>⭐⭐⭐⭐⭐</Stars>
        <p>"Super Umzugsservice! Schnell und zuverlässig."</p>
        <strong>- Max Müller</strong>
      </Testimonial>
      <Testimonial
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stars>⭐⭐⭐⭐⭐</Stars>
        <p>"Freundliches Team und perfekte Organisation!"</p>
        <strong>- Lisa Schmidt</strong>
      </Testimonial>
    </TestimonialsContainer>
  );
};

export default Testimonials;

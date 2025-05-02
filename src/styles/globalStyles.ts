import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

body {
  font-family: ${({ theme }) => theme.fonts.main};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  padding-top: 30px; /* Vorher war es 50px */
  width: 90%;
  max-width: 1200px;
  margin: auto;
}



  h1, h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    text-align: center;
    font-size: 3vw;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 5vw;
    }
  }

  p {
    font-size: 1.5vw;
    text-align: center;
    max-width: 600px;
    margin: auto;

    @media (max-width: 768px) {
      font-size: 2.5vw;
    }
  }

  button {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    padding: 12px 18px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

export default GlobalStyles;

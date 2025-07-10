// frontend/src/styles/globalStyles.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: ${({ theme }) => theme.fonts.body};
    background:  ${({ theme }) => theme.colors.bg};
    color:       ${({ theme }) => theme.colors.text};
    line-height: 1.5;
  }
`;

export default GlobalStyles;

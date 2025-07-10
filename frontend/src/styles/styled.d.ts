// frontend/src/styles/styled.d.ts
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      text: string;
      bgLight: string;
      bg: string;
      success: string;
      error: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
    fonts: {
      body: string;
      heading: string;
      monospace: string;
    };
  }
}

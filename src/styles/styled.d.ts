import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      accent: Interpolation<object>;
      primary: string;
      secondary: string;
      text: string;
    };
    fonts: {
      heading: Interpolation<object>;
      main: string;
    };
  }
}

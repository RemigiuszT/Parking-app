import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body, #root {
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyles;

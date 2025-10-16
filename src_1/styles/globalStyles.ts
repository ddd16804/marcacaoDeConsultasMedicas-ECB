import { createGlobalStyle, DefaultTheme } from 'styled-components';
export const GlobalStyles = createGlobalStyle<{ theme: DefaultTheme }>`
  body {
    font-family: 'Poppins_400Regular';
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins_700Bold';
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  button, input {
    font-family: 'Poppins_500Medium';
  }
`;

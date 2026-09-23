import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    background: '#0b1020',
    surface: '#121a2f',
    surfaceMuted: '#18223d',
    border: '#283758',
    text: '#f4f7ff',
    muted: '#91a0bf',
    primary: '#8b5cf6',
    secondary: '#22d3ee',
    success: '#34d399',
    danger: '#fb7185',
  },
};

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-width: 320px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  button, input, select { font: inherit; }
`;

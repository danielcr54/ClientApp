import { injectGlobal } from 'emotion';

export function applyGlobalStyles() {
  return injectGlobal`
    body {
      margin: 0;
      padding: 0;
      font-family: 'Rubik', 'Helvetica', 'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
      background-color: #231f32;
      color: white;
    }

    a {
      color: #9c73d7;
    }

    a:hover,
    a:focus,
    a:active {
      color: white;
    }

    button, input {
      font-family: 'Rubik', 'Helvetica', 'Helvetica Neue', sans-serif;
    }
  `;
}

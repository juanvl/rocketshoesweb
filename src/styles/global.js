import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import bg from 'assets/images/bg.svg';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height: 100%;
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }

  body {
    background: #191920 url(${bg}) no-repeat center top;
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    font-size: 14px;
    font-family: Roboto, Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;

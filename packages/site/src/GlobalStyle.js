import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: #F5F5F5;
  }
  
  #root {
    display: flex;
    flex-direction: column;
  }
  
  ol, ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .ui.primary.button, .ui.primary.buttons .button {
    background: #04D2C5;
    
    &:hover, &:active, &:focus {
      background: #40DDD3;
    }
    
    &:focus {
      background: #04B9AD;
    }
  }
  
  .ui.input.focus>input, .ui.input>input:focus {
    border-color: #04D2C5;
  }
  
  .ui.input.error>input:focus {
    border-color: #EC4730;;
  }
`;

export default GlobalStyle

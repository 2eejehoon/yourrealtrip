import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin:0;
        padding:0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    }   
    
    body {
        margin: auto;
        width: 390px;
        border: 1px solid lightgray;
        box-shadow: 0.5px 0.5px lightgray;
        overflow-y: scroll;
    }
`;

export default GlobalStyle;

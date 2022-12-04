import { createGlobalStyle } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        margin:0;
        padding:0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    }   
    
    body {
        min-height: 100vh;
        box-shadow: 0.5px 0.5px lightgray;
        overflow-y: scroll;
        height:auto;
        background-color:lightslategray;
    }
`;

export default GlobalStyle;

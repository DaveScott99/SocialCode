import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    ::-webkit-scrollbar {
        width: 8px;               /* Largura da scrollbar */
    }

    ::-webkit-scrollbar-track {
        background: ${(props) =>
          props.theme.colors
            .white_smoke};        /* Cor da área de rastreamento */
    }

    ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.dark_grey};
    border-radius: 20px;
    }

`;

export default GlobalStyle;

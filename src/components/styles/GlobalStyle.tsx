import { createGlobalStyle, DefaultTheme } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  ${normalize}
  

  @font-face {

  font-family: 'DeterminationMono';

  src: url('../../media/DeterminationMono.woff') format('woff');

}

@font-face {

  font-family: 'ComicMono';

  src: url('../../media/ComicMono.woff') format('woff');

}

  *, ::before, ::after {
    border-width: 0;
    border-style: solid;
    border-color: theme('borderColor.DEFAULT', currentColor);
  }

  blockquote, dl, dd, h1, h2, h3,
  h4, h5, h6, hr, figure, p, pre {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  img, svg, video, canvas, audio, 
  iframe, embed, object {
    display: block;
  }

  body {
    font-family: 'Space Mono', monospace, "Work Sans", "DeterminationMono", "ComicMono";
    font-weight: 500;
    // added
    font-size: 1.65rem;
    line-height: 2.5rem;
    background-color: ${({ theme }) => theme.colors?.body};
    color: ${({ theme }) => theme.colors?.text[100]};
  }

  /* ===== Custom Scroll Bar ===== */
  /* width */
  ::-webkit-scrollbar {
    width: 15px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors?.body};
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors?.scrollHandle};
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors?.scrollHandleHover};
  }

  input[type=text] {
    background-color: ${({ theme }) => theme.colors?.body};
    color: ${({ theme }) => theme.colors?.text[100]};
    caret-color: ${({ theme }) => theme.colors?.primary};
  }
  input[type=text]:focus-visible {
    outline: none;
  }


  
  input[type=range] {
  -webkit-appearance: none;
  margin: 18px 0;
  width: 250px;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: #9399B2;
  border-radius: 2px;
}
input[type=range]::-webkit-slider-thumb {
  height: 22px;
  width: 22px;
  border-radius: 3px;
  background: #FAB387;
  cursor: pointer;
  border-radius: 200px;
  -webkit-appearance: none;
  margin-top: -10px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #868da6;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: #868da6;
  border-radius: 2px;
}
input[type=range]::-moz-range-thumb {
  height: 22px;
  width: 22px;
  border-radius: 3px;
  background: none;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #9399B2;
  border-radius: 3px;
}
input[type=range]::-ms-fill-upper {
  background: #9399B2;
}

input[type=range]::-ms-thumb {
  height: 22px;
  width: 22px;
  border-radius: 3px;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #9399B2;
}
input[type=range]:focus::-ms-fill-upper {
  background: #9399B2;
}






  .sr-only {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;

export default GlobalStyle;

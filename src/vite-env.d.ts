/// <reference types="vite/client" />

import "styled-components";
interface ImportMetaEnv {
  readonly VITE_FIRSTNAME: string
  readonly VITE_LASTNAME: string

  readonly VITE_LASTFMAPIKEY: string,
  readonly VITE_LASTFMUSERNAME: string




  // more env variables...
}
declare module "styled-components" {
  export interface DefaultTheme {
    id: string;
    name: string;
    colors: {
      body: string;
      scrollHandle: string;
      scrollHandleHover: string;
      primary: string;
      secondary: string;
      text: {
        100: string;
        200: string;
        300: string;
      };
    };
  }
}

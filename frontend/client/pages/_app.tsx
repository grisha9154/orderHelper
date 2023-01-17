import NextNProgress from "nextjs-progressbar";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Footer, Header, Main } from "../components";
import { FC } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { theme } from "../styles/theme";
import createCache, { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

let muiCache: EmotionCache | undefined = undefined;

export const createMuiCache = () =>
  (muiCache = createCache({
    key: "mui",
    prepend: true,
  }));

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <CacheProvider value={muiCache ?? createMuiCache()}>
      <ThemeProvider theme={theme}>
        <NextNProgress
          height={4}
          options={{ easing: "ease", speed: 500, showSpinner: false }}
        />
        <Header />
        <Main>
          <Component {...pageProps} />
        </Main>
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../context/auth/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
      <div id="portal-root"></div>
    </>
  );
}

export default MyApp;

import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AlbumProvider } from "../contexts/AlbumContext";

function MyApp({ Component, pageProps }) {
  return (
    <AlbumProvider>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </AlbumProvider>
  );
}

export default MyApp;

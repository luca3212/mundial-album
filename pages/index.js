import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import axios from "axios";
import Head from "next/head";

//Modelo albumVacio
import { modeloAlbumVacio } from "../pages/api/modelAlbum";

//Autentificacion
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

//Componentes
import HeaderHome from "../componentes/headerHome";
import Spinner from "../componentes/Spinner";
import ModalPortal from "../componentes/Modal";
import AlbumSeccion from "../componentes/AlbumSection";
import EstadisticasSection from "../componentes/EstadisticasSection";

//APIcontext
import { AlbumContext } from "../contexts/AlbumContext";
import { useContext } from "react";
import Footer from "../componentes/Footer";
import BtonTop from "../componentes/btonTop";
import Edit from "../componentes/editar/edit";

export default function Home({ session }) {
  const { setAlbum, loading, setLoading, ventanaMod } =
    useContext(AlbumContext);
  const [ventanaAlbum, setVentanaAlbum] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/album");
        if (res.data.noExiste) {
          crearAlbum();
          setAlbum(modeloAlbumVacio);
        } else {
          setAlbum(res.data[0].listFiguritas);
        }
      } catch (error) {
        console.log("Error al recuperar datos. ", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, []);

  //funcion para crear album - primer inicio de sesion
  const crearAlbum = async () => {
    try {
      const res = await axios.post("/api/album", {
        name: session.user.email,
        album: modeloAlbumVacio,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Head>
        <title>Álbum Mundial 2022</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#1b588d"></meta>

        <meta
          name="description"
          content="Web para el control de figuritas del álbum del mundial de futbol Qatar 2022. "
        />

        <meta property="og:url" content="https://mundial-album.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Álbum Mundial 2022 - Login" />
        <meta
          property="og:description"
          content="Web para el control de figuritas del álbum del mundial de futbol Qatar 2022. "
        />
        <meta
          property="og:image"
          content="https://mundial-album.vercel.app/webPrevia.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="mundial-album.vercel.app" />
        <meta
          property="twitter:url"
          content="https://mundial-album.vercel.app/"
        />
        <meta name="twitter:title" content="Álbum Mundial 2022 - Login" />
        <meta
          name="twitter:description"
          content="Web para el control de figuritas del álbum del mundial de futbol Qatar 2022. "
        />
        <meta
          name="twitter:image"
          content="https://mundial-album.vercel.app/webPrevia.png"
        />
      </Head>
      <header>
        <HeaderHome dataUser={session.user}></HeaderHome>
      </header>

      <main className={styles.mainHome}>
        <div className={styles.menuPrincipal}>
          <div
            onClick={() => setVentanaAlbum(true)}
            style={{
              borderBottom: `${
                ventanaAlbum ? "2px solid #1b588d" : "2px solid #ccc"
              }`,
              color: `${ventanaAlbum ? "#1b588d" : "#959595"}`,
            }}
          >
            <h1>Álbum</h1>
          </div>
          <div
            onClick={() => setVentanaAlbum(false)}
            style={{
              borderBottom: `${
                ventanaAlbum ? "2px solid #ccc" : "2px solid #1b588d"
              }`,
              color: `${ventanaAlbum ? "#959595" : "#1b588d"}`,
            }}
          >
            <h1>Estadísticas</h1>
          </div>
        </div>

        {ventanaAlbum ? (
          <AlbumSeccion></AlbumSeccion>
        ) : (
          <EstadisticasSection></EstadisticasSection>
        )}
      </main>

      <footer className={styles.footerHome}>
        <Footer></Footer>
      </footer>

      <div className={styles.btonFloat}>
        <BtonTop></BtonTop>
      </div>

      {loading && (
        <ModalPortal>
          <Spinner></Spinner>
        </ModalPortal>
      )}

      {ventanaMod && <Edit></Edit>}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: { session },
  };
}

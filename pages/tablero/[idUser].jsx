import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

import connectDB from "../../config/connectDB";
import Album from "../../models/albumModel";

//styles
import styles from "../../styles/pageTablero.module.scss";

//Components
import CardTablero from "../../componentes/tablero/cardTablero";
import BtonTop from "../../componentes/btonTop";
import Footer from "../../componentes/Footer";

//APIcontext
import { AlbumContext } from "../../contexts/AlbumContext";
import { useContext } from "react";

export default function Tablero({ dataAlbum }) {
  const { filtrarRepetidaParams } = useContext(AlbumContext);

  const [albumRepetidas, setAlbumRepetidas] = useState([]);

  useEffect(() => {
    setAlbumRepetidas(filtrarRepetidaParams(dataAlbum[0].listFiguritas));
  }, [dataAlbum]);

  return (
    <div>
      <Head>
        <title>Álbum Mundial 2022</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#1b588d"></meta>
      </Head>
      <header className={styles.headerTablero}>
        <div className={styles.contentHeader}>
          <h1>Crea tu tablero de figuritas</h1>
          <Link href="/login">
            <a>Ingresar</a>
          </Link>
        </div>
      </header>
      <main className={styles.mainTablero}>
        <h1 className={styles.titlePage}>Figuritas Repetidas</h1>

        <div className={styles.contentAlbum}>
          {albumRepetidas.length == 0 ? (
            <h2>No se encontraron resultados</h2>
          ) : (
            albumRepetidas.map((item, key) => (
              <CardTablero key={key} props={item} />
            ))
          )}
        </div>
      </main>

      <div className={styles.btonFloat}>
        <BtonTop />
      </div>

      <footer className={styles.footerHome}>
        <Footer></Footer>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { idUser } = context.params;
  await connectDB();

  const dataAlbum = await Album.find({ user: idUser });

  return { props: { dataAlbum: JSON.parse(JSON.stringify(dataAlbum)) } };
}

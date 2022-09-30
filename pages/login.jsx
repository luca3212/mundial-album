import React from "react";
import { getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Login.module.scss";

import Redes from "../componentes/login/redes";
import Image from "next/image";
import Footer from "../componentes/Footer";

//Autentificacion
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Head from "next/head";

export default function Login({ providers, session }) {
  const router = useRouter();

  useEffect(() => {
    if (session) return router.push("/");
  }, [session]);

  useEffect(() => {
    if (router.query.error) {
      router.push("/login");
    }
  }, []);

  if (session) return null;
  return (
    <div className={styles.pageLogin}>
      <Head>
        <title>Álbum Mundial 2022 - Login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#520f21"></meta>

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
      <div className={styles.centradoLogin}>
        <Image
          src={"/Login.svg"}
          width={300}
          height={359}
          priority
          alt="Logo mundial"
        ></Image>
      </div>

      <div className={styles.divLogin}>
        <main className={styles.mainLogin}>
          <div className={styles.headerLogin}>
            <h1>
              Álbum de figuritas <br></br> QATAR 2022
            </h1>
          </div>
          <div className={styles.contentLogin}>
            <h2>Iniciar sesion</h2>

            <Redes providers={providers}></Redes>
          </div>
        </main>
        <footer className={styles.footerBottom}>
          <Footer></Footer>
        </footer>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  // if (session)
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };

  return {
    props: {
      providers: await getProviders(context),
      session: session,
    },
  };
}

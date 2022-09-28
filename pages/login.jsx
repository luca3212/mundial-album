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
      </Head>
      <div className={styles.centradoLogin}>
        <Image src={"/Login.svg"} width={300} height={359} priority></Image>
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

  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      providers: await getProviders(context),
      session: session,
    },
  };
}

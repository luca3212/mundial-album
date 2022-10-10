import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Comparar.module.scss";
import Image from "next/image";
import Link from "next/link";

//Autentificacion
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

//Componentes
import CardTablero from "../componentes/tablero/cardTablero";
import BtonTop from "../componentes/btonTop";

//APIcontext
import { AlbumContext } from "../contexts/AlbumContext";
import { useContext } from "react";
import Head from "next/head";

export default function Comparar({ session }) {
  const { filtrarRepetidaParams, Album, filtrarRepetida, setAlbum } =
    useContext(AlbumContext);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await axios.get("/api/album");
        setAlbum(res.data[0].listFiguritas);
      } catch (error) {
        console.log("Error al recuperar datos. ", error.message);
      }
    };
    fetchAlbum();
  }, []);

  //Album original usuario Buscado
  const [albumUser, setAlbumUser] = useState([]);
  //Datos del usuario Buscado
  const [dataUser, setDataUser] = useState({
    status: null,
    mensaje: `Ingresa el email de otro usuario y compara el álbum. Descubrí que figuritas necesita cada uno.`,
    email: "",
  });

  //Album para usuario Buscado
  const [albumOtro, setAlbumOtro] = useState([]);

  //Album para usuario Actual
  const [albumNecesito, setAlbumNecesito] = useState([]);

  //contador de toales
  const [cantidad, setCantidad] = useState({});

  //acordion
  const [activoAcordion, setActivoAcordion] = useState({
    primerAcordion: false,
    segundoAcordion: false,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    reset();
    const dataEmail = e.target.nameUser.value;
    let rtadoMensaje;
    try {
      if (session.user.email == dataEmail) {
        rtadoMensaje = {
          status: false,
          mensaje: "Ingrese un email distinto al tuyo",
          email: "",
        };
        setDataUser(rtadoMensaje);
      } else {
        const res = await axios.get(`/api/album/${dataEmail}`);
        if (res.data.noExiste) {
          rtadoMensaje = {
            status: false,
            mensaje: "Usuario no encontrado",
            email: "",
          };
          setDataUser(rtadoMensaje);
        } else {
          const userComparar = res.data[0];
          setAlbumUser(userComparar.listFiguritas);
          rtadoMensaje = {
            status: true,
            mensaje: "Usuario encontrado",
            email: userComparar.name,
          };
          setDataUser(rtadoMensaje);
        }
      }
    } catch (error) {
      rtadoMensaje = {
        status: false,
        mensaje: "Error al recuperar datos",
        email: "",
      };
      setDataUser(rtadoMensaje);
    } finally {
      e.target.nameUser.value = "";
    }
  }

  function reset() {
    setAlbumUser([]);
    setAlbumOtro([]);
    setAlbumNecesito([]);
    setCantidad({});
    setActivoAcordion({ primerAcordion: false, segundoAcordion: false });
  }

  const compararAlbum = () => {
    //Repetidas del usuario Buscado
    const repetidasUser = filtrarRepetidaParams(albumUser);

    //Repetidas del usuario Actual
    const repetiadasMias = filtrarRepetida();

    //Le sirven al usuario Buscado
    const rtdoCoincidenciaUser = coincidencia(albumUser, repetiadasMias);
    setAlbumOtro(rtdoCoincidenciaUser);

    //Le sirven al usuario Actual
    const rtadoCoincidenciaMio = coincidencia(Album, repetidasUser);
    setAlbumNecesito(rtadoCoincidenciaMio);

    const calculo = {
      leSirven: calculoCantidad(rtdoCoincidenciaUser),
      meSirven: calculoCantidad(rtadoCoincidenciaMio),
    };
    setCantidad(calculo);
  };

  function coincidencia(albumCompleto, repetidas) {
    const resultado = repetidas.map((tupla) => {
      return {
        ...tupla,
        figus: tupla.figus.filter((item) => {
          let valor = albumCompleto[tupla.id - 1].figus.find(
            (items) => items.idFigurita == item.idFigurita
          );
          if (valor.laTengo == false) {
            return item;
          }
        }),
      };
    });

    const filtroFinal = resultado.filter((tupla) => tupla.figus.length != 0);

    return filtroFinal;
  }

  function calculoCantidad(arreglo) {
    const previo = arreglo.map((pais) => {
      return pais.figus.length;
    });

    const rtadoFinal = previo.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

    return rtadoFinal;
  }

  function handleAcordion(opcion) {
    let rtadoAcordion;
    if (opcion == 1) {
      rtadoAcordion = {
        ...activoAcordion,
        primerAcordion: !activoAcordion.primerAcordion,
      };
    } else {
      rtadoAcordion = {
        ...activoAcordion,
        segundoAcordion: !activoAcordion.segundoAcordion,
      };
    }
    setActivoAcordion(rtadoAcordion);
  }

  return (
    <div className={styles.mainComparar}>
      <Head>
        <title>Álbum Mundial 2022</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#1d5e97"></meta>
        <link rel="icon" type="image/x-icon" href="/flag/FWC.svg"></link>
        <meta
          name="description"
          content="Web para el control de figuritas del álbum del mundial de futbol Qatar 2022. "
        />
      </Head>
      <header className={styles.headerForm}>
        <div className={styles.backInicio}>
          <Link href="/">
            <a>
              <Image
                src={"/Chevron_Left.svg"}
                width={24}
                height={24}
                priority
              ></Image>
              Volver al Inicio
            </a>
          </Link>
        </div>
        <div className={styles.containForm}>
          <p>Ingrese Email a buscar</p>
          <form onSubmit={handleSubmit} name="buscarUser">
            <input
              type="email"
              name="nameUser"
              id="nameUser"
              required
              autoComplete="on"
              placeholder="ejemplo@gmail.com"
            />
            <button type="submit">Buscar</button>
          </form>
        </div>
      </header>

      <main className={styles.mainCards}>
        {dataUser.status ? (
          <div className={styles.cardUser}>
            <p>{dataUser.email}</p>
            <button onClick={compararAlbum}>Comparar</button>
          </div>
        ) : (
          <div className={styles.cardUserError}>
            <p>{dataUser.mensaje}</p>
          </div>
        )}

        {cantidad.meSirven >= 0 && (
          <div className={styles.containDiv}>
            <div
              className={styles.headerAcordion}
              onClick={() => handleAcordion(1)}
            >
              <div className={styles.headMain}>
                <h1>Figuritas que vos necesitas</h1>
                <p>
                  {dataUser.email} tiene{" "}
                  <strong>{cantidad.meSirven} figuritas</strong> que necesitas.
                </p>
              </div>
              <div className={styles.headIco}>
                {activoAcordion.primerAcordion ? (
                  <Image src={`/Chevron_Up.svg`} width={32} height={32} />
                ) : (
                  <Image src={`/Chevron_Down.svg`} width={32} height={32} />
                )}
              </div>
            </div>
            <div
              className={styles.accordion}
              style={{
                height: `${
                  activoAcordion.primerAcordion ? "max-content" : "0"
                }`,
              }}
            >
              {albumNecesito.map((item, key) => (
                <CardTablero key={key} props={item} />
              ))}
            </div>
          </div>
        )}

        {cantidad.leSirven >= 0 && (
          <div className={styles.containDiv}>
            <div
              className={styles.headerAcordion}
              onClick={() => handleAcordion(2)}
            >
              <div className={styles.headMain}>
                <h1>Figuritas que {dataUser.email} necesita</h1>
                <p>
                  Vos tenes <strong>{cantidad.leSirven} figuritas</strong> que{" "}
                  {dataUser.email} necesita
                </p>
              </div>
              <div className={styles.headIco}>
                {activoAcordion.segundoAcordion ? (
                  <Image src={`/Chevron_Up.svg`} width={32} height={32} />
                ) : (
                  <Image src={`/Chevron_Down.svg`} width={32} height={32} />
                )}
              </div>
            </div>

            <div
              className={styles.accordion}
              style={{
                height: `${
                  activoAcordion.segundoAcordion ? "max-content" : "0"
                }`,
              }}
            >
              {albumOtro.map((item, key) => (
                <CardTablero key={key} props={item} />
              ))}
            </div>
          </div>
        )}
      </main>

      <div className={styles.btonFloat}>
        <BtonTop />
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

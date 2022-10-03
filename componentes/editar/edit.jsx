import React from "react";
import ModalPortal from "../Modal";
import styles from "../../styles/editar.module.scss";
import Image from "next/image";

import { motion } from "framer-motion";

//APIcontext
import { AlbumContext } from "../../contexts/AlbumContext";
import { useContext } from "react";

export default function Edit() {
  const { pais, setPais, setVentanaMod, sincronizar, setLoading } =
    useContext(AlbumContext);

  function reset(item) {
    let rtado;
    const dataNueva = pais.figus.map((data) => {
      if (data.idFigurita == item.idFigurita) {
        rtado = {
          ...data,
          laTengo: false,
          esRepetida: false,
          nroRepetida: 0,
        };

        return rtado;
      } else {
        return data;
      }
    });

    const paisUpdate = {
      ...pais,
      figus: dataNueva,
    };

    setPais(paisUpdate);
  }

  function addNueva(item) {
    let rtado;
    const dataNueva = pais.figus.map((data) => {
      if (data.idFigurita == item.idFigurita) {
        if (item.laTengo) {
          rtado = {
            ...data,
            esRepetida: true,
            nroRepetida: data.nroRepetida + 1,
          };
        } else {
          rtado = {
            ...data,
            laTengo: true,
          };
        }
        return rtado;
      } else {
        return data;
      }
    });

    const paisUpdate = {
      ...pais,
      figus: dataNueva,
    };

    setPais(paisUpdate);
  }

  function guardarCambios() {
    setLoading(true);
    sincronizar(pais);
    setVentanaMod(false);
  }

  return (
    <ModalPortal>
      <motion.div
        key={pais.id}
        className={styles.contentCard}
        initial={{ opacity: 0, y: 0, scale: 0.2 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >
        <div className={styles.headCard}>
          <div className={styles.imgCard}>
            <Image
              src={`/flag/${pais.abre}.svg`}
              height={40}
              width={50}
              quality={100}
            />
          </div>
          <div className={styles.infoCard}>
            <h1>{pais.nombre}</h1>
            <p>{pais.abre}</p>
          </div>
        </div>

        <div className={styles.bodyCard}>
          {pais.figus.map((item) => (
            <div key={item.idFigurita} className={styles.contentBton}>
              <button
                className={
                  item.laTengo ? styles.btonFiguritaActiva : styles.btonFigurita
                }
                onClick={() => addNueva(item)}
              >
                {item.idFigurita}
              </button>
              {item.laTengo && (
                <button
                  className={styles.btonReset}
                  onClick={() => reset(item)}
                >
                  <Image src={"/close.svg"} width={22} height={22}></Image>
                </button>
              )}
              {item.esRepetida && (
                <div className={styles.itemRepetida}>
                  <p>{item.nroRepetida}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.btonesModificar}>
          <button className={styles.principal} onClick={() => guardarCambios()}>
            Guardar
          </button>
          <button onClick={() => setVentanaMod(false)}>Cancelar</button>
        </div>
      </motion.div>
    </ModalPortal>
  );
}

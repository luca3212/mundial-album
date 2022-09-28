import React, { useEffect, useState } from "react";
import styles from "../styles/estadistica.module.scss";

//API context
import { AlbumContext } from "../contexts/AlbumContext";
import { useContext } from "react";
import Grafico from "./grafico";

export default function EstadisticasSection() {
  const { filtrarFalta, filtrarRepetida } = useContext(AlbumContext);

  const [datos, setDatos] = useState({});

  useEffect(() => {
    let tengo = 638 - sumaFaltan();
    let porcentaje = Math.max(Math.min((tengo * 100) / 638, 100), 0).toFixed(2);
    let resultado = {
      faltan: sumaFaltan(),
      repes: cantRepes(),
      completado: `${tengo}/638`,
      progreso: porcentaje,
    };
    setDatos(resultado);
  }, []);

  function sumaFaltan() {
    const arrayRtado = filtrarFalta();

    const previa = arrayRtado.map((pais) => {
      return pais.figus.length;
    });

    const suma = 0;
    const rtadoFinal = previa.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      suma
    );

    return rtadoFinal;
  }

  function cantRepes() {
    const arrayRtado = filtrarRepetida();

    const previo = arrayRtado.map((pais) => {
      return pais.figus.reduce(
        (acumulador, currentValue) => acumulador + currentValue.nroRepetida,
        0
      );
    });

    const rtadoFinal = previo.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

    return rtadoFinal;
  }

  return (
    <div className={styles.contentEstaditicas}>
      <div className={styles.principalDiv}>
        <div className={styles.contentData}>
          <h2>Álbum Completo</h2>
          <p>
            <strong>{datos.completado}</strong> Figuritas
          </p>
        </div>

        <Grafico props={datos.progreso}></Grafico>
      </div>

      <div className={styles.secundarioDiv}>
        <div className={styles.contentFalta}>
          <h2>Faltan</h2>
          <p>
            <strong>{datos.faltan}</strong> Figuritas
          </p>
        </div>
        <div className={styles.contentRepes}>
          <h2>Repetidas</h2>
          <p>
            <strong>{datos.repes}</strong> Figuritas
          </p>
        </div>
      </div>
    </div>
  );
}

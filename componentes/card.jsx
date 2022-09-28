import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/Card.module.scss";
import { AlbumContext } from "../contexts/AlbumContext";
import Image from "next/image";

export default function Card({ props, idPais, filtrado }) {
  const { setPais, setVentanaMod } = useContext(AlbumContext);

  const { id, nombre, abre, cantidad, figus } = props;

  const [porcentaje, setPorcentaje] = useState([]);

  //state Modificaciones
  const [stateMod, setStateMod] = useState(false);

  useEffect(() => {
    let resultados;
    if (filtrado == "0") {
      setStateMod(false);
      resultados = {
        cantTrue: `${tengo()}/${cantidad}`,
        completado: progreso(tengo()),
      };
    } else {
      setStateMod(null);
      resultados = {
        cantTrue: null,
        completado: 0,
      };
    }
    setPorcentaje(resultados);
  }, [figus]);

  function tengo() {
    let total = 0;
    for (let i of figus) {
      if (i.laTengo) {
        total++;
      }
    }
    return total;
  }

  function progreso(varTengo) {
    const resultado = Math.max(
      Math.min(Number(varTengo * 100) / Number(cantidad), 100),
      0
    );

    return resultado;
  }

  function handleEditar() {
    setPais(props);
    setVentanaMod(true);
  }

  return (
    <div className={styles.contentCard}>
      <div className={styles.headCard}>
        <div className={styles.imgCard}>
          <Image
            src={`/flag/${abre}.svg`}
            height={40}
            width={50}
            quality={100}
            priority={abre == "FWC"}
          />
        </div>
        <div className={styles.infoCard}>
          <h1>{nombre}</h1>
          <p>{abre}</p>
        </div>
        <div className={styles.dataCantidad}>
          {stateMod === false && (
            <button onClick={() => handleEditar()}>Editar</button>
          )}
        </div>
      </div>
      <div className={styles.barProgress}>
        <div
          className={styles.porcentaje}
          style={{ width: `${porcentaje.completado}%` }}
        ></div>
      </div>
      <div className={styles.bodyCard}>
        {figus.map((item) => (
          <div key={item.idFigurita} className={styles.contentBton}>
            <button
              className={
                item.laTengo ? styles.btonFiguritaActiva : styles.btonFigurita
              }
            >
              {item.idFigurita}
            </button>
            {item.esRepetida && (
              <div className={styles.itemRepetida}>
                <p>{item.nroRepetida}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

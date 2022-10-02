import React, { useEffect, useState } from "react";
import styles from "../../styles/Card.module.scss";
import Image from "next/image";

export default function CardTablero({ props }) {
  const { id, nombre, abre, cantidad, figus } = props;

  return (
    <div className={styles.contentCard}>
      <div className={styles.headCard}>
        <div className={styles.imgCard}>
          <Image
            src={`/flag/${abre}.svg`}
            height={40}
            width={50}
            quality={100}
            // priority={abre == "FWC"}
          />
        </div>
        <div className={styles.infoCard}>
          <h1>{nombre}</h1>
          <p>{abre}</p>
        </div>
      </div>

      <div className={styles.bodyCard}>
        {figus.map((item) => (
          <div key={item.idFigurita} className={styles.contentBton}>
            <button className={styles.btonFiguritaActiva}>
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

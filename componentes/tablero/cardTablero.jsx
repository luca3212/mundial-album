import React from "react";
import styles from "../../styles/Card.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
export default function CardTablero({ props }) {
  const { id, nombre, abre, cantidad, figus } = props;

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const efect = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className={styles.contentCard}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.headCard}>
        <div className={styles.imgCard}>
          <Image
            src={`/flag/${abre}.svg`}
            height={40}
            width={50}
            quality={100}
          />
        </div>
        <div className={styles.infoCard}>
          <h1>{nombre}</h1>
          <p>{abre}</p>
        </div>
      </div>

      <div className={styles.bodyCard}>
        {figus.map((item) => (
          <motion.div
            key={item.idFigurita}
            className={styles.contentBton}
            variants={efect}
          >
            <button className={styles.btonFigurita} style={{ fontWeight: 500 }}>
              {item.idFigurita}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

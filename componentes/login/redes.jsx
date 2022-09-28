import React from "react";
import { signIn } from "next-auth/react";
import styles from "../../styles/redesLogin.module.scss";

function Redes({ providers }) {
  const { google } = providers;
  return (
    <button className={styles.btonSession} onClick={() => signIn(google.id)}>
      <img src="/Google.svg" alt="Icono Google" className={styles.iconoBton} />
      <span>Ingresar con {google.name}</span>
    </button>
  );
}

export default Redes;

import React from "react";
import { signIn } from "next-auth/react";
import styles from "../../styles/redesLogin.module.scss";
import Image from "next/image";

function Redes({ providers }) {
  const { google } = providers;
  return (
    <button className={styles.btonSession} onClick={() => signIn(google.id)}>
      <Image
        src={"/Google.svg"}
        height={24}
        width={24}
        alt="Icono Google"
        className={styles.iconoBton}
        priority
      ></Image>
      <span>Ingresar con {google.name}</span>
    </button>
  );
}

export default Redes;

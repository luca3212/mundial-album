import Image from "next/image";
import React from "react";
import styles from "../styles/header.module.scss";
import { signOut } from "next-auth/react";

export default function HeaderHome({ dataUser }) {
  const { name, image, email } = dataUser;

  const customImgLoader = ({ src }) => {
    return `${src}`;
  };
  return (
    <div className={styles.headerHome}>
      <div className={styles.contentUser}>
        <div style={{ height: 32 }}>
          <Image
            className={styles.contentImg}
            loader={customImgLoader}
            alt="Avatar"
            width={32}
            height={32}
            src={image}
          />
        </div>
        <div className={styles.nameUser}>
          <p>Hola!</p>
          <h2>{name}</h2>
        </div>
      </div>

      <div>
        <button className={styles.btonOut} onClick={() => signOut()}>
          <Image src={"/logout.svg"} width={24} height={24} />
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

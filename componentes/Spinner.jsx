import React from "react";
import styles from "../styles/Spinner.module.scss";
import Image from "next/image";
import copa from "../public/flag/FWC.svg";

export default function Spinner() {
  return (
    <div className={styles.loader}>
      <Image
        src={copa}
        width={400}
        height={550}
        className={styles.imgSpinner}
        priority
      ></Image>
    </div>
  );
}

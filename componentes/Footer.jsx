import Link from "next/link";
import React from "react";
import styles from "../styles/footer.module.scss";

export default function Footer() {
  return (
    <div className={styles.contentFooter}>
      <p>
        Copyright &copy; 2022 | Hecho por{" "}
        <Link href="https://agueroluca.com.ar/">
          <a target="_blank" rel="noreferrer">
            Agüero Luca
          </a>
        </Link>
      </p>
    </div>
  );
}

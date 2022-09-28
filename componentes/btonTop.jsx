import Image from "next/image";
import React, { useState, useEffect } from "react";
import styles from "../styles/btonTop.module.scss";

export default function BtonTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={styles.topToBtm}>
      {showTopBtn && (
        <button className={styles.btontop} onClick={goToTop}>
          <Image src={"/chevron.svg"} width={40} height={40}></Image>
        </button>
      )}
    </div>
  );
}

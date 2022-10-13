import React, { useEffect, useState } from "react";
import styles from "../styles/grafico.module.scss";

export default function Grafico({ props }) {
  const [percentage, setPercentage] = useState(0.0);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < props) {
        if (percentage == 99 && props < 100) {
          setPercentage(99);
        } else {
          setPercentage(percentage + 1);
        }
      }
    }, 35);
  }, [percentage, props]);

  return (
    <div className={styles.container}>
      <div
        className={styles.progress}
        style={{
          background: `conic-gradient(rgb(107, 235, 211), rgb(105, 211, 229) ${
            percentage * 3.6
          }deg, rgb(205 205 205 / 40%) 0deg)`,
        }}
      >
        <span className={styles.value}>{percentage}%</span>
      </div>
    </div>
  );
}

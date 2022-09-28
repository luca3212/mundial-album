import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Modal.module.scss";

function Modal({ children }) {
  return <div className={styles.modal}>{children}</div>;
}

export default function ModalPortal({ children }) {
  const [isBrowser, setIsbrowser] = useState(false);
  useEffect(() => {
    setIsbrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(
      <Modal>{children}</Modal>,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

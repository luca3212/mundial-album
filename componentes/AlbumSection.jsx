import React, { useEffect, useState } from "react";
import Card from "./card";
import styles from "../styles/Home.module.scss";
//APIcontext
import { AlbumContext } from "../contexts/AlbumContext";
import { useContext } from "react";

export default function AlbumSeccion() {
  const { Album, filtrarFalta, filtrarRepetida } = useContext(AlbumContext);

  const [albumFiltro, setAlbumFiltro] = useState(Album);
  const [stateSelect, setStateSelect] = useState("0");

  useEffect(() => {
    mostrarFiltro(stateSelect);
  }, [Album]);

  function handleChange(e) {
    mostrarFiltro(e.target.value);
  }

  function mostrarFiltro(opcionFiltrado) {
    setStateSelect(opcionFiltrado);
    switch (opcionFiltrado) {
      case "0": {
        setAlbumFiltro(Album);
        break;
      }
      case "1": {
        setAlbumFiltro(filtrarFalta());
        break;
      }
      case "2": {
        setAlbumFiltro(filtrarRepetida());
        break;
      }
    }
  }

  return (
    <>
      <div>
        <div className={styles.filtros}>
          <h3>Mostrar:</h3>
          <select onChange={handleChange} value={stateSelect}>
            <option value="0">Todas</option>
            <option value="1">Faltantes</option>
            <option value="2">Repetidas</option>
          </select>
        </div>
      </div>
      <div className={styles.contentAlbum}>
        {albumFiltro.length == 0 ? (
          <h2>No se encontraron resultados</h2>
        ) : (
          albumFiltro.map((item, key) => (
            <Card
              key={key}
              props={item}
              idPais={item.id}
              filtrado={stateSelect}
            ></Card>
          ))
        )}
      </div>
    </>
  );
}

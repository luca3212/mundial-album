import { createContext, useState } from "react";
import axios from "axios";

const AlbumContext = createContext();

const AlbumProvider = ({ children }) => {
  //State Album - Dato Gral
  const [Album, setAlbum] = useState([]);
  //spinner state
  const [loading, setLoading] = useState(false);
  //state pais
  const [pais, setPais] = useState([]);
  //state Ventana modificaion
  const [ventanaMod, setVentanaMod] = useState(false);

  const guardarDB = async (albumNuevo) => {
    try {
      const res = await axios.put("/api/album", {
        album: albumNuevo,
      });
      setAlbum(res.data.listFiguritas);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  //nueva funcion sincronizar
  //sincrozina datos de una figus en un determinado pais
  const sincronizar = (objetoCambio) => {
    const newPais = Album.map((paise) => {
      if (paise.id == objetoCambio.id) {
        return objetoCambio;
      } else {
        return paise;
      }
    });

    guardarDB(newPais);
  };

  //funcion filtrado
  function filtrarFalta() {
    const filtroFaltan = Album.map(function (pais) {
      return {
        ...pais,
        figus: pais.figus.filter((figu) => figu.laTengo != true),
      };
    });

    const faltanFinal = filtroFaltan.filter((pais) => pais.figus.length != 0);

    return faltanFinal;
  }

  //funcion filtrar Repetida
  function filtrarRepetida() {
    const primerFiltro = Album.map(function (pais) {
      return {
        ...pais,
        figus: pais.figus.filter((figu) => figu.esRepetida == true),
      };
    });

    const filtroFinal = primerFiltro.filter((pais) => pais.figus.length != 0);

    return filtroFinal;
  }

  return (
    <AlbumContext.Provider
      value={{
        Album,
        setAlbum,
        loading,
        setLoading,
        pais,
        setPais,
        ventanaMod,
        setVentanaMod,
        sincronizar,
        filtrarFalta,
        filtrarRepetida,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
};

export { AlbumProvider, AlbumContext };

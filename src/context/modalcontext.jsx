"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import Toast, {
  showToastInfo,
  showToastSuccess,
  showToastError,
  showToastWarn,
} from "../components/Toast";
const ModalContext = createContext();
export const useModalContext = () => useContext(ModalContext);
export const ModalContextProvier = ({ children }) => {
  const [newBranch, setNewBranch] = useState([
    {
      nombre: "Sucursal Bogota",
      direccion: "Siempre viva",
      telefono: "554522",
      municipio: "Bogota",
    },
  ]);
  const createBranch = (nombre, direccion, telefono, municipio) => {
    setNewBranch([
      ...newBranch,
      {
        nombre,
        direccion,
        telefono,
        municipio,
      },
    ]);
  };

  return (
    <ModalContext.Provider
      value={{
        newBranch,
        createBranch,
        showToastInfo,
        showToastSuccess,
        showToastError,
        showToastWarn,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

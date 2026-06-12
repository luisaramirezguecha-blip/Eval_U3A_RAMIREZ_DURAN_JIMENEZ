import { createContext, useContext, useState, useEffect } from 'react';

const AccesibilidadContext = createContext();

export const AccesibilidadProvider = ({ children }) => {
  const [altoContraste, setAltoContraste] = useState(() => {
    // Recuerda la preferencia del usuario si recarga la página
    return localStorage.getItem('alto-contraste') === 'true';
  });

  useEffect(() => {
    const root = document.documentElement; // Aplica a la etiqueta <html>
    if (altoContraste) {
      root.classList.add('alto-contraste');
      localStorage.setItem('alto-contraste', 'true');
    } else {
      root.classList.remove('alto-contraste');
      localStorage.setItem('alto-contraste', 'false');
    }
  }, [altoContraste]);

  const toggleContraste = () => setAltoContraste(!altoContraste);

  return (
    <AccesibilidadContext.Provider value={{ altoContraste, toggleContraste }}>
      {children}
    </AccesibilidadContext.Provider>
  );
};

export const useAccesibilidad = () => useContext(AccesibilidadContext);
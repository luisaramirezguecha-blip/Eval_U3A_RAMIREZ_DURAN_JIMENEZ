import { useState, useCallback, useRef } from "react";

const ITEMS_POR_PAGINA = 10;
const MAX_DIAS_VACIOS = 5;
const TICKET = "83A7E106-C540-4293-ACCB-0B053A65D4B3";

// ─── Utilidades de fecha ────────────────────────────────────────────────────

export function limpiarTexto(texto) {
  if (!texto) return "Sin información";
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function parseDateString(fechaIngresada) {
  const fechaLimpia = fechaIngresada.replace(/[\/\-]/g, "");
  const day   = parseInt(fechaLimpia.substring(0, 2), 10);
  const month = parseInt(fechaLimpia.substring(2, 4), 10) - 1;
  const year  = parseInt(fechaLimpia.substring(4, 8), 10);
  return new Date(year, month, day);
}

export function formatDateString(dateObj) {
  const day   = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year  = dateObj.getFullYear();
  return `${day}${month}${year}`;
}

export function formatDisplayDate(fechaStr) {
  return `${fechaStr.substring(0, 2)}/${fechaStr.substring(2, 4)}/${fechaStr.substring(4, 8)}`;
}

export function getFechaHoy() {
  const hoy  = new Date();
  const dia  = String(hoy.getDate()).padStart(2, "0");
  const mes  = String(hoy.getMonth() + 1).padStart(2, "0");
  const anio = hoy.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

// ─── Hook principal ─────────────────────────────────────────────────────────

export function useLicitacionesPorFechaYEstado() {
  const [fecha, setFecha]         = useState(getFechaHoy);
  const [estado, setEstado]       = useState("activas");
  const [filas, setFilas]         = useState([]);
  const [infoPag, setInfoPag]     = useState("");
  const [btnSigText, setBtnSigText] = useState("Siguiente");
  const [mostrarPag, setMostrarPag] = useState(false);
  const [mostrarAnterior, setMostrarAnterior] = useState(false);
  const [loader, setLoader]       = useState(false);
  const [error, setError]         = useState("");

  // Estado interno encapsulado en refs para no re-renderizar innecesariamente
  const historialDias    = useRef([]);
  const indiceDiaActual  = useRef(0);
  const paginaActual     = useRef(0);
  const currentDateObj   = useRef(null);
  const diasVacios       = useRef(0);
  const estadoRef        = useRef("activas");
  const isLoading        = useRef(false);

  // ── Mostrar lote desde caché ─────────────────────────────────────────────

  const mostrarLoteEnTabla = useCallback(() => {
    const diaCache = historialDias.current[indiceDiaActual.current];
    const inicio   = paginaActual.current * ITEMS_POR_PAGINA;
    const fin      = inicio + ITEMS_POR_PAGINA;
    const lote     = diaCache.datos.slice(inicio, fin);
    const fechaBonita = formatDisplayDate(diaCache.fechaStr);

    const nuevasFilas = lote.map((lic) => ({
      fecha:         fechaBonita,
      codigoExterno: lic.CodigoExterno,
      nombre:        limpiarTexto(lic.Nombre),
      codigoEstado:  lic.CodigoEstado,
    }));

    setFilas(nuevasFilas);
    setInfoPag(
      `Mostrando ${inicio + 1} a ${inicio + lote.length} de ${diaCache.datos.length} del ${fechaBonita}`
    );

    setBtnSigText(fin < diaCache.datos.length ? "Siguiente página" : "Ver día anterior");

    const esPrimero = paginaActual.current === 0 && indiceDiaActual.current === 0;
    setMostrarAnterior(!esPrimero);
  }, []);

  // Llamada a la API

  const buscarPorFecha = useCallback(
    async (fechaStr, esNuevaBusqueda) => {
      if (isLoading.current) return;
      isLoading.current = true;

      setLoader(true);
      setError("");
      setMostrarAnterior(false);
      setInfoPag(`Buscando datos para el ${formatDisplayDate(fechaStr)}...`);

      const url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fechaStr}&ticket=${TICKET}`;

      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`Error del servidor ${resp.status}`);

        const datos = await resp.json();
        let filtradas = [];

        if (datos.Cantidad && datos.Cantidad > 0) {
          filtradas = datos.Listado;
          const est = estadoRef.current;
          if (est === "publicadas") {
            filtradas = filtradas.filter(
              (l) => l.CodigoEstado === 5 || l.CodigoEstado === "5"
            );
          } else if (est === "activas") {
            filtradas = filtradas.filter((l) => l.CodigoEstado !== 6);
          }
        }

        if (filtradas.length === 0) {
          diasVacios.current++;

          if (diasVacios.current <= MAX_DIAS_VACIOS) {
            currentDateObj.current.setDate(currentDateObj.current.getDate() - 1);
            isLoading.current = false;
            setLoader(false);
            await buscarPorFecha(formatDateString(currentDateObj.current), esNuevaBusqueda);
            return;
          } else {
            setError("Se han revisado varios días sin encontrar datos. Intenta con otra fecha.");
            diasVacios.current = 0;
            setMostrarPag(false);
          }
        } else {
          diasVacios.current = 0;

          const nuevoDia = { fechaStr, datos: filtradas };

          if (esNuevaBusqueda) {
            historialDias.current   = [nuevoDia];
            indiceDiaActual.current = 0;
          } else {
            historialDias.current.push(nuevoDia);
            indiceDiaActual.current = historialDias.current.length - 1;
          }

          paginaActual.current = 0;
          mostrarLoteEnTabla();
          setMostrarPag(true);
        }
      } catch (err) {
        console.error("Error al buscar licitaciones:", err);
        setError("Error de conexión con Mercado Público.");
      } finally {
        isLoading.current = false;
        setLoader(false);
      }
    },
    [mostrarLoteEnTabla]
  );

  // ── Acciones públicas ────────────────────────────────────────────────────

  const iniciarBusqueda = useCallback(() => {
    setError("");
    const fechaLimpia = fecha.replace(/[\/\-]/g, "");

    if (fechaLimpia.length !== 8) {
      setError("Por favor, ingrese una fecha válida (ej. 02/02/2024).");
      return;
    }

    setFilas([]);
    setMostrarPag(false);
    diasVacios.current       = 0;
    historialDias.current    = [];
    indiceDiaActual.current  = 0;
    paginaActual.current     = 0;
    estadoRef.current        = estado;
    currentDateObj.current   = parseDateString(fecha);

    buscarPorFecha(formatDateString(currentDateObj.current), true);
  }, [fecha, estado, buscarPorFecha]);

  const cargarSiguiente = useCallback(async () => {
    if (isLoading.current) return;

    const diaCache         = historialDias.current[indiceDiaActual.current];
    const inicioProxPag    = (paginaActual.current + 1) * ITEMS_POR_PAGINA;

    if (inicioProxPag < diaCache.datos.length) {
      paginaActual.current++;
      mostrarLoteEnTabla();
    } else if (indiceDiaActual.current < historialDias.current.length - 1) {
      indiceDiaActual.current++;
      paginaActual.current = 0;
      mostrarLoteEnTabla();
    } else {
      currentDateObj.current.setDate(currentDateObj.current.getDate() - 1);
      setFilas([]);
      await buscarPorFecha(formatDateString(currentDateObj.current), false);
    }
  }, [mostrarLoteEnTabla, buscarPorFecha]);

  const cargarAnterior = useCallback(() => {
    if (isLoading.current) return;

    if (paginaActual.current > 0) {
      paginaActual.current--;
      mostrarLoteEnTabla();
    } else if (indiceDiaActual.current > 0) {
      indiceDiaActual.current--;
      const diaAnterior    = historialDias.current[indiceDiaActual.current];
      paginaActual.current = Math.floor((diaAnterior.datos.length - 1) / ITEMS_POR_PAGINA);
      mostrarLoteEnTabla();
    }
  }, [mostrarLoteEnTabla]);

  return {
    // Estado del formulario
    fecha,        setFecha,
    estado,       setEstado,
    // Estado de la tabla
    filas,
    infoPag,
    btnSigText,
    mostrarPag,
    mostrarAnterior,
    loader,
    error,
    // Acciones
    iniciarBusqueda,
    cargarSiguiente,
    cargarAnterior,
  };
}

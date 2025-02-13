export const FormatFecha = (fechaISO: string) => {
  const fecha = new Date(fechaISO);
  const opciones: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric"
  };

  return fecha.toLocaleDateString("es-ES", opciones);
};


const BarraDeProgreso = ({ comments }) => {
  const calificacionesMap = {
    5: "Excelente",
    4: "Muy Bueno",
    3: "Regular",
    2: "Malo",
    1: "Pésimo",
  };


  // Contamos las calificaciones
  const conteo = comments.reduce((acc, comment) => {
    const rating = comment.calificacion;
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});


  // Convertimos a formato compatible con la barra de progreso
  const nuevoObjeto = Object.keys(calificacionesMap)
    .map((key) => ({
      key: Number(key), // Convertimos la key a número para ordenar
      nombre: calificacionesMap[key],
      cantidad: conteo[key] || 0,
    }))
    .sort((a, b) => b.key - a.key); // Orden descendente (5 → 4 → 3 → 2 → 1)


  // Ahora sí, calculamos totalCalificaciones usando `nuevoObjeto`
  const totalCalificaciones = nuevoObjeto.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">{totalCalificaciones}{" "}{totalCalificaciones > 0 ? "Calificaciones" : "Calificación"}</h2>

      {nuevoObjeto.map((item) => {
        const porcentaje = totalCalificaciones > 0 ? (item.cantidad / totalCalificaciones) * 100 : 0;

        return (
          <div key={item.nombre} className="mb-3">
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>{item.nombre}</span>
              <span>{item.cantidad}</span>
            </div>

            <div className="w-full h-6 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${porcentaje}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default BarraDeProgreso;

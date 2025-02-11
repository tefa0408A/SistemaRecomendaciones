import type { Review } from "../lib/types";

interface BarraDeProgresoProps {
  comments: Review[];
}

const BarraDeProgreso = ({ comments }: BarraDeProgresoProps) => {
  const calificacionesMap: Record<number, string> = {
    5: "Excelente",
    4: "Muy Bueno",
    3: "Regular",
    2: "Malo",
    1: "Pésimo",
  };

  const conteo = comments.reduce<Record<number, number>>((acc, comment) => {
    const rating = comment.calificacion;
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  const nuevoObjeto = Object.keys(calificacionesMap)
    .map((key) => {
      const numericKey = Number(key); // Convertir la clave a número
      return {
        key: numericKey,
        nombre: calificacionesMap[numericKey], // Acceder con número
        cantidad: conteo[numericKey] || 0, // Acceder con número
      };
    })
    .sort((a, b) => b.key - a.key); 

  const totalCalificaciones = nuevoObjeto.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">{totalCalificaciones}{" "}{totalCalificaciones == 1 ? "Calificación" : "Calificaciones"}</h2>

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

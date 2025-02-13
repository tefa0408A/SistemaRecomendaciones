import { useNavigate } from "react-router";
import type { Cafe } from "../lib/types";

import {
  Star
} from "lucide-react";

const Card: React.FC<{ cafe: Cafe }> = ({ cafe }) => {

  const navigate = useNavigate();

  const handleShow = (id: number) => {
    navigate(`/cafe/${id}`);
  };

  return (
    <div className="max-w-xl rounded-md overflow-hidden shadow-2xl m-4 border-2 border-gray-300 transition-transform duration-300 ease-in-out transform hover:scale-105 bg-white">
      <img
        className="w-full h-80 object-cover"
        src={cafe.imagenUrl}
        alt={cafe.nombre}
      />
      <div className="px-6 py-4 relative flex flex-col items-center md:items-start">
        <div className="font-bold text-xl mb-2">{cafe.nombre}</div>
        <p className="text-gray-700 text-base space-x-2">
          <span>{cafe.distrito}</span>
          <span className="inline-block h-4 w-px bg-gray-400"></span>
          <span>{cafe.ubicacion}</span>
        </p>

        <div className="flex space-x-1 mt-2 items-center">
          {[1, 2, 3, 4, 5].map((index) => {
            const filled =
              cafe.promedio >= index
                ? "text-yellow-500"
                : cafe.promedio >= index - 0.5
                  ? "text-yellow-500 fill-current"
                  : "text-gray-400";
            return (
              <Star
                key={index}
                className={`h-4 w-4 ${filled}`}
                fill={cafe.promedio >= index - 0.5 ? "currentColor" : "none"}
              />
            );
          })}
          <div>{cafe.promedio}</div>
        </div>


        <button
          className="mt-4 px-6 py-2 border-2 border-black text-black bg-transparent text-sm md:text-base rounded-md transition duration-300 ease-in-out hover:bg-black hover:text-white active:bg-gray-900 active:text-white md:absolute md:bottom-4 md:right-4"
          onClick={() => handleShow(cafe.id)}
        >
          Mostrar más
        </button>
      </div>

    </div>
  );
};

export default Card;

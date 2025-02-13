import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { Photo } from "../lib/types";
import { FormatFecha } from "../funcion/fecha";

export interface CarrouselProps {
  photos: Photo[]
  currentIndex: number
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  closeModal: () => void
}


const Carrousel = ({ photos, currentIndex, setCurrentIndex, closeModal } : CarrouselProps) => {

  const prevPhoto = () => setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  const nextPhoto = () => setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
        onClick={closeModal}
      >
        <div
          className="relative bg-white p-4 rounded-lg max-w-2xl w-full text-center"
          onClick={(e) => e.stopPropagation()} 
        >

          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-black"
            onClick={closeModal}
          >
            <X size={24} />
          </button>

          <img
            src={`/uploads/${photos[currentIndex].nombre}`}
            alt={`Foto ${currentIndex + 1}`}
            className="w-full h-96 object-cover rounded-md"
          />


          <p className="text-sm text-gray-700 mt-2">
            Subido por <span className="font-bold">{photos[currentIndex].usuario.nombres}{" "}{photos[currentIndex].usuario.apellidos}</span> el <span className="font-bold">{FormatFecha(photos[currentIndex].fecha)}</span>
          </p>

          {photos.length > 1 &&(
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextPhoto}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Carrousel

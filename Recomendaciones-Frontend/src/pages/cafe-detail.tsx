import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { withLayout } from '../HOC/withLayout';
import { Dot, Loader, MapPin, PhoneCall, Star, Store, User } from 'lucide-react';
import BarraDeProgreso from '../components/externos/barra-progreso';
import { useAuth } from "../context/auth-context";
import { useCreateReview, useReviews } from '../hook/use-review';
import type { Review, ReviewFormData } from '../components/lib/types';
import { useCafe } from '../hook/use-cafe';

const CafeDetailPage = () => {

  const { id } = useParams();
  const { data: reviews, isLoading: isLoadingReviews, error: errorReviews } = useReviews(Number(id));
  const { data: cafe, isLoading: isLoadingCafe, error: errorCafe } = useCafe(Number(id));
  const createMutation = useCreateReview(Number(id));

  const { isTokenValid, setIsShowLogin } = useAuth();
  const navigate = useNavigate()
  
  const [opinion, setOpinion] = useState("");
  const [comments, setComments] = useState<Review[]>([]);

  

  const [visibleCount, setVisibleCount] = useState(5);
  const [rating, setRating] = useState(0);
  const [errorValidacion, setErrorValidacion] = useState("");

  // Función para actualizar la calificación
  const handleClick = (index : number) => {
    setRating(index);
    setErrorValidacion(""); // Si selecciona, borra el error
  };


  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  // Función para manejar el cambio en el textarea
  const handleOpinionChange = (event: any) => {
    setOpinion(event.target.value);
  };

  // Función para manejar la publicación de una nueva opinión
  const handlePublicar = async () => {

    if (!isTokenValid()) {
      console.log("Token no es valido")
      setIsShowLogin(true)
      return;
    }

    if (opinion.trim() === "") {
      setErrorValidacion("Debes escribir un comentario.");
      return;
    }

    if (rating === 0) {
      setErrorValidacion("Debes seleccionar una calificación.");
      return;
    }

    const nuevoComentario: ReviewFormData = {
      comentario: opinion.trim(),
      calificacion: rating
    };


    try {
      const dataComentario = await createMutation.mutateAsync(nuevoComentario);
      setComments([dataComentario, ...comments]);
      setOpinion("");
      handleClick(0);

    } catch (error: any) {
      console.log("Error al enviar la reseña: " + error.message);
    }
  };

  useEffect(() => {
    if(reviews && Array.isArray(reviews)) {
      setComments([...reviews]);
    }
  }, [reviews]);


  if (isLoadingCafe || isLoadingReviews) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }
  if (errorCafe || !cafe) {
    navigate("/")
    return;
  }

  const formatFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO);
    const opciones: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric"
    };

    return fecha.toLocaleDateString("es-ES", opciones);
  };

  // Función para mostrar las estrellas
  const renderStars = (rating:any) => {

    const validRating = Number.isFinite(rating) ? Math.max(0, Math.min(5, rating)) : 0;
    const fullStars = Math.floor(validRating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);


    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-star-${i}`} className="text-yellow-500">★</span>
        ))}
        {hasHalfStar && <span key="half-star" className="text-yellow-400">☆</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-star-${i}`} className="text-gray-300">★</span>
        ))}
      </>
    );
  };



  return (
    <div className="w-full max-w-[80%] mx-auto p-4">
      <h1 className="text-4xl font-semibold">{cafe.nombre}</h1>

      <div className="flex items-center mt-2 space-x-2 text-sm">
        <div className="flex items-center space-x-1">
          <Store className="h-4 w-4" />
          {renderStars(cafe.promedio)}
        </div>

        <span className="inline-block h-4 w-px bg-gray-400"></span>

        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4" />
          <span>{cafe.ubicacion}{" - "}{ cafe.distrito }</span>
        </div>

        <span className="inline-block h-4 w-px bg-gray-400"></span>

        <div className="flex items-center space-x-1">
          <PhoneCall className="h-4 w-4" />
          <span>+51 971727355</span>
        </div>
      </div>

      <div className="mt-6 flex items-start space-x-6">
        {/* Imagen */}
        <div className="w-1/2">
          <img
            src={cafe.imagenUrl}
            alt={cafe.nombre}
            className="w-full rounded-lg object-cover"
          />
          {/* <button className="mt-2 text-blue-500 hover:underline">
            Ver más imágenes
          </button> */}
        </div>

        <div className="w-1/2 p-4 bg-gray-100 rounded-lg">
          {/* Horario */}
          <h3 className="text-lg font-semibold">Horario:</h3>
          <p className="text-gray-700 mt-2 space-y-1">
            <span className="flex items-center space-x-2">
              <Dot className="h-4 w-4" />
              <span>Lunes a Viernes: 12pm - 10pm</span>
            </span>
            <span className="flex items-center space-x-2">
              <Dot className="h-4 w-4" />
              <span>Sábado y Domingo: 12pm - 12am</span>
            </span>
          </p>

          {/* Rango de Precio */}
          <h3 className="text-lg font-semibold mt-4">Rango de Precio:</h3>
          <p className="text-gray-700 mt-2 space-y-1">
            <span className="flex items-center space-x-2">
              <Dot className="h-4 w-4" />
              <span>Café: S/15 - S/20</span>
            </span>
            <span className="flex items-center space-x-2">
              <Dot className="h-4 w-4" />
              <span>Postres: S/18 - S/23</span>
            </span>
          </p>
        </div>

      </div>

      <div className="mt-6 flex items-start space-x-6">
        <div className="w-1/4 p-4 bg-gray-100 rounded-lg">
          <BarraDeProgreso comments={comments} />
        </div>

        <div className="w-3/4 p-4 bg-gray-100 rounded-lg">
          {/* <input type="text" placeholder="Buscar opiniones..." className="p-2 border rounded w-full" /> */}
          
          <div className="mt-4 mb-4 flex justify-between ">{/* p-4 border-t border-gray-300 */}
            {/* Área de texto a la izquierda */}
            <textarea
              value={opinion}
              onChange={handleOpinionChange}
              rows={4}
              className="w-4/5 p-2 border border-gray-300 rounded-lg"
              placeholder="Escribe tu opinión..."
            />

            {/* Bloque derecho con estrellas, error y botón */}
            <div className="w-1/5 flex flex-col items-center space-y-3">
              {/* Estrellas */}
              <div className="flex space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 cursor-pointer ${index <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`}
                    onClick={() => handleClick(index)}
                  />
                ))}
              </div>

              {/* Mensaje de error */}
              {errorValidacion && <p className="text-center text-red-500 text-sm">{errorValidacion}</p>}

              {/* Botón de enviar */}
              <button
                onClick={handlePublicar}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Enviar
              </button>
            </div>
          </div>


          {comments
            .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
            .slice(0, visibleCount).map((comment) => (
              <div key={comment.id} className="mt-4 mb-4 p-4 border-t border-gray-300">
                <div className="flex items-center space-x-3">
                  <User className="h-6 w-6 text-gray-600 flex-shrink-0" />
                  <div>
                    <span className="block font-semibold">{comment.usuario.nombres} {comment.usuario.apellidos}</span>
                    <span>{renderStars(comment.calificacion)}</span>
                  </div>
                </div>

                <p className="mt-2 text-gray-800">{comment.comentario}</p>

                <span className="mt-1 text-sm text-gray-500">
                  Escrito el {formatFecha(comment.fecha)}
                </span>
              </div>
            ))}

          {/* Botón "Ver más" */}
          {visibleCount < comments.length && (
            <button
              onClick={handleShowMore}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Ver más
            </button>
          )}




        </div>




      </div>

    </div>
  );
};

export default withLayout(CafeDetailPage);

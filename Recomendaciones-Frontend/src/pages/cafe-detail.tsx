import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { withLayout } from '../HOC/withLayout';
import { Dot, Loader, MapPin, PhoneCall, Plus, Star, Store, User } from 'lucide-react';
import BarraDeProgreso from '../components/externos/barra-progreso';
import { useAuth } from "../context/auth-context";
import { useCreateReview, useReviews } from '../hook/use-review';
import type { Review, ReviewFormData } from '../components/lib/types';
import { useCafe } from '../hook/use-cafe';
import { usePhotos } from '../hook/use-photo';
import Carrousel from '../components/ui/carrousel';
import { FormatFecha } from '../components/funcion/fecha';

const CafeDetailPage = () => {

  const { id } = useParams();
  const { isTokenValid, setIsShowLogin } = useAuth();

  const createMutation = useCreateReview(Number(id));

  const { data: cafe, isLoading: isLoadingCafe, error: errorCafe } = useCafe(Number(id));
  const { data: reviews, isLoading: isLoadingReviews, error: errorReviews } = useReviews(Number(id));
  const { data: photos } = usePhotos(Number(id));

  const navigate = useNavigate()

  const [opinion, setOpinion] = useState("");
  const [comments, setComments] = useState<Review[]>([]);

  const [visibleCount, setVisibleCount] = useState(5);
  const [rating, setRating] = useState(0);
  const [errorValidacion, setErrorValidacion] = useState("");
  const [isOpenCarrousel, setIsOpenCarrousel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const closeModal = () => setIsOpenCarrousel(false);

  const handleClickCalificacion = (index: number) => {
    setRating(index);
    setErrorValidacion("");
  };


  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };


  const handleOpinionChange = (event: any) => {
    setOpinion(event.target.value);
  };


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
      handleClickCalificacion(0);

    } catch (error: any) {
      console.log("Error al enviar la reseña: " + error.message);
    }
  };

  useEffect(() => {
    if (reviews && Array.isArray(reviews)) {
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

  


  const renderStars = (rating: any) => {

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

  const openModal = (index: any) => {
    setCurrentIndex(index);
    setIsOpenCarrousel(true);
  };

  if (errorReviews) {
    console.log("Error al cargar comentario: ", errorReviews.message)
  }

  if (errorCafe || !cafe) {
    navigate("/")
    return;
  }

  return (
    <div className="w-full h-screen p-10 flex flex-col">
      <h1 className="text-2xl md:text-4xl font-semibold">{cafe.nombre}</h1>

      <div className="flex flex-col md:flex-row lg:items-center items-left md:items-start mt-2 space-y-4 md:space-y-0 md:space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <Store className="h-4 w-4" />
          {renderStars(cafe.promedio)}
        </div>
        <span className="hidden sm:inline-block h-4 w-px bg-gray-400"></span>
        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4" />
          <span>
            {cafe.ubicacion}
            {" - "}
            {cafe.distrito}
          </span>
        </div>
        <span className="hidden sm:inline-block h-4 w-px bg-gray-400"></span>
        <div className="flex items-center space-x-1">
          <PhoneCall className="h-4 w-4" />
          <span>+51 971727355</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="relative w-full lg:w-1/2">
          <img
            src={cafe.imagenUrl}
            alt={cafe.nombre}
            className="w-full h-full rounded-lg object-cover"
          />
          {photos && photos.length > 0 && (
            <button
              onClick={() => openModal(0)}
              className="absolute bottom-2 right-2 bg-black/60 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm transition hover:bg-white/80 hover:text-black"
            >
              <Plus size={16} /> Fotos
            </button>
          )}
          {photos && isOpenCarrousel && (
            <Carrousel
              photos={photos}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              closeModal={closeModal}
            />
          )}
        </div>

        <div className="w-full lg:w-1/2 p-4 bg-gray-100 rounded-lg">
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

      <div className="mt-6 flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-6">
        <div className="w-full lg:w-1/4 p-4 bg-gray-100 rounded-lg">
          <BarraDeProgreso comments={comments} />
        </div>
        <div className="w-full lg:w-3/4 p-4 bg-gray-100 rounded-lg">
          <div className="mt-4 mb-4 flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0">
            <textarea
              value={opinion}
              onChange={handleOpinionChange}
              rows={4}
              maxLength={255}
              className="w-full lg:w-4/5 p-2 border border-gray-300 rounded-lg"
              placeholder="Escribe tu opinión..."
            />
            <div className="w-full lg:w-1/5 flex flex-col items-center space-y-3">
              <div className="flex space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 cursor-pointer ${
                      index <= rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleClickCalificacion(index)}
                  />
                ))}
              </div>
              {errorValidacion && (
                <p className="text-center text-red-500 text-sm">
                  {errorValidacion}
                </p>
              )}
              <button
                onClick={handlePublicar}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Enviar
              </button>
            </div>
          </div>

          {comments
            .sort(
              (a, b) =>
                new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
            )
            .slice(0, visibleCount)
            .map((comment) => (
              <div
                key={comment.id}
                className="mt-4 mb-4 p-4 border-t border-gray-300"
              >
                <div className="flex items-center space-x-3">
                  <User className="h-6 w-6 text-gray-600 flex-shrink-0" />
                  <div>
                    <span className="block font-semibold">
                      {comment.usuario.nombres} {comment.usuario.apellidos}
                    </span>
                    <span>{renderStars(comment.calificacion)}</span>
                  </div>
                </div>
                <p className="mt-2 text-gray-800">{comment.comentario}</p>
                <span className="mt-1 text-sm text-gray-500">
                  Escrito el {FormatFecha(comment.fecha)}
                </span>
              </div>
            ))}
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

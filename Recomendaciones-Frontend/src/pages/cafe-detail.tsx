import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { withLayout } from '../HOC/withLayout';
import { User } from 'lucide-react';

const CafeDetailPage = () => {
  const API_URL = import.meta.env.VITE_API_CAFETERIA_URL as string;
  const { id } = useParams();

  const [cafe, setCafe] = useState({});
  const [opinionCount, setOpinionCount] = useState(1200); // Variable de opiniones
  const [opinion, setOpinion] = useState("");
  const [restauranteRank, setRestauranteRank] = useState(3); // 3 de 5 estrellas
  const [menuExpanded, setMenuExpanded] = useState(false); // Para mostrar todo el menú
  const [comments, setComments] = useState([
    { id: 1, userName: 'User A', rating: 4.5, commentDate: '22/08/2025', userPhoto: '', commentText: 'A' },
    { id: 2, userName: 'User B', rating: 3.7, commentDate: '22/08/2025', userPhoto: '', commentText: 'c' },
    { id: 3, userName: 'User C', rating: 5.0, commentDate: '22/08/2025', userPhoto: '', commentText: 'b' },
  ]); // Comentarios


  // Función para manejar el cambio en el textarea
  const handleOpinionChange = (event) => {
    setOpinion(event.target.value);
  };

  // Función para manejar la publicación de una nueva opinión
  const handlePublicar = () => {
    if (opinion.trim()) {
      const nuevoComentario = {
        id: comments.length + 1, userName: 'User A', rating: 4.5, commentDate: '24/08/2025', userPhoto: '', commentText: opinion
      };
      setComments([nuevoComentario, ...comments]); // Agregar al inicio
      setOpinion(""); // Limpiar el textarea después de publicar
    }
  };

  // Cargar productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/restaurant/v1/${id}`);
        const data = await response.json();
        setCafe(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Función para mostrar las estrellas
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-star-${i}`} className="text-yellow-500">★</span>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-star-${i}`} className="text-gray-300">★</span>
        ))}
      </>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold">{cafe.nombre}</h1>

      <div className="flex items-center mt-2">
        <div className="flex items-center">
          {renderStars(restauranteRank)}
        </div>
        <span className="ml-2 text-sm">{opinionCount} opiniones</span>
        <span className="ml-4 text-sm">#3 de 1000 restaurantes</span>
      </div>

      {/* Ubicación y teléfono */}
      <div className="mt-4 flex items-center">
        <a href="https://www.google.com/maps?q=ubicación-del-restaurante" className="flex items-center mr-4">
          <i className="fas fa-map-marker-alt mr-2"></i>
          Ubicación
        </a>
        <span className="mr-4">Celular: 971-727-355</span>
        <a href="https://www.restaurantea.com" className="text-blue-500">Página Web</a>
      </div>

      {/* Horarios */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Horario</h3>
        <ul className="list-disc ml-6">
          <li>Lunes - Viernes: 10:00 AM - 9:00 PM</li>
          <li>Sábado: 12:00 PM - 10:00 PM</li>
          <li>Domingo: Cerrado</li>
        </ul>
      </div>

      {/* Imágenes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Imágenes</h3>
        <img src={cafe.imagenUrl} alt={cafe.nombre} className="w-full rounded-lg" />
        <button className="mt-2 text-blue-500">Ver más imágenes</button>
      </div>

      {/* Calificaciones */}
      <div className="mt-6 flex justify-between">
        <div className="flex items-center">
          {renderStars(4)} {/* Puedes ajustar las estrellas */}
          <span className="ml-2">4 estrellas - 120 opiniones</span>
        </div>
        <div>
          <h4 className="font-semibold">Detalles</h4>
          <p>Cafería para disfrutar en familia, con un ambiente acogedor.</p>
        </div>
      </div>

      {/* Carta */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Carta</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>Capuccino - S/ 12</div>
          <div>Frapuccino - S/ 15</div>
          <div>Empanada de pollo - S/ 12</div>
          <div>Tres leches - S/ 18</div>
          <div>Torta de chocolate - S/ 17</div>
        </div>
        {menuExpanded && (
          <div className="mt-4">
            <button onClick={() => setMenuExpanded(false)} className="text-blue-500">Ver menos</button>
          </div>
        )}
        {!menuExpanded && (
          <div className="mt-4">
            <button onClick={() => setMenuExpanded(true)} className="text-blue-500">Mostrar todo el menú</button>
          </div>
        )}
      </div>

      {/* Opiniones */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Opiniones</h3>
        <div className="flex">
          <div className="w-1/2">
            <h4>120 opiniones</h4>
            {/* Barra de opiniones */}
            <div className="my-2">Excelente: 500</div>
            <div className="my-2">Bueno: 300</div>
            <div className="my-2">Regular: 200</div>
            <div className="my-2">Malo: 100</div>
          </div>

          {/* Buscador de opiniones */}
          <div className="w-1/2 ml-4">
            <input type="text" placeholder="Buscar opiniones..." className="p-2 border rounded w-full" />
            <div className="container mx-auto p-4">
              {/* Área de texto para la opinión */}
              <div className="mb-4">
                <textarea
                  value={opinion}
                  onChange={handleOpinionChange}
                  // rows="4"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Escribe tu opinión..."
                />
              </div>

              {/* Botón para publicar */}
              <button
                onClick={handlePublicar}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Publicar
              </button>
              {/* Comentarios listados */}
              <div className="mt-4">
                {comments.slice(0, 10).map((comment, index) => (
                  <div key={index} className="border-b py-4">
                    <div className="flex items-center">
                      {/* <img src={comment.userPhoto} alt={comment.userName} className="w-10 h-10 rounded-full mr-3" />
                 */}
                      <User />
                      <div>
                        <div className="font-semibold">{comment.userName} ({comment.userReviews} opiniones)</div>
                        <div>{renderStars(comment.rating)} - {comment.commentDate}</div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{comment.commentText.slice(0, 100)}...</p>
                    <button className="text-blue-500 mt-1">Ver más</button>
                  </div>
                ))}
                <button className="mt-4 text-blue-500">Ver más opiniones</button>
              </div>

            </div>
          </div>


        </div>
      </div>
    </div>
    );
};

      export default withLayout(CafeDetailPage);

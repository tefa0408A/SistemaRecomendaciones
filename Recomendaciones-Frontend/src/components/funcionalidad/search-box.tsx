import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const API_URL = import.meta.env.VITE_API_SERVICIOS_URL as string;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Cargar productos desde la API
  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/restaurant/v1/all`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching cafes:", error);
      }
    };

    fetchCafes();
  }, []);

  // Filtrar productos en base al input
  useEffect(() => {
    let results = [];
    if (searchTerm.trim() === "") {
      results = products.slice(0, 5); // Mostrar primeros 10 productos como "favoritos"
    } else {
      results = products
        .filter(
          (item) =>
            item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 8); // Mostrar solo 10 resultados
    }
    setFilteredResults(results);
  }, [searchTerm, products]);

  // Cerrar modal al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchModal(false);
      }
    };

    if (showSearchModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchModal]);

  // Manejar clic en el input
  const handleSearchClick = () => {
    setShowSearchModal(true);
  };

  // Redirigir al producto seleccionado
  const handleItemClick = (id: string) => {
    setShowSearchModal(false);
    navigate(`/cafe/${id}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
      {/* Input de Búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handleSearchClick}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-800 dark:border-gray-600"
        />
      </div>

      {/* Modal de Resultados */}
      {showSearchModal && (
        <div className="absolute top-12 left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 mt-2 z-50">
          <div className="p-3">
            {/* Mostrar "Favoritos" si no hay búsqueda */}
            {searchTerm.trim() === "" && (
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                Favoritos
              </div>
            )}

            {/* Listado de Resultados */}
            {filteredResults.length > 0 ? (
              filteredResults.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-lg transition"
                  onClick={() => handleItemClick(item.id)}
                >
                  <img
                    src={item.imagenUrl}
                    alt={item.nombre}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {item.nombre}
                    </span>
                    <br />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.ubicacion}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400 p-2">
                No se encontraron resultados.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;

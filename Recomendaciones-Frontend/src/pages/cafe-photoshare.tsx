import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { withLayout } from '../HOC/withLayout';

const CafePhotoUploadPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [description, setDescription] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  const API_URL = import.meta.env.VITE_API_CAFETERIA_URL;

  const handleSearchClick = () => setShowSearchModal(true);
  const handleItemClick = (item) => {
    setSelectedPlace(item);
    setShowSearchModal(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotos([...photos, { file, description: '' }]);
    }
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  const handleDescriptionChange = (index, value) => {
    const newPhotos = [...photos];
    newPhotos[index].description = value;
    setPhotos(newPhotos);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    photos.forEach((photo) => {
      formData.append('photos', photo.file);
      formData.append('descriptions', photo.description);
    });
    formData.append('placeId', selectedPlace.id);

    try {
      const response = await fetch(`${API_URL}/api/photos`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Fotos compartidas con éxito!');
      } else {
        alert('Hubo un error al compartir las fotos.');
      }
    } catch (error) {
      alert('Error al enviar las fotos.');
    }
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await fetch(`${API_URL}/api/places`);
      const data = await response.json();
      setFilteredResults(data);
    };

    if (searchTerm) {
      fetchPlaces();
    }
  }, [searchTerm]);

  return (
    <div className="flex p-6">
      {/* Panel izquierdo */}
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-semibold">Comparte tus fotos</h2>
        <p className="mt-2 text-sm text-gray-600">Qué tener en cuenta: ...</p>

        {selectedPlace && (
          <div className="mt-4 p-4 border border-gray-300 rounded-md">
            <img src={selectedPlace.imagenUrl} alt={selectedPlace.nombre} className="w-32 h-32 object-cover rounded-md" />
            <p className="text-sm">{selectedPlace.nombre}</p>
            <p className="text-xs text-gray-500">{selectedPlace.ubicacion}</p>
          </div>
        )}
      </div>

      {/* Panel derecho */}
      <div className="w-1/2 p-4">
        <h3 className="text-lg font-medium">¿Dónde tomaste estas fotos?</h3>

        <div className="mt-2">
          <input
            type="text"
            placeholder="Buscar lugar..."
            className="border border-gray-300 rounded-lg p-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={() => setShowSearchModal(true)}
          />
        </div>

        {/* Modal de búsqueda */}
        {showSearchModal && (
          <div className="absolute bg-white shadow-lg border p-4 mt-2 w-full z-10">
            <div>
              {filteredResults.map((item) => (
                <div
                  key={item.id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleItemClick(item)}
                >
                  <p>{item.nombre}</p>
                  <p className="text-sm text-gray-500">{item.ubicacion}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          <h4 className="text-lg font-medium">Seleccionar fotos</h4>
          {photos.length === 0 ? (
            <div className="border border-dashed p-4 text-center text-gray-400">Seleccionar fotos</div>
          ) : (
            <div className="space-y-4">
              {photos.map((photo, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={URL.createObjectURL(photo.file)}
                    alt="foto"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Descripción"
                    className="border border-gray-300 rounded-lg p-2"
                    value={photo.description}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  />
                  <button
                    className="text-red-500"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4">
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>

        {photos.length > 0 && (
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Compartir
          </button>
        )}
      </div>
    </div>
  );
};

export default withLayout(CafePhotoUploadPage);

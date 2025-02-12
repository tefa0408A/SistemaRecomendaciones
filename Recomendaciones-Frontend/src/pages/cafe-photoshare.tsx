import { useState, useEffect, useRef } from 'react';
import { Cloud, Dot, Loader, Plus, Search, Share, X } from 'lucide-react';
import { withLayout } from '../HOC/withLayout';
import SearchBox from '../components/funcionalidad/search-box';
import { useNavigate } from 'react-router';
import { useCafe } from '../hook/use-cafe';

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const CafePhotoUploadPage = () => {

  const [selectedCafeId, setSelectedCafeId] = useState<number | null>(null);

  const { data: cafe, isLoading: isLoadingCafe, error: errorCafe } = useCafe(selectedCafeId ?? 0);

  // const [searchTerm, setSearchTerm] = useState('');
  // const [filteredResults, setFilteredResults] = useState([]);
  const [photos, setPhotos] = useState<{ file: File; description: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const [selectedPlace, setSelectedPlace] = useState(false);
  const [description, setDescription] = useState('');
  // const [showSearchModal, setShowSearchModal] = useState(false);
  // const navigate = useNavigate();

  // const API_URL = import.meta.env.VITE_API_SERVICIOS_URL;

  // const handleSearchClick = () => setShowSearchModal(true);
  // const handleItemClick = (item) => {
  //   setSelectedPlace(item);
  //   setShowSearchModal(false);
  // };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setPhotos([...photos, { file, description: '' }]);
  //   }
  // };

  //abrir el explorador de archivos
  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleSharePhotos = () => {
    console.log("Seleccionó compartir")
  };

  // Función para manejar la selección de imágenes
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const files = event.target.files;
    if (!files) return;

    const newPhotos: { file: File; description: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // 🔹 Validar tipo de archivo
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`La imagen ${file.name} tiene un formato no permitido. Solo se permiten imágenes JPEG, JPG y PNG.`);
        continue; // Salta al siguiente archivo
      }

      // 🔹 Validar tamaño de archivo
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        alert(`La imagen ${file.name} supera los ${MAX_FILE_SIZE_MB}MB.`);
        continue;
      }

      newPhotos.push({ file, description: "" });
    }

    // Agregar imágenes válidas al array de photos
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

  };

  // Función para cambiar la descripción de una foto
  const handleDescriptionChange = (index: number, newDescription: string) => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo, i) =>
        i === index ? { ...photo, description: newDescription } : photo
      )
    );
  };

  // Función para eliminar una foto de la lista
  const handleRemovePhoto = (index: number) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  // const handleRemovePhoto = (index) => {
  //   const newPhotos = [...photos];
  //   newPhotos.splice(index, 1);
  //   setPhotos(newPhotos);
  // };

  // const handleDescriptionChange = (index, value) => {
  //   const newPhotos = [...photos];
  //   newPhotos[index].description = value;
  //   setPhotos(newPhotos);
  // };

  // const handleSubmit = async () => {
  //   const formData = new FormData();
  //   photos.forEach((photo) => {
  //     formData.append('photos', photo.file);
  //     formData.append('descriptions', photo.description);
  //   });
  //   formData.append('placeId', selectedPlace.id);

  //   try {
  //     const response = await fetch(`${API_URL}/api/photos`, {
  //       method: 'POST',
  //       body: formData,
  //     });
  //     if (response.ok) {
  //       alert('Fotos compartidas con éxito!');
  //     } else {
  //       alert('Hubo un error al compartir las fotos.');
  //     }
  //   } catch (error) {
  //     alert('Error al enviar las fotos.');
  //   }
  // };

  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     const response = await fetch(`${API_URL}/api/places`);
  //     const data = await response.json();
  //     setFilteredResults(data);
  //   };

  //   if (searchTerm) {
  //     fetchPlaces();
  //   }
  // }, [searchTerm]);

  const handleSearch = (id: number) => {
    setSelectedCafeId(id);
    // if (isLoadingCafe) {
    //   return (
    //     <div className="flex justify-center items-center h-screen">
    //       <Loader className="animate-spin" />
    //     </div>
    //   );
    // }
    // if (errorCafe) {
    //   console.log("Error al obtener datos de cafe")
    //   return;
    // }
  };




  return (
    <div className="w-full max-w-[80%] mx-auto p-4 flex flex-col md:flex-row">
      {/* Panel izquierdo */}
      <div className="w-full md:w-2/5 p-4">
        <h2 className="text-xl font-semibold">Comparte tus fotos</h2>

        {selectedCafeId && cafe && (
          <div className="mt-4 p-4 border border-gray-300 rounded-md flex flex-col items-center justify-center text-center shadow-md">
            <img
              src={cafe.imagenUrl}
              alt={cafe.nombre}
              className="w-48 h-48 object-cover rounded-lg"
            />
            <p className="text-lg font-medium mt-2">{cafe.nombre}</p>
            <p className="text-sm text-gray-500">{cafe.ubicacion}</p>
          </div>
        )}

        <p className="mt-2 text-sm text-gray-600">
          <span className="font-bold">Tener en cuenta:</span>
          <span className="flex items-center space-x-2"><Dot />Las imágenes deben ser recientes</span>
          <span className="flex items-center space-x-2"><Dot />Se aceptan formatos: jpg, jpeg y png</span>
          <span className="flex items-center space-x-2"><Dot />El tamaño de cada foto debe ser menor a 10MB</span>
        </p>
      </div>

      {/* Panel derecho */}
      <div className="w-full md:w-3/5 p-4 border-t md:border-l md:border-t-0">
        <h3 className="text-lg font-medium">¿Dónde tomaste estas fotos?</h3>

        <div className="mt-2">
          <SearchBox handleSearch={handleSearch} />
        </div>

        <div>
          {/* Input oculto para subir archivos */}
          <input
            type="file"
            multiple
            accept="image/jpeg, image/png, image/jpg"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Mostrar mensaje si no hay fotos */}
          {photos.length === 0 ? (
            <div
              className="border border-dashed mt-4 p-6 text-center bg-gray-100 text-gray-400 cursor-pointer hover:bg-gray-200
            h-64 flex items-center justify-center text-lg font-medium rounded-lg"
              onClick={handleDivClick}
            >
              Haz click para agregar fotos
            </div>
          ) : (
            <div className="space-y-4 mt-4">
              {/* Listado de imágenes */}
              {photos.map((photo, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 w-full p-4 border-t border-gray-300">
                  {/* Imagen más grande y centrada */}
                  <img
                    src={URL.createObjectURL(photo.file)}
                    alt="foto"
                    className="w-40 h-40 object-cover rounded-lg"
                  />

                  {/* Contenedor de la descripción con textarea más grande */}
                  <div className="w-full md:flex-1 mt-2 md:mt-0">
                    <textarea
                      placeholder="Escribe una descripción..."
                      className="w-full border border-gray-300 rounded-lg p-2 resize-none h-24"
                      value={photo.description}
                      onChange={(e) => handleDescriptionChange(index, e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Botón de eliminar más grande y mejor alineado */}
                  <button
                    className="text-red-500 hover:text-red-700 p-2 mt-2 md:mt-0"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <X className="w-7 h-7" />
                  </button>
                </div>
              ))}

              {/* Contenedor con los botones en la misma línea */}
              <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                {/* Botón para agregar más fotos */}
                <button
                  className="w-full md:w-1/2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2 text-lg font-medium"
                  onClick={handleDivClick}
                >
                  <Plus className="w-7 h-7 stroke-[2.5]" />
                  <span>Agregar más fotos</span>
                </button>

                {/* Botón para compartir */}
                <button
                  className="w-full md:w-1/2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 flex items-center justify-center space-x-2 text-lg font-medium"
                  onClick={handleSharePhotos}
                >
                  <Share className="w-7 h-7 stroke-[2.5]" />
                  <span>Compartir</span>
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );


};

export default withLayout(CafePhotoUploadPage);

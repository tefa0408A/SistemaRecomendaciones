import { useState, useRef } from 'react';
import { Dot, Loader, Plus, Share, X } from 'lucide-react';
import { withLayout } from '../HOC/withLayout';
import SearchBox from '../components/funcionalidad/search-box';
import { useCafe } from '../hook/use-cafe';
import { useSavePhoto, useUpPhoto } from '../hook/use-photo';
import type { PhotoFormData } from '../components/lib/types';
import { useAuth } from '../context/auth-context';
import { useAlert } from '../context/alert';
import { useNavigate } from 'react-router';

const MAX_FILE_SIZE_MB = 10;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

const CafePhotoUploadPage = () => {

  const [selectedCafeId, setSelectedCafeId] = useState<number | null>(null);
  const { isTokenValid, setIsShowLogin } = useAuth();
  const navigate = useNavigate()

  const createMutationGuardar = useSavePhoto();
  const createMutationSubir = useUpPhoto();

  const { data: cafe, isLoading: isLoadingCafe, error: errorCafe } = useCafe(selectedCafeId ?? 0);

  const { showAlert } = useAlert();

  const [photos, setPhotos] = useState<{ file: File; description: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleSharePhotos = async () => {
    console.log("Seleccionó compartir")

    if (!cafe?.id) {
      showAlert("Debe seleccionar un lugar para compartir las fotos", "warning");
      return;
    }

    if (!photos.every(photo => photo.description?.trim() !== "")) {
      showAlert("Debes ingresar una descripción por cada foto", "warning");
      return;
    }

    if (!isTokenValid()) {
      console.log("Token no es valido")
      setIsShowLogin(true)
      return;
    }

    try {
      const uploadPromises = photos.map(async (photo) => {

        const nuevaFoto: PhotoFormData = {
          nombre: '',
          descripcion: photo.description,
          file: photo.file,
          restaurante: {
            id: cafe.id
          }
        };

        const uploadResponse = await createMutationSubir.mutateAsync(nuevaFoto);

        console.log("resultado de subir: ", uploadResponse)

        nuevaFoto.nombre = uploadResponse.nombre

        await createMutationGuardar.mutateAsync(nuevaFoto);
      });

      await Promise.all(uploadPromises);

      showAlert("Fotos compartidas con éxito", "success")
      
      console.log("Todas las fotos fueron subidas y guardadas con éxito");

      navigate(`/cafe/${cafe.id}`)

    } catch (error) {
      console.error("Error al compartir las fotos", error);
    }

  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const files = event.target.files;
    if (!files) return;

    const newPhotos: { file: File; description: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!ALLOWED_TYPES.includes(file.type)) {
        showAlert(`La imagen ${file.name} tiene un formato no permitido. Solo se permiten imágenes JPEG, JPG y PNG.`
          , "warning")
      //alert();
      continue;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      alert(`La imagen ${file.name} supera los ${MAX_FILE_SIZE_MB}MB.`);
      continue;
    }

    newPhotos.push({ file, description: "" });
  }

  setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);

};


const handleDescriptionChange = (index: number, newDescription: string) => {
  setPhotos((prevPhotos) =>
    prevPhotos.map((photo, i) =>
      i === index ? { ...photo, description: newDescription } : photo
    )
  );
};

const handleRemovePhoto = (index: number) => {
  setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
};


const handleSearch = (id: number) => {
  setSelectedCafeId(id);

};




return (
  <div className="w-full max-w-[80%] mx-auto p-4 flex flex-col md:flex-row">

    <div className="w-full md:w-2/5 p-4">
      <h2 className="text-xl font-semibold">Comparte tus fotos</h2>

      {selectedCafeId && cafe && (
        <div className="mt-4 p-4 border border-gray-300 rounded-md flex flex-col items-center justify-center text-center shadow-md">
          {isLoadingCafe ? (
              <Loader className="animate-spin" />
          ) : errorCafe ? (
              <p className="text-2xl font-bold text-red-500 mt-4">
                  Ocurrió un error 😰
              </p>
          ) : (
            <>
              <img
                src={cafe.imagenUrl}
                alt={cafe.nombre}
                className="w-48 h-48 object-cover rounded-lg"
              />
              <p className="text-lg font-medium mt-2">{cafe.nombre}</p>
              <p className="text-sm text-gray-500">{cafe.ubicacion}</p>
            </>
          )}
        </div>
      )}

      <p className="mt-2 text-sm text-gray-600">
        <span className="font-bold">Tener en cuenta:</span>
        <span className="flex items-center space-x-2"><Dot />Las imágenes deben ser recientes</span>
        <span className="flex items-center space-x-2"><Dot />Se aceptan formatos: jpg, jpeg y png</span>
        <span className="flex items-center space-x-2"><Dot />El tamaño de cada foto debe ser menor a 10MB</span>
      </p>
    </div>


    <div className="w-full md:w-3/5 p-4 border-t md:border-l md:border-t-0">
      <h3 className="text-lg font-medium">¿Dónde tomaste estas fotos?</h3>

      <div className="mt-2">
        <SearchBox handleSearch={handleSearch} />
      </div>

      <div>

        <input
          type="file"
          multiple
          accept="image/jpeg, image/png, image/jpg"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />


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

            {photos.map((photo, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center space-x-0 md:space-x-4 w-full p-4 border-t border-gray-300">

                <img
                  src={URL.createObjectURL(photo.file)}
                  alt="foto"
                  className="w-40 h-40 object-cover rounded-lg"
                />


                <div className="w-full md:flex-1 mt-2 md:mt-0">
                  <textarea
                    placeholder="Escribe una descripción..."
                    className="w-full border border-gray-300 rounded-lg p-2 resize-none h-24"
                    value={photo.description}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    rows={4}
                  />
                </div>


                <button
                  className="text-red-500 hover:text-red-700 p-2 mt-2 md:mt-0"
                  onClick={() => handleRemovePhoto(index)}
                >
                  <X className="w-7 h-7" />
                </button>
              </div>
            ))}


            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">

              <button
                className="w-full md:w-1/2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2 text-lg font-medium"
                onClick={handleDivClick}
              >
                <Plus className="w-7 h-7 stroke-[2.5]" />
                <span>Agregar más fotos</span>
              </button>


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

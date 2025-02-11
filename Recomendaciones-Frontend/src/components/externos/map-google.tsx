import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapaGoogle = ({ lat, lng }) => {
  const mapContainerStyle = { width: "100%", height: "400px" }; // Tamaño del mapa
  const center = { lat, lng }; // Centro del mapa según el punto recibido

  return (
    <LoadScript googleMapsApiKey="TU_API_KEY_AQUI">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
        <Marker position={center} /> {/* Agrega el marcador en la ubicación */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapaGoogle;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Cafeteria = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:8081/api/restaurant/v1/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="item-page">
      <h1>{product.nombre}</h1>
      <img src={product.imagenUrl} alt={product.nombre} />
      <p>{product.ubicacion}</p>
      <p>Ubicacion: ${product.ubicacion}</p>
    </div>
  );
}

export default Cafeteria;

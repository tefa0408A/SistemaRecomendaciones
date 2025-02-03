import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8081/api/restaurant/v1');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let results;
    if (searchTerm.trim() === '') {
      results = products.slice(0, 10);
    } else {
      results = products.filter(item =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredResults(results.slice(0, 10));
  }, [searchTerm, products]);

  useEffect(() => {
    // Detectar clics fuera del modal
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchModal(false);
      }
    };

    if (showSearchModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchModal]);

  const handleSearchClick = () => {
    setShowSearchModal(true);
  };

  const handleItemClick = (id) => {
    setShowSearchModal(false); 
    navigate(`/cafeteria/${id}`);
  };

  return (
    <div className="search-box" ref={searchRef}>
      <FaSearch size={20} className="search-icon" />
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={handleSearchClick}
        className="search-input"
      />

      {showSearchModal && (
        <div className="search-modal">
          <div className="search-results">
            {searchTerm.trim() === '' && <div className="favorites-label">Favoritos</div>}
            {filteredResults.map((item) => (
              <div
                key={item.id}
                className="search-item"
                onClick={() => handleItemClick(item.id)}
              >
                <img src={item.imagenUrl} alt={item.nombre} className="search-item-image" />
                <span className="search-item-text">{item.nombre} <br />{item.ubicacion}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;

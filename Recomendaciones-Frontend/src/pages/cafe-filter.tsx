import React, { useState, useEffect } from "react";
import type { Cafe } from "../components/lib/types";
import "../styles/style.css"

const CafeFilter: React.FC<{ onUpdate: (cafes: Cafe[]) => void }> = ({
  onUpdate
}) => {
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [cafes, setCafes] = useState<Cafe[]>([]);

  const districts = ["Miraflores", "San Isidro","Santiago de Surco"]; // Lista de distritos

  const handleCheckboxChange = (district: string) => {
    setSelectedDistricts((prevSelected) =>
      prevSelected.includes(district)
        ? prevSelected.filter((d) => d !== district)
        : [...prevSelected, district]
    );
  };

  const handleSelectAll = () => {
    if (selectedDistricts.length === districts.length) {
      setSelectedDistricts([]);
    } else {
      setSelectedDistricts(districts);
    }
  };

  useEffect(() => {
    if (selectedDistricts.length > 0) {
      fetchCafes(selectedDistricts);
    } else {
      setCafes([]); 
    }
  }, [selectedDistricts]);

  const fetchCafes = async (districts: string[]) => {
    try {
      const responses = await Promise.all(
        districts.map((district) =>
          fetch(`http://localhost:8080/api/restaurant/v1/distrito/${district}`)
        )
      );
      const data = await Promise.all(responses.map((res) => res.json()));
      const combinedCafes = data.flat();
      setCafes(combinedCafes);
      onUpdate(combinedCafes); // Actualiza los cafes en el componente Home
    } catch (error) {
      console.error("Error fetching cafes:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-72">
      <h3 className="text-2xl font-bold mb-4">Filtrar por Distrito</h3>
      <div className="mb-2 text-xl">
        <label>
          <input
            type="checkbox"
            onChange={handleSelectAll}
            checked={selectedDistricts.length === districts.length}
            className="mr-2 custom-checkbox"
          />
          Todos
        </label>
      </div>
      {districts.map((district) => (
        <div key={district} className="mb-2 text-xl">
          <label>
            <input
              type="checkbox"
              value={district}
              onChange={() => handleCheckboxChange(district)}
              checked={selectedDistricts.includes(district)}
              className="mr-2 custom-checkbox"
            />
            {district}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CafeFilter;

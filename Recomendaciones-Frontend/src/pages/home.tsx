
import React, { useState } from "react";
import CafeFilter from "../pages/cafe-filter";
import { useCafes } from "../hook/use-cafe";
import Card from "../components/ui/card";
import type { Cafe } from "../components/lib/types";
import { withLayout } from "../HOC/withLayout";
import { Loader } from "lucide-react";

const Home: React.FC = () => {
  const { data: cafes, isLoading, error } = useCafes("");
  const [filteredCafes, setFilteredCafes] = useState<Cafe[]>([]);

  const handleFilterUpdate = (cafes: Cafe[]) => {
    setFilteredCafes(cafes);
  };

  const scrollToContent = () => {
    const content = document.getElementById("content");
    content?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-bottom"
        style={{
          backgroundImage:
            "url(https://png.pngtree.com/background/20230518/original/pngtree-small-coffee-shop-with-wooden-tables-and-chairs-picture-image_2645160.jpg)"
        }}
      >
        <div className="text-center text-white flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl md:text-6xl font-bold">CAFEMANÍA</h1>
          <p className="text-lg md:text-2xl mt-2">
            Para los amantes del café y las buenas conversaciones
          </p>
          <button
            onClick={scrollToContent}
            className="mt-10 px-6 py-2 border-2 border-white text-white bg-transparent md:text-2xl rounded-md transition duration-300 ease-in-out hover:bg-white hover:text-black active:bg-gray-900 active:text-gray-900"
          >
            Descubramos cafeterias
          </button>
        </div>
        <div
          id="content"
          className="w-full min-h-screen bg-white flex flex-col items-start justify-start p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 w-full">
            <div className="col-span-1">
                <CafeFilter onUpdate={handleFilterUpdate} />
            </div>
            <div className="col-span-3">
              {isLoading ? (
                <div className="flex justify-center items-center h-screen">
              <Loader className="animate-spin" />
            </div>
              ) : error ? (
                  <p className="text-2xl font-bold text-red-500 mt-4">
                Ocurrió un error 😰
              </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {filteredCafes.length > 0
                    ? filteredCafes.map((cafe) => (
                        <Card key={cafe.id} cafe={cafe} />
                      ))
                        : cafes?.map((cafe) => <Card key={cafe.id} cafe={cafe} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLayout(Home);

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hospitals = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/hospitals.json");
        if (!response.ok) {
          throw new Error("Failed to fetch hospital data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-pulse text-xl">Loading hospitals...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen text-white p-4 md:p-6'>
      <h1 className='text-3xl md:text-4xl lg:text-5xl text-center font-semibold mb-6 md:mb-8'>
        Hospitals
      </h1>

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {data
            .filter((item) => item.type === "Hospital")
            .map((hospital, index) => (
              <Link
                to={`/hospital/${hospital.id}`}
                key={index}
                className="group flex flex-col sm:flex-row bg-custombg rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                {/* Image Container */}
                <div className="w-full sm:w-1/3 h-48 sm:h-auto bg-gray-300">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content Container */}
                <div className="w-full sm:w-2/3 p-4 sm:pt-4 flex flex-col justify-between relative">
                  <div>
                    <h2 className="font-bold text-lg md:text-xl mb-2">
                      {hospital.name}
                    </h2>
                    <p className="text-sm md:text-base mb-1">
                      {hospital.address}
                    </p>
                    <p className="text-sm md:text-base">
                      Ph. No.: {hospital.phone}
                    </p>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 sm:bottom-4 sm:top-auto bg-black/30 px-3 py-1 rounded-full text-sm md:text-base">
                    {hospital.rating} ★
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
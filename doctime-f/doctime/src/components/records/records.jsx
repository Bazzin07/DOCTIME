import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Records = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (height && weight && bloodGroup) {
      try {
        const userId = localStorage.getItem("userId");
        console.log("Sending request with userId:", userId);

        const response = await fetch("http://localhost:8001/api/records", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "userId": 25,
            "Accept": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            height: parseFloat(height),
            weight: parseFloat(weight),
            bloodGroup,
            medicalHistory
          }),
        });

        console.log("Response status:", response.status);

        if (response.ok) {
          console.log("Record successfully saved.");
          navigate("/dashboard");
        } else {
          const errorData = await response.text();
          console.error("Server response:", errorData);
          setError(`Error: ${errorData}`);
        }
      } catch (error) {
        console.error("Server error:", error);
        setError("Failed to connect to server");
      }
    } else {
      setError("Please fill in all required fields.");
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-8 flex items-center justify-center">
      <section className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-custombg p-4 md:p-6 lg:p-8 flex flex-col border rounded-2xl">
        <h1 className="text-center text-white text-2xl md:text-3xl lg:text-4xl mb-4 md:mb-6 font-bold">
          Records
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm md:text-base">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 md:space-y-6">
          <div className="space-y-2">
            <label className="block text-white text-base md:text-lg font-medium">
              Height (in cm):
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              required
              className="w-full p-2 md:p-3 border rounded text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your height"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-white text-base md:text-lg font-medium">
              Weight (in kg):
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              className="w-full p-2 md:p-3 border rounded text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your weight"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-white text-base md:text-lg font-medium">
              Blood Group:
            </label>
            <input
              type="text"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
              className="w-full p-2 md:p-3 border rounded text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your blood group"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-white text-base md:text-lg font-medium">
              Medical History (optional):
            </label>
            <textarea
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              className="w-full p-2 md:p-3 border rounded text-base md:text-lg min-h-[100px] md:min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter any past medical history"
            />
          </div>
          
          <button
            type="submit"
            className="w-full md:w-1/3 bg-white text-custombg font-bold py-2 md:py-3 px-4 rounded-md mt-4 md:mt-6 self-center
              hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default Records;
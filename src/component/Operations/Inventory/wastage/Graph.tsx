import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { SlGraph } from "react-icons/sl";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph = () => {
  // Line chart data
  const data = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Wastage Cost",
        data: [4000, 2000, 3000, 1000, 5000, 7000, 3000],
        borderColor: "#f472b6",
        backgroundColor: "rgba(244, 114, 182, 0.2)",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "#f472b6",
        pointBorderColor: "#f472b6",
        pointRadius: 4,
        fill: true, // Enable area fill
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensures custom height
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Days of the Week",
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        ticks: {
          callback: (value : any)  => `${value / 1000}k`,
        },
      },
    },
  };

  // State to manage the visibility of the graph
  const [isGraphVisible, setIsGraphVisible] = useState(true);

  // Toggle the graph visibility
  const handleToggle = () => {
    setIsGraphVisible(!isGraphVisible);
  };

  return (
    <div className=" bg-gray-100 shadow rounded-lg w-full max-w-full">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-300">
        <div className="flex items-center space-x-2 p-4">
          <div className="bg-white p-4 ">
            {" "}
            <SlGraph size={20} />
          </div>
          <h2 className="text-gray-700 font-semibold p-4">Wastage Reports</h2>
          {/* Toggle Icon */}
        </div>

        {/* Dropdown */}
        <button onClick={handleToggle} className="focus:outline-none p-4">
          {isGraphVisible ? <FaCaretUp /> : <FaCaretDown />}
        </button>
      </div>

      {/* Conditionally render the Line Chart based on the state */}
      {isGraphVisible && (
        <div className="h-[422px] w-full p-4">
          <Line data={data} options={options} />
          <p className="text-center text-gray-500 mt-4">
            Cost Of Wastage For One Week.
          </p>
        </div>
      )}
    </div>
  );
};

export default Graph;

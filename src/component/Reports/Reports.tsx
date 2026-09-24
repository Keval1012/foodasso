import React from "react";
import { GoArrowRight } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Reports = () => {
  const navigate=useNavigate()
  return (
    <div className="">
      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-center bordre-b border-gray-300 p-4">
          <h1 className="text-2xl font-semibold">Report</h1>
          <div className="flex gap-3 items-center py-2 rounded px-4 border p-4 border-gray-400">
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base" onClick={()=>navigate(-1)}>Back</button>
          </div>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {/* Card 1 */}
          <Link to="/reports/CategoryReport">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Category Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Provides an overview of sales performance by category.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link>

          {/* Card 2 */}
          <Link to="/reports/itemReport">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Item Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Details sales information for individual items.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link>

          {/* Card 3 */}
          <Link to="/reports/saleReport">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Sales Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Summarizes overall sales performance.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link>

          {/* Card 4 */}
          <Link to="/reports/orderReport">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Order Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Provides a breakdown of individual orders.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link>

          {/* Card 5 */}
          {/* <Link to="/reports/ExecutiveSalesReport">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Executive Sales Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Presents a high-level overview of sales performance.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link> */}

          {/* Card 6 */}
          {/* <Link to="/reports/Employeelist">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Employee Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Tracks the performance of individual employees.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link> */}

          {/* Card 7 */}
          {/* <Link to="/reports/Group">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Group Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Analyzes sales performance by groups or teams.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link> */}

          {/* Card 8 */}
          {/* <Link to="/reports/VariationReport">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-[#3d3d3d] mb-2">
                  Variation Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Provides information on sales of different variations of
                  items.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link> */}

          {/* Card 9 */}
          {/* <Link to="/reports/CoverSizeReport">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Cover Size Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Analyzes sales based on the size of items ordered.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link> */}

          {/* Card 10 */}
          {/* <Link to="/reports/TipSummary">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Tip Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Summarizes tipping information.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link> */}

          {/* Card 11 not */}
          {/* <Link to="/operations/printerlist">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Counter Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Tracks performance by different counters or stations.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link> */}

          {/* Card 12 */}
          {/* <Link to="/reports/LocalityWiseSummary">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Locality Wise Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Analyzes sales performance by location.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link> */}

          {/* Card 13 not */}
          {/* <Link to="/operations/printerlist">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Settlement Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Summarizes the settlement methods used.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link> */}

          {/* Card 14 not */}
          {/* <Link to="/operations/printerlist">
            <div className="w-full h-40 sm:h-44 md:h-48 lg:h-[9rem] cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Assignee Wise Summary
                </h2>
                <p className="text-sm text-[#3D3D3D]">
                  Analyzes sales data by employee assigned.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Reports;

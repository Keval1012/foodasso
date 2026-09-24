import React from "react";
import { GoArrowRight } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";

const MenuConfiguration = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Menu Configuration</h1>
          <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400">
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Card 1 */}
          <Link to="/operations/menu/item">
            <div className="cursor-pointer bg-gray-100 border border-gray-300 p-7 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Items Management
                </h2>
                <p className="text-sm text-gray-600">
                  Create, Edit, And Manage Your Menu Items.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link>
          {/* Card 2 */}
          <Link to="/operations/SpecialNoteListing">
            <div className="cursor-pointer bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Special Note Management
                </h2>
                <p className="text-sm text-gray-600">
                  Create And Edit Custom Notes For Your Orders.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link>
          {/* Card 3 */}
          <Link to="/operations/AreaManagementList">
            <div className="cursor-pointer bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-sm flex justify-between items-center hover:shadow-lg transition-shadow duration-300">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  Area Management
                </h2>
                <p className="text-sm text-gray-600">
                  Track And Manage Your Tables Across Different Categories.
                </p>
              </div>
              <span className="text-red-500 text-lg font-bold p-2">
                <GoArrowRight size={30} />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuConfiguration;

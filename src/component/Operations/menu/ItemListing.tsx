import React, { useState } from "react";
import { FaSearch, FaStar, FaPen, FaPlus } from "react-icons/fa";
import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ItemMenuFliter from "./ItemMenuFliter";
import { FiEdit } from "react-icons/fi";

const ItemListing = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  // State to manage favorite items
  const [favorites, setFavorites] = useState({
    SN123: false,
    ECN124: false,
    SN234: false,
  });

  // Toggle favorite status
  const toggleFavorite = (itemCode: any) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      //@ts-ignore
      [itemCode]: !prevFavorites[itemCode], // Corrected line
    }));
  };

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-6  border-b ">
          <h1 className="text-2xl font-semibold p-4">Item Listing</h1>
          <div className="flex justify-end items-center gap-4">
            <Link to="/operations/menu/item/add">
              <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                <span className="flex items-center gap-3 mr-2">
                  <FaPlus />
                  Add Item
                </span>
              </button>
            </Link>
            <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400">
              <MdKeyboardArrowLeft className="text-base" />
              <button className="text-base">Back</button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <form className="w-full md:w-80 py-3 p-4">
          <div className="relative">
            {/* Search Icon */}
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchOutline />
            </div>

            {/* Input Field */}
            <input
              type="search"
              id="default-search"
              className="outline-none block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="search"
              required
            />

            {/* Up/Down Icons */}
            <div
              className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
            </div>
          </div>
        </form>
        {isExpanded && <ItemMenuFliter />}

        {/* Table */}
        <div className="overflow-x-auto mt-5 p-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg p-4">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-sm">
                <th className="p-4 text-left">Favorite</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Short Code</th>
                <th className="p-4 text-left">Price (₹)</th>
                <th className="p-4 text-left">Stock Status</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="border-b">
                <td className="p-4" onClick={() => toggleFavorite("SN123")}>
                  <FaStar
                    className={
                      favorites.SN123 ? "text-yellow-500" : "text-gray-300"
                    }
                  />
                </td>
                <td className="p-4">Seafood Noodles</td>
                <td className="p-4">SN123</td>
                <td className="p-4">150.00</td>
                <td className="p-4">
                  <select className="border border-gray-300 rounded-md p-3 w-full ">
                    <option>Do Not Track</option>
                    <option>Track</option>
                  </select>
                </td>
                <td className="p-4">
                  <Link to="/operations/menu/item/edit">
                    <FiEdit className="cursor-pointer text-gray-500 w-4 h-4" />
                  </Link>{" "}
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="border-b">
                <td className="p-4" onClick={() => toggleFavorite("ECN124")}>
                  <FaStar
                    className={
                      favorites.ECN124 ? "text-yellow-500" : "text-gray-300"
                    }
                  />
                </td>
                <td className="p-4">Egg & Cilantro Noodles</td>
                <td className="p-4">ECN124</td>
                <td className="p-4">200.00</td>
                <td className="p-4">
                  <select className="border border-gray-300 rounded-md p-3 w-full">
                    <option>Do Not Track</option>
                    <option>Track</option>
                  </select>
                </td>
                <td className="p-4">
                  <Link to="/operations/menu/item/edit">
                    <FiEdit className="cursor-pointer text-gray-500 w-4 h-4" />
                  </Link>{" "}
                </td>
              </tr>

              {/* Row 3 */}
              <tr className="border-b">
                <td className="p-4" onClick={() => toggleFavorite("SN234")}>
                  <FaStar
                    className={
                      favorites.SN234 ? "text-yellow-500" : "text-gray-300"
                    }
                  />
                </td>
                <td className="p-4">
                  Shrimp Noodles{" "}
                  <span className="text-red-500">(Variation)</span>
                </td>
                <td className="p-4">SN234</td>
                <td className="p-4">160.00</td>
                <td className="p-4">
                  <select className="border border-gray-300 rounded-md p-3 w-full">
                    <option>Do Not Track</option>
                    <option>Track</option>
                  </select>
                </td>
                <td className="p-4">
                  <Link to="/operations/menu/item/edit">
                    <FiEdit className="cursor-pointer text-gray-500 w-4 h-4" />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemListing;

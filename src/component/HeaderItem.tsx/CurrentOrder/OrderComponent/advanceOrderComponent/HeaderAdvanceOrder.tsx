import React, { useState } from "react";
import Menu from "../../../../../Styles/assets/img/allmenu.svg";
import ImageIcon from "../../../../common/ImageIcon";

const HeaderAdvanceOrder = () => {
    const [selectedStatus, setSelectedStatus] = useState("");
  const [activeTab, setActiveTab] = useState("All");

    const handleStatusChange = (event: any) => {
      setSelectedStatus(event.target.value);
    };
  return (
    <>
      <div className="">
        <div className="flex justify-between">
       <div className="flex space-x-4 mb-4 lg:mb-0">
      {/* All Tab */}
      <button
        onClick={() => setActiveTab("All")}
        className={`flex flex-col items-center px-4 py-2 ${
          activeTab === "All" ? "border-b-4 border-orange-400" : ""
        }`}
      >
        <ImageIcon src={Menu} />
        <p className=" text-[#3D3D3D] font-medium text-base">All</p>
      </button>

      {/* 1 Day Tab */}
      {/* <button
        onClick={() => setActiveTab("1 Day")}
        className={`flex items-center px-4 py-2 ${
          activeTab === "1 Day" ? "border-b-4 border-orange-400" : ""
        }`}
      >
        <span className="px-2 bg-gray-700 text-white rounded-full mb-1">1</span>
        <span className="ml-2 font-bold">1 Day</span>
      </button> */}

      {/* 2 Day(s) Tab */}
      {/* <button
        onClick={() => setActiveTab("2 Day(s)")}
        className={`flex items-center px-4 py-2 ${
          activeTab === "2 Day(s)" ? "border-b-4 border-orange-400" : ""
        }`}
      >
        <span className="px-2 bg-gray-700 text-white rounded-full mb-1">2</span>
        <span className="ml-2 font-bold">2 Day(s)</span>
      </button> */}
    </div>

          {/* <div className="flex space-x-4 mb-4 lg:mb-0">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center">
              <span className="material-icons">receipt</span>
              <span className="ml-2">Settle Orders</span>
            </button>
            <button className="border px-4 py-2 rounded-lg">
              Get Past Orders
            </button>
          </div> */}
        </div>

        <div className="flex justify-end my-2">
      <div className="flex justify-center items-center  hover:bg-gray-100 bg-opacity-80 px-2 py-1 rounded ml-1">
        <div className=" h-5 w-5 bg-gray-300 rounded-full mr-2"></div>
        <p
          className=" "
          //   className={`cursor-pointer inline-block px-4 py-2 text-base  rounded-md ${
          //     selectedStatus === "blank" ? " " : " text-gray-600"
          //   }`}
        >
          Saved Bill
        </p>
      </div>

      <div className="flex justify-center items-center  hover:bg-gray-100 bg-opacity-80 px-2 py-1">
        <div className=" h-5 w-5 bg-blue-200 rounded-full"></div>
        <p
          className="text-gray-600 cursor-pointer inline-block px-4 py-2 text-base  rounded-md "
          //   className={`cursor-pointer inline-block px-4 py-2 text-base  rounded-md ${
          //     selectedStatus === "running" ? " text-white" : " text-gray-600"
          //   }`}
        >
        Printed Bill
        </p>
      </div>

      <div className="flex justify-center items-center  hover:bg-gray-100 bg-opacity-80 px-2 py-1">
        <div className=" h-5 w-5 bg-teal-300 rounded-full"></div>

        <p
          className="text-gray-600 cursor-pointer inline-block px-4 py-2 text-base  rounded-md "
          //   className={`cursor-pointer inline-block px-4 py-2 text-base  rounded-md ${
          //     selectedStatus === "printed" ? " text-white" : " text-gray-600"
          //   }`}
        >
         Cancelled Bill
        </p>
      </div>

      <div className="flex justify-center items-center  hover:bg-gray-100 bg-opacity-80 px-2 py-1">
        <div className=" h-5 w-5 bg-red-300 rounded-full"></div>

        <p
          //   className={`cursor-pointer inline-block px-4 py-2 text-base  rounded-md ${
          //     selectedStatus === "paid" ? " text-white" : " text-gray-600"
          //   }`}
          className="text-gray-600 cursor-pointer inline-block px-4 py-2 text-base  rounded-md "
        >
          Paid 
        </p>
      </div>
    </div>
      </div>
    </>
  );
};

export default HeaderAdvanceOrder;


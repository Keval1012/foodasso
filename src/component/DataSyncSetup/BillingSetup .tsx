import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { PiWarningOctagon } from "react-icons/pi";
import billing from "../../Styles/assets/img/billing-set.png";
import { useNavigate } from "react-router-dom";

const BillingSetup = () => {
  const navigate = useNavigate();
  return (
    <div className=" bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 w-full">
        {/* Header Section */}
        <div className="text-start">
          {/* <img src="/logo.png" alt="Foodasso" className="mx-auto w-24 h-24" /> */}
          <div className="bg-white rounded-lg grid grid-cols-3 p-3">
            <div className="col-span-2 ">
              <h2 className="text-lg font-semibold">
                Setup Your Billing Terminal (REF: 333014)
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                When a restaurant has more than one screen for billing and KOT
                printing, one would require Multiple Billing Stations and all
                are managed by Main Server called the Master Billing Station.
              </p>
            </div>
            <div className="flex items-center justify-end cursor-pointer space-x-2  rounded-md p-4">
              <div className="border border-gray-400 rounded p-0 ">
                {" "}
                {/* Removed padding */}
                <div className="flex items-center space-x-2 p-4">
                  <IoSettingsOutline size={14} /> {/* Reduced icon size */}
                  <button className="text-xs p-0  leading-none">
                    Master Billing Station
                  </button>{" "}
                  {/* Removed button padding and adjusted line-height */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-8 bg-gray-100 p-3 rounded-lg">
          {/* Left Column */}
          <div>
            {/* Description Section */}
            <div className="mb-6">
              <p className="text-gray-500 text-base">
                There is only one Master Billing Station, where the 3rd party
                platforms are integrated and being operated from.
              </p>
            </div>

            {/* Input Section */}
            <div className="mb-6">
              <label
                className="block text-gray-500  mb-2"
                htmlFor="stationName"
              >
                Enter The Station Name:
              </label>
              <input
                type="text"
                id="stationName"
                className="border border-gray-300 rounded-lg p-2 w-full text-base"
                placeholder="Billing Statio"
              />
              <p className="text-gray-600 text-xs">
                Ex. Counter 1 Terminal 1, Counter 2. Terminal 2 etc
              </p>
            </div>

            {/* Setup Button */}
            <div className="flex justify-start">
              <button className="bg-orange-500 text-white text-base py-2 px-4 rounded-full  hover:bg-orange-600">
                Setup Your Terminal
              </button>
            </div>
            <p className="text-base text-gray-400 pt-3">
              Internet is required to setup your terminal. Once you complete
              setup you will redirect to the billing page
            </p>
          </div>

          {/* Right Column */}
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-center ">
              <PiWarningOctagon size={34} />
            </div>
            {/* Server Info Section */}
            <p className="text-gray-700 mb-4 text-center mt-2">
              Your Already Have One Server Associated
            </p>
            <div className="text-center bg-custom-orange-alpha border py-2">
              <p className="text-sm text-gray-500 mb-4">
                Machine Id: 10683d37-Ddbc-4c14-04d3-0b48faf0000
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Computer Name: DESKTOP-T48BARJ
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Counter Name: Billing Station
              </p>
            </div>
            <div className=" flex justify-center">
              {" "}
              <button className="bg-orange-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-orange-600">
                Try Again
              </button>
            </div>
          </div>
        </div>

        {/* Additional Setup Section */}
        <div className="  mt-8  bg-gray-100 p-4 rounded">
          <div className="flex">
            <div>
              <img className=" w-28 h-24" src={billing} alt="Foodasso Logo" />
            </div>
            <div className="p-4">
              {" "}
              <p className="text-gray-600 ">
                If You Have Multiple Terminals, To Setup Your Additional Station
              </p>
              <button
                className="bg-white text-dark text-xs rounded-full mt-2 px-2 py-1 border border-gray-400"
                onClick={() => navigate("/sync/billing_setup/configure_system")}
              >
                Click Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSetup;

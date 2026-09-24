import React, { useState } from "react";
import Configure from "../../Styles/assets/img/ConfigureSystem.svg";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ConfigureSystem = () => {
  const [selectedMode, setSelectedMode] = useState("");

  const [ipAddress, setIpAddress] = useState("");
  const [stationName, setStationName] = useState("");
  const [stationType, setStationType] = useState("secondary");

  const navigate = useNavigate();
  const handleSave = () => {
    // Handle save logic
    console.log(`IP Address: ${ipAddress}`);
    console.log(`Station Name: ${stationName}`);
    console.log(`Station Type: ${stationType}`);
    navigate("/login");
  };


  return (
    <div className="">
      <div className="w-full container p-6 bg-white  mt-10 border border-gray-300 rounded-lg">
        <div className=" mb-6 border-b   border-gray-300">
          <div className="mb-6 flex justify-between ">
            <h2 className="flex  gap-3 items-center text-xl font-semibold">
              <img className="" src={Configure} alt="Sync Instructions" />
              Configuring Multiple Systems (REF: 333014)
            </h2>
            <div className="flex  gap-3 items-center py-2 rounded px-4 border border-gray-400">
              <MdKeyboardArrowLeft className="text-base" />
              <button className=" text-base">Back</button>
            </div>
          </div>
          <p className="text-gray-600 text-xs">
            In a restaurant, there can be Secondary Billing Stations other than
            the Main Billing Station. Further, there can also be the KOT
            Stations, where users are authorized to print KOTs only. Secondary
            Billing Stations and KOT Stations are called Clients.
          </p>
        </div>
        <div className="mb-6 flex gap-2">
          <label className="flex items-center cursor-pointer space-x-2 border rounded-md p-4 text-xs">
            <input
              type="radio"
              name="stationType"
              value="secondary"
              checked={stationType === "secondary"}
              onChange={() => setStationType("secondary")}
              className="hidden peer mr-2"
            />
            <div
              className={`w-4 h-4 border-2 rounded-full ${
                selectedMode === "keyboard"
                  ? "bg-[#039855] border-[#039855]"
                  : "bg-white border-gray-300"
              } peer-checked:bg-[#039855]
                peer-checked:border-[#039855]`}
            />
            <span className="text-xs"> Station Configuration</span>
          </label>

          <label className="flex items-center cursor-pointer space-x-2 border rounded-md p-4 text-xs">
            <input
              type="radio"
              name="stationType"
              value="kot"
              checked={stationType === "kot"}
              onChange={() => setStationType("kot")}
              className="hidden peer mr-2"
            />
            <div
              className={`w-4 h-4 border-2 rounded-full ${
                selectedMode === "touch"
                  ? "bg-[#039855] border-[#039855]"
                  : "bg-white border-gray-300"
              } peer-checked:bg-[#039855] peer-checked:border-[#039855]`}
            />
            <span>KOT Station</span>
          </label>
        </div>
        {/* <div>
        <label className="block text-gray-700 font-medium mb-2">
            Station Configuration
        </label>
        <input type="text" placeholder="Enter IP Address" value={ipAddress} onChange={(e)=>
        setIpAddress(e.target.value)}
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
        />
        <input type="text" placeholder="Enter The Station Name" value={stationName} onChange={(e)=>
        setStationName(e.target.value)}
        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight mt-4 focus:outline-none focus:ring"
        />
    </div> */}
        <div className="flex justify-center items-center ">
          <div className=" bg-[#F9F9F9] rounded-lg p-6  w-full">
            <h2 className="text-base font-semibold mb-4">
              Station Configuration
            </h2>
            <p className="text-xs text-gray-600 mb-4">
              Provide Intranet Local IP Address To Which This Station Connects
              To.
            </p>
            <form>
              <div className="mb-4">
                <label
                  className="flex items-center gap-2 text-gray-700 text-sm mb-2"
                  htmlFor="ip-address"
                >
                  <h4> Enter IP Address</h4>
                  <input
                    id="ip-address"
                    type="text"
                    placeholder="198.535.4656.4004"
                    className="border rounded-md py-2 px-3 text-gray-700 w-96 ml-16"
                  />
                  <button
                    type="button"
                    className="bg-orange-400 hover:bg-orange-500 text-white  py-2 px-4 rounded-full"
                  >
                    Check
                  </button>
                </label>

                <p className="text-xs text-gray-500 mt-2">
                  Ex. Server, IP:3000. Computer Name:3000.112.168.0.10:3000 etc.
                </p>
              </div>
              <div className="mb-6">
                <label
                  className="flex items-center gap-2 text-gray-700 text-sm  mb-2"
                  htmlFor="station-name"
                >
                  <h4>Enter The Station Name</h4>
                  <input
                    id="station-name"
                    type="text"
                    placeholder="Biller"
                    className="border rounded-md py-2 px-3 text-gray-700 w-96 ml-2"
                  />
                </label>

                <p className="text-xs text-gray-500 mt-2">
                  Ex. Counter 1, Terminal 1, Counter 2, Terminal 2, etc.
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-red-500 mt-4">
                  ⚠️ Once you click "Save", it will save the information &
                  direct you to the Billing screen.
                </p>
                <button
                  type="submit"
                  // onClick={handleSave}
                  className="bg-orange-400 hover:bg-orange-500 text-white  py-2 px-4 rounded-full"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigureSystem;

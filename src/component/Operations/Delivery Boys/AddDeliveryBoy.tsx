import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useSelector } from "react-redux";
import { postDeliveryBoy } from "../../../Api/Operation/Api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddDeliveryBoy = () => {

  const navigate = useNavigate();
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [userCode, setUserCode] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to the server
    console.log({ fullname, username, userCode, password, phoneNumber });

    if (fullname && username && userCode && password) {
      let data = {
        outlet: loginUserData?.outlet,
        kitchen: loginUserData?.kitchen,
        fullname: fullname,
        username: username,
        user_code: userCode,
        password: password,
        phone: '+91' + phoneNumber,
      };

      try {
        const res = await postDeliveryBoy(data);
        if (res.status === 200) {
          console.log(res);
          navigate(-1);
        }
      } catch (error: any) {
        toast.error(error.response.data?.errors);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="mt-6 w-full">
        <div className="">
          <div className="flex justify-between border-b  border-gray-300 p-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Delivery Boy
            </h2>
            <div
              className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
              onClick={() => navigate(-1)}
            >
              <MdKeyboardArrowLeft className="text-base" />
              <button className="text-base">Back</button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white m-4  rounded-lg border w-[830px]"
          >
            {/* Language */}
            <div className="mb-4 flex items-center gap-6 px-3 pt-3">
              <label className="block w-32 text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                className="block w-[500px] px-3 py-2 border border-gray-300 rounded-lg shadow-sm outline-none sm:text-sm"
              />
            </div>

            {/* User Name */}
            <div className="mb-4 flex items-center gap-6 px-3">
              <label className="block w-32 text-sm font-medium text-gray-700 mb-1">
                User Name *
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-[500px] px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none sm:text-sm"
              />
            </div>

            {/* User Code */}
            <div className="mb-4 flex items-center gap-6 px-3">
              <label className="block w-32 text-sm font-medium text-gray-700 mb-1">
                User Code *
              </label>
              <input
                type="text"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                required
                className="block w-[500px] px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none sm:text-sm"
              />
            </div>

            {/* Password */}
            <div className="mb-4 flex items-center gap-6 px-3">
              <label className="block w-32 text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-[500px] px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none sm:text-sm"
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4 flex items-center gap-6 px-3">
              <label className="block w-32 text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="block w-[500px] px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none sm:text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 border-t border-gray-300">
              <button
                type="button"
                className="bg-gray-200 m-3 text-gray-800 font-semibold py-2 px-4 rounded-full"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-orange-500 m-3 text-white font-semibold py-2 px-5 rounded-full"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDeliveryBoy;

import React, { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

const EditSpecialNote = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e: any) => {
    setName(e.target.value);
    if (e.target.value.trim() !== "") {
      setError(""); // Clear error if there's a valid name
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name.trim() === "") {
      setError("Name is required.");
      return;
    }
    // Add further save logic here
    console.log("Form submitted:", { name });
  };

  return (
    <div className="p-6 border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center mb-6  border-b ">
          <h1 className="text-2xl font-semibold p-4">Special Note Edit</h1>
          <div className="flex justify-end items-center gap-4">
            <div className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400">
              <MdKeyboardArrowLeft className="text-base" />
              <button className="text-base">Back</button>
            </div>
          </div>
        </div>
        {/* Name Input Section */}
        <div className="space-y-4 border p-4 border-gray-300 rounded-lg">
          <div className="flex items-center space-x-4">
            <label className="w-1/4 font-medium">Name *</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-[670px] p-2 border border-gray-300 rounded-md"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Cancel and Save Buttons */}
          <div className="mt-6 p-4 flex justify-end border-t space-x-4">
            <button
              type="button"
              onClick={() => setName("")}
              className="px-4 py-2 text-gray-700 rounded-full bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-400 text-white py-2 px-4 rounded-full"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditSpecialNote;

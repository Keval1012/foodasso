import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { getCustomerTag, patchCustomers } from "../../../Api/Operation/Api";
import { IoMdClose } from "react-icons/io";

interface CustomerDataProps {
  defaultCustomer: any;
}

type RowType = {
  id: number;
  address: string;
  locality: string;
};

const CustomerEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { defaultCustomer } = (location.state as CustomerDataProps) || {};
  const [customerTagList, setCustomerTagList] = useState([]);

  const [customerFormData, setCustomerFormData] = useState<any>({
    mobile: defaultCustomer?.phone,
    name: defaultCustomer?.fullname,
    address: defaultCustomer?.primary_address,
    locality: defaultCustomer?.primary_locality,
    mark_as_favorite: defaultCustomer?.mark_as_favorite || false,
    date_of_anniversary: defaultCustomer?.date_of_anniversary,
    dob: defaultCustomer?.dob,
    tags: defaultCustomer?.tags || [],
    email: defaultCustomer?.email,
    gst_no: defaultCustomer?.gst_no
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerFormData({
      ...customerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMarkAsFavoriteChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerFormData({
      ...customerFormData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleCustomerTagsChange = (selectedOptions: any) => {
    const updatedTags = selectedOptions.map((option: any) => option.value);
    setCustomerFormData({
      ...customerFormData,
      tags: updatedTags,
    });
  };

  const [rows, setRows] = useState<RowType[]>([
    {
      id: 0,
      address: "",
      locality: "",
    },
  ]);

  const handleAddRow = () => {
    setRows([...rows, { id: Date.now() + Math.random(), address: "", locality: "" }]);
  };

  const handleRemoveRow = (id: number) => {
    setRows((prevRows: any) => prevRows.filter((row: any) => row.id !== id));
  };

  const handleInputChange = (index: any, field: any, value: any) => {
    setRows((prevRows: any) =>
      prevRows.map((row: any) =>
        row?.id === index ? { ...row, [field]: value } : row
      )
    );
  };

  useEffect(() => {
    if ((defaultCustomer?.additional_addresses)?.length > 0) {
      setRows(defaultCustomer?.additional_addresses);
    }
  }, [defaultCustomer?.additional_addresses]);

  useEffect(() => {
    fetchCustomerTag();
  }, []);

  const fetchCustomerTag = async () => {
    try {
      const res = await getCustomerTag();
      if (res.status === 200) {
        setCustomerTagList(res.data?.data);
      }
    } catch (error) {}
  };

  console.log("defaultCustomer", defaultCustomer);
  console.log("rows", rows);

  const handleSave = async () => {
    const customerRowData = rows?.map((row: any) => {
      const rowItem = {
        address: row?.address,
        locality: row?.locality
      };

      if (row?.detail_id !== undefined) {
        Object.assign(rowItem, { detail_id: Number(row?.detail_id) });
      }

      return rowItem;
    });

    let data = {
      phone: customerFormData?.mobile,
      fullname: customerFormData?.name,
      primary_address: customerFormData?.address,
      primary_locality: customerFormData?.locality,
      mark_as_favorite: customerFormData?.mark_as_favorite ?? false,
      date_of_anniversary: customerFormData?.date_of_anniversary,
      dob: customerFormData?.dob,
      tags: customerFormData?.tags ?? [],
      email: customerFormData?.email,
      gst_no: customerFormData?.gst_no,
      additional_addresses: customerRowData
      // additional_addresses: [
      //   // {
      //   //     "detail_id": "4",
      //   //     "address": "demo2",
      //   //     "locality": "demo2"
      //   // },
      //   {
      //     address: "demo3",
      //     locality: "demo3",
      //   },
      // ],
    };

    try {
      const res = await patchCustomers(defaultCustomer?.id, data);
      if (res.status === 200) {
        console.log(res);
        navigate(-1);
      }
    } catch (error) {}
  };

  return (
    <div className="p-4 md:p-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Edit Customer</h2>
      <form className="space-y-4">
        {/* Mobile and Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Mobile</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter mobile number"
              name="mobile"
              value={customerFormData?.mobile}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter name"
              name="name"
              value={customerFormData?.name}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email and Date of Birth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter email"
              name="email"
              value={customerFormData?.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <div className="relative mt-1">
              <input
                type="date"
                className="block w-full p-2 border border-gray-300 rounded-md"
                name="dob"
                value={customerFormData?.dob}
                onChange={handleChange}
              />
              <span className="absolute right-3 top-3">
                {/* Add any icon here */}
              </span>
            </div>
          </div>
        </div>

        {/* Date of Anniversary and Locality */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Date of Anniversary
            </label>
            <div className="relative mt-1">
              <input
                type="date"
                className="block w-full p-2 border border-gray-300 rounded-md"
                name="date_of_anniversary"
                value={customerFormData?.date_of_anniversary}
                onChange={handleChange}
              />
              <span className="absolute right-3 top-3">
                {/* Add any icon here */}
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Primary Locality
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter locality"
              name="locality"
              value={customerFormData?.locality}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* GST No. and Primary Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">GST No.</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter GST number"
              name="gst_no"
              value={customerFormData?.gst_no}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Primary Address</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter address"
              name="address"
              value={customerFormData?.address}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4">
            {/* <div className="flex gap-2">
              <input type="radio" />
              <label htmlFor="">Do Not Send Any Update</label>
            </div> */}
            <div className="flex gap-2">
              <input
                type="radio"
                name="mark_as_favorite"
                defaultChecked={customerFormData?.mark_as_favorite}
                onChange={handleMarkAsFavoriteChange}
              />
              <label htmlFor="">Mark As Favorite</label>
            </div>
          </div>
        </div>

        {/* Customer Tags */}
        <div className="py-3">
          <label className="block text-sm font-medium">Customer Tags</label>
          <div className="flex items-center mt-1">
            {/* <input
              type="text"
              className="block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter tags"
            /> */}
            {/* <Select
              className="w-full shadow-sm sm:text-sm"
              options={customerTagList?.map((item: any) => ({
                value: item?.id,
                label: item?.tag,
              }))}
              placeholder="Select Tags"
              isMulti
              defaultValue={{ value: "credit card", label: "credit card" }}
              name="tags"
              value={customerFormData?.tags}
              onChange={handleCustomerTagsChange}
            /> */}
            <Select
              className="w-full shadow-sm sm:text-sm"
              options={customerTagList.map((item: any) => ({
                value: item?.id,
                label: item?.tag,
              }))}
              placeholder="Select Tags"
              isMulti
              name="tags"
              value={customerTagList
                .filter((item: any) =>
                  (customerFormData?.tags || []).includes(item.id)
                )
                .map((item: any) => ({
                  value: item?.id,
                  label: item?.tag,
                }))}
              onChange={handleCustomerTagsChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="additionalAddress" className="py-3">
            Additional Address
          </label>

          {rows?.map((r: any) => (
            <div
              key={r?.id}
              className="flex flex-col md:flex-row items-center md:space-y-0 md:space-x-2 w-full my-2"
            >
            {/* Address Input */}
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Enter Address"
                value={r?.address}
                onChange={(e) => handleInputChange(r?.id, "address", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              />
            </div>

            {/* Locality Input */}
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Enter Locality"
                value={r?.locality}
                onChange={(e) => handleInputChange(r?.id, "locality", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              />
            </div>

            {/* Add Button */}
            <button
              type="button"
              onClick={handleAddRow}
              className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-md font-semibold shadow"
            >
              + Add
            </button>

            {/* Close Button */}
            {rows?.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveRow(r?.id)}
                className="text-gray-500 hover:text-gray-700 px-4"
              >
              <IoMdClose />
              </button>
            )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-orange-500 text-white rounded-full"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerEdit;

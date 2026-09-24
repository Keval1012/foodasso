import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { getAssignPrinter, postAssignPrinter } from "../../../../Api/Operation/Api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const AsignBill = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [assignBillList, setAssignBillList] = useState<any>([]);

  useEffect(() => {
    if (id) fetchAssignBillData();
  }, [id]);

  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;
    const updatedValue = checked ? 1 : 0;

    const updatedData = assignBillList?.map((item: any) => ({
      ...item,
      [name]: updatedValue,
    }));

    setAssignBillList(updatedData);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    const updatedData = assignBillList?.map((item: any) => ({
      ...item,
      [name]: value,
    }));

    setAssignBillList(updatedData);
  };

  const fetchAssignBillData = async () => {
    let data = {
      assign_to: "bill",
      printer: id,
    };

    try {
      const res = await getAssignPrinter(data);
      if (res.status === 200) {
        setAssignBillList(res.data?.data);
      }
    } catch (error) {}
  };

  const handleSave = async () => {
    let data = {
      printer: Number(id),
      assign_to: "bill",
      delivery: Number(assignBillList[0]?.delivery),
      pick_up: Number(assignBillList[0]?.pick_up),
      dine_in: Number(assignBillList[0]?.dine_in)
    };

    try {
      const res = await postAssignPrinter(data);
      if (res.status === 201) {
        toast.success(res.data?.message);
        navigate(-1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {}
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6  border-b ">
        <h1 className="text-2xl font-semibold p-4">Asign To Bill</h1>
        <div className="flex justify-end items-center gap-4 p-4">
          <div
            className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="border rounded-lg p-3 border-gray-300 w-full max-w-lg">
        <h2 className="text-#[3D3D3D] font-semibold mb-3">
          Assign Printer – Eprinter
        </h2>

        <table className="w-full text-left ">
          <thead>
            <tr className="bg-gray-100 text-[#3D3D3D]">
              <th className="px-4 py-2 ">Order Type</th>
              <th className="px-4 py-2">Print Copies</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "delivery",
                label: "Delivery",
                value: assignBillList[0]?.delivery > 0,
              },
              {
                id: "pick_up",
                label: "Pick Up",
                value: assignBillList[0]?.pick_up > 0,
              },
              {
                id: "dine_in",
                label: "Dine In",
                value: assignBillList[0]?.dine_in > 0,
              },
            ].map(({ id, label, value }) => (
              <tr key={id} className="bg-white">
                <td className="px-4 py-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    className="form-checkbox mr-2"
                    name={id}
                    onChange={handleCheckboxChange}
                  />
                  <span>{label}</span>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    min="0"
                    // defaultValue="0"
                    // defaultValue={assignBillList[0]?.[id]}
                    value={assignBillList[0]?.[id] || 0}
                    // className="rounded border border-e-gray-300 px-2 py-1 w-full t"
                    className={`rounded border border-e-gray-300 px-2 py-1 w-full t ${!value && "cursor-not-allowed"}`}
                    disabled={!value}
                    name={id}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
            ))}
            {/* {[
              { label: "Delivery", checked: false },
              { label: "Pick Up", checked: false },
              { label: "Dine In", checked: true },
            ].map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : ""}>
                <td className="px-4 py-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    className="form-checkbox mr-2"
                  />
                  <span>{item.label}</span>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    min="0"
                    defaultValue="0"
                    className=" rounded  border border-e-gray-300 px-2 py-1 w-full t"
                  />
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-4 bg-gray-200 p-3">
          <button
            className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-full bg-orange-500 text-white font-semibold"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AsignBill;

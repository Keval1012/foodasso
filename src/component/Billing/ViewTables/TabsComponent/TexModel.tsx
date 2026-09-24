import React, { useEffect, useState } from "react";
import { getAllTax } from "../../../../Api/Api";
import { useSelector } from "react-redux";

interface TextMoreProps {
  isOpen: boolean;
  onClose: () => void;
  setAppliedTax: any;
  subTotalTaxPrice: any;
}

const TextMore: React.FC<TextMoreProps> = ({
  isOpen,
  onClose,
  setAppliedTax,
  subTotalTaxPrice,
}) => {

  const { subTotalPrice } = useSelector((state: any) => state.billingData) ?? {};
  const [taxDetails, setTaxDetails] = useState<any>([]);

  useEffect(() => {
    fetchAllTax();
  }, []);

  const fetchAllTax = async () => {
    let data = {
      filters: {
        is_active: true,
      },
    };

    const res = await getAllTax(data);
    if (res?.status === 200) {
      setTaxDetails(res.data?.data);
    }
  };

  const totalTaxAmount = taxDetails?.reduce((total: number, tax: any) => {
    const taxAmount =
      tax?.tax_value === "percentage"
        ? (subTotalTaxPrice * Number(tax?.amount)) / 100
        : Number(tax?.amount);
    return total + taxAmount;
  }, 0);

  useEffect(() => {
    if (subTotalTaxPrice !== 0) setAppliedTax(totalTaxAmount);
  }, [totalTaxAmount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Applied Tax</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-4">
          <table className="min-w-full table-fixed border border-gray-300">
            <thead>
              <tr className="text-left text-white bg-[#3D3D3DE5]">
                <th className="w-1/2 px-2 py-2">TAX</th>
                <th className="w-1/4 px-2 py-2">AMOUNT</th>
              </tr>
            </thead>
            <tbody>
              {/* First row */}
              {taxDetails?.map((tax: any) => (
                <tr className="border-t">
                  <td className="px-2 py-2 flex items-center">
                    <button className="text-red-500 mr-2 cursor-not-allowed">
                      &times;
                    </button>
                    <span>
                      {subTotalTaxPrice}@ {tax?.title}
                    </span>
                    <input
                      type="text"
                      defaultValue={
                        tax?.tax_value === "percentage"
                          ? `${Number(tax?.amount)}%`
                          : Number(tax?.amount)
                      }
                      className="ml-2 border border-gray-300 rounded w-20 px-1 text-center"
                      disabled
                    />
                  </td>
                  <td className="px-2 py-2">
                    <input
                      type="text"
                      defaultValue={
                        tax?.tax_value === "percentage"
                          ? (subTotalTaxPrice * Number(tax?.amount)) / 100
                          : Number(tax?.amount)
                      }
                      className="border border-gray-300 rounded w-full px-1 text-center"
                      disabled
                    />
                  </td>
                </tr>
              ))}

              {/* Second row */}
              {/* <tr className="border-t">
                <td className="px-2 py-2 flex items-center">
                  <button className="text-red-500 mr-2">&times;</button>
                  <span>200@2.5 SGST</span>
                  <input
                    type="text"
                    defaultValue="2.5%"
                    className="ml-2 border border-gray-300 rounded w-16 px-1 text-center"
                  />
                </td>
                <td className="px-2 py-2">
                  <input
                    type="text"
                    defaultValue="5"
                    className="border border-gray-300 rounded w-full px-1 text-center"
                  />
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextMore;

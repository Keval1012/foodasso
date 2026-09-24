import React, { useState } from "react";

const SettlementPayment = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    amountReceived: "2000",
    paymentType: "",
    comments: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleCancel = () => {
    // Handle cancel action
  };

  const handleSettle = () => {
    // Handle settle action
  };

  return (
    <div className="px-4 py-6">
      <div className="flex justify-end mb-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded">
          Finalized Amount Given
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-base text-start font-semibold">Type</th>
              <th className="px-4 py-2 border text-base text-start font-semibold">Date</th>
              <th className="px-4 py-2 border text-base text-start font-semibold">Amount</th>
              <th className="px-4 py-2 border text-base text-start font-semibold">
                Amount Received
              </th>
              <th className="px-4 py-2 border text-base text-start">
                Payment Type
              </th>
              <th className="px-4 py-2 border text-base text-start">
                Comments
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border text-base text-center">Aditya</td>
              <td className="px-4 py-2 border text-base w-36 text-center">
                2024-06-27 18:25:56
              </td>
              <td className="px-4 py-2 border text-base text-center">2000</td>
              <td className="px-4 py-2 border text-base text-center">
                <input
                  type="text"
                  name="amountReceived"
                  value={paymentDetails.amountReceived}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-base"
                />
              </td>
              <td className="px-4 py-2 border ">
                <div className="flex items-center space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="paymentType"
                      value="Cash"
                      checked={paymentDetails.paymentType === "Cash"}
                      onChange={handleInputChange}
                      className="mr-1 text-base"
                    />
                    Cash
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentType"
                      value="Card"
                      checked={paymentDetails.paymentType === "Card"}
                      onChange={handleInputChange}
                      className="mr-1 text-base"
                    />
                    Card
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentType"
                      value="Due"
                      checked={paymentDetails.paymentType === "Due"}
                      onChange={handleInputChange}
                      className="mr-1 text-base"
                    />
                    Due
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentType"
                      value="Part Payment"
                      checked={paymentDetails.paymentType === "Part Payment"}
                      onChange={handleInputChange}
                      className="mr-1 text-base"
                    />
                    Part Payment
                  </label>
                </div>
              </td>
              <td className="px-4 py-2 border">
                <textarea
                  name="comments"
                  placeholder="Enter Comment"
                  value={paymentDetails.comments}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-base resize-none"
                  rows={2}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={6} className="px-4 py-2 border">
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancel}
                    className="px-5 text-base py-2 border rounded-full border-gray-400  bg-white hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSettle}
                    className="px-5 py-2 text-base rounded-full bg-orange-500 text-white hover:bg-orange-500"
                  >
                    Settled
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SettlementPayment;

// CashFlowListing.tsx
import React from "react";
import { LuEye } from "react-icons/lu";
import { FiEdit, FiPrinter } from "react-icons/fi";

// Interface for CashFlowOrder
export interface CashFlowOrder {
  id: number;
  name: string;
  amountGiven: number | string;
  amountToGet: number | string;
  settled: boolean;
}

// Component Props
interface CashFlowListingProps {
  CashFlowListingData: CashFlowOrder[];
  onSettlementClick: (id: number) => void;
}

const CashFlowListing: React.FC<CashFlowListingProps> = ({
  CashFlowListingData,
  onSettlementClick,
}) => {
  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded">
          Finalized Amount Given
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">
                <input type="checkbox" className="form-checkbox" />
              </th>
              <th className="p-2 text-left text-base">Delivery Boy</th>
              <th className="p-2 text-left text-base">Amount Given</th>
              <th className="p-2 text-left text-base">Amount To Get</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {CashFlowListingData.map((item: CashFlowOrder) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">
                  <input type="checkbox" className="form-checkbox" />
                </td>
                <td className="p-2 text-base">{item.name}</td>
                <td className="p-2 text-base">
                  <input
                    type="text"
                    value={item.amountGiven}
                    className={`border border-gray-300 p-1 w-full ${
                      item.settled ? "" : ""
                    } rounded`}
                    readOnly={item.settled}
                    aria-label={`Amount given for ${item.name}`}
                  />
                </td>
                <td className="p-2 text-base">{item.amountToGet}</td>
                <td className="p-2 text-base">
                  {item.settled ? (
                    <button
                      onClick={() => onSettlementClick(item.id)}
                      className="border border-gray-300 text-gray-700 px-4 py-1 rounded"
                    >
                      Settlement
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CashFlowListing;

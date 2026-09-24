import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getBillingUserProfile } from "../../../Api/Operation/Api";

export interface BillerProfile {
  billername: string;
  billeroriginalname: string;
  type: string;
}

const BillerProfileListing: React.FC<{
  BillerProfileListingData: BillerProfile[];
  onEdit: () => void; // Add this prop
}> = ({ BillerProfileListingData, onEdit }) => {

  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};
  const [billerProfileList, setBillerProfileList] = useState([]);

  useEffect(() => {
    fetchBillerProfile();
  }, []);

  const fetchBillerProfile = async () => {
    let data = {
      outlet_id: loginUserData?.outlet,
    };

    try {
      const res = await getBillingUserProfile(data);
      if (res.status === 200) {
        setBillerProfileList(res.data?.data);
      }
    } catch (error) {}
  };

  console.log("billerProfileList", billerProfileList);

  return (
    <div>
      <div className="">
        <div className="table-container overflow-x-auto max-h-96">
          <table className="min-w-full bg-white text-sm border border-gray-200">
            <thead className="bg-gray-100 border-t border-l border-r border-b-0 border-solid border-[rgba(61,61,61,0.4)]">
              <tr>
                <th className="py-3 px-4 text-base text-start">Biller Name</th>
                <th className="py-3 px-4 text-base text-start">
                  Biller Original Name
                </th>
                <th className="py-3 px-4 text-base text-start">Type</th>
                {/* <th className="py-3 px-4 text-base text-start">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {billerProfileList?.map((biller: any) => (
                <tr
                  key={biller?.id}
                  className={`${biller?.id % 2 === 0 ? "border" : ""}`}
                >
                  <td className="py-3 px-4 text-base text-start">
                    {biller?.username}
                  </td>
                  <td className="py-3 px-4 text-base text-start">
                    {biller?.fullname}
                  </td>
                  <td className="py-3 px-4 text-base text-start">
                    {biller?.user_type}
                  </td>
                  {/* <td className="py-3 px-4 text-base text-start flex gap-2">
                    <FiEdit
                      className="cursor-pointer text-gray-500 w-4 h-4 text-start"
                      onClick={onEdit} // Handle click event
                    />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillerProfileListing;

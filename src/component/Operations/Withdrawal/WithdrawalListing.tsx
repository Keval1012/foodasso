import React, { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { FiEdit, FiPrinter } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { getWithdrawl } from "../../../Api/Operation/Api";
import Pagination from "../../common/Pagination";

interface WithdrawalOrder {
  date: string;
  totalWithdrawalreported: string; // Ensure this matches the data structure
}

const WithdrawalListing: React.FC<{
  WithdrawalListingData: WithdrawalOrder[];
}> = ({ WithdrawalListingData }) => {

  const navigate = useNavigate();
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [withdrawalList, setWithdrawalList] = useState([]);
  const [withdrawalTotalLength, setWithdrawalTotalLength] = useState(0);

  const itemsPerPage = 20;
  const totalItems = withdrawalTotalLength;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchwithdrawals(currentPage);
  }, [currentPage]);

  const handleWithdrawalDetails = async (date: any) => {
    navigate("/operations/withdrawal/view", {
      state: {
        withdrawalDate: dayjs(new Date(date)).format("YYYY-MM-DD"),
      },
    });
  };

  const handleEditWithdrawal = async (date: any) => {
    navigate("/operations/withdrawal/edit", {
      state: {
        withdrawalDate: dayjs(new Date(date)).format("YYYY-MM-DD"),
      },
    });
  };

  const fetchwithdrawals = async (page: number) => {
    let data = {
      start: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      filters: {
        outlet__id: loginUserData?.outlet,
      }
    };
    
    const res = await getWithdrawl(data);
    if (res?.status === 200) {
      setWithdrawalList(res.data?.data);
      setWithdrawalTotalLength(res.data?.total_count);
    }
  };

  console.log("withdrawalList", withdrawalList);
  
  return (
    <div>
      <div className="">
        <div className="table-container overflow-x-auto max-h-96">
          <table className="min-w-full bg-white text-sm border border-gray-200">
            <thead className="bg-gray-100 border-t border-l border-r border-b-0 border-solid border-[rgba(61,61,61,0.4)]">
              <tr>
                <th className="py-3 px-4 text-xs text-center">Date</th>
                <th className="py-3 px-4 text-xs text-center">
                  Total Withdrawal Reported
                </th>
                <th className="py-3 px-4 text-xs text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawalList?.map((withdrawal: any) => (
                <tr
                  key={withdrawal?.id}
                  className={`${withdrawal?.id % 2 === 0 ? "border" : ""}`}
                >
                  <td className="py-3 px-4 text-xs text-center">
                    {withdrawal?.date}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">
                    {withdrawal?.total_amount}{" "}
                    {/* Correct property name */}
                  </td>
                  <td className="py-3 px-4 text-xs text-center flex justify-center items-center gap-2">
                    {/* <Link to="/operations/withdrawal/view"> */}
                    <LuEye
                      className="cursor-pointer text-gray-500 w-4 h-4"
                      onClick={() => handleWithdrawalDetails(withdrawal?.date)}
                    />
                    {/* </Link> */}
                    {/* <Link to="/operations/withdrawal/edit"> */}{" "}
                    <FiEdit
                      className="cursor-pointer text-gray-500 w-4 h-4"
                      onClick={() => handleEditWithdrawal(withdrawal?.date)}
                    />
                    {/* </Link> */}
                    <FiPrinter className="cursor-pointer text-gray-500 w-4 h-4" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between my-4">
          <div className="w-full flex justify-end items-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalListing;

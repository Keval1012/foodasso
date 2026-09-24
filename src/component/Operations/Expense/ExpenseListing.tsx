import React, { useEffect, useState } from "react";
// import { IoSearchOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { FiEdit, FiPrinter } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getExpense } from "../../../Api/Operation/Api";
import Pagination from "../../common/Pagination";
import dayjs from "dayjs";

interface ExpenseOrder {
  date: string;
  totalexpenses: string;
}

const ExpenseListing: React.FC<{ ExpenseListingData: ExpenseOrder[] }> = ({
  ExpenseListingData,
}) => {

  const navigate = useNavigate();
  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};
  const [expenseList, setExpenseList] = useState([]);
  const [expenseTotalLength, setExpenseTotalLength] = useState(0);

  const itemsPerPage = 20;
  const totalItems = expenseTotalLength;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchExpenses(currentPage);
  }, [currentPage]);

  const handleExpenseDetails = async (date: any) => {
    navigate("/operations/expense/view", {
      state: {
        expenseDate: dayjs(new Date(date)).format("YYYY-MM-DD")
      },
    });
  };

  const handleEditExpense = async (date: any) => {
    navigate("/operations/expense/edit", {
      state: {
        expenseDate: dayjs(new Date(date)).format("YYYY-MM-DD"),
      },
    });
  };

  const fetchExpenses = async (page: number) => {
    let data = {
      start: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      filters: {
        outlet__id: loginUserData?.outlet,
      },
    };

    const res = await getExpense(data);
    if (res?.status === 200) {
      setExpenseList(res.data?.data);
      setExpenseTotalLength(res.data?.total_count);
    }
  };

  console.log("expenseList", expenseList);

  return (
    <div>
      <div className="">
        <div className="table-container overflow-x-auto max-h-96">
          <table className="min-w-full bg-white text-sm border border-gray-200">
            <thead className="bg-gray-100 border-t border-l border-r border-b-0 border-solid border-[rgba(61,61,61,0.4)]">
              <tr>
                <th className="py-3 px-4 text-xs text-center">Date</th>
                <th className="py-3 px-4 text-xs text-center">
                  Total Expenses
                </th>
                <th className="py-3 px-4 text-xs text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenseList?.map((expense: any) => (
                <tr
                  key={expense?.id}
                  className={`${expense?.id % 2 === 0 ? "border" : ""}`}
                >
                  <td className="py-3 px-4 text-xs text-center">
                    {dayjs(new Date(expense?.date)).format("DD-MM-YYYY")}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">
                    {expense?.total_amount}
                  </td>
                  <td className="py-3 px-4 text-xs text-center flex justify-center items-center gap-2">
                    {/* <Link
                      to="/operations/expense/view"
                    > */}
                    <LuEye
                      className="cursor-pointer text-gray-500 w-4 h-4"
                      onClick={() => handleExpenseDetails(expense?.date)}
                    />
                    {/* </Link> */}
                    {/* <Link to="/operations/expense/edit"> */}
                    <FiEdit
                      className="cursor-pointer text-gray-500 w-4 h-4"
                      onClick={() => handleEditExpense(expense?.date)}
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

export default ExpenseListing;

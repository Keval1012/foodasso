import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

type WithdrawalProps = {
  onWithdrawal: () => void;
};

const Withdrawal: React.FC<WithdrawalProps> = ({ onWithdrawal }) => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center border-b p-4">
        <h2 className="text-xl font-semibold mb-4">Withdrawal</h2>
        <div className="flex gap-3">
          <Link to="/operations/withdrawal/withdrawalmangment">
            <button
              className="btn bg-[rgba(255,158,27,1)] items-center py-2 rounded px-4 text-base text-white"
              onClick={onWithdrawal}
            >
              Add Withdrawal
            </button>
          </Link>
          <div
            className="flex gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <MdKeyboardArrowLeft className="text-base" />
            <button className="text-base">Back</button>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
        <form className="w-full md:w-80">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <IoSearchOutline />
            </div>
            <input
              type="search"
              id="default-search"
              className="outline-none block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Here"
              required
            />
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default Withdrawal;

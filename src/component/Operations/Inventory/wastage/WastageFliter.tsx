import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { getOperationKotList } from "../../../Api/Operation/Api";
// import {
//   setKotFilterOpeData,
//   setKotListOpeData,
// } from "../../../redux/Features/OperationDataSlice";
// import { getOrderType } from "../../../Api/Api";

// interface KotFilterDataProps {
//   handleInputSearch: any;
//   filterData: any;
// }

const WastageFliter = ({}) => {
  //   const dispatch = useDispatch();
  //   const { loginUserData } =
  //     useSelector((state: any) => state.billingData) ?? {};
  //   const [orderTypeList, setOrderTypeList] = useState([]);

  //   const [filterData, setFilterData] = useState({
  //     customer_fullname: "",
  //     customer_phone: "",
  //     kot_no: "",
  //     payment_type: "",
  //     kot_status: [],
  //     table_no: "",
  //     order_type: "",
  //   });

  //   const kotStatusList = [
  //     { value: "not_prepared", label: "Not Prepared" },
  //     { value: "active", label: "Active" },
  //     { value: "cancelled", label: "Cancelled" },
  //     { value: "used_in_bill", label: "Used in Bill" },
  //   ];

  //   useEffect(() => {
  //     fetchOrderTypeData();
  //   }, []);

  //   const fetchOrderTypeData = async () => {
  //     const res = await getOrderType();
  //     if (res?.status === 200) {
  //       setOrderTypeList(res?.data?.data);
  //     }
  //   };
  //   console.log(orderTypeList);

  //   const handleInputSearch = (field: any, value: any) => {
  //     setFilterData((prev) => ({ ...prev, [field]: value }));
  //   };

  //   const handleSearch = async () => {
  //     let data = {
  //       outlet_id: loginUserData?.outlet,
  //       search: {
  //         // customer_fullname: filterData.customer_fullname,
  //         // customer_phone: filterData.customer_phone,
  //       },
  //   filter: {
  //     // kot_no: filterData.kot_no,
  //     // payment_type: filterData.payment_type,
  //     // kot_status: filterData.kot_status,
  //     // table_no: filterData.table_no,
  //     // order_type: filterData.order_type,
  //   },
  // };

  //     if (filterData.kot_no) {
  //       Object.assign(data.filter, { kot_no: filterData.kot_no });
  //     }
  //     if (filterData.table_no) {
  //       Object.assign(data.filter, { table_no: filterData.table_no });
  //     }
  //     if (filterData.customer_fullname) {
  //       Object.assign(data.search, {
  //         customer_fullname: filterData.customer_fullname,
  //       });
  //     }
  //     if (filterData.customer_phone) {
  //       Object.assign(data.search, { customer_phone: filterData.customer_phone });
  //     }
  //     if (filterData.order_type) {
  //       Object.assign(data.filter, { order_type: filterData.order_type });
  //     }
  //     if (filterData.kot_status.length > 0) {
  //       Object.assign(data.filter, { kot_status: [filterData.kot_status] });
  //     }

  //     dispatch(setKotFilterOpeData(data));

  //     const res = await getOperationKotList(data);
  //     if (res?.status === 200) {
  //       dispatch(setKotListOpeData(res.data));
  //     }
  //   };

  //   const handleReset = async () => {
  //     setFilterData({
  //       customer_fullname: "",
  //       customer_phone: "",
  //       kot_no: "",
  //       payment_type: "",
  //       kot_status: [],
  //       table_no: "",
  //       order_type: "",
  //     });

  // let data = {
  //   outlet_id: loginUserData?.outlet,
  // };

  // const res = await getOperationKotList(data);
  // if (res?.status === 200) {
  //   dispatch(setKotListOpeData(res.data));
  //   dispatch(setKotFilterOpeData(null));
  // }

  return (
    <div className="p-4 border rounded-md mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none "
            // placeholder="Enter KOT No."
            // value={filterData.kot_no}
            // onChange={(e) => handleSearch("kot_no", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none "
            // placeholder="Enter Table No."
            // value={filterData.table_no}
            // onChange={(e) => handleInputSearch("table_no", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-md"
            // value={filterData.order_type}
            // onChange={(e) => handleInputSearch( e.target.value)}
          >
            <option value="">All</option>
          </select>
        </div>
        {/* Buttons */}
        <div className="col-span-2 md:col-span-3 flex justify-end space-x-4 mt-4">
          <button
            type="reset"
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100"
            // onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="flex gap-3 items-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none "
            // onClick={handleSearch}
          >
            <IoSearchOutline />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
export default WastageFliter;

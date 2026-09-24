// import React from "react";
// import { FiEdit, FiTrash, FiRefreshCcw } from "react-icons/fi";
// import { useState } from "react";
// import CancelOrder from "../../common/CancleOrder";
// import DialogBox from "../../common/Dilog-Box";

// const DeliveryBoyListing = () => {
//   const [status, setStatus] = useState("Active");
//     const [isActiveDialogOpen, setActiveDialogOpen] = useState(false);

//   const handleOpenActiveDialog = () => setActiveDialogOpen(true);
//   const handleCloseActiveDialog = () => setActiveDialogOpen(false);
//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">Delivery Boy Listing</h2>
//         <div className="flex gap-2">
//           <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
//             <FiRefreshCcw className="mr-2" /> Add Delivery Boy
//           </button>
//           <button className="flex items-center border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200">
//             <span>&larr;</span> Back
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="w-full overflow-x-auto">
//         <table className="min-w-full bg-white border rounded-lg">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="py-2 px-4 text-left">Name</th>
//               <th className="py-2 px-4 text-left">User Name</th>
//               <th className="py-2 px-4 text-left">User Code</th>
//               <th className="py-2 px-4 text-left">Status</th>
//               <th className="py-2 px-4 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-t">
//               <td className="py-2 px-4">Samir</td>
//               <td className="py-2 px-4">Samirr_1234</td>
//               <td className="py-2 px-4">1234</td>
//               <td className="py-2 px-4">
//                 <span
//                   className={`p-2 rounded text-white ${
//                     status === "Active" ? "bg-green-500" : "bg-red-400"
//                   }`}
//                 >
//                   {status}
//                 </span>
//               </td>
//               <td className="py-2 px-4">
//                 <div className="flex gap-2">
//                   <button className="p-2 rounded bg-gray-100 hover:bg-gray-200">
//                     <FiEdit className="text-gray-600" />
//                   </button>
//                   <button className="p-2 rounded bg-gray-100 hover:bg-gray-200">
//                     <FiTrash className="text-red-600" />
//                   </button>
//                   <button
//                     className={`p-2 rounded border ${
//                       status === "Active" ? " " : ""
//                     }`}
//                     onClick={() =>
//                       setStatus(status === "Active" ? "Inactive" : "Active")
//                     }
//                   >
//                     {status === "Active" ? "Inactive" : "Active"}
//                   </button>
//                   <DialogBox
//                     isOpen={isActiveDialogOpen}
//                     onClose={handleCloseActiveDialog}
//                     title="Cancel Order"
//                   >
//                     <CancelOrder />
//                   </DialogBox>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DeliveryBoyListing;

import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash, FiRefreshCcw } from "react-icons/fi";
import CancelOrder from "../../common/CancleOrder";
import DialogBox from "../../common/Dilog-Box";
import ChangeUser from "./ChangeUser";
import DeleteUser from "./DeleteUser";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { getDeliveryBoys } from "../../../Api/Operation/Api";
import Pagination from "../../common/Pagination";
import { useSelector } from "react-redux";

const DeliveryBoyListing = () => {
  const navigate = useNavigate();
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [status, setStatus] = useState("Active");
  const [isActiveDialogOpen, setActiveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // const handleOpenActiveDialog = () => setActiveDialogOpen(true);
  const handleCloseActiveDialog = () => setActiveDialogOpen(false);

  // const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const [deliveryBoyList, setDeliveryBoyList] = useState([]);
  const [deliveryBoyDetails, setDeliveryBoyDetails] = useState({});
  const [deliveryBoyId, setDeliveryBoyId] = useState(0);
  const [deliveryBoyTotalLength, setDeliveryBoyTotalLength] = useState(0);

  const itemsPerPage = 20;
  const totalItems = deliveryBoyTotalLength;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchDeliveryBoys(currentPage);
  }, [currentPage]);

  const fetchDeliveryBoys = async (page: number) => {
    let data = {
      start: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      outlet: loginUserData?.outlet,
    };

    const res = await getDeliveryBoys(data);
    if (res?.status === 200) {
      setDeliveryBoyList(res.data?.data);
      setDeliveryBoyTotalLength(res.data?.total_count);
    }
  };

  const handleDeleteDeiveryBoy = async (deliveryBoyId: any) => {
    setDeleteDialogOpen(true);
    setDeliveryBoyId(deliveryBoyId);
  };

  const handleEditDeiveryBoy = (deliveryBoy: any) => {
    navigate("/operations/DeliveryBoyListing/edit", {
      state: {
        defaultDeliveryBoy: deliveryBoy,
      },
    });
  };

  const handleIsActive = async (deliveryBoy: any) => {
    setActiveDialogOpen(true);
    setDeliveryBoyDetails(deliveryBoy);
  };

  console.log("deliveryBoyList", deliveryBoyList);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Delivery Boy Listing</h2>
        <div className="flex gap-2">
          <Link to="/operations/DeliveryBoyListing/Add">
            <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
              <FiRefreshCcw className="mr-2" /> Add Delivery Boy
            </button>
          </Link>
          <div
            className="flex  gap-3 items-center py-2 rounded px-4 border border-gray-400 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <MdKeyboardArrowLeft className="text-base" />
            <button className=" text-base">Back</button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">User Name</th>
              <th className="py-2 px-4 text-left">User Code</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {deliveryBoyList?.map((db: any) => (
              <tr className="border-t" key={db?.id}>
                <td className="py-2 px-4">{db?.fullname}</td>
                <td className="py-2 px-4">{db?.username}</td>
                <td className="py-2 px-4">{db?.user_code}</td>
                <td className="py-2 px-4">
                  <span
                    className={`p-2 rounded text-white ${
                      // status === "Active" ? "bg-green-500" : "bg-red-400"
                      db?.is_active === true ? "bg-green-500" : "bg-red-400"
                    }`}
                  >
                    {db?.is_active === true ? "Active" : "InActive"}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <div className="flex gap-2">
                    {/* <Link to="/operations/DeliveryBoyListing/edit"> */}
                    <button
                      className="p-2 rounded bg-gray-100"
                      onClick={() => handleEditDeiveryBoy(db)}
                    >
                      <FiEdit className="text-gray-600" />
                    </button>
                    {/* </Link> */}
                    <button
                      className="p-2 rounded bg-gray-100"
                      // onClick={handleOpenDeleteDialog}
                      onClick={() => handleDeleteDeiveryBoy(db?.id)}
                    >
                      <FiTrash className="text-gray-600" />
                    </button>
                    {/* Button to open the dialog */}
                    <button
                      className={`p-2 rounded border`}
                      // onClick={handleOpenActiveDialog}
                      onClick={() => handleIsActive(db)}
                    >
                      {db?.is_active === true ? "InActive" : "Active"}
                    </button>
                    {/* Dialog Box */}
                    <DialogBox
                      isOpen={isActiveDialogOpen}
                      onClose={handleCloseActiveDialog}
                      title="Change User Status"
                    >
                      <ChangeUser
                        onClose={handleCloseActiveDialog}
                        deliveryBoyDetails={deliveryBoyDetails}
                        setActiveDialogOpen={setActiveDialogOpen}
                        fetchDeliveryBoys={fetchDeliveryBoys}
                        currentPage={currentPage}
                      />
                    </DialogBox>

                    <DialogBox
                      isOpen={isDeleteDialogOpen}
                      onClose={handleCloseDeleteDialog}
                      title="Delete User"
                    >
                      <DeleteUser
                        onClose={handleCloseDeleteDialog}
                        deliveryBoyId={deliveryBoyId}
                        setDeleteDialogOpen={setDeleteDialogOpen}
                        fetchDeliveryBoys={fetchDeliveryBoys}
                        currentPage={currentPage}
                      />
                    </DialogBox>
                  </div>
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
  );
};

export default DeliveryBoyListing;

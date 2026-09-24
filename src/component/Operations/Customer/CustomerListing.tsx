import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import Pagination from "../../common/Pagination";
import CustomerDailog from "./CustomerDailog"; // Import the dialog component
import CustomerEdit from "./CustomerEdit"; // Import the edit component
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCustomers } from "../../../Api/Operation/Api";

export interface CustomerOrder {
  phoneNo: string;
  fullname: string;
  primary_address: string;
}

const CustomerListing: React.FC<{ CustomerListingData: CustomerOrder[] }> = ({
  CustomerListingData,
}) => {
  // const itemsPerPage = 10; // Number of items per page
  // const totalItems = CustomerListingData.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();
  const { loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerOrder | null>(null);
  const [customerList, setCustomerList] = useState([]);
  const [customerTotalLength, setCustomerTotalLength] = useState(0);

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOpenEdit = (customer: CustomerOrder) => {
    setSelectedCustomer(customer);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedCustomer(null); // Reset selected customer when closing
  };

  // Slice the data for the current page
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const paginatedData = CustomerListingData.slice(startIndex, endIndex);


  const itemsPerPage = 20;
  const totalItems = customerTotalLength;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

  const fetchCustomers = async (page: number) => {
    let data = {
      start: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
      // "search": {
      //     "fullname": "sachin",
      //     "phone":"+919999999999"
      // },
      filters: {
        // "phone":"",
        // "fullname":""
        // "tags":1
        // "ctype":"",
        // "create_time":""
        outlet: loginUserData?.outlet,
      },
    };

    // debugger
    const res = await getCustomers(data);
    if (res?.status === 200) {
      setCustomerList(res.data?.data);
      setCustomerTotalLength(res.data?.total_count);
    }
  };

  console.log("customerList", customerList);

  const handleEditCustomer = async (customer: any) => {
    navigate(`/operations/customer/customerEdit/${customer?.id}`, {
      state: {
        defaultCustomer: customer,
      },
    });
  };

  return (
    <div>
      <div className="">
        <div className="table-container overflow-x-auto max-h-96">
          <table className="min-w-full bg-white text-sm border border-gray-200">
            <thead className="bg-gray-100 border-t border-l border-r border-b-0 border-solid border-[rgba(61,61,61,0.4)]">
              <tr>
                <th className="py-3 px-4 text-xs text-center">Mobile</th>
                <th className="py-3 px-4 text-xs text-center">Name</th>
                <th className="py-3 px-4 text-xs text-center">Address</th>
                <th className="py-3 px-4 text-xs text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {customerList?.map((customer: any) => (
                <tr
                  key={customer?.id}
                  className={`${customer?.id % 2 === 0 ? "border" : ""}`}
                >
                  <td className="py-3 px-4 text-xs text-center">
                    {customer?.phone}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">
                    {customer?.fullname}
                  </td>
                  <td className="py-3 px-4 text-xs text-center">
                    {customer?.primary_address}
                  </td>
                  <td className="py-3 px-4 text-xs text-center flex justify-center items-center gap-2">
                    {/* <Link to={`/operations/customer/customerEdit/${customer?.id}`}> */}
                    <FiEdit
                      className="cursor-pointer text-gray-500 w-4 h-4"
                      onClick={() => handleEditCustomer(customer)}
                    />
                    {/* </Link> */}

                    <div className="border rounded">
                      {/* <button
                        className="btn p-3"
                        onClick={handleOpenDialog} // Open the dialog
                      >
                        Notification Status
                      </button> */}
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
      {isDialogOpen && <CustomerDailog onClose={handleCloseDialog} />}{" "}
      {/* Conditionally render the dialog */}
      {/* Conditionally render the edit component */}
    </div>
  );
};

export default CustomerListing;

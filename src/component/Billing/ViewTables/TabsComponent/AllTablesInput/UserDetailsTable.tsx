// import React, { useEffect, useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import ImageIcon from "../../../../common/ImageIcon";
// import timefile from "../../../../../Styles/assets/img/time-table.svg";
// import textfile from "../../../../../Styles/assets/img/tax-icon.svg";
// import fileicon from "../../../../../Styles/assets/img/file-icon.svg";
// import deleteicon from "../../../../../Styles/assets/img/delete-icon.svg";
// import DialogBox from "../../../../common/Dilog-Box";
// import CustomerHistoryData from "./CustomerHistoryData";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserDetailsData } from "../../../../../redux/Features/BillingDataSlice";

// interface UserDataProps {
//   setUserDetails?: any;
// }

// const UserDetailsTable: React.FC<UserDataProps> = ({ setUserDetails }) => {
//   // State management for each input field
//   const dispatch = useDispatch();
//   const { userDetailsData } = useSelector((state: any) => state.billingData) ?? {};
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [address, setAddress] = useState("");
//   const [locality, setLocality] = useState("");
//   const [numOfPersons, setNumOfPersons] = useState("");
//   const [isTableDialogOpen, setTableDialogOpen] = useState(false);

//   // Sample customer and orders data
//   const customer = {
//     maxOrdered: "Seafood Noodles",
//     averageBill: 300,
//     comingSince: "25-02-2024",
//     visits: 2,
//   };

//   const orders = [
//     {
//       orderNo: "05",
//       orderDate: "2024-05-22 15:20:51",
//       orderType: "Dine In (Biller)",
//       paymentType: "Cash",
//       itemsOrdered: "Seafood Noodles",
//       restaurantName: "-------",
//       amount: "300.00",
//     },
//     {
//       orderNo: "07",
//       orderDate: "2024-05-21 15:20:51",
//       orderType: "Dine In (Biller)",
//       paymentType: "Card",
//       itemsOrdered: "Seafood Noodles, Fried Egg Noodles",
//       restaurantName: "-------",
//       amount: "300.00",
//     },
//   ];

//   // Handlers to open and close the dialog
//   const handleOpenTableDialog = () => setTableDialogOpen(true);
//   const handleCloseTableDialog = () => setTableDialogOpen(false);

//   // Clear field functions
//   const handleClearUserDetails = () => {
//     setName("");
//     setMobile("");
//     setAddress("");
//     setLocality("");
//     setNumOfPersons("");
//   };

//   // Save user details to Redux when inputs change
//   useEffect(() => {
//     dispatch(setUserDetailsData({
//       fullname: name,
//       phone: mobile,
//       primary_address: address,
//       primary_locality: locality,
//       no_of_person: numOfPersons
//     }));
//   }, [name, mobile, address, locality, numOfPersons]);

//   return (
//     <div className="mt04 rounded-lg">
//       {/* Form Container */}
//       <form className="space-y-6">
//         {/* Name Field with Save and Delete Icons */}
//         <div>
//           <label
//             htmlFor="fullname"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Name
//           </label>
//           <div className="flex items-center mt-1">
//             <input
//               id="fullname"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter your name"
//               className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <div className="flex space-x-2 ml-2">
//               <ImageIcon
//                 src={timefile}
//                 className="cursor-pointer"
//                 handleClick={handleOpenTableDialog} // Open dialog
//               />
//               <ImageIcon
//                 src={textfile}
//                 alt="Card Logo"
//                 className="cursor-pointer"
//               />
//               <ImageIcon
//                 src={fileicon}
//                 alt="Card Logo"
//                 className="cursor-pointer"
//               />
//               <ImageIcon
//                 src={deleteicon}
//                 alt="Card Logo"
//                 className="cursor-pointer"
//                 handleClick={handleClearUserDetails} // Clear all user details
//               />
//             </div>
//           </div>
//         </div>

//         {/* Mobile Number Field */}
//         <div>
//           <label
//             htmlFor="phone"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Mobile No
//           </label>
//           <div className="flex items-center mt-1">
//             <input
//               id="phone"
//               type="text"
//               value={mobile}
//               onChange={(e) => setMobile(e.target.value)}
//               placeholder="Enter your mobile number"
//               className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {/* Address Field with Clear Button */}
//         <div>
//           <label
//             htmlFor="primary_address"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Address
//           </label>
//           <div className="relative mt-1">
//             <input
//               id="primary_address"
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder="Enter your address"
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="button"
//               className="absolute right-2 top-2 text-gray-500"
//               onClick={() => setAddress("")}
//             >
//               <IoMdClose />
//             </button>
//           </div>
//         </div>

//         {/* Locality Field */}
//         <div>
//           <label
//             htmlFor="locality"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Locality
//           </label>
//           <div className="flex items-center mt-1">
//             <input
//               id="locality"
//               type="text"
//               value={locality}
//               onChange={(e) => setLocality(e.target.value)}
//               placeholder="Enter your locality"
//               className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {/* Enter Number of Persons Field */}
//         <div>
//           <label
//             htmlFor="no_of_person"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Number of Persons
//           </label>
//           <div className="relative mt-1">
//             <input
//               id="no_of_person"
//               type="text"
//               value={numOfPersons}
//               onChange={(e) => setNumOfPersons(e.target.value)}
//               placeholder="Enter number of persons"
//               className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="button"
//               className="absolute right-2 top-2 text-gray-500"
//               onClick={() => setNumOfPersons("")}
//             >
//               <IoMdClose />
//             </button>
//           </div>
//         </div>
//       </form>

//       {/* Dialog Box */}
//       <DialogBox
//         isOpen={isTableDialogOpen}
//         onClose={handleCloseTableDialog} // Close dialog
//         title="Customer History"
//       >
//         <CustomerHistoryData customer={customer} orders={orders} />
//       </DialogBox>
//     </div>
//   );
// };

// export default UserDetailsTable;
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import ImageIcon from "../../../../common/ImageIcon";
import timefile from "../../../../../Styles/assets/img/time-table.svg";
import textfile from "../../../../../Styles/assets/img/tax-icon.svg";
import fileicon from "../../../../../Styles/assets/img/file-icon.svg";
import deleteicon from "../../../../../Styles/assets/img/delete-icon.svg";
import CustomerHistoryData from "./CustomerHistoryData";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetailsData } from "../../../../../redux/Features/BillingDataSlice";
import DialogBox from "../../../../common/Dilog-Box";
import { getCustomerDetails } from "../../../../../Api/Api";

interface UserDataProps {
  setUserDetails?: any;
  customerDetails?: any;
  noOfPersons?: any;
  defaultTable: any;
}

interface CustomerFormData {
  customerName: any;
  customerMobile: any;
  customerAddress: any;
  customerLocality: any;
  customerNumOfPersons: any;
}

const UserDetailsTable: React.FC<UserDataProps> = ({
  setUserDetails,
  customerDetails,
  noOfPersons,
  defaultTable,
}) => {
  // State management for each input field
  const dispatch = useDispatch();
  const { userDetailsData, loginUserData } =
    useSelector((state: any) => state.billingData) ?? {};
  const [name, setName] = useState<any>("");
  const [mobile, setMobile] = useState<any>("");
  const [address, setAddress] = useState<any>("");
  const [locality, setLocality] = useState<any>("");
  const [numOfPersons, setNumOfPersons] = useState<any>("");
  const [isTableDialogOpen, setTableDialogOpen] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [showNameList, setShowNameList] = useState(false);
  const [showMobileList, setShowMobileList] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  console.log(userDetailsData, "userDetailsDatauserDetailsData");

  // Sample customer and orders data
  const customer = {
    maxOrdered: "Seafood Noodles",
    averageBill: 300,
    comingSince: "25-02-2024",
    visits: 2,
  };

  const orders = [
    {
      orderNo: "05",
      orderDate: "2024-05-22 15:20:51",
      orderType: "Dine In (Biller)",
      paymentType: "Cash",
      itemsOrdered: "Seafood Noodles",
      restaurantName: "-------",
      amount: "300.00",
    },
    {
      orderNo: "07",
      orderDate: "2024-05-21 15:20:51",
      orderType: "Dine In (Biller)",
      paymentType: "Card",
      itemsOrdered: "Seafood Noodles, Fried Egg Noodles",
      restaurantName: "-------",
      amount: "300.00",
    },
  ];

  // Handlers to open and close the dialog
  const handleOpenTableDialog = () => setTableDialogOpen(true);
  const handleCloseTableDialog = () => setTableDialogOpen(false);

  // Clear field functions
  const handleClearUserDetails = () => {
    setName("");
    setMobile("");
    setAddress("");
    setLocality("");
    setNumOfPersons("");
  };

  // Save user details to Redux when inputs change
  useEffect(() => {
    dispatch(
      setUserDetailsData({
        name: name,
        mobile: mobile,
        address: address,
        locality: locality,
        no_of_person: numOfPersons,
      })
    );
  }, [name, mobile, address, locality, numOfPersons]);

  useEffect(() => {
    if (customerDetails) {
      setName(customerDetails?.fullname || "");
      setMobile(customerDetails?.phone || "");
      setAddress(customerDetails?.primary_address || "");
      setLocality(customerDetails?.primary_locality || "");
      setNumOfPersons(noOfPersons || "");
    }
  }, [customerDetails, noOfPersons]);

  useEffect(() => {
    if (selectedCustomer) getSelectedCustomer();
  }, [selectedCustomer, name, mobile]);

  const fetchCustomerDetails = async (fullName: any, phone: any) => {
    let data = {
      fullname_search: fullName,
      phone_search: phone,
      filters: {
        outlet: loginUserData?.outlet,
      },
    };

    try {
      const res = await getCustomerDetails(data);
      if (res.status === 200) {
        setCustomerData(res.data?.data);
      }
    } catch (error) {}
  };

  const getSelectedCustomer = () => {
    if (name.trim() === "" && mobile.trim() === "") {
      setSelectedCustomer(null);
    }
  };

  console.log("customerData", customerData);
  console.log("selectedCustomer", selectedCustomer);
  console.log("defaultTable", defaultTable);

  return (
    <div className="mt04 rounded-lg">
      {/* Form Container */}
      <form className="space-y-6">
        {/* Name Field with Save and Delete Icons */}
        <div>
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <div className="flex items-center mt-1">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (e.target.value.trim() === "") {
                  setCustomerData([]);
                  setShowNameList(false);
                } else {
                  setShowNameList(true);
                  fetchCustomerDetails(e.target.value, null);
                }
              }}
              placeholder="Enter your name"
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex space-x-2 ml-2">
              {(defaultTable?.length > 0 ||
                Object.keys(defaultTable)?.length > 0 ||
                selectedCustomer) && (
                <ImageIcon
                  src={timefile}
                  className="cursor-pointer"
                  handleClick={handleOpenTableDialog} // Open dialog
                />
              )}
              <ImageIcon
                src={textfile}
                alt="Card Logo"
                className="cursor-pointer"
              />
              <ImageIcon
                src={fileicon}
                alt="Card Logo"
                className="cursor-pointer"
              />
              <ImageIcon
                src={deleteicon}
                alt="Card Logo"
                className="cursor-pointer"
                handleClick={handleClearUserDetails} // Clear all user details
              />
            </div>
          </div>
        </div>

        {showNameList && customerData?.length > 0 && (
          <div className="border border-gray-300 rounded-md mt-1 bg-white shadow-md max-h-40 overflow-y-auto">
            {customerData?.map((customer: any) => (
              <div
                key={customer?.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedCustomer(customer);
                  setName(customer?.fullname);
                  setMobile(customer?.phone);
                  setCustomerData([]);
                }}
              >
                {customer?.fullname} - {customer?.phone}
              </div>
            ))}
          </div>
        )}

        {/* Mobile Number Field */}
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile No
          </label>
          <div className="flex items-center mt-1">
            <input
              id="mobile"
              type="text"
              value={mobile}
              onChange={(e) => {
                setMobile(e.target.value);
                if (e.target.value.trim() === "") {
                  setCustomerData([]);
                  setShowMobileList(false);
                } else {
                  setShowMobileList(true);
                  fetchCustomerDetails(null, e.target.value);
                }
              }}
              placeholder="Enter your mobile number"
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        {showMobileList && customerData?.length > 0 && (
          <div className="border border-gray-300 rounded-md mt-1 bg-white shadow-md max-h-40 overflow-y-auto">
            {customerData?.map((customer: any) => (
              <div
                key={customer?.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedCustomer(customer);
                  setName(customer?.fullname);
                  setMobile(customer?.phone);
                  setCustomerData([]);
                }}
              >
                {customer?.fullname} - {customer?.phone}
              </div>
            ))}
          </div>
        )}

        {/* Address Field with Clear Button */}
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <div className="relative mt-1">
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setAddress("")}
            >
              <IoMdClose />
            </button>
          </div>
        </div>

        {/* Locality Field */}
        <div>
          <label
            htmlFor="locality"
            className="block text-sm font-medium text-gray-700"
          >
            Locality
          </label>
          <div className="flex items-center mt-1">
            <input
              id="locality"
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder="Enter your locality"
              className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Enter Number of Persons Field */}
        <div>
          <label
            htmlFor="no_of_person"
            className="block text-sm font-medium text-gray-700"
          >
            Number of Persons
          </label>
          <div className="relative mt-1">
            <input
              id="no_of_person"
              type="text"
              value={numOfPersons}
              onChange={(e) => setNumOfPersons(e.target.value)}
              placeholder="Enter number of persons"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setNumOfPersons("")}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      </form>
      {/* Dialog Box */}
      {/* <DialogBox
        isOpen={isTableDialogOpen}
        onClose={handleCloseTableDialog} // Close dialog
        title="Customer History"
      >
        <CustomerHistoryData customer={customer} orders={orders} />
      </DialogBox> */}
      <DialogBox
        isOpen={isTableDialogOpen}
        onClose={handleCloseTableDialog}
        title="Customer History"
      >
        <CustomerHistoryData
          customer={customer}
          orders={orders}
          customerData={selectedCustomer}
          defaultTable={defaultTable}
        />
      </DialogBox>{" "}
    </div>
  );
};

export default UserDetailsTable;

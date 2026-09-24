// // import React, { useState } from "react";
// // import { NavLink, useLocation } from "react-router-dom";
// // import { NavItem } from "../../routes/navData";
// // import { FaChevronLeft } from "react-icons/fa";

// // interface SidebarProps {
// //   routes: NavItem[];
// //   isCollapsed: boolean;
// //   setIsCollapsed: (value: boolean) => void;
// //   onItemClick: () => void;
// // }

// // const Sidebar: React.FC<SidebarProps> = ({
// //   routes,
// //   isCollapsed,
// //   setIsCollapsed,
// //   onItemClick,
// // }) => {
// //   const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

// //   const [isHovered, setIsHovered] = useState<boolean>(false);
// //   const location = useLocation();

// //   const handleDropdownToggle = (index: number) => {
// //     setDropdownOpen(dropdownOpen === index ? null : index);
// //   };

// //   const handleNavigationClick = (item: NavItem) => {
// //     if (!item.subNav) {
// //       onItemClick();
// //       setIsCollapsed(true);
// //     }
// //   };

// //   return (
// //     <div
// //       className={`h-screen text-white bg-gray-800 shadow-lg sticky sm:sticky sm-h-screen top-0 overflow-y-scroll transition-width transition-all duration-300 ease-in-out ${
// //         isCollapsed && !isHovered ? "w-0" : " w-64"
// //       }`}
// //       onMouseEnter={() => setIsHovered(true)}
// //       onMouseLeave={() => setIsHovered(false)}
// //     >
// //       <nav>
// //         <ul className=" pt-5">
// //           <div className=" flex justify-between  px-10">
// //             <h1 className="text-2xl font-medium mb-6 text-white">Settings</h1>
// //             <FaChevronLeft />
// //           </div>
// //           {routes
// //             .filter((route) => route.isVisible !== false)
// //             .map((item, index) => {
// //               const isParentActive = item.subNav
// //                 ? item.subNav.some(
// //                     (subItem) => location.pathname === subItem.path
// //                   )
// //                 : false;

// //               return (
// //                 <div key={index}>
// //                   <NavLink
// //                     to={item.path || "#"}
// //                     className={`block ${
// //                       location.pathname === item.path || isParentActive
// //                         ? "bg-gray-500"
// //                         : ""
// //                     }`}
// //                     onClick={() => handleNavigationClick(item)}
// //                   >
// //                     <li
// //                       className={`p-4 text-base cursor-pointer flex items-center ${
// //                         isCollapsed && !isHovered ? "justify-center" : ""
// //                       }`}
// //                       onClick={() => handleDropdownToggle(index)}
// //                     >
// //                       <item.icon className="mr-2" />
// //                       {(!isCollapsed || isHovered) && (
// //                         <span className="ml-2">{item.title}</span>
// //                       )}
// //                     </li>
// //                   </NavLink>
// //                   {item.subNav &&
// //                     dropdownOpen === index &&
// //                     (!isCollapsed || isHovered) && (
// //                       <ul className="">
// //                         {item.subNav
// //                           .filter((subItem) => subItem.isVisible !== false)
// //                           .map((subItem, subIndex) => (
// //                             <NavLink
// //                               to={subItem.path || "#"}
// //                               key={`${index}-${subIndex}`}
// //                               className={`block ${
// //                                 location.pathname === subItem.path
// //                                   ? "bg-gray-500"
// //                                   : ""
// //                               }`}
// //                               onClick={() => handleNavigationClick(subItem)}
// //                             >
// //                               <li className="p-2 text-sm hover:bg-gray-500 cursor-pointer flex items-center transition-all duration-300 ease-in-out">
// //                                 <subItem.icon className="mr-2" />
// //                                 <span className="ml-2">{subItem.title}</span>
// //                               </li>
// //                             </NavLink>
// //                           ))}
// //                       </ul>
// //                     )}
// //                 </div>
// //               );
// //             })}
// //         </ul>
// //         <div className="flex justify-between border border-t border-b border-white px-4 text-xs">
// //           <p>Ref ID : A333014R</p>
// //           <p>Version : 109.0.3</p>
// //         </div>
// //         <div className="border-b border-white text-center text-xs">
// //           <p>Biller name : Biller</p>
// //         </div>
// //       </nav>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// import React, { useState } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { NavItem } from "../../routes/navData";
// import { FaChevronLeft } from "react-icons/fa";

// interface SidebarProps {
//   routes: NavItem[];
//   isCollapsed: boolean;
//   setIsCollapsed: (value: boolean) => void;
//   onItemClick: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({
//   routes,
//   isCollapsed,
//   setIsCollapsed,
//   onItemClick,
// }) => {
//   const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
//   const location = useLocation();

//   const handleDropdownToggle = (index: number) => {
//     setDropdownOpen(dropdownOpen === index ? null : index);
//   };

//   const handleNavigationClick = (item: NavItem) => {
//     if (!item.subNav) {
//       onItemClick();
//       setIsCollapsed(true);
//     }
//   };

//   const handleSidebarClose = () => {
//     setIsCollapsed(true);
//   };

//   return (
//     <div
//       className={`h-screen text-white bg-gray-800 shadow-lg sticky top-0 overflow-y-scroll transition-width transition-all duration-300 ease-in-out ${
//         isCollapsed ? "w-0" : " w-64"
//       }`}
//     >
//       <nav>
//         <ul className="pt-5">
//           <div className="flex items-center justify-between px-4 mb-5">
//             <h1 className="text-2xl font-medium  text-white">Settings</h1>
//             <FaChevronLeft
//               onClick={handleSidebarClose}
//               className="cursor-pointer"
//             />
//           </div>
//           {routes
//             .filter((route) => route.isVisible !== false)
//             .map((item, index) => {
//               const isParentActive = item.subNav
//                 ? item.subNav.some(
//                     (subItem) => location.pathname === subItem.path
//                   )
//                 : false;

//               return (
//                 <div key={index}>
//                   <NavLink
//                     to={item.path || "#"}
//                     className={`block  ${
//                       location.pathname === item.path || isParentActive
//                         ? "bg-gray-500"
//                         : ""
//                     }`}
//                     onClick={() => handleNavigationClick(item)}
//                   >
//                     <li
//                       className="p-4 text-base cursor-pointer flex items-center"
//                       onClick={() => handleDropdownToggle(index)}
//                     >
//                       <item.icon className="mr-2" />
//                       <span className="ml-2">{item.title}</span>
//                     </li>
//                   </NavLink>
//                   {item.subNav && dropdownOpen === index && (
//                     <ul className="">
//                       {item.subNav
//                         .filter((subItem) => subItem.isVisible !== false)
//                         .map((subItem, subIndex) => (
//                           <NavLink
//                             to={subItem.path || "#"}
//                             key={`${index}-${subIndex}`}
//                             className={`block ${
//                               location.pathname === subItem.path
//                                 ? "bg-gray-500"
//                                 : ""
//                             }`}
//                             onClick={() => handleNavigationClick(subItem)}
//                           >
//                             <li className="p-2 text-sm hover:bg-gray-500 cursor-pointer flex items-center transition-all duration-300 ease-in-out">
//                               <subItem.icon className="mr-2" />
//                               <span className="ml-2">{subItem.title}</span>
//                             </li>
//                           </NavLink>
//                         ))}
//                     </ul>
//                   )}
//                 </div>
//               );
//             })}
//         </ul>
//         {/* footer selection */}
//         <div>
//         <div className="flex justify-between items-end  border-t border-b border-white px-4 text-xs ">
//           <p>Ref ID : A333014R</p>
//           <p>Version : 109.0.3</p>
//         </div>
//         <div className="border-b border-white text-center text-xs">
//           <p>Biller name : Biller</p>
//         </div>
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NavItem } from "../../routes/navData";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

interface SidebarProps {
  routes: NavItem[];
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  onItemClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  routes,
  isCollapsed,
  setIsCollapsed,
  onItemClick,
}) => {

  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const handleDropdownToggle = (index: number) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleNavigationClick = (item: NavItem) => {
    if (!item.subNav) {
      onItemClick();
      setIsCollapsed(true);
    }
  };

  const handleSidebarClose = () => {
    setIsCollapsed(true);
  };

  return (
    <div
      className={`h-screen text-white bg-gray-800 shadow-lg sticky top-0 transition-width transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-0" : " w-64"
      }`}
    >
      <nav className="flex flex-col h-full">
        <div className="flex-grow overflow-y-auto">
          <ul className="pt-5">
            <div className="flex items-center justify-between px-4 mb-5">
              <h1 className="text-2xl font-medium text-white">Settings</h1>
              <FaChevronLeft
                onClick={handleSidebarClose}
                className="cursor-pointer"
              />
            </div>
            {routes
              .filter((route) => route.isVisible !== false)
              .map((item, index) => {
                const isParentActive = item.subNav
                  ? item.subNav.some(
                      (subItem) => location.pathname === subItem.path
                    )
                  : false;

                return (
                  <div key={index}>
                    <NavLink
                      to={item.path || "#"}
                      className={`block ${
                        location.pathname === item.path || isParentActive
                          ? "bg-gray-500"
                          : ""
                      }`}
                      onClick={() => handleNavigationClick(item)}
                    >
                      <li
                        className="p-4 text-base cursor-pointer flex items-center"
                        onClick={() => handleDropdownToggle(index)}
                      >
                        <item.icon className="mr-2" />
                        <span className="ml-2">{item.title}</span>
                      </li>
                    </NavLink>
                    {item.subNav && dropdownOpen === index && (
                      <ul className="">
                        {item.subNav
                          .filter((subItem) => subItem.isVisible !== false)
                          .map((subItem, subIndex) => (
                            <NavLink
                              to={subItem.path || "#"}
                              key={`${index}-${subIndex}`}
                              className={`block ${
                                location.pathname === subItem.path
                                  ? "bg-gray-500"
                                  : ""
                              }`}
                              onClick={() => handleNavigationClick(subItem)}
                            >
                              <li className="p-2 text-sm hover:bg-gray-500 cursor-pointer flex items-center transition-all duration-300 ease-in-out">
                                <subItem.icon className="mr-2"      size={20} />
                                <span className="ml-2">{subItem.title}</span>
                              </li>
                            </NavLink>
                          ))}
                      </ul>
                    )}
                  </div>
                );
              })}
          </ul>
        </div>
        {/* footer section */}
        <div className=" py-2 overflow-hidden">
          <div className="flex justify-between items-end border-t border-b border-white px-4 text-xs">
            {/* <p>Ref ID : A333014R</p>
            <p>Version : 109.0.3</p> */}
          </div>
          <div className="border-b border-white text-center text-xs">
            <p>Biller name : {loginUserData?.fullname}</p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

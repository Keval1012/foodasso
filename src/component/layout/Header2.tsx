//please keeep above code until the breadcrumbs code is finalize

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { IoHomeSharp, IoChevronForward } from "react-icons/io5";
// import { TiExportOutline } from "react-icons/ti";
// import { MdOutlineCreateNewFolder } from "react-icons/md";
import {
  // allOutletRoute,
  NavItem,
} from "../../routes/navData";
// import { useTabContext } from "../../contexts/TabContext";
import { FiRefreshCw } from "react-icons/fi";
import { HiPlus } from "react-icons/hi2";

interface BreadcrumbItem extends NavItem {
  path?: string;
}

const findBreadcrmbs = (path: string, routes: NavItem[]): BreadcrumbItem[] => {
  let breadcrumbs: BreadcrumbItem[] = [];

  const findRoute = (routePath: string, routeList: NavItem[]): boolean => {
    for (let route of routeList) {
      if (route.path === routePath) {
        breadcrumbs.push(route);
        return true;
      }
      if (route.subNav) {
        if (findRoute(routePath, route.subNav)) {
          breadcrumbs.push(route);
          return true;
        }
      }
    }
    return false;
  };

  findRoute(path, routes);
  return breadcrumbs.reverse();
};

const Header2: React.FC = () => {
  // const location = useLocation();
  // const { activeTab } = useTabContext();
  // const breadcrumbs = findBreadcrumbs(location.pathname, sevenFoodiesRoutes);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/selectTable", {
      state: {
        areaType: null,
        tableId: null,
        tableOrderId: null,
        tableDetails: null,
        areaTypeId: null,
      }
    });
  };

  const handleRefresh = () => {
    navigate("/refresh");
  };

  return (
    <div className=" grid grid-cols-2  gap-4 bg-white   p-3 border-b border-[#0000001C]  ">
      <div className="flex items-center flex-wrap">
        {/* <p className="text-2xl text-[#3D3D3D] ">View Tables</p> */}
      </div>
      <div className="flex gap-4 justify-end items-center">
        <button className=" p-2 rounded-md" onClick={handleRefresh}>
          <FiRefreshCw />
        </button>
        <div className="flex gap-4 items-center">
          {/* <div className="bg-orange-400 text-white hover:bg-orange-500 rounded py-2 px-4">
            <button className="flex items-center gap-2 text-base whitespace-nowrap">
              Delivery
            </button>
          </div> */}
          {/* <div className="bg-orange-400 text-white hover:bg-orange-500 rounded py-2 px-4">
            <button className="flex items-center gap-2 text-base whitespace-nowrap">
              Pick up
            </button>
          </div> */}
          <div
            className="bg-orange-400 text-white hover:bg-orange-500 rounded py-2 px-4"
            onClick={handleClick}
          >
            <button className="flex items-center gap-2 text-base whitespace-nowrap">
              <HiPlus className=" h-5 w-5" />
              Add table
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header2;

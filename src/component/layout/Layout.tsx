import { ReactNode, useState, FC } from "react";
import Header from "./Header";
import Header2 from "./Header2";
import Sidebar from "../common/Sidebar";
import Footer from "./Footer";
import { navConfig } from "../../routes/navData";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="h-screen flex flex-col overflow-x-auto">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex flex-1 pt-16">
        <div
          className={`fixed inset-y-0 left-0 transform transition-transform duration-200 ease-in-out z-50 bottom-11 ${
            isSidebarCollapsed ? "w-0" : " w-64"
          }`}
        >
          <Sidebar
            routes={navConfig["seven_foodies"]}
            isCollapsed={isSidebarCollapsed}
            onItemClick={toggleSidebar}
            setIsCollapsed={setIsSidebarCollapsed}
          />
        </div>
        <div
          className={`flex-1 flex flex-col transition-all duration-200 ease-in-out ${
            isSidebarCollapsed ? "ml-0" : "ml-0"
          } overflow-x-auto`}
        >
          <div className="sticky top-0  bg-white w-full mt-5">
            {/* <Header2 /> */}
          </div>
          <div className="flex-1 ">{children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

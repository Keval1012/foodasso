// import React, { createContext, useContext, useState, ReactNode } from "react";

// interface UserData {
//   access_token: string;
//   create_time: string;
//   discount_value: number;
//   discounting_capping: string;
//   fullname: string;
//   id: number;
//   is_active: boolean;
//   kitchen: number;
//   outlet: number;
//   phone: string;
//   refresh_token: string;
//   swipe_code: string;
//   user: number;
//   user_code: string;
//   user_passcode: string;
//   user_permission: string[];
//   user_type: string;
//   username: string;
// }

// interface TabContextProps {
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
//   userData: []
//   setUserData: (user: object) => void;
// }

// const TabContext = createContext<TabContextProps | undefined>(undefined);

// export const TabProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [activeTab, setActiveTab] = useState<string>("");
//   const [userData, setUserData] = useState<object>({
    
//   });

//   return (
//     <TabContext.Provider
//       value={{ activeTab, setActiveTab, userData, setUserData }}
//     >
//       {children}
//     </TabContext.Provider>
//   );
// };

// export const useTabContext = (): TabContextProps => {
//   const context = useContext(TabContext);
//   if (!context) {
//     throw new Error("useTabContext must be used within a TabProvider");
//   }
//   return context;
// };

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserData {
  access_token: string;
  create_time: string;
  discount_value: number;
  discounting_capping: string;
  fullname: string;
  id: number;
  is_active: boolean;
  kitchen: number;
  outlet: number;
  phone: string;
  refresh_token: string;
  swipe_code: string;
  user: number;
  user_code: string;
  user_passcode: string;
  user_permission: string[];
  user_type: string;
  username: string;
}

interface TabContextProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userData: any
  setUserData: (user: UserData) => void;
}

const TabContext = createContext<TabContextProps | undefined>(undefined);

export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [userData, setUserData] = useState<UserData>();

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, userData, setUserData }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabContext = (): TabContextProps => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within a TabProvider");
  }
  return context;
};
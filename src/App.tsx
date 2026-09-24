import React from "react";
import "./index.css";
import "./Styles/index.scss";
import CustomRoutes from "./routes";
import { TabProvider } from "./contexts/TabContext";
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <>
   <Toaster position="top-center" reverseOrder={false} />
      <TabProvider>
        <CustomRoutes />
      </TabProvider>
    </>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import MainTable from "./MainTable";
import BottomTable from "./BottomTable";
import { useNavigate } from "react-router-dom";
import { getHelpTips } from "../../../Api/Operation/Api";

const HelpTips: React.FC = () => {
  
  const navigate = useNavigate();
  const [helpTipsList, setHelpTipsList] = useState([]);

  useEffect(() => {
    fetchHelpTips();
  }, []);

  const fetchHelpTips = async () => {
    try {
      let res = await getHelpTips();
      if (res.status === 200) {
        setHelpTipsList(res.data?.data);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="">
        <div className="px-16 py-5 flex items-center justify-between">
          <h1 className="font-medium text-xl">Help Tips</h1>
          <button className="px-3 py-2 rounded-sm flex justify-center items-center gap-3 border border-x-gray-300" onClick={() => navigate(-1)}>
            <MdOutlineArrowBackIosNew />
            Back
          </button>
        </div>
        <hr />
        <MainTable helpTipsList={helpTipsList} />
        {/* <BottomTable/> */}
      </div>
    </>
  );
};

export default HelpTips;

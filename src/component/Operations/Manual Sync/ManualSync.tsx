import React, { useEffect } from "react";
import { getTables } from "../../../Api/Api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ManualSync = () => {

  const navigate = useNavigate();
  const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};

  useEffect(() => {
    fetchTableData();
  }, []);

  const fetchTableData = async () => {
    let data = {
      outlet: loginUserData?.outlet,
      kitchen: loginUserData?.kitchen,
    };

    const res = await getTables(data);
    if (res?.status === 201) {
      window.location.reload();
      navigate(-1);
    }
  };

  return <div></div>;
};

export default ManualSync;

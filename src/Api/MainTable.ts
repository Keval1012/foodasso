import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getTables } from "./Api";

const { loginUserData } = useSelector((state: any) => state.billingData) ?? {};

export const fetchMainTable = async () => {
  let data = {
    outlet: loginUserData?.outlet,
    kitchen: loginUserData?.kitchen,
  };

  const res = await getTables(data);
  if (res?.status === 201) {}
};
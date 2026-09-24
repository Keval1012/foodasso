import React from "react";
import { useNavigate } from "react-router-dom";

function SubNav2() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/login");
  };

  return <div onClick={handleLogout}></div>;
}

export default SubNav2;

import React, { useContext } from "react";
import { GlobalContext } from "../App";
import { ActionTypes } from "../Types";

function Logout() {
  const { dispatch } = useContext(GlobalContext);
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: ActionTypes.Logout,
    });
  };

  return (
    <span onClick={handleLogout} className="spec">
      Logout
    </span>
  );
}

export default Logout;

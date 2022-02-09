import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../App";

interface IQueryString {
  id: string;
}

function Chat() {
  const { id } = useParams<IQueryString>();
  const { email } = useContext<any>(GlobalContext);

  useEffect(() => {
    console.log(id);
    console.log(email);
  }, []);
  return <div>Chat</div>;
}

export default Chat;

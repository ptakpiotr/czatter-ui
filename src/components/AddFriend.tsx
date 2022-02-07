import { HubConnectionState } from "@microsoft/signalr";
import React from "react";
import { Col } from "react-bootstrap";
import { BiUserPlus } from "react-icons/bi";

interface Props {
  email: string;
  conn: any;
}

function AddFriend({ email, conn }: Props) {
  const handleClick = () => {
    if (conn.state === HubConnectionState.Connected) {
      conn.invoke("AddToFriends", email);
    }
  };

  return (
    <div className="friend-box row">
      <Col>{email}</Col>
      <Col>
        <div className="float-end">
          <span
            onClick={handleClick}
            style={{
              cursor: "pointer",
            }}
          >
            <BiUserPlus />
          </span>
        </div>
      </Col>
    </div>
  );
}

export default AddFriend;

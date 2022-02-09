import React from "react";
import { Col } from "react-bootstrap";
import { BiUserMinus, BiMessageAdd } from "react-icons/bi";

interface Props {
  email: string;
  conn: any;
}

function ManageFriend({ email, conn }: Props) {
  const handleRemove = () => {
    conn.invoke("RemoveFromFriends", JSON.stringify({ email }));
  };
  return (
    <div className="row friend-box">
      <Col>{email}</Col>
      <Col>
        <div className="float-end">
          <a href={encodeURI(`/chat/${email}`)} title="ok">
            <BiMessageAdd
              style={{
                cursor: "pointer",
              }}
            />
          </a>
          <BiUserMinus
            style={{
              cursor: "pointer",
            }}
            onClick={handleRemove}
          />
        </div>
      </Col>
    </div>
  );
}

export default ManageFriend;

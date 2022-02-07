import React from "react";
import { Col } from "react-bootstrap";
import { BiUserMinus, BiMessageAdd } from "react-icons/bi";

interface Props {
  email: string;
  conn: any;
}

function ManageFriend({ email, conn }: Props) {
  return (
    <div className="row friend-box">
      <Col>{email}</Col>
      <Col>
        <div className="float-end">
          <BiMessageAdd
            style={{
              cursor: "pointer",
            }}
          />{" "}
          <BiUserMinus
            style={{
              cursor: "pointer",
            }}
          />
        </div>
      </Col>
    </div>
  );
}

export default ManageFriend;

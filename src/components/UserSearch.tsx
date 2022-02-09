import React, { useContext, useEffect, useState } from "react";
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import Friend from "./AddFriend";
import { Col, Row } from "react-bootstrap";
import ManageFriend from "./ManageFriend";
import { GlobalContext } from "../App";

function UserSearch() {
  const [name, setName] = useState<string>("");
  const [allUsers, setAllUsers] = useState<string[]>([]);
  const [myFriend, setMyFriends] = useState<string[]>([]);
  const [conn, setConn] = useState<any>(null);
  const {
    state: { email },
  } = useContext(GlobalContext);

  useEffect(() => {
    let connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7222/hub", {
        accessTokenFactory: () => localStorage.getItem("token") as string,
      })
      .build();
    connection
      .start()
      .then(() => {
        connection.on("ActiveUsers", (dt) => {
          console.log(dt);
          setAllUsers(JSON.parse(dt).active);
        });

        connection.on("FriendAdded", () => {
          alert("Succesfully added friend");
        });

        connection.on("FriendDeleted", () => {
          alert("User succesfully deleted");
        });

        if (connection.state === HubConnectionState.Connected) {
          connection.invoke("GetMyFriends");
        }

        connection.on("MyFriends", (dt) => {
          setMyFriends(JSON.parse(dt));
        });
      })
      .catch((err) => {
        console.error(err);
      });

    setConn(connection);

    return () => {
      connection.stop();
    };
  }, []);

  useEffect(() => {
    setAllUsers((prev: string[]) => {
      let newUsers: string[] = [];
      for (let x of prev) {
        if (!myFriend.includes(x)) {
          newUsers.push(x);
        }
      }
      return newUsers;
    });
  }, [myFriend]);

  return (
    <Row>
      <Col>
        {myFriend
          .filter((f) => f !== "" && f !== email)
          .map((u) => {
            return (
              <div key={`usr__${u}`}>
                <ManageFriend email={u} conn={conn} />
              </div>
            );
          })}
      </Col>
      <Col>
        <div>
          <input
            type="text"
            value={name}
            placeholder="User email"
            onChange={(e) => {
              setName(e.target.value);
              if (
                conn !== null &&
                conn.state === HubConnectionState.Connected
              ) {
                conn.invoke("GetActiveUsers", e.target.value);
              }
            }}
          />
          {allUsers.map((u) => {
            return (
              <div key={`usr__${u}`}>
                <Friend email={u} conn={conn} />
              </div>
            );
          })}
        </div>
      </Col>
    </Row>
  );
}

export default UserSearch;

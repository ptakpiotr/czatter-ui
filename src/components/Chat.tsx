import { HubConnectionBuilder } from "@microsoft/signalr";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useParams } from "react-router-dom";
import Message from "./Message";
import MessageInput from "./MessageInput";
import Push from "push.js";

interface IQueryString {
  id: string;
}

interface IMessage {
  From: string;
  to: string;
  content: string;
}

function Chat() {
  const { id } = useParams<IQueryString>();
  const [email] = useState<string | null>(localStorage.getItem("email"));
  const [conn, setConn] = useState<any>(null);
  const [rcvdMessages, setRcvdMessages] = useState<IMessage[]>([]);
  const [sndMessages, setSndMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    var connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7222/hub", {
        accessTokenFactory: () => localStorage.getItem("token") as string,
      })
      .withAutomaticReconnect()
      .build();
    connection
      .start()
      .then(() => {
        connection.on("ReceiveMessage", (msg) => {
          var parsed = JSON.parse(msg);
          setRcvdMessages((prev) => [...prev, parsed]);
          Push.create("New message", {
            body: `From: ${parsed.From}`,
            timeout: 2000,
          });
        });
      })
      .catch((err) => {
        console.error(err);
        localStorage.clear();
      });

    setConn(connection);

    //fetching old, saved messages
    axios
      .post(
        "https://localhost:7222/message",
        {
          from: id,
          to: localStorage.getItem("email"),
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((dt) => {
        setRcvdMessages((prev) => [...prev, ...dt.data]);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .post(
        "https://localhost:7222/message",
        {
          from: localStorage.getItem("email"),
          to: id,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((dt) => {
        setSndMessages((prev) => [...prev, ...dt.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleClick = () => {
    const newMsg = {
      from: email,
      to: id,
      content: message,
    };
    conn.invoke("SendMessage", JSON.stringify(newMsg));
    setSndMessages((prev) => [
      ...prev,
      {
        From: email,
        to: id,
        content: message,
      } as IMessage,
    ]);
  };
  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <Row>
          <Col>
            {rcvdMessages.map((msg) => {
              return (
                <Message
                  key={`rcvmsgIdOf${rcvdMessages.indexOf(msg)}`}
                  color="red"
                  {...msg}
                />
              );
            })}
          </Col>
          <Col>
            <Col>
              <MessageInput setMessage={setMessage} message={message} />
            </Col>
            <Col>
              <button className="btn btn-success" onClick={handleClick}>
                Send
              </button>
            </Col>
            {sndMessages.map((msg) => {
              return (
                <Message
                  key={`rcvmsgIdOf${rcvdMessages.indexOf(msg)}`}
                  color="blue"
                  {...msg}
                />
              );
            })}
          </Col>
        </Row>
      </DndProvider>
    </main>
  );
}

export default Chat;

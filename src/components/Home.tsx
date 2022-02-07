import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { GlobalContext } from "../App";
import { ActionTypes } from "../Types";
import Login from "./Login";
import Register from "./Register";
import UserSearch from "./UserSearch";

function Home() {
  const {
    state: { isAuth },
    dispatch,
  } = useContext(GlobalContext);
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setWindowSize(window.innerWidth);
    });
    return () => {
      dispatch({ type: ActionTypes.Logout });
    };
  }, []);

  if (!isAuth) {
    return (
      <main>
        <Row>
          <Col>
            <Register />
          </Col>
          {windowSize > 1000 && (
            <Col>
              <span className="text-info">Welcome to Czatter!</span>
              <img
                src="http://localhost:3000/chat.jpg"
                alt="Chatting robot"
                style={{
                  maxWidth: "400px",
                }}
              />
            </Col>
          )}
          <Col>
            <div className="float-end">
              <Login />
            </div>
          </Col>
        </Row>
      </main>
    );
  } else {
    return (
      <main>
        Check your latest conversations and pick the proper one <UserSearch />
      </main>
    );
  }
}

export default Home;

import React, { useContext, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../App";
import { ActionTypes } from "../Types";
import { Col, Row } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { dispatch } = useContext(GlobalContext);
  const [redirectTo, setRedirectTo] = useState(false);

  const handleLoginAsync = (url: string) => {
    axios
      .post(
        url,
        {
          email,
          password,
          rememberMe: true,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((dt) => {
        if (dt.status === 200) {
          dispatch({
            type: ActionTypes.Login,
            newEmail: email,
          });
          localStorage.setItem("token", dt.data.token);
          setMessage("Succesfully logged in");
          setRedirectTo(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("An error has occured");
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLoginAsync("https://localhost:7222/account/login");
    setEmail("");
    setPassword("");
  };

  const handleClick = () => {
    window.location.href = "http://localhost:3000";
  };

  return (
    <>
      Login:
      <form onSubmit={handleSubmit}>
        <Row
          style={{
            maxWidth: "250px",
            marginRight: "15px",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Row>
        <Row
          style={{
            maxWidth: "100px",
            marginLeft: "30px",
          }}
        >
          <button type="submit" className="btn btn-danger">
            Login
          </button>
        </Row>
      </form>
      <p>{message}</p>
      <p>
        {redirectTo && (
          <button className="btn btn-primary" onClick={handleClick}>
            Go!
          </button>
        )}
      </p>
    </>
  );
}

export default Login;

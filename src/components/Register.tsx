import axios from "axios";
import React, { useState } from "react";
import { Row } from "react-bootstrap";

function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleLoginAsync = (url: string) => {
    axios
      .post(
        url,
        {
          email,
          password,
          confirmPassword,
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((dt) => {
        if (dt.status === 200) {
          console.log(dt);

          setMessage(
            "Succesfully registered, visit your email to accept account"
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage("An error has occured");
      });
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLoginAsync("https://localhost:7222/account/register");
  };

  return (
    <>
      Register:
      <form onSubmit={handleSubmit}>
        <Row
          style={{
            maxWidth: "250px",
            marginLeft: "10px",
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Row>
        <Row
          style={{
            maxWidth: "100px",
            marginLeft: "30px",
          }}
        >
          <button type="submit" className="btn btn-warning">
            Register
          </button>
        </Row>
      </form>
      <p>{message}</p>
    </>
  );
}

export default Register;

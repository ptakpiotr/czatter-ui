import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { BiMessageDots } from "react-icons/bi";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import Logout from "../Logout";
import { StyledLi, StyledUl } from "./Styled";

function Navbar() {
  const {
    state: { isAuth },
  } = useContext(GlobalContext);
  return (
    <header>
      <Row>
        <Col>
          <BiMessageDots />
        </Col>
        <Col>
          <div className="float-end">
            <StyledUl>
              <StyledLi>
                <Link to="/">Home</Link>
              </StyledLi>
              <StyledLi>
                <Link to="/about">About</Link>
              </StyledLi>
              {localStorage.getItem("token") != null && (
                <StyledLi>
                  <Logout />
                </StyledLi>
              )}
            </StyledUl>
          </div>
        </Col>
      </Row>
    </header>
  );
}

export default Navbar;

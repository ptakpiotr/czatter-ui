import styled from "styled-components";

export const StyledUl = styled.ul``;

export const StyledLi = styled.li`
  display: inline-block;
  margin: 5px;
  padding: 10px;
  list-style-type: none;
  border-right: 1px solid yellowgreen;
  margin-right: 15px;
  &:last-of-type {
    border-right: none;
  }
`;

import React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";

interface Props {
  From: string;
  content: string;
  color: string;
}

const StyledDiv = styled.div`
  margin: 5px;
  padding: 10px;
  color: whitesmoke;
  max-width: 300px;
  border-radius: 10px;
  border: 1px whitesmoke dashed;
  p {
    font-size: 20px;
  }
  h4 {
    font-size: 75%;
  }
`;

function Message({ From, content, color }: Props) {
  const [_, dragRef] = useDrag({
    type: "message",
    item: {
      content: content,
    },
  });
  return (
    <StyledDiv
      style={{
        backgroundColor: color,
      }}
      ref={dragRef}
    >
      <p>{content}</p>
      <h4>
        {">>"} {From}
      </h4>
    </StyledDiv>
  );
}

export default Message;

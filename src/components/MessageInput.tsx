import React from "react";
import { useDrop } from "react-dnd";

interface Props {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

interface Item {
  content: string;
}

function MessageInput({ setMessage, message }: Props) {
  const [_, dropRef] = useDrop({
    accept: "message",
    drop: (item: Item) => {
      setMessage(item.content);
    },
  });
  const handleChange = (e: React.ChangeEvent) => {
    setMessage((e.target as HTMLInputElement).value);
  };
  const handleDblClick = () => {
    setMessage("");
  };
  return (
    <div ref={dropRef}>
      <input
        type="text"
        placeholder="Type your message here"
        onChange={handleChange}
        onDoubleClick={handleDblClick}
        style={{
          width: "250px",
        }}
        value={message}
      />
    </div>
  );
}

export default MessageInput;

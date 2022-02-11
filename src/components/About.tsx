import React from "react";

function About() {
  return (
    <main>
      Simple chatting app created with React and TypeScript. <br /> More details
      about this project:
      <ul>
        <li>Frontend in React {"&"} Typescript</li>
        <li>Backend in .NET 6 WebApi</li>
        <li>Layout created with the help of bootstrap</li>
        <li>Messaging done with the usage of SignalR</li>
        <li>Icons from react-icons package, images from unsplash.com</li>
      </ul>
      More projects on my{" "}
      <a href="https://github.com/ptakpiotr" target="_blank" rel="noreferrer">
        github
      </a>
    </main>
  );
}

export default About;

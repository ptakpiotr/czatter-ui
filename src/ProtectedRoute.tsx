import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({
  children,
  path,
  ...rest
}: {
  children: any;
  path: string;
}) {
  return (
    <Route
      path={path}
      {...rest}
      render={() => {
        let token: string | null = localStorage.getItem("token");
        if (token === null) {
          return <Redirect to="/" />;
        } else {
          return children;
        }
      }}
    ></Route>
  );
}

export default ProtectedRoute;

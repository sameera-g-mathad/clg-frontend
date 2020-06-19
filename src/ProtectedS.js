import React from "react";
import { Redirect, Route } from "react-router-dom";
import auths from "./Components/Students/auths";
export const ProtectedS = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auths.isAuthenticatedS()) return <Component {...props} />;
        else {
          return <Redirect to="/student-login" />;
        }
      }}
    />
  );
};

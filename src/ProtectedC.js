import React from "react";
import { Route, Redirect } from "react-router-dom";
import authc from "./Components/Cordinator/authc";
export const ProtectedC = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (authc.isAuthenticatedC()) return <Component {...props} />;
        else {
          return <Redirect to="/cordinator-login" />;
        }
      }}
    />
  );
};

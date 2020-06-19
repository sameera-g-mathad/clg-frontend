import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Components/Teacher/auth";
export const Protected = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isAuthenticated()) return <Component {...props} />;
        else {
          return <Redirect to="/staff-login" />;
        }
      }}
    />
  );
};

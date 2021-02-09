import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../context/globalContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(AppContext);
  const isLogin = state.isLogin;
  const { loading } = state;

  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <h1>Loading</h1>
        ) : isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;

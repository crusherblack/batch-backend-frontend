import React, { useContext, useEffect } from "react";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import Post from "./pages/Post";
import PostReactQuery from "./pages/Post2";
import PostMulter from "./pages/Post3";

import { QueryClientProvider, QueryClient } from "react-query";

import { API, setAuthToken } from "./config/api";

import { AppContext } from "./context/globalContext";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const queryClient = new QueryClient();

const App = () => {
  const [state, dispatch] = useContext(AppContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      dispatch({
        type: "USER_LOADED",
        payload: response.data.data.user,
      });
    } catch (error) {
      return dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          {state.isLogin && <Navbar />}
          <Switch>
            <Route path="/" exact>
              <Login />
            </Route>
            <PrivateRoute path="/product/:id" exact component={Detail} />
            <PrivateRoute path="/home" exact component={Home} />
            <PrivateRoute path="/cart" exact component={Cart} />
            <PrivateRoute path="/post" exact component={Post} />
            <PrivateRoute
              path="/post-react-query"
              exact
              component={PostReactQuery}
            />
            <PrivateRoute path="/post-multer" exact component={PostMulter} />
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

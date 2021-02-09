import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/globalContext";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../config/api";

const Login = () => {
  const history = useHistory();
  const [state, dispatch] = useContext(AppContext);

  useEffect(() => {
    if (!state.loading && state.isLogin) history.push("/home");
  }, [state]);

  const [loginFormData, setLoginFormData] = useState({
    email: "fadhil12@gmail.com",
    password: "12345678",
  });

  const { email, password } = loginFormData;

  const onChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = JSON.stringify({
        email,
        password,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const user = await API.post("/login", body, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user.data.data.user,
      });

      setAuthToken(user.data.data.user.token);

      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="card">
        <div className="card-header bg-white">
          <h2 className="text-center">
            Login To Start {state.isLogin ? "Sudah Login" : "Belum Login"}
          </h2>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    type="email"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    name="password"
                    value={password}
                    onChange={(e) => onChange(e)}
                    type="password"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Login</button>
                </div>
              </form>
            </div>
            <div className="col-md-3"></div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <pre>{JSON.stringify(loginFormData, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

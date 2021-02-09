import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  isLogin: false,
  title: "ubah",
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        isLogin: true,
        user: {
          email: action.payload.email,
          fullName: action.payload.fullName,
        },
        loading: false,
      };
    case "USER_LOADED":
      return {
        ...state,
        isLogin: true,
        user: {
          email: action.payload.email,
          fullName: action.payload.fullName,
        },
        loading: false,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");

      return {
        ...state,
        isLogin: false,
      };
    default:
      throw new Error();
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

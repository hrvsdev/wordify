import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export default function ContextProvider(props) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const [forgotEmail, setForgotEmail] = useState("");

  const getUser = async () => {
    const url = "http://localhost:5000/user";
    try {
      const response = await fetch(url, { credentials: "include" });
      const data = await response.json();
      data.success ? setUser(data.user) : navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Context.Provider
      value={{ user, getUser, setUser, forgotEmail, setForgotEmail }}
    >
      {props.children}
    </Context.Provider>
  );
}

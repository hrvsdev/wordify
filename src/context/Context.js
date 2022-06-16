import { createContext, useState } from "react";
export const Context = createContext();

export default function ContextProvider(props) {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const url = "http://localhost:5000/user";
      const response = await fetch(url, { credentials: "include" });
      const data = await response.json();
      setUser(data._json);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Context.Provider value={{ user, getUser }}>
      {props.children}
    </Context.Provider>
  );
}

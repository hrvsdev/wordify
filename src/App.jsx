import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/home/Home";
import Forgot from "./components/auth/Forgot";
import NotesArea from "./components/home/NotesArea";
import SingleNote from "./components/home/SingleNote";
import "./components/auth/auth.scss";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path=":folder" element={<NotesArea />}>
          <Route path=":note" element={<SingleNote />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<Forgot />} />
    </Routes>
  );
}

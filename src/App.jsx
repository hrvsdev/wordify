import { Route, Routes} from "react-router-dom";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Forgot from "./components/auth/Forgot";

import Home from "./components/home/main/Home"
import NotesArea from "./components/home/main/NotesArea";
import SingleNote from "./components/home/right-side";
import ContextProvider from "./context/Context";

export default function App() {
  return (
    <ContextProvider>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path=":folder" element={<NotesArea />}>
            <Route path=":note" element={<SingleNote />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgot />} />
      </Routes>
    </ContextProvider>
  );
}

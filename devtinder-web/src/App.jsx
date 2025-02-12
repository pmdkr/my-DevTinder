import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import Login from "./components/Login";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Feed from "./components/Feed";

function App() {
  return (

    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feed" element={<Feed />} />
        </Route>
      </Routes>
    </BrowserRouter>


  )
}

export default App;

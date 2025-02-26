import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import Login from "./components/Login";
import Body from "./components/Body";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
// import { Provider } from "react-redux";

function App() {
  return (

    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/request" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>

    </Provider>



  )
}

export default App;

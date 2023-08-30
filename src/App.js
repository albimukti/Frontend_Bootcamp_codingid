import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import Register from "./pages/Register";
import Login from "./pages/Login"
import SuccessRegister from "./pages/SuccessRegister";
import CreateNewPassword from "./pages/CreateNewPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Landingpage/>} />
        <Route path = "/register" element = {<Register/>} />
        <Route path = "/login" element = {<Login/>} />
        <Route path = "/success-register" element = {<SuccessRegister/>} />
        <Route path = "/create-new-password" element = {<CreateNewPassword/>} />
      </Routes>
    </Router>
  );
}

export default App;

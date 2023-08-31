import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import Register from "./pages/Register";
import Login from "./pages/Login"
import SuccessRegister from "./pages/SuccessRegister";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ListMenuKelas from "./pages/ListMenuKelas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Landingpage/>} />
        <Route path = "/register" element = {<Register/>} />
        <Route path = "/login" element = {<Login/>} />
        <Route path = "/success-register" element = {<SuccessRegister/>} />
        <Route path = "/reset-password" element = {<ResetPassword/>} />
        <Route path = "/forgot-password" element = {<ForgotPassword/>} />
        <Route path = "/list-menu-kelas" element = {<ListMenuKelas/>} />
      </Routes>
    </Router>
  );
}

export default App;

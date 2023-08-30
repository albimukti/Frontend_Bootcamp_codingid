import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import Register from "./pages/Register";
<<<<<<< HEAD
=======
import Login from './pages/Login';


>>>>>>> 577325d (push form login dari Albi)

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Landingpage/>}/>
        <Route path="/register" element={<Register/>} />
=======
        <Route path="/" element={<Landingpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
>>>>>>> 577325d (push form login dari Albi)
      </Routes>
    </Router>
  );
}

export default App;

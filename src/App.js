import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./pages/Landingpage";
import Register from "./pages/Register";
import Login from "./pages/Login"
import SuccessRegister from "./pages/SuccessRegister";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import ListMenuKelas from "./pages/ListMenuKelas";
import DetailKelas from "./pages/DetailKelas";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import SuccessPurchase from "./pages/SuccessPurchase";
import Invoice from "./pages/Invoice";
import DetailInvoice from "./pages/DetailInvoice";
import MyClass from "./pages/MyClass";
import LoginAdmin from "./pages/LoginAdmin";
import DashboardAdmin from "./components/DashboardAdmin";
import ManageCategory from "./pages/ManageCategory";
import ManageCourse from "./pages/ManageCourse";
import ManageUser from "./pages/ManageUser";
import ManagePayment from "./pages/ManagePayment";
import ManageInvoice from "./pages/ManageInvoice";

function App() {
  return (
    //Route untuk semua halaman yang sudah dibuat
    <Router>
      <Routes>
        <Route path = "/" element = {<Navbar/>}>
          <Route index element = {<Landingpage/>} />
          <Route path = "/register" element = {<Register/>} />
          <Route path = "/login" element = {<Login/>} />
          <Route path = "/success-register" element = {<SuccessRegister/>} />
          <Route path = "/reset-password" element = {<ResetPassword/>} />
          <Route path = "/forgot-password" element = {<ForgotPassword/>} />
          <Route path = "/list-menu-kelas/:typeName" element = {<ListMenuKelas/>} />
          <Route path = "/detail-kelas/:typeName/:title" element = {<DetailKelas/>}/>
          <Route path = "/checkout" element = {<Checkout/>} />
          <Route path = "/success-purchase" element = {<SuccessPurchase/>} />
          <Route path = "/invoice" element = {<Invoice/>} />
          <Route path = "/detail-invoice/:id" element = {<DetailInvoice/>} />
          <Route path = "/myclass" element = {<MyClass/>} />
        </Route>

        <Route path = "/login-admin" element = {<LoginAdmin/>} />

        <Route path = "/dashboard-admin" element = {<DashboardAdmin/>}>
          <Route index element = {<ManageCategory/>} />
          <Route path = "manage-course" element = {<ManageCourse/>} />
          <Route path = "manage-user" element = {<ManageUser/>} />
          <Route path = "manage-payment" element = {<ManagePayment/>} />
          <Route path = "manage-invoice" element = {<ManageInvoice/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

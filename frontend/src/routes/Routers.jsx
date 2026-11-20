import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import Doctors from '../pages/Doctors/Doctors';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import CheckoutSuccess from "../pages/checkoutSuccess";
import AboutUs from "../pages/AboutUs";
import Blog from "../pages/Blog/Blog";
import BlogDetails from "../pages/Blog/BlogDetails";
import Locations from "../pages/Locations";
import RequestAppointment from "../pages/RequestAppointment";
import SecondOpinion from "../pages/SecondOpinion";
import Donate from "../pages/Donate";
import NotFound from "../pages/NotFound";
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/find-a-doctor" element={<Navigate to="/doctors" replace />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/request-appointment" element={<RequestAppointment />} />
      <Route path="/second-opinion" element={<SecondOpinion />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />

      <Route path="/users/profile/me" element={<ProtectedRoute allowedRoles={['patient']}><MyAccount /></ProtectedRoute>} />
      <Route path="/doctors/profile/me" element={<ProtectedRoute allowedRoles={['doctor']}><Dashboard /></ProtectedRoute>} />

      {/* any unknown url */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;

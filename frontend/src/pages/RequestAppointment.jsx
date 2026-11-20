import { useContext } from "react";
import { Link } from "react-router-dom";
import PageBanner from "../components/PageBanner/PageBanner";
import DoctorList from "../components/Doctors/DoctorList";
import { authContext } from "../context/AuthContext";

const steps = [
  {
    title: "Choose a doctor",
    text: "Browse our specialists below or search by name and specialty.",
    color: "#FEB60D",
    bg: "rgba(254, 182, 13, .2)",
  },
  {
    title: "Check time slots",
    text: "Open the doctor's profile to see their available days, times and ticket price.",
    color: "#9771FF",
    bg: "rgba(151, 113, 255, .2)",
  },
  {
    title: "Book & pay securely",
    text: "Click “Book Appointment” and complete the secure online payment.",
    color: "#01B5C5",
    bg: "rgba(1, 181, 197, .2)",
  },
];

const RequestAppointment = () => {
  const { token, role } = useContext(authContext);

  return (
    <>
      <PageBanner
        title="Request an Appointment"
        crumb="Request Appointment"
        subtitle="Book a visit with one of our specialists in three simple steps."
      />

      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px]">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-xl p-8 bg-white shadow-sm border border-solid border-[#0066ff1f]">
                <span
                  className="w-[44px] h-[44px] flex items-center justify-center text-[18px] font-[700] rounded-md"
                  style={{ background: step.bg, color: step.color }}
                >
                  {index + 1}
                </span>
                <h2 className="text-[22px] leading-8 font-[700] text-headingColor mt-5">{step.title}</h2>
                <p className="text-[16px] leading-7 text-textColor mt-3">{step.text}</p>
              </div>
            ))}
          </div>

          {/* login reminder: only patients can book */}
          {!token && (
            <div className="mt-10 p-5 rounded-xl bg-[#fff9ea] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[16px] leading-7 text-headingColor font-[500]">
                You need to be logged in as a patient to book an appointment.
              </p>
              <div className="flex gap-3">
                <Link to="/login" className="bg-primaryColor text-white font-[600] py-2 px-6 rounded-full">
                  Login
                </Link>
                <Link to="/register" className="border border-solid border-primaryColor text-primaryColor font-[600] py-2 px-6 rounded-full">
                  Register
                </Link>
              </div>
            </div>
          )}
          {token && role === "doctor" && (
            <div className="mt-10 p-5 rounded-xl bg-[#fff9ea] text-[16px] leading-7 text-headingColor font-[500]">
              You are logged in as a doctor. Only patient accounts can book appointments.
            </div>
          )}
        </div>
      </section>

      <section className="pt-0">
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">Our great doctors</h2>
            <p className="text__para text-center">
              Pick a doctor to see their profile, time slots and book your appointment.
            </p>
          </div>
          <DoctorList />
        </div>
      </section>
    </>
  );
};

export default RequestAppointment;

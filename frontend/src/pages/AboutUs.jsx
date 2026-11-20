import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineSafety, AiOutlineTeam } from "react-icons/ai";
import PageBanner from "../components/PageBanner/PageBanner";
import About from "../components/About/About";
import Testimonial from "../components/Testimonial/Testimonial";

const stats = [
  { value: "30+", label: "Years of experience", color: "bg-yellowColor" },
  { value: "15+", label: "Clinic locations", color: "bg-purpleColor" },
  { value: "100%", label: "Patient satisfaction", color: "bg-irisBlueColor" },
];

const values = [
  {
    icon: <AiOutlineHeart className="w-7 h-7" />,
    title: "Patient first",
    text: "Every decision we make starts with one question: what is best for the patient in front of us?",
    color: "#FEB60D",
    bg: "rgba(254, 182, 13, .2)",
  },
  {
    icon: <AiOutlineSafety className="w-7 h-7" />,
    title: "Trusted care",
    text: "Verified, experienced doctors and transparent pricing, so you always know what to expect.",
    color: "#9771FF",
    bg: "rgba(151, 113, 255, .2)",
  },
  {
    icon: <AiOutlineTeam className="w-7 h-7" />,
    title: "Care for everyone",
    text: "Book in-clinic or virtual appointments with specialists from anywhere, at any time.",
    color: "#01B5C5",
    bg: "rgba(1, 181, 197, .2)",
  },
];

const AboutUs = () => {
  return (
    <>
      <PageBanner
        title="About Medicare"
        crumb="About Us"
        subtitle="We connect patients with trusted doctors and make booking quality healthcare simple, fast and secure."
      />

      <About />

      {/* stats */}
      <section className="pt-0">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[30px]">
            {stats.map((item) => (
              <div key={item.label} className="text-center sm:text-left">
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                  {item.value}
                </h2>
                <span className={`w-[100px] h-2 ${item.color} rounded-full block mt-[-14px] mx-auto sm:mx-0`}></span>
                <p className="text__para">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* mission & values */}
      <section className="bg-[#fff9ea]">
        <div className="container">
          <div className="xl:w-[570px] mx-auto text-center">
            <h2 className="heading">Our mission</h2>
            <p className="text__para">
              To help patients live healthier, longer lives by making it easy to
              find the right doctor, book an appointment and get expert care —
              in the clinic or online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[30px] mt-[50px]">
            {values.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-panelShadow transition-shadow duration-300">
                <span
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ background: item.bg, color: item.color }}
                >
                  {item.icon}
                </span>
                <h3 className="text-[22px] leading-8 font-[700] text-headingColor mt-5">
                  {item.title}
                </h3>
                <p className="text-[16px] leading-7 text-textColor mt-3">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patient says</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>

      {/* call to action */}
      <section className="pt-0">
        <div className="container">
          <div className="bg-primaryColor rounded-2xl px-8 py-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-[28px] leading-9 md:text-[36px] md:leading-[46px] font-[700] text-white">
                Ready to see a doctor?
              </h2>
              <p className="text-[17px] leading-7 text-white/80 mt-2">
                Find the right specialist and book your appointment in minutes.
              </p>
            </div>
            <Link
              to="/doctors"
              className="bg-white text-primaryColor font-[600] py-[15px] px-[35px] rounded-[50px] flex items-center gap-2 hover:scale-105 transition-transform whitespace-nowrap"
            >
              Find a Doctor <BsArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

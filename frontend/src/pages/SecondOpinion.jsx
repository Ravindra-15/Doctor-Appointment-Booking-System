import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineCheckCircle } from "react-icons/ai";
import PageBanner from "../components/PageBanner/PageBanner";

const benefits = [
  "Confirm a diagnosis before a major surgery or treatment",
  "Explore other treatment options with a specialist",
  "Get peace of mind about a serious or rare condition",
  "Have your reports reviewed by an experienced doctor",
];

const emptyForm = { name: "", email: "", phone: "", specialty: "", details: "" };

const SecondOpinion = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.specialty || !formData.details) {
      toast.error("Please fill all required fields");
      return;
    }
    // No backend endpoint for this yet — confirm on the page
    setSubmitted(true);
    toast.success("Your request has been received");
    setFormData(emptyForm);
  };

  return (
    <>
      <PageBanner
        title="Get a Second Opinion"
        crumb="Second Opinion"
        subtitle="Not sure about a diagnosis or treatment plan? Our specialists will review your case."
      />

      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px]">
            {/* info */}
            <div>
              <h2 className="heading">Why get a second opinion?</h2>
              <p className="text__para">
                A second opinion from an expert can confirm your diagnosis, suggest
                other treatment options, and help you make an informed decision with
                confidence.
              </p>
              <ul className="mt-8 space-y-4">
                {benefits.map((item) => (
                  <li key={item} className="flex gap-3 text-[17px] leading-7 text-headingColor">
                    <AiOutlineCheckCircle className="w-6 h-6 text-irisBlueColor shrink-0 mt-[2px]" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 p-6 rounded-xl bg-[#fff9ea]">
                <h3 className="text-[20px] font-[700] text-headingColor">How it works</h3>
                <p className="text-[16px] leading-7 text-textColor mt-2">
                  Send us your details below. Our care team will contact you within
                  48 hours to collect your reports and match you with the right
                  specialist.
                </p>
              </div>
            </div>

            {/* form */}
            <div className="rounded-xl p-6 md:p-10 shadow-panelShadow bg-white">
              {submitted ? (
                <div className="text-center py-10">
                  <AiOutlineCheckCircle className="w-16 h-16 text-irisBlueColor mx-auto" />
                  <h3 className="text-[24px] font-[700] text-headingColor mt-4">Request received!</h3>
                  <p className="text__para">Our care team will contact you within 48 hours.</p>
                  <button type="button" className="btn" onClick={() => setSubmitted(false)}>
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="so-name" className="form__label">Full name*</label>
                    <input id="so-name" name="name" value={formData.name} onChange={handleChange} className="form__input mt-1" placeholder="Your name" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="so-email" className="form__label">Email*</label>
                      <input id="so-email" type="email" name="email" value={formData.email} onChange={handleChange} className="form__input mt-1" placeholder="example@gmail.com" />
                    </div>
                    <div>
                      <label htmlFor="so-phone" className="form__label">Phone</label>
                      <input id="so-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form__input mt-1" placeholder="+91 ..." />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="so-specialty" className="form__label">Specialty*</label>
                    <select id="so-specialty" name="specialty" value={formData.specialty} onChange={handleChange} className="form__input mt-1 py-3.5">
                      <option value="">Select</option>
                      <option value="surgeon">Surgeon</option>
                      <option value="neurologist">Neurologist</option>
                      <option value="dermatologist">Dermatologist</option>
                      <option value="cardiologist">Cardiologist</option>
                      <option value="oncologist">Oncologist</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="so-details" className="form__label">Describe your case*</label>
                    <textarea id="so-details" name="details" rows={5} value={formData.details} onChange={handleChange} className="form__input mt-1" placeholder="Your current diagnosis, treatment and questions..." />
                  </div>
                  <button type="submit" className="btn w-full mt-2 hover:scale-[1.02] active:scale-[0.98] transition-transform">
                    Request Second Opinion
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SecondOpinion;

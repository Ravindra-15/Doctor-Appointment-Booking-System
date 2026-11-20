import { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineHeart } from "react-icons/ai";
import PageBanner from "../components/PageBanner/PageBanner";

const amounts = [500, 1000, 2500, 5000];

const causes = [
  {
    title: "Free health camps",
    text: "Free check-ups and medicines for families in rural areas.",
    color: "#FEB60D",
    bg: "rgba(254, 182, 13, .2)",
  },
  {
    title: "Cancer patient support",
    text: "Help cover treatment costs for patients who cannot afford them.",
    color: "#9771FF",
    bg: "rgba(151, 113, 255, .2)",
  },
  {
    title: "Mother & child care",
    text: "Safe delivery and newborn care for low-income families.",
    color: "#01B5C5",
    bg: "rgba(1, 181, 197, .2)",
  },
];

const Donate = () => {
  const [amount, setAmount] = useState(1000);
  const [custom, setCustom] = useState("");
  const [cause, setCause] = useState(causes[0].title);

  const finalAmount = custom ? Number(custom) : amount;

  const handleDonate = (e) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 1) {
      toast.error("Please enter a valid amount");
      return;
    }
    // Online donation payment is not connected yet
    toast.success(`Thank you! Your pledge of ₹${finalAmount} for "${cause}" has been noted.`);
    setCustom("");
  };

  return (
    <>
      <PageBanner
        title="Support Our Mission"
        crumb="Donate"
        subtitle="Your donation helps us bring quality healthcare to people who need it most."
      />

      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px]">
            {/* causes */}
            <div>
              <h2 className="heading">Where your money goes</h2>
              <p className="text__para">
                Every rupee goes directly to patient care. Choose a cause you care about.
              </p>

              <div className="mt-8 space-y-4">
                {causes.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setCause(item.title)}
                    className={`w-full text-left flex gap-4 p-5 rounded-xl border-2 border-solid transition
                    ${cause === item.title ? "border-primaryColor bg-[#0067ff0a]" : "border-[#0066ff1f] hover:border-[#0067ff66]"}`}
                  >
                    <span
                      className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: item.bg, color: item.color }}
                    >
                      <AiOutlineHeart className="w-6 h-6" />
                    </span>
                    <span>
                      <span className="block text-[18px] font-[700] text-headingColor">{item.title}</span>
                      <span className="block text-[15px] leading-6 text-textColor mt-1">{item.text}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* donation form */}
            <form onSubmit={handleDonate} className="rounded-xl p-6 md:p-10 shadow-panelShadow bg-white h-fit">
              <h3 className="text-[24px] leading-9 font-[700] text-headingColor">Choose an amount</h3>
              <p className="text-[15px] text-textColor mt-1">
                Donating to: <span className="text-primaryColor font-[600]">{cause}</span>
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                {amounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setAmount(value);
                      setCustom("");
                    }}
                    className={`py-3 rounded-lg font-[700] text-[17px] border border-solid transition
                    ${!custom && amount === value ? "bg-primaryColor text-white border-primaryColor" : "border-[#0066ff34] text-headingColor hover:border-primaryColor"}`}
                  >
                    ₹{value}
                  </button>
                ))}
              </div>

              <label htmlFor="custom-amount" className="form__label block mt-6">
                Or enter a custom amount (₹)
              </label>
              <input
                id="custom-amount"
                type="number"
                min="1"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="e.g. 750"
                className="form__input mt-1"
              />

              <button type="submit" className="btn w-full hover:scale-[1.02] active:scale-[0.98] transition-transform">
                Donate ₹{finalAmount || 0}
              </button>
              <p className="text-[13px] text-textColor text-center mt-4">
                100% of your donation supports patient care programs.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Donate;

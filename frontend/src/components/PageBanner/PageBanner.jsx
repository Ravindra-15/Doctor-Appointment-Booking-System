import { Link } from "react-router-dom";

// Page title strip used by the inner pages (same style as "Find Your Doctor")
const PageBanner = ({ title, subtitle, crumb }) => {
  return (
    <section className="bg-[#fff9ea]">
      <div className="container text-center">
        <p className="text-[15px] leading-6 text-textColor font-[500] mb-3">
          <Link to="/home" className="hover:text-primaryColor transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-primaryColor">{crumb || title}</span>
        </p>
        <h1 className="heading">{title}</h1>
        {subtitle && (
          <p className="text__para max-w-[700px] mx-auto">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default PageBanner;

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="bg-[#fff9ea]">
      <div className="container text-center py-10">
        <h1 className="text-[96px] leading-[110px] md:text-[140px] md:leading-[160px] font-[800] text-primaryColor">
          404
        </h1>
        <h2 className="heading">Page not found</h2>
        <p className="text__para max-w-[520px] mx-auto">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/home" className="btn">
            Go to Home
          </Link>
          <Link
            to="/doctors"
            className="btn bg-white text-primaryColor border border-solid border-primaryColor"
          >
            Find a Doctor
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

import DoctorCard from "../../components/Doctors/DoctorCard";
import { doctors } from "../../assets/data/doctors";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useState } from "react";
import { useEffect } from "react";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());
    console.log(handleSearch);
  };

  useEffect(() => {
    // Set a timer to update debounceQuery after 500ms of inactivity
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    // Clean up the timer on each render before setting a new one
    return () => {
      clearTimeout(timeout);
    };
  }, [query]); // This effect runs whenever 'query' changes

  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${query}`);
  return (
    <>
      {/* Search Section - Adjust padding/margin with py-[] and my-[] values */}
      <section className="bg-[#fff9ea]">
        {" "}
        {/* Changed from py-12 */}
        <div className="container text-center">
          <h2 className="heading mb-8">Find Your Doctor</h2>
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <input
                type="search"
                className="w-full py-5 px-6 pr-16 text-lg bg-white rounded-full shadow-sm
                focus:outline-none focus:ring-2 focus:ring-primaryColor focus:ring-opacity-50
                transition-all duration-300 placeholder-gray-400
                hover:shadow-md focus:shadow-lg border-none"
                placeholder="Search your doctor by name or specialty..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2
                bg-primaryColor text-white w-12 h-12 rounded-full flex items-center justify-center
                transition-all duration-300 hover:bg-primaryDarker
                transform hover:scale-110 active:scale-95
                shadow-md hover:shadow-lg border-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-125"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span
                  className="absolute inset-0 rounded-full bg-primaryDarker opacity-0 
                  group-hover:opacity-20 transition-opacity duration-300"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Grid Section - Adjust gap and margin values below */}
      <div className="container my-10">
        {" "}
        {/* Added my-10 for vertical spacing */}
        {loading && <Loader></Loader>}
        {error && <Error></Error>}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {" "}
            {/* Changed gap from 10 to 8 */}
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>

      {/* Testimonial Section - Adjust padding/margin with py-[] values */}
      <section className="my-16">
        {" "}
        {/* Added my-16 for vertical spacing */}
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
    </>
  );
};

export default Doctors;

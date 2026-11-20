import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineClock } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import PageBanner from "../components/PageBanner/PageBanner";
import { locations } from "../assets/data/locations";

const Locations = () => {
  const [query, setQuery] = useState("");
  const search = query.trim().toLowerCase();

  const results = locations.filter((loc) =>
    [loc.city, loc.name, loc.address, ...loc.services].join(" ").toLowerCase().includes(search)
  );

  return (
    <>
      <PageBanner
        title="Find a Location"
        crumb="Locations"
        subtitle="Visit one of our hospitals and clinics across India. Search by city or by the service you need."
      />

      <section>
        <div className="container">
          <div className="max-w-2xl mx-auto mb-[50px]">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city or service (e.g. Mumbai, Cardiology)..."
              className="w-full py-4 px-6 text-[16px] bg-white rounded-full border border-solid border-[#0066ff34]
              focus:outline-none focus:ring-2 focus:ring-primaryColor transition-all placeholder:text-textColor"
            />
          </div>

          {results.length === 0 && (
            <h2 className="text-center text-[20px] font-semibold text-headingColor">
              No locations found for &quot;{query}&quot;
            </h2>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {results.map((loc) => (
              <div
                key={loc.name}
                className="rounded-xl p-6 bg-white border border-solid border-[#0066ff1f] shadow-sm hover:shadow-panelShadow transition-shadow duration-300 flex flex-col"
              >
                <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-3 text-[13px] font-semibold rounded w-fit">
                  {loc.city}
                </span>
                <h2 className="text-[20px] leading-[30px] font-[700] text-headingColor mt-4">{loc.name}</h2>

                <ul className="mt-4 space-y-3 text-[15px] leading-6 text-textColor flex-1">
                  <li className="flex gap-3">
                    <HiOutlineLocationMarker className="w-5 h-5 text-primaryColor shrink-0 mt-[2px]" />
                    {loc.address}
                  </li>
                  <li className="flex gap-3">
                    <HiOutlinePhone className="w-5 h-5 text-primaryColor shrink-0 mt-[2px]" />
                    <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="hover:text-primaryColor">
                      {loc.phone}
                    </a>
                  </li>
                  <li className="flex gap-3">
                    <HiOutlineClock className="w-5 h-5 text-primaryColor shrink-0 mt-[2px]" />
                    {loc.hours}
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 mt-5">
                  {loc.services.map((service) => (
                    <span key={service} className="text-[13px] px-3 py-1 rounded-full bg-[#fff9ea] text-headingColor">
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-6 pt-5 border-t border-solid border-[#0066ff1f]">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primaryColor font-[600] text-[15px] hover:underline"
                  >
                    Get directions
                  </a>
                  <Link
                    to="/doctors"
                    aria-label="Find a doctor"
                    className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                  >
                    <BsArrowRight className="group-hover:text-white w-6 h-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Locations;

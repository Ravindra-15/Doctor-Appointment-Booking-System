import { services } from "../assets/data/services.js";
 
import ServiceCard from "../components/Services/ServiceCard";
import PageBanner from "../components/PageBanner/PageBanner";

const Services = () => {
    return (
        <>
        <PageBanner
            title="Our Medical Services"
            crumb="Services"
            subtitle="World-class care for everyone. Our health system offers unmatched, expert health care."
        />
        <section>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]">
                    {services.map((item, index) => (
                        <ServiceCard item={item} index={index} key={index} />
                    ))}
                </div>
            </div>
        </section>
        </>
    );
};

export default Services;
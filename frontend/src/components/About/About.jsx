import React from "react";
import aboutImg from "../../assets/images/about.png";
import { Link } from 'react-router-dom';

import aboutCardImg from "../../assets/images/about-card.png";

const About = () => {
    return (
        <section>
            <div className="container">
                <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
                    {/* ______ about img ______ */}
                    <div className="relative w-[85%] lg:w-[60%] xl:w-[700px] z-10 order-2 lg:order-1 group transition duration-300">
  <img 
    src={aboutImg} 
    alt="Doctor" 
    className="w-[400px] max-h-[480px] object-cover object-top rounded-xl shadow-lg group-hover:shadow-[0_10px_40px_rgba(0,180,255,0.4)] transition duration-500 ease-in-out"
  />

  <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]">
    <img 
      src={aboutCardImg} 
      alt="Doctor Card" 
      className="w-full h-auto object-contain"
    />
  </div>
</div>

                     {/* about content */}
                     <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
                        <h2 className="heading">Proud to be one of the nations best</h2>
                        <p className="text__para">
                            For 30 years in a row, U.S. News & World Report has recognized us as one of the best publics hospitals in the Nation and #1 in Texas. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Quas, nemo?
                        </p>

                        <p className="text__para mt-[30px]">
                            Our best is something we strive for each day, caring for our patients—not looking back at what we accomplished but towards what we can do tomorrow. Providing the best. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, modi?
                        </p>
                        <Link to='/'>
                            <button className="btn">Learn More</button>
                        </Link>
                        
                    </div>
                   
                </div>
            </div>
        </section>
    );
};

export default About;

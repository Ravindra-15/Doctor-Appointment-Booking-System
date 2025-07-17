import React from "react"; 
import contactAnimation from "../assets/images/contactUsAnimation.mp4"; 

const Contact = () => {
    return (
        <section className="py-10">
            <div className="px-4 mx-auto max-w-screen-md">

                {/* Video + Heading */}
                <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in">
                    <div className="relative w-16 h-16">
                        <video
                            src={contactAnimation}
                            className="w-full h-full object-cover rounded-full  animate-pulse pointer-events-none opacity-100"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        {/* Light blur layer to soften black bg */}
                        <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full"></div>
                    </div>

                    <h2 className="heading text-center">
                        Contact Us
                    </h2>
                </div>

                <p className="mb-8 lg:mb-16 font-light text-center text__para animate-fade-in delay-100">
                    Got a technical issue? Want to send feedback about a beta feature? Let us know.
                </p>

                {/* Form */}
                <form action="#" className="space-y-8">

                    <div className="transition-all duration-300 hover:scale-[1.02]">
                        <label htmlFor="email" className="form__label">
                            Your Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="example@gmail.com"
                            className="form__input mt-1 focus:ring-2 focus:ring-primaryColor transition-all duration-300 hover:shadow-[0_0_30px_#99f2e5]"
                        />
                    </div>

                    <div className="transition-all duration-300 hover:scale-[1.02]">
                        <label htmlFor="subject" className="form__label">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            placeholder="Let us know how we can help you"
                            className="form__input mt-1 focus:ring-2 focus:ring-primaryColor transition-all duration-300 hover:shadow-[0_0_30px_#99f2e5]"
                        />
                    </div>

                    <div className="sm:col-span-2 transition-all duration-300 hover:scale-[1.02]">
                        <label htmlFor="message" className="form__label">
                            Your message
                        </label>
                        <textarea
                            rows="6"
                            id="message"
                            placeholder="Leave a comment..."
                            className="form__input mt-1 focus:ring-2 focus:ring-primaryColor transition-all duration-300 hover:shadow-[0_0_30px_#99f2e5]"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="btn rounded sm:w-fit mt-4 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 text-white shadow-2xl hover:shadow-blue-300/60 hover:scale-110 active:scale-95 transition-all duration-300 ease-in-out"
                    >
                        Submit
                    </button>

                </form>
            </div>
        </section>
    );
};
 
export default Contact;

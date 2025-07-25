import convertTime from "../../utils/convertTime";
import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {
  // const bookingHandler = async () => {
  //   try {
  //     const res = await fetch(
  //       `${BASE_URL}/bookings/checkout-session/${doctorId}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.message + " Please try again");
  //     }

  //     if (data.session.url) {
  //       window.location.href = data.session.url;
  //     }
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // };

  const bookingHandler = async () => {
  try {
    const token = localStorage.getItem('token'); // ✅ retrieve token here

    if (!token) {
      toast.error("User not authenticated");
      return;
    }

    const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message + ' Please try again');
    }

    if (data.session.url) {
      window.location.href = data.session.url;
    }

  } catch (err) {
    toast.error(err.message);
  }
};

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold transition-transform duration-200 hover:scale-110">
          ₹{ticketPrice}
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>

        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between mb-2 p-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)} -{" "}
                {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={bookingHandler}  className="btn px-2 w-full rounded hover:scale-[1.02] active:scale-[0.98] transition-transform">
        Book Appointment
      </button>
    </div>
  );
};

export default SidePanel;

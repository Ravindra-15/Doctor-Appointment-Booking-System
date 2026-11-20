// Set VITE_BASE_URL in .env.local (e.g. http://localhost:8000/api/v1) to use a local backend
export const BASE_URL =
  import.meta.env.VITE_BASE_URL ||
  "https://doctor-appointment-booking-system-vau8.onrender.com/api/v1";

// Always read the token at request time. Reading it once at module load
// meant requests kept sending the old (or no) token until a page refresh.
export const getToken = () => {
  const token = localStorage.getItem("token");
  // older versions of the app stored the literal strings "null"/"undefined"
  return token && token !== "null" && token !== "undefined" ? token : null;
};

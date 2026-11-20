import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { BASE_URL, getToken } from "../../config";
import HashLoader from "react-spinners/HashLoader";
import { toast } from "react-toastify";

const FeedbackForm = ({ onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !reviewText) {
        setLoading(false);
        toast.error("Rating & Review Fields are required");
        return; // Added return to prevent execution of the fetch
      }

      const token = getToken();
      if (!token) {
        setLoading(false);
        toast.error("Please login as a patient to give feedback");
        return;
      }

      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Fixed template literal
        },
        body: JSON.stringify({ rating, reviewText }), // Fixed object syntax
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      // Handle success case here
      setLoading(false);
      toast.success("Review submitted successfully");
      setRating(0);
      setHover(0);
      setReviewText("");
      if (onSuccess) onSuccess(); // reload the doctor so the new review shows up
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
      console.error("Error submitting review:", err);
    }
  };
  return (
    <form action="">
      <div>
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          How would you rate the overall experience?*
        </h3>

        <div>
          {[...Array(5).keys()].map((_, index) => {
            index += 1;
            return (
              <button
                key={index}
                type="button"
                className={`${
                  index <= (hover || rating)
                    ? "text-yellowColor"
                    : "text-gray-400"
                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                onDoubleClick={() => {
                  setHover(0);
                  setRating(0);
                }}
              >
                <span>
                  <AiFillStar />
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-[30px]">
        <h3 className="text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0">
          Share your feedback or suggestions
        </h3>

        <textarea
          className="border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md"
          rows="5"
          placeholder="Write your message"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
      </div>

      <button
        className="btn"
        type="submit"
        onClick={handleSubmitReview}
        disabled={loading}
      >
        {loading ? <HashLoader size={25} color="#fff" /> : "Submit Feedback"}
      </button>
    </form>
  );
};

export default FeedbackForm;

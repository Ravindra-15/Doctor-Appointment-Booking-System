import React, { useState } from "react";
import avatar from "../../assets/images/avatar-icon.png";
import { AiFillStar } from "react-icons/ai";
import { formatDate } from "../../utils/formateDate";
import FeedbackForm1 from "./FeedbackForm1"; // Updated to reflect new file name

const Feedback = ({ reviews, totalRating }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
          All reviews ({totalRating})
        </h4>

        {reviews?.map((review, index) => (
          <div key={index} className="flex justify-between gap-10 mb-[30px]">
            <div className="flex gap-3">
              <figure className="w-10 h-10 rounded-full">
                <img
                  className="w-full"
                  src={review.user?.photo}
                  alt="User avatar"
                />
              </figure>

              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                  {review?.user?.name}
                </h5>
                <p className="text-[14px] leading-6 text-textColor">
                  {formatDate(review?.createdAt)}
                </p>
                <p className="mt-3 font-medium text-[15px]">
                  {review.reviewText}
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(review?.rating).keys()].map((_, index) => (
                <AiFillStar key={index} color="#0067FF" />
              ))}
            </div>
          </div>
        ))}
      </div>
      {!showFeedbackForm && (
        <div className="text-center">
          <button className="btn" onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}
      {showFeedbackForm && <FeedbackForm1 />} {/* Updated to FeedbackForm1 */}
    </div>
  );
};

export default Feedback;

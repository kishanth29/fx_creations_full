"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ReviewsForm() {
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    rating: 0,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Alice",
      comment: "Great product! Highly recommend it.",
      rating: 5,
    },
    {
      id: 2,
      name: "Bob",
      comment: "Fast delivery and amazing quality.",
      rating: 4,
    },
    {
      id: 3,
      name: "Charlie",
      comment: "Customer service was very helpful.",
      rating: 4,
    },
    {
      id: 4,
      name: "Diana",
      comment: "Affordable and worth every penny.",
      rating: 5,
    },
    {
      id: 5,
      name: "Ethan",
      comment: "Will definitely order again!",
      rating: 5,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.comment.trim()) newErrors.comment = "Comment is required";
    if (formData.rating === 0) newErrors.rating = "Please select a rating";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setReviews([
        {
          id: Date.now(),
          name: formData.name,
          comment: formData.comment,
          rating: formData.rating,
        },
        ...reviews,
      ]);
      setFormData({ name: "", comment: "", rating: 0 });
      setIsSubmitted(true);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, reviews.length - 1));
  };

  const renderStars = (rating) => (
    <div className="flex space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-sm ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          onClick={() =>
            !isSubmitted && setFormData({ ...formData, rating: star })
          }
        >
          ★
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row items-start justify-center gap-6 p-6">
      {/* Review Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-4 w-full md:w-1/3 space-y-3 text-sm ml-10"
      >
        <h2 className="text-lg font-bold text-center text-red-600">
          Leave a Review
        </h2>

        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your name"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2
                       focus:border-red-500 focus:ring-red-500 text-sm text-black"
            disabled={isSubmitted}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Comment
          </label>
          <textarea
            rows="2"
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            placeholder="Write your comment"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2
                       focus:border-red-500 focus:ring-red-500 text-sm text-black"
            disabled={isSubmitted}
          />
          {errors.comment && (
            <p className="text-red-500 text-xs mt-1">{errors.comment}</p>
          )}
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Rating
          </label>
          {renderStars(formData.rating)}
          {errors.rating && (
            <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitted}
          className={`w-full text-sm font-semibold py-2 px-3 rounded-md transition-colors ${
            isSubmitted
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          {isSubmitted ? "Submitted" : "Submit"}
        </button>
      </form>

      {/* Reviews Slider */}
      <div className="w-full md:w-2/3 flex flex-col items-center mt-8">
        <h3 className="text-base font-bold text-gray-800 text-center mb-4">
          What People Say
        </h3>

        <div className="relative max-w-80 overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 60}%)`, // match new width
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="w-[60%] flex-shrink-0 bg-white shadow-md rounded-lg p-2 m-2"
              >
                <h4 className="font-semibold text-red-600 text-sm">
                  {review.name}
                </h4>
                <p className="text-gray-700 mt-1 text-xs">{review.comment}</p>
                <div className="mt-1">{renderStars(review.rating)}</div>
              </div>
            ))}
          </motion.div>

          {/* Controls */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow rounded-full disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 text-pink-700" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === reviews.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 shadow rounded-full disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4 text-pink-700" />
          </button>
        </div>
      </div>
    </div>
  );
}

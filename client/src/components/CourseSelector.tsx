import React from "react";
import { courseCategories } from "../lib/utils";

const CourseSelector = () => {
  return (
    <div className="p-4">
      <label htmlFor="course" className="text-white block mb-2">
        Select Course Level:
      </label>
      <select
        id="course"
        className="bg-gray-800 text-white p-2 rounded-md w-full"
      >
        {courseCategories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CourseSelector;

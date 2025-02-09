"use client";

import Loading from "@/components/Loading";
import { useCreateTransactionMutation, useGetCoursesQuery } from "@/state/api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CourseCardSearch from "@/components/CourseCardSearch";
import SelectedCourse from "./SelectedCourse";
import { useUser } from "@clerk/nextjs";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";

const Search = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: courses = [], isLoading, isError } = useGetCoursesQuery({});
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const router = useRouter();

  const [createTransaction] = useCreateTransactionMutation();
  const { navigateToStep } = useCheckoutNavigation();
  const { user } = useUser();

  useEffect(() => {
    if (courses.length > 0) {
      if (id) {
        const course = courses.find((c) => c.courseId === id);
        setSelectedCourse(course || courses[0]);
      } else {
        setSelectedCourse(courses[0]);
      }
    }
  }, [courses, id]);

  if (isLoading) return <Loading />;
  if (isError || courses.length === 0)
    return <div>Failed to fetch courses</div>;

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    router.push(`/search?id=${course.courseId}`),
      {
        scroll: false,
      };
  };
  const handleEnrollNow = async (courseId: string) => {
    if (selectedCourse?.price === 0) {
      const transactionData: Partial<Transaction> = {
        transactionId: "free123456",
        userId: user?.id,
        courseId: courseId,
        paymentProvider: "stripe",
        amount: 0,
      };

      await createTransaction(transactionData), navigateToStep(3);
    } else {
      router.push(`/checkout?step=1^&id=${courseId}&showSignUp=false`),
        {
          scroll: false,
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="search"
    >
      <h1 className="search__title">List of available courses</h1>
      <h2 className="search__subtite">{courses.length} courses available</h2>
      <div className="search__content">
        <motion.div
          initial={{ y: 40, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="search__courses-grid"
        >
          {courses.map((course) => (
            <CourseCardSearch
              key={course.courseId}
              course={course}
              isSelected={selectedCourse?.courseId === course.courseId}
              onClick={() => handleCourseSelect(course)}
            />
          ))}
        </motion.div>
        {selectedCourse && (
          <motion.div
            initial={{ y: 40, opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="search__selected-course"
          >
            <SelectedCourse
              course={selectedCourse}
              handleEnrollNow={handleEnrollNow}
              // price={formatPrice(selectedCourse.price)}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Search;

// "use client";

// import Loading from "@/components/Loading";
// import { useGetCoursesQuery } from "@/state/api";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import CourseCardSearch from "@/components/CourseCardSearch";

// const Search = () => {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   const { data: courses, isLoading, isError } = useGetCourseQuery({});
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (courses) {
//       if (id) {
//         const course = courses.find((c) => c.courseId === id);
//         setSelectedCourse(course || courses[0]);
//       } else {
//         setSelectedCourse(courses[0]);
//       }
//     }
//   }, [courses, id]);

//   if (isLoading) return <Loading />;
//   if (isError || !courses) return <div>Failed to fetch courses</div>;

//   const handleCourseSelect = (course: Course) => {
//     setSelectedCourse(course);
//     router.push(`/search?id=${course.courseId}`);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="search"
//     >
//       <h1 className="search__title">List of available courses</h1>
//       <h2 className="search__subtite">{courses.length} courses available</h2>
//       <div className="search__content">
//         <motion.div
//           initial={{ y: 40, opacity: 1 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="searc__courses-grid"
//         >
//           {courses.map((course) => (
//             <CourseCardSearch
//               key={course.courseId}
//               course={course}
//               isSelected={selectedCourse?.courseId === course.courseId}
//               onClick={() => handleCourseClick(course.courseId)}
//             />
//           ))}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Search;

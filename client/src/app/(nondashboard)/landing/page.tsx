"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/state/api";
import { useRouter } from "next/navigation";
import CourseCardSearch from "@/components/CourseCardSearch";
import { useUser } from "@clerk/nextjs";
import {
  PencilIcon,
  LightBulbIcon,
  ChartBarIcon,
} from "@heroicons/react/20/solid";

const LoadingSkeleton = () => {
  return (
    <div className="landing-skeleton">
      <div className="landing-skeleton__hero">
        <div className="landing-skeleton__hero-content">
          <Skeleton className="landing-skeleton__title" />
          <Skeleton className="landing-skeleton__subtitle" />
          <Skeleton className="landing-skeleton__subtitle-secondary" />
          <Skeleton className="landing-skeleton__button" />
        </div>
        <Skeleton className="landing-skeleton__hero-image" />
      </div>

      <div className="landing-skeleton__featured">
        <Skeleton className="landing-skeleton__featured-title" />
        <Skeleton className="landing-skeleton__featured-description" />

        <div className="landing-skeleton__tags">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Skeleton key={index} className="landing-skeleton__tag" />
          ))}
        </div>

        <div className="landing-skeleton__courses">
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton key={index} className="landing-skeleton__course-card" />
          ))}
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    name: "AI-Powered Personalized Learning.",
    description:
      "Our AI adapts to each user's learning style, providing customized lessons and feedback to enhance your Japanese learning journey.",
    icon: LightBulbIcon,
  },
  {
    name: "Real-Time Language Assessment.",
    description:
      "Get immediate feedback on your language skills, including pronunciation, grammar, and vocabulary, with AI-powered assessments.",
    icon: PencilIcon,
  },
  {
    name: "Progress Tracking.",
    description:
      "Track your learning progress with detailed reports and see how much you've improved over time with our AI-powered insights.",
    icon: ChartBarIcon,
  },
];

const FeatureSection = () => {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
        >
          <div className="lg:pt-4 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="lg:max-w-lg"
            >
              <h2 className="text-base/7 font-semibold text-indigo-600">
                Enhance Your Learning Experience
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                A Smarter Way to Learn Japanese
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                AI-driven lessons, personalized feedback, and real-time
                assessments are here to make your Japanese learning journey
                faster and more effective.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.2,
                    }}
                    className="relative pl-9"
                  >
                    <dt className="inline font-semibold text-gray-900">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.4,
                          ease: "easeOut",
                          delay: index * 0.2,
                        }}
                        className="absolute top-1 left-1 size-5 text-indigo-600"
                      >
                        <feature.icon aria-hidden="true" />
                      </motion.div>
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            alt="AITOMANABI AI JAPANESE LEARNING App Screenshot"
            src="AI IMAGE.jpg"
            width={2432}
            height={1442}
            className="w-[48rem] max-w-none rounded-xl ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
          />
        </motion.div>
      </div>
    </div>
  );
};

// About Us Section
const AboutUsSection = () => {
  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
          <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
            <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
              <motion.img
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="rounded-xl object-cover"
                src="AI1.jpg"
                alt="about Us image"
              />
            </div>
            <motion.img
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="sm:ml-0 ml-auto rounded-xl object-cover"
              src="AI2.jpg"
              alt="about Us image"
            />
          </div>
          <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div className="w-full flex-col justify-center items-start gap-8 flex">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full flex-col justify-start lg:items-start items-center gap-3 flex"
              >
                <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                  Empowering Each Other to Succeed
                </h2>
                <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                  Our system is built to connect users with personalized
                  AI-driven learning tools. Every interaction we foster leads to
                  a more empowered learning experience. Together, we are
                  changing the way the world learns.
                </p>
              </motion.div>
            </div>
            <motion.button
              className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="px-1.5 text-white text-sm font-medium leading-6">
                Read More
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ComparisonSection = () => {
  const plans = [
    {
      name: "Aitomanabi",
      price: "$15/month",
      benefits: [
        "AI-powered personalized learning",
        "24/7 availability",
        "Interactive exercises & quizzes",
        "Affordable pricing",
      ],
      bgColor: "bg-indigo-600",
      textColor: "text-white",
      button: true,
    },
    {
      name: "Traditional Tutor",
      price: "$50+/hour",
      benefits: [
        "Limited availability",
        "High hourly cost",
        "Dependent on tutor’s schedule",
        "One-size-fits-all approach",
      ],
      bgColor: "bg-gray-100",
      textColor: "text-gray-800",
      button: false,
    },
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center py-12"
    >
      <h2 className="text-4xl font-extrabold text-gray-900">
        Find the best learning method for you.
      </h2>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ y: 30, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className={`p-8 rounded-2xl shadow-lg transition border border-gray-300 ${plan.bgColor} flex flex-col justify-between`}
          >
            <div>
              <h3 className={`text-2xl font-semibold ${plan.textColor}`}>
                {plan.name}
              </h3>
              <p className={`text-3xl font-bold mt-2 ${plan.textColor}`}>
                {plan.price}
              </p>
              <ul className={`mt-4 space-y-2 ${plan.textColor}`}>
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2">
                    ✅ {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {plan.button && (
              <motion.div
                className="mt-6"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <button className="bg-blue-400 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300">
                  Get Started
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Landing = () => {
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 });
  const { data: courses, isLoading, isError } = useGetCoursesQuery({});

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`, {
      scroll: false,
    });
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="landing__hero"
      >
        <div className="landing__hero-content">
          <h6 className="landing__title">
            Learn Japanese with AI-Powered Conversations.
          </h6>
          <p className="landing__description">
            Start Learning and try our free lessons today!
          </p>
          <div className="landing__cta">
            <Link href="/search" scroll={false}>
              <div className="landing__cta-button">Search for Courses</div>
            </Link>
          </div>
        </div>
        <div className="landing__hero-images">
          {["/jap.jpg", "/jap1.jpg", "/jap2.jpg"].map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Hero Banner ${index + 1}`}
              fill
              priority={index === currentImage}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`landing__hero-image ${
                index === currentImage ? "landing__hero-image--active" : ""
              }`}
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.3, once: true }}
        className="landing__featured"
      >
        <h2 className="landing__featured-title">Featured Courses</h2>
        <p className="landing__featured-description">
          FROM A BEGINNER TO A MASTER WE PROVIDE COURSES FIT FOR YOU!
        </p>

        <div className="landing__tags">
          {["N-5", "N-4", "N-3", "N-2", "N-1"].map((tag, index) => (
            <span key={index} className="landing__tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="landing__courses">
          {courses &&
            courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.courseId}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ amount: 0.4 }}
              >
                <CourseCardSearch
                  course={course}
                  onClick={() => handleCourseClick(course.courseId)}
                />
              </motion.div>
            ))}
        </div>
      </motion.div>
      {/* Pricing Section */}
      <ComparisonSection />
      <FeatureSection />
      <AboutUsSection />
    </motion.div>
  );
};

export default Landing;
// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import Image from "next/image";
// import { useCarousel } from "@/hooks/useCarousel";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useGetCourseQuery, useGetCoursesQuery } from "@/state/api";
// import Course from "@/components/courses/[courseId]/chapters/[chapterId]/page";
// import { useRouter } from "next/navigation";
// import CourseCardSearch from "@/components/CourseCardSearch";
// import { useUser } from "@clerk/nextjs";
// const LoadingSkeleton = () => {
//   return (
//     <div className="landing-skeleton">
//       <div className="landing-skeleton__hero">
//         <div className="landing-skeleton__hero-content">
//           <Skeleton className="landing-skeleton__title" />
//           <Skeleton className="landing-skeleton__subtitle" />
//           <Skeleton className="landing-skeleton__subtitle-secondary" />
//           <Skeleton className="landing-skeleton__button" />
//         </div>
//         <Skeleton className="landing-skeleton__hero-image" />
//       </div>

//       <div className="landing-skeleton__featured">
//         <Skeleton className="landing-skeleton__featured-title" />
//         <Skeleton className="landing-skeleton__featured-description" />

//         <div className="landing-skeleton__tags">
//           {[1, 2, 3, 4, 5].map((_, index) => (
//             <Skeleton key={index} className="landing-skeleton__tag" />
//           ))}
//         </div>

//         <div className="landing-skeleton__courses">
//           {[1, 2, 3, 4].map((_, index) => (
//             <Skeleton key={index} className="landing-skeleton__course-card" />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const Landing = () => {
//   const router = useRouter();
//   const currentImage = useCarousel({ totalImages: 3 });
//   const { data: courses, isLoading, isError } = useGetCoursesQuery({});

//   const handleCourseClick = (courseId: string) => {
//     router.push(`/search?id=${courseId}`);
//   };

//   if (isLoading) return <LoadingSkeleton />;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="landing"
//     >
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="landing__hero"
//       >
//         <div className="landing__hero-content">
//           <h1 className="landing__title">Courses</h1>
//           <p className="landing__description">
//             AItoMANABUDESUU!
//             <br />
//           </p>
//           <div className="landing__cta">
//             <Link href="/search">
//               <div className="landing__cta-button">Search for courses'</div>
//             </Link>
//           </div>
//         </div>
//         <div className="landing__hero-images">
//           {["/jap.jpg", "/jap1.jpg", "/jap2.jpg"].map((src, index) => (
//             <Image
//               key={src}
//               src={src}
//               alt={`Hero Banner ${index + 1}`}
//               fill
//               priority={index === currentImage}
//               sizes="(max-width: 768px) 100vm, (max-width: 1200px) 50vm, 33vm"
//               className={`landing__hero-image ${
//                 index === currentImage ? "landing__hero-image--active" : ""
//               }`}
//             />
//           ))}
//         </div>
//       </motion.div>
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         whileInView={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         viewport={{ amount: 0.3, once: true }}
//         className="landing__featured"
//       >
//         <h2 className="landing__featured-title"> Featured Courses</h2>
//         <p className="landing__featured-description">
//           From a beginner to a Master we Provide Courses in order to achieve
//           your language learning dream
//         </p>
//         <div className="landing__tags">
//           {["N-5", "N-5", "N-5", "N-5", "N-5"].map((tag, index) => (
//             <span key={index} className="landing__tag">
//               {tag}
//             </span>
//           ))}
//         </div>
//         <div className="landing__courses">
//           {courses &&
//             courses.slice(0, 4).map((course, index) => (
//               <motion.div
//                 key={course.courseId}
//                 initial={{ y: 20, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.5, delay: index * 0.2 }}
//                 viewport={{ amount: 0.4 }}
//               >
//                 <CourseCardSearch
//                   course={course}
//                   onClick={() => handleCourseClick(course.courseId)}
//                 />
//               </motion.div>
//             ))}
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Landing;

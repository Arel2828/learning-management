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
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
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

const ContactUs = () => {
  return (
    <div
      id="contact-us"
      className="overflow-hidden bg-white py-16 px-4 dark:bg-slate-900 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-slate-200 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-slate-400">
            Please use the form below to contact us. Thank you!
          </p>
        </div>
        <div className="mt-12">
          <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-slate-400"
              >
                Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                required
                className="border border-gray-300 block w-full rounded-md py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-slate-400"
              >
                Email
              </label>
              <input
                name="email"
                id="email"
                required
                type="email"
                className="border border-gray-300 block w-full rounded-md py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-slate-400"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                className="border border-gray-300 block w-full rounded-md py-3 px-4 shadow-sm focus:border-sky-500 focus:ring-sky-500 dark:border-white/5 dark:bg-slate-700/50 dark:text-white"
              />
            </div>
            <div className="flex justify-end sm:col-span-2">
              <button
                type="submit"
                className="inline-flex items-center rounded-md px-4 py-2 text-sky-500 border border-sky-500 hover:bg-sky-50 dark:hover:bg-gray-900"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
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

const tiers = [
  {
    name: "AiToManabi",
    id: "tier-basic",
    href: "#",
    priceMonthly: "₱300",
    priceUnit: "/course",
    description:
      "Perfect for beginners starting their Japanese learning journey.",
    features: [
      "Access to beginner lessons",
      "Basic vocabulary and grammar",
      "Interactive quizzes",
      "Community support forum",
    ],
    featured: false,
  },
  {
    name: "Traditional Tutor",
    id: "tier-pro",
    href: "#",
    priceMonthly: "₱600",
    priceUnit: "/hr",
    description: "Expensive and outdated method with limited flexibility.",
    features: [
      "High cost per session",
      "Fixed schedule with little flexibility",
      "Limited digital resources",
      "One-on-one interaction but inconsistent quality",
      "No AI-driven assistance",
    ],
    featured: true,
  },
];

function classNames(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

const ComparisonSection = () => {
  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the best learning method for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-600 sm:text-xl">
        Compare AI-driven learning with traditional tutoring and find the most
        effective way to master Japanese at your own pace.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "bg-gray-900 shadow-2xl opacity-50"
                : "bg-white/60",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10"
            )}
          >
            <h3
              className={classNames(
                tier.featured ? "text-red-400" : "text-indigo-600",
                "text-base font-semibold"
              )}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured
                    ? "text-gray-400 line-through"
                    : "text-gray-900",
                  "text-5xl font-semibold"
                )}
              >
                {tier.priceMonthly}
              </span>
              <span
                className={classNames(
                  tier.featured ? "text-gray-400" : "text-gray-500",
                  "text-sm"
                )}
              >
                {tier.priceUnit}
              </span>
            </p>
            <p
              className={classNames(
                tier.featured ? "text-gray-400" : "text-gray-600",
                "mt-6 text-base"
              )}
            >
              {tier.description}
            </p>
            <ul
              className={classNames(
                tier.featured ? "text-gray-400" : "text-gray-600",
                "mt-8 space-y-3 text-sm"
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(
                      tier.featured ? "text-red-400" : "text-indigo-600",
                      "h-6 w-5 flex-none"
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            {tier.id !== "tier-pro" && (
              <a
                href={tier.href}
                className={classNames(
                  "text-indigo-600 ring-1 ring-indigo-200 hover:ring-indigo-300",
                  "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold"
                )}
              >
                Choose This Plan
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const faqs = [
  {
    question: "How does AI help in learning Japanese?",
    answer:
      "Our AI adapts to your learning style, providing personalized lessons, instant feedback, and interactive exercises tailored to your progress.",
  },
  {
    question: "Is the AI assessment accurate?",
    answer:
      "Yes, the AI assessment is designed to analyze pronunciation, grammar, and vocabulary with precision, offering real-time feedback to enhance your learning.",
  },
  {
    question: "Can I track my learning progress?",
    answer:
      "Absolutely! You can monitor your progress with AI-driven insights and detailed reports, helping you stay on track with your learning goals.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-base/7 font-semibold text-indigo-600">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Everything You Need to Know
          </p>
        </motion.div>
        <dl className="mt-10 space-y-6 max-w-2xl mx-auto text-base text-gray-600">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.2,
              }}
              className="border-b border-gray-300 pb-6"
            >
              <dt
                className="cursor-pointer flex justify-between text-lg font-semibold text-gray-900"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span>{openIndex === index ? "-" : "+"}</span>
              </dt>
              {openIndex === index && (
                <motion.dd
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="mt-2 text-gray-600"
                >
                  {faq.answer}
                </motion.dd>
              )}
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  );
};

const banner = {
  title: "Master Japanese with AiToManabi",
  message:
    "Experience the future of language learning with AI-powered lessons and interactive support.",
  linkText: "Start Learning Now",
  linkHref: "#",
};

const Banner = () => {
  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 rounded-full mt-6">
      {/* Left Background Shape */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(-7rem,calc(50%-52rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="aspect-577/310 w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>

      {/* Right Background Shape */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[max(45rem,calc(50%+8rem))] -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
          className="aspect-577/310 w-[36.0625rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>

      {/* Banner Content */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm/6 text-gray-900">
          <strong className="font-semibold">{banner.title}</strong>
          <svg
            viewBox="0 0 2 2"
            aria-hidden="true"
            className="mx-2 inline size-0.5 fill-current"
          >
            <circle r={1} cx={1} cy={1} />
          </svg>
          {banner.message}
        </p>
        <a
          href={banner.linkHref}
          className="flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-xs hover:bg-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          {banner.linkText} <span aria-hidden="true">&rarr;</span>
        </a>
      </div>

      {/* Close Button */}
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon aria-hidden="true" className="size-5 text-gray-900" />
        </button>
      </div>
    </div>
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
      <Banner />

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
      <FAQSection />
      <ContactUs />
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

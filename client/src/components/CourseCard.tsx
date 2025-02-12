"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

// Import CircularProgressbar and its styles
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CourseCardProps {
  course: any;
  onGoToCourse: (course: any) => void;
  progress: {
    completedChapters: number;
    totalChapters: number;
  };
}

const CourseCard = ({ course, onGoToCourse, progress }: CourseCardProps) => {
  const progressPercentage = progress.totalChapters
    ? (progress.completedChapters / progress.totalChapters) * 100
    : 0;

  return (
    <Card
      className="course-card group cursor-pointer border rounded shadow hover:shadow-lg transition"
      onClick={() => onGoToCourse(course)}
    >
      <CardHeader className="relative">
        <Image
          src={course.image || "/placeholder.png"}
          alt={course.title}
          width={400}
          height={350}
          className="w-full h-auto object-cover"
          priority
        />

        {/* Circular progress bar positioned in the top-right */}
        <div className="absolute top-2 right-2 w-12 h-12 bg-black bg-opacity-60 rounded-full p-1">
          <CircularProgressbar
            value={progressPercentage}
            text={`${Math.round(progressPercentage)}%`}
            styles={buildStyles({
              textSize: "30px",
              textColor: "#fff",
              pathColor: "#4ade80", // Tailwind green-400
              trailColor: "#d6d6d6",
            })}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl font-semibold">
          {course.title}: {course.description}
        </CardTitle>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <div className="text-sm">{course.category}</div>
        <span className="text-lg font-bold">{formatPrice(course.price)}</span>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;

// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// // import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import Image from "next/image";
// import { formatPrice } from "@/lib/utils";

// const CourseCard = ({ course, onGoToCourse }: CourseCardProps) => {
//   return (
//     <Card className="course-card group" onClick={() => onGoToCourse(course)}>
//       <CardHeader className="course-card__header">
//         <Image
//           src={course.image || "/placeholder.png"}
//           alt={course.title}
//           width={400}
//           height={350}
//           className="course-card__image"
//           priority
//         />
//       </CardHeader>
//       <CardContent className="course-card__content">
//         <CardTitle className="course-card__title">
//           {course.title}: {course.description}
//         </CardTitle>

//         <div className="flex items-center gap-2">
//           {/* <Avatar className="w-6 h-6">
//             <AvatarImage alt={course.teacherName} />
//             <AvatarFallback className="bg-secondary-700 text-black">
//               {course.teacherName[0]}
//             </AvatarFallback>
//           </Avatar> */}

//           <p className="text-sm text-customgreys-dirtyGrey">
//             {course.teacherName}
//           </p>
//         </div>

//         <CardFooter className="course-card__footer">
//           <div className="course-card__category">{course.category}</div>
//           <span className="course-card__price">
//             {formatPrice(course.price)}
//           </span>
//         </CardFooter>
//       </CardContent>
//     </Card>
//   );
// };

// export default CourseCard;

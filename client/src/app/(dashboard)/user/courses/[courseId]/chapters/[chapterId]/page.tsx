// "use client";

// import { useRef, useState, useEffect } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import ReactPlayer from "react-player";
// import Loading from "@/components/Loading";
// import { useCourseProgressData } from "@/hooks/useCourseProgressData";

// const Course = () => {
//   const {
//     user,
//     course,
//     userProgress,
//     currentSection,
//     currentChapter,
//     isLoading,
//     isChapterCompleted,
//     updateChapterProgress,
//     hasMarkedComplete,
//     setHasMarkedComplete,
//   } = useCourseProgressData();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const content = currentChapter?.content || "";
//   const showPagination = content.length > 500;
//   const playerRef = useRef<ReactPlayer>(null);

//   useEffect(() => {
//     setCurrentIndex(0);
//   }, [currentChapter]);

//   const handleNext = () => {
//     setCurrentIndex((prev) => Math.min(prev + 500, content.length - 500));
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => Math.max(prev - 500, 0));
//   };

//   const handleProgress = ({ played }: { played: number }) => {
//     if (
//       played >= 0.8 &&
//       !hasMarkedComplete &&
//       currentChapter &&
//       currentSection &&
//       userProgress?.sections &&
//       !isChapterCompleted()
//     ) {
//       setHasMarkedComplete(true);
//       updateChapterProgress(
//         currentSection.sectionId,
//         currentChapter.chapterId,
//         true
//       );
//     }
//   };

//   if (isLoading) return <Loading />;
//   if (!user) return <div>Please sign in to view this course.</div>;
//   if (!course || !userProgress) return <div>Error loading course</div>;

//   return (
//     <div className="course">
//       <div className="course__container">
//         <div className="course__breadcrumb">
//           <div className="course__path">
//             {course.title} / {currentSection?.sectionTitle} /{" "}
//             <span className="course__current-chapter">
//               {currentChapter?.title}
//             </span>
//           </div>
//           <h2 className="course__title">{currentChapter?.title}</h2>
//           <div className="course__header">
//             <div className="course__instructor">
//               <Avatar className="course__avatar">
//                 <AvatarImage alt={course.teacherName} />
//                 <AvatarFallback className="course__avatar-fallback">
//                   {course.teacherName[0]}
//                 </AvatarFallback>
//               </Avatar>
//               <span className="course__instructor-name">
//                 {course.teacherName}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="course__content">
//           <Tabs defaultValue="Notes" className="course__tabs">
//             <TabsList className="course__tabs-list">
//               <TabsTrigger className="course__tab" value="Notes">
//                 Module
//               </TabsTrigger>
//               <TabsTrigger className="course__tab" value="Resources">
//                 Resources
//               </TabsTrigger>
//               <TabsTrigger className="course__tab" value="Quiz">
//                 Quiz
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent className="course__tab-content" value="Notes">
//               <Card className="course__tab-card">
//                 <CardHeader className="course__tab-header">
//                   <CardTitle className="justify-center flex">
//                     Module Content
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="course__tab-body relative">
//                   <div className="text-xl leading-8 min-h-[200px] relative whitespace-pre-line">
//                     {content.slice(currentIndex, currentIndex + 1000)}
//                     {showPagination && (
//                       <>
//                         <button
//                           onClick={handlePrev}
//                           disabled={currentIndex === 0}
//                           className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-100 p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                           aria-label="Previous page"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-6 w-6"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M15 19l-7-7 7-7"
//                             />
//                           </svg>
//                         </button>
//                         <button
//                           onClick={handleNext}
//                           disabled={currentIndex + 500 >= content.length}
//                           className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-100 p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                           aria-label="Next page"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-6 w-6"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M9 5l7 7-7 7"
//                             />
//                           </svg>
//                         </button>
//                       </>
//                     )}
//                   </div>
//                   {showPagination && (
//                     <div className="mt-4 text-sm text-gray-500 text-center">
//                       Showing {currentIndex + 1}-
//                       {Math.min(currentIndex + 500, content.length)} of{" "}
//                       {content.length} characters
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent className="course__tab-content" value="Resources">
//               <Card className="course__tab-card">
//                 <CardHeader className="course__tab-header">
//                   <CardTitle>Resources Content</CardTitle>
//                 </CardHeader>
//                 <CardContent className="course__tab-body">
//                   {/* Add resources content here */}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent className="course__tab-content" value="Quiz">
//               <Card className="course__tab-card">
//                 <CardHeader className="course__tab-header">
//                   <CardTitle>Quiz Content</CardTitle>
//                 </CardHeader>
//                 <CardContent className="course__tab-body">
//                   {/* Add quiz content here */}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Course;
"use client";

import { useRef, useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ReactPlayer from "react-player";
import Loading from "@/components/Loading";
import { useCourseProgressData } from "@/hooks/useCourseProgressData";

const Course = () => {
  const {
    user,
    course,
    userProgress,
    currentSection,
    currentChapter,
    isLoading,
    isChapterCompleted,
    updateChapterProgress,
    hasMarkedComplete,
    setHasMarkedComplete,
  } = useCourseProgressData();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Notes"); // Track active tab
  const content = currentChapter?.content || "";
  const chunkSize = 500;
  const totalChunks = Math.ceil(content.length / chunkSize);
  const currentChunk = Math.ceil(currentIndex / chunkSize) + 1;
  const playerRef = useRef<ReactPlayer>(null);

  // Replace your current markChapterComplete and handleNext logic with:

  useEffect(() => {
    const isLastPage = currentChunk === totalChunks;
    const shouldMarkComplete =
      activeTab === "Notes" &&
      isLastPage &&
      !hasMarkedComplete &&
      currentChapter &&
      currentSection;

    if (shouldMarkComplete) {
      console.log("Marking chapter as complete automatically");
      setHasMarkedComplete(true);
      updateChapterProgress(
        currentSection.sectionId,
        currentChapter.chapterId,
        true
      );
    }
  }, [
    currentIndex,
    activeTab,
    hasMarkedComplete,
    currentChapter,
    currentSection,
  ]);
  // Mark completion ONLY if user is on last page of "Module Content"
  const markChapterComplete = () => {
    if (
      activeTab === "Notes" && // Ensure it's the "Module Content" tab
      !hasMarkedComplete &&
      currentChapter &&
      currentSection &&
      userProgress?.sections
    ) {
      setHasMarkedComplete(true);
      updateChapterProgress(
        currentSection.sectionId,
        currentChapter.chapterId,
        true
      );
    }
  };

  const handleNext = () => {
    const nextIndex = currentIndex + chunkSize;

    if (nextIndex >= content.length) {
      markChapterComplete(); // Only mark when reaching last chunk
    }

    setCurrentIndex(Math.min(nextIndex, content.length));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - chunkSize, 0));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  if (isLoading) return <Loading />;
  if (!user) return <div>Please sign in to view this course.</div>;
  if (!course || !userProgress) return <div>Error loading course</div>;

  return (
    <div className="course">
      <div className="course__container">
        <div className="course__breadcrumb">
          <div className="course__path">
            {course.title} / {currentSection?.sectionTitle} /{" "}
            <span className="course__current-chapter">
              {currentChapter?.title}
            </span>
          </div>
          <h2 className="course__title">{currentChapter?.title}</h2>
          <div className="course__header">
            <div className="course__instructor">
              <Avatar className="course__avatar">
                <AvatarImage alt={course.teacherName} />
                <AvatarFallback className="course__avatar-fallback">
                  {course.teacherName[0]}
                </AvatarFallback>
              </Avatar>
              <span className="course__instructor-name">
                {course.teacherName}
              </span>
            </div>
          </div>
        </div>

        <div className="course__content">
          <Tabs
            defaultValue="Notes"
            className="course__tabs"
            onValueChange={handleTabChange}
          >
            <TabsList className="course__tabs-list">
              <TabsTrigger className="course__tab" value="Notes">
                Module
              </TabsTrigger>
              <TabsTrigger className="course__tab" value="Resources">
                Resources
              </TabsTrigger>
              <TabsTrigger className="course__tab" value="Quiz">
                Quiz
              </TabsTrigger>
            </TabsList>

            {/* MODULE CONTENT - Only this tab triggers progress completion */}
            <TabsContent className="course__tab-content" value="Notes">
              <Card className="course__tab-card">
                <CardHeader className="course__tab-header">
                  <CardTitle className="justify-center flex">
                    Module Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="course__tab-body relative">
                  <div className="text-xl leading-8 min-h-[200px] relative whitespace-pre-line">
                    {content.slice(currentIndex, currentIndex + chunkSize)}
                    {totalChunks > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          disabled={currentIndex === 0}
                          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-100 p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Previous page"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={currentChunk >= totalChunks}
                          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-100 p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Next page"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  {totalChunks > 1 && (
                    <div className="mt-4 text-sm text-gray-500 text-center">
                      Page {currentChunk} of {totalChunks}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* RESOURCES TAB */}
            <TabsContent className="course__tab-content" value="Resources">
              <Card className="course__tab-card">
                <CardHeader className="course__tab-header">
                  <CardTitle>Resources Content</CardTitle>
                </CardHeader>
                <CardContent className="course__tab-body">
                  {/* Add resources content here */}
                </CardContent>
              </Card>
            </TabsContent>

            {/* QUIZ TAB */}
            <TabsContent className="course__tab-content" value="Quiz">
              <Card className="course__tab-card">
                <CardHeader className="course__tab-header">
                  <CardTitle>Quiz Content</CardTitle>
                </CardHeader>
                <CardContent className="course__tab-body">
                  {/* Add quiz content here */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Course;

// "use client";

// import { useRef, useState, useEffect } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import ReactPlayer from "react-player";
// import Loading from "@/components/Loading";
// import { useCourseProgressData } from "@/hooks/useCourseProgressData";

// const Course = () => {
//   const {
//     user,
//     course,
//     userProgress,
//     currentSection,
//     currentChapter,
//     isLoading,
//     isChapterCompleted,
//     updateChapterProgress,
//     hasMarkedComplete,
//     setHasMarkedComplete,
//   } = useCourseProgressData();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [activeTab, setActiveTab] = useState("Notes");
//   const content = currentChapter?.content || "";
//   const chunkSize = 500;
//   const totalChunks = Math.ceil(content.length / chunkSize);
//   const currentChunk = Math.ceil(currentIndex / chunkSize) + 1;

//   // Calculate course progress
//   const completedSections = userProgress?.sections.filter(
//     (section) => section.isCompleted // Replace 'isCompleted' with the actual property name from SectionProgress
//   ).length;
//   const totalSections = userProgress?.sections.length;
//   const progress = totalSections
//     ? Math.round(((completedSections || 0) / totalSections) * 100)
//     : 0;

//   const playerRef = useRef<ReactPlayer>(null);

//   useEffect(() => {
//     const isLastPage = currentChunk === totalChunks;
//     const shouldMarkComplete =
//       activeTab === "Notes" &&
//       isLastPage &&
//       !hasMarkedComplete &&
//       currentChapter &&
//       currentSection;

//     if (shouldMarkComplete) {
//       setHasMarkedComplete(true);
//       updateChapterProgress(
//         currentSection.sectionId,
//         currentChapter.chapterId,
//         true
//       );
//     }
//   }, [
//     currentIndex,
//     activeTab,
//     hasMarkedComplete,
//     currentChapter,
//     currentSection,
//   ]);

//   const markChapterComplete = () => {
//     if (
//       activeTab === "Notes" &&
//       !hasMarkedComplete &&
//       currentChapter &&
//       currentSection &&
//       userProgress?.sections
//     ) {
//       setHasMarkedComplete(true);
//       updateChapterProgress(
//         currentSection.sectionId,
//         currentChapter.chapterId,
//         true
//       );
//     }
//   };

//   const handleNext = () => {
//     const nextIndex = currentIndex + chunkSize;
//     if (nextIndex >= content.length) {
//       markChapterComplete();
//     }
//     setCurrentIndex(Math.min(nextIndex, content.length));
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => Math.max(prev - chunkSize, 0));
//   };

//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//   };

//   if (isLoading) return <Loading />;
//   if (!user) return <div>Please sign in to view this course.</div>;
//   if (!course || !userProgress) return <div>Error loading course</div>;

//   return (
//     <div className="course">
//       <div className="course__container">
//         <div className="course__breadcrumb">
//           <div className="course__path">
//             {course.title} / {currentSection?.sectionTitle} /{" "}
//             <span className="course__current-chapter">
//               {currentChapter?.title}
//             </span>
//           </div>
//           <h2 className="course__title">{currentChapter?.title}</h2>
//           <div className="course__header">
//             <div className="course__instructor">
//               <Avatar className="course__avatar">
//                 <AvatarImage alt={course.teacherName} />
//                 <AvatarFallback className="course__avatar-fallback">
//                   {course.teacherName[0]}
//                 </AvatarFallback>
//               </Avatar>
//               <span className="course__instructor-name">
//                 {course.teacherName}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="course__content">
//           <Tabs
//             defaultValue="Notes"
//             className="course__tabs"
//             onValueChange={handleTabChange}
//           >
//             <TabsList className="course__tabs-list">
//               <TabsTrigger className="course__tab" value="Notes">
//                 Module
//               </TabsTrigger>
//               <TabsTrigger className="course__tab" value="Resources">
//                 Resources
//               </TabsTrigger>
//               <TabsTrigger className="course__tab" value="Quiz">
//                 Quiz
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent className="course__tab-content" value="Notes">
//               <Card className="course__tab-card">
//                 <CardHeader className="course__tab-header">
//                   <CardTitle className="justify-center flex">
//                     Module Content
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="course__tab-body relative">
//                   <div className="text-xl leading-8 min-h-[200px] relative whitespace-pre-line">
//                     {content.slice(currentIndex, currentIndex + chunkSize)}
//                     {totalChunks > 1 && (
//                       <>
//                         <button
//                           onClick={handlePrev}
//                           disabled={currentIndex === 0}
//                           className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-100 p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                           aria-label="Previous page"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-6 w-6"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M15 19l-7-7 7-7"
//                             />
//                           </svg>
//                         </button>
//                         <button
//                           onClick={handleNext}
//                           disabled={currentChunk >= totalChunks}
//                           className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-100 p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                           aria-label="Next page"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-6 w-6"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M9 5l7 7-7 7"
//                             />
//                           </svg>
//                         </button>
//                       </>
//                     )}
//                   </div>
//                   {totalChunks > 1 && (
//                     <div className="mt-4 text-sm text-gray-500 text-center">
//                       Page {currentChunk} of {totalChunks}
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Course;

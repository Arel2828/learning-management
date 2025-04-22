"use client";

import { CustomFormField } from "@/components/CustomFormField";
import { uploadImage } from "@/lib/utils";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { courseSchema } from "@/lib/schemas";
import {
  centsToDollars,
  createCourseFormData,
  uploadAllVideos,
} from "@/lib/utils";
import { openSectionModal, setSections } from "@/state";
import {
  useGetCourseQuery,
  useUpdateCourseMutation,
  useGetUploadVideoUrlMutation,
} from "@/state/api";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus, Edit } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DroppableComponent from "./Droppable";
import ChapterModal from "./ChapterModal";
import SectionModal from "./SectionModal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const CourseEditor = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: course, isLoading, refetch } = useGetCourseQuery(id);
  const [updateCourse] = useUpdateCourseMutation();
  const [getUploadVideoUrl] = useGetUploadVideoUrlMutation();
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >(() => {
    if (typeof window !== "undefined") {
      const savedCategories = localStorage.getItem("courseCategories");
      return savedCategories ? JSON.parse(savedCategories) : [];
    }
    return [];
  });
  const [newCategory, setNewCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [editCategory, setEditCategory] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");

  const dispatch = useAppDispatch();
  const { sections } = useAppSelector((state) => state.global.courseEditor);

  const methods = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseTitle: "",
      courseDescription: "",
      courseCategory: "",
      coursePrice: "0",
      courseStatus: false,
    },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("courseCategories", JSON.stringify(categories));
    }
  }, [categories]);

  useEffect(() => {
    if (course) {
      methods.reset({
        courseTitle: course.title,
        courseDescription: course.description,
        courseCategory: course.category,
        coursePrice: centsToDollars(course.price),
        courseStatus: course.status === "Published",
      });
      dispatch(setSections(course.sections || []));

      if (course.category) {
        setCategories((prev) => {
          const exists = prev.some((c) => c.value === course.category);
          if (!exists) {
            const newCategories = [
              ...prev,
              { value: course.category, label: course.category },
            ];
            return newCategories;
          }
          return prev;
        });
      }
    }
  }, [course, methods]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (editCategory) {
      setEditedCategoryName(editCategory.label);
    }
  }, [editCategory]);

  const handleImageUpload = async (file: File) => {
    const uploadUrl = "";
    const fileType = file.type;

    try {
      const imageUrl = await uploadImage(file, uploadUrl, fileType);
      console.log("Uploaded image URL:", imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCat = {
        value: newCategory.trim(),
        label: newCategory.trim(),
      };
      setCategories((prev) => [...prev, newCat]);
      setIsDialogOpen(false);
      setNewCategory("");
    }
  };

  const handleEditCategory = () => {
    if (editCategory && editedCategoryName.trim()) {
      const updatedCategories = categories.map((cat) =>
        cat.value === editCategory.value
          ? {
              value: editedCategoryName.trim(),
              label: editedCategoryName.trim(),
            }
          : cat
      );

      setCategories(updatedCategories);

      if (methods.getValues("courseCategory") === editCategory.value) {
        methods.setValue("courseCategory", editedCategoryName.trim());
      }

      setEditCategory(null);
      setEditedCategoryName("");
    }
  };

  const onSubmit = async (data: CourseFormData) => {
    try {
      const updatedSections = await uploadAllVideos(
        sections,
        id,
        getUploadVideoUrl
      );

      const formData = createCourseFormData(data, updatedSections);

      await updateCourse({
        courseId: id,
        formData,
      }).unwrap();

      refetch();
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  return (
    <div>
      {/* The rest of your component remains the same */}
      <div className="flex items-center gap-5 mb-5">
        <button
          className="flex items-center border border-customgreys-dirtyGrey rounded-lg p-2 gap-2 cursor-pointer hover:bg-customgreys-dirtyGrey hover:text-white-100 text-customgreys-dirtyGrey"
          onClick={() => router.push("/teacher/courses", { scroll: false })}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </button>
      </div>

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Header
            title="Course Setup"
            subtitle="Complete all fields and save your course"
            rightElement={
              <div className="flex items-center space-x-4">
                <CustomFormField
                  name="courseStatus"
                  label={methods.watch("courseStatus") ? "Published" : "Draft"}
                  type="switch"
                  className="flex items-center space-x-2"
                  labelClassName={`text-sm font-medium ${
                    methods.watch("courseStatus")
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                  inputClassName="data-[state=checked]:bg-green-500"
                />
                <Button
                  type="submit"
                  className="bg-primary-700 hover:bg-primary-600"
                >
                  {methods.watch("courseStatus")
                    ? "Update Published Course"
                    : "Save Draft"}
                </Button>
              </div>
            }
          />

          <div className="flex justify-between md:flex-row flex-col gap-10 mt-5 font-dm-sans">
            <div className="basis-1/2">
              <div className="space-y-4">
                <CustomFormField
                  name="courseTitle"
                  label="Course Title"
                  type="text"
                  placeholder="Write course title here"
                  className="border-none"
                  initialValue={course?.title}
                />

                <CustomFormField
                  name="courseDescription"
                  label="Course Description"
                  type="textarea"
                  placeholder="Write course description here"
                  initialValue={course?.description}
                />

                <div className="flex gap-2 items-end">
                  <div className="flex-1 relative">
                    <CustomFormField
                      name="courseCategory"
                      label="Course Category"
                      type="select"
                      placeholder="Select or add category"
                      options={categories}
                      initialValue={course?.category}
                    />
                    <div className="absolute right-2 top-7 flex gap-1 flex-wrap">
                      {categories.map((cat) => (
                        <span
                          key={cat.value}
                          className="bg-gray-100 px-2 py-1 rounded-full text-xs flex items-center gap-1 mb-1"
                        >
                          {cat.label}
                          <button
                            onClick={() => setEditCategory(cat)}
                            className="hover:text-primary-700"
                          >
                            <Edit className="w-3 h-3 cursor-pointer" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mb-1"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Category
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                      </DialogHeader>
                      <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter category name"
                      />
                      <DialogFooter>
                        <Button onClick={handleAddCategory}>
                          Add Category
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Dialog
                  open={!!editCategory}
                  onOpenChange={(open) => !open && setEditCategory(null)}
                >
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    <Input
                      value={editedCategoryName}
                      onChange={(e) => setEditedCategoryName(e.target.value)}
                      placeholder="Edit category name"
                    />
                    <DialogFooter>
                      <Button onClick={handleEditCategory}>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <CustomFormField
                  name="coursePrice"
                  label="Course Price"
                  type="number"
                  placeholder="0"
                  initialValue={course?.price}
                />

                <div className="mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const imageUploadElement =
                        document.getElementById("image-upload");
                      if (imageUploadElement) {
                        imageUploadElement.click();
                      }
                    }}
                    className="w-full py-2 text-white bg-primary-700 hover:bg-primary-600 border-none rounded-lg shadow-md"
                  >
                    Add Image
                  </Button>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImage(e.target.files ? e.target.files[0] : null)
                    }
                    className="hidden"
                  />
                  {image && (
                    <div className="mt-2">
                      <p className="text-gray-600">
                        Image Selected: {image.name}
                      </p>
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Selected"
                        className="mt-2 w-full h-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-customgreys-darkGrey mt-4 md:mt-0 p-4 rounded-lg basis-1/2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold text-secondary-foreground">
                  Sections
                </h2>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    dispatch(openSectionModal({ sectionIndex: null }))
                  }
                  className="border-none text-primary-700 group"
                >
                  <Plus className="mr-1 h-4 w-4 text-primary-700 group-hover:white-100" />
                  <span className="text-primary-700 group-hover:white-100">
                    Add Section
                  </span>
                </Button>
              </div>

              {isLoading ? (
                <p>Loading course content...</p>
              ) : sections.length > 0 ? (
                <DroppableComponent />
              ) : (
                <p>No sections available</p>
              )}
            </div>
          </div>
        </form>
      </Form>

      <ChapterModal />
      <SectionModal />
    </div>
  );
};

export default CourseEditor;

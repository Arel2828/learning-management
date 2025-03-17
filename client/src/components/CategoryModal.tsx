// "use client";

// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Form } from "@/components/ui/form";
// import { CustomFormField } from "../components/CustomFormField";
// import { useAppDispatch } from "@/state/redux";
// import { addCategory } from "@/features/categorySlice";

// interface CategoryModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// const CategoryModal = ({ open, onOpenChange }: CategoryModalProps) => {
//   const dispatch = useAppDispatch();
//   const form = useForm({
//     defaultValues: {
//       label: "",
//       value: "",
//     },
//   });

//   const handleSubmit = (data: { label: string; value: string }) => {
//     dispatch(
//       addCategory({
//         label: data.label.trim(),
//         value: data.value.trim().toUpperCase(),
//       })
//     );
//     onOpenChange(false);
//     form.reset();
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add New Category</DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(handleSubmit)}
//             className="space-y-4"
//           >
//             <CustomFormField
//               name="label"
//               label="Category Name"
//               type="text"
//               placeholder="e.g., N-1"
//             />
//             <CustomFormField
//               name="value"
//               label="Category Value"
//               type="text"
//               placeholder="e.g., N-1"
//             />
//             <Button type="submit" className="w-full">
//               Add Category
//             </Button>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CategoryModal;

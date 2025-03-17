// // src/state/features/categorySlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { courseCategories } from "@/lib/utils";

// export interface Category {
//   value: string;
//   label: string;
// }

// const initialState: Category[] = courseCategories;

// const categorySlice = createSlice({
//   name: "categories",
//   initialState,
//   reducers: {
//     addCategory: (state, action: PayloadAction<Category>) => {
//       if (!state.some((cat) => cat.value === action.payload.value)) {
//         state.push(action.payload);
//       }
//     },
//   },
// });

// export const { addCategory } = categorySlice.actions;
// export default categorySlice.reducer;

// // src/state/store.ts
// import { configureStore } from "@reduxjs/toolkit";
// import { api } from "./api"; // Your existing RTK Query API slice
// import globalReducer from "../state/globalSlice"; // Your existing global slice
// import categoryReducer from "../features/categorySlice"; // Your categories slice

// // Configure the Redux store
// export const store = configureStore({
//   reducer: {
//     global: globalReducer, // Your existing global reducer
//     categories: categoryReducer, // Add the categories slice here
//     [api.reducerPath]: api.reducer, // Your existing API reducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware), // Add API middleware
// });

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courseCategories } from "@/lib/utils";

interface ToolbarProps {
  onSearch: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const Toolbar = ({ onSearch, onCategoryChange }: ToolbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="toolbar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search courses"
        className="toolbar__search"
      />
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger className="toolbar__select">
          <SelectValue placeholder="Categories" />
        </SelectTrigger>
        <SelectContent className="bg-customgreys-primarybg hover:bg-customgreys-primarybg">
          <SelectItem value="all" className="toolbar__select-item">
            All Categories
          </SelectItem>
          <SelectItem value="other" className="toolbar__select-item">
            Other Categories
          </SelectItem>
          {courseCategories.map((category) => (
            <SelectItem
              key={category.value}
              value={category.value}
              className="toolbar__select-item"
            >
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Toolbar;

// "use client";

// import React, { useState } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useAppSelector } from "@/state/redux";

// interface ToolbarProps {
//   onSearch: (term: string) => void;
//   onCategoryChange: (category: string) => void;
// }

// const Toolbar = ({ onSearch, onCategoryChange }: ToolbarProps) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const categories = useAppSelector((state) => state.categories); // Get categories from Redux

//   const handleSearch = (value: string) => {
//     setSearchTerm(value);
//     onSearch(value);
//   };

//   return (
//     <div className="toolbar">
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => handleSearch(e.target.value)}
//         placeholder="Search courses"
//         className="toolbar__search"
//       />
//       <Select onValueChange={onCategoryChange}>
//         <SelectTrigger className="toolbar__select">
//           <SelectValue placeholder="Categories" />
//         </SelectTrigger>
//         <SelectContent className="bg-customgreys-primarybg hover:bg-customgreys-primarybg">
//           <SelectItem value="all" className="toolbar__select-item">
//             All Categories
//           </SelectItem>
//           {categories.map((category) => (
//             <SelectItem
//               key={category.value}
//               value={category.value}
//               className="toolbar__select-item"
//             >
//               {category.label}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };

// export default Toolbar;

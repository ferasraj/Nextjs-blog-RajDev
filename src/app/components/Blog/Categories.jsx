import React from "react";
import { twMerge } from "tailwind-merge";
import Category from "./Category";
import { slug } from "github-slugger";
import { toCapitalizedName } from "@/src/utils/toCapitalizedName";

const Categories = ({ categories, currentSlug }) => {
  return (
    <div
      className={twMerge(
        " px-0 md:px-10 sxl:px-20 mt-10 border-t-2 text-dark dark:text-light",
        " border-b-2 border-solid border-dark dark:border-light ",
        "py-4 flex items-start flex-wrap font-medium mx-5 md:mx-10"
      )}
    >
      {categories.map((cat) => (
        <Category
          key={cat}
          link={`/categories/${cat}`}
          name={toCapitalizedName(cat)}
          active={currentSlug === slug(cat)}
        />
      ))}
    </div>
  );
};

export default Categories;

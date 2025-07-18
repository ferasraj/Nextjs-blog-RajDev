import { format, parseISO } from "date-fns";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { slug } from "github-slugger";
import { toCapitalizedName } from "@/src/utils/toCapitalizedName";
import ViewCounter from "./ViewCounter";

const BlogDetails = ({ blog, slug: blogSlug }) => {
  console.log(blogSlug);
  return (
    <div
      className={twMerge(
        "px-2  md:px-10 bg-accent dark:bg-accentDark text-light dark:text-dark ",
        "py-2 flex items-center justify-around flex-wrap text-lg sm:text-xl font-medium ",
        "mx-5  md:mx-10 rounded-lg"
      )}
    >
      <time className="m-3">
        {format(parseISO(blog.publishedAt), "LLLL d, yyyy")}
      </time>
      <span className="m-3">
        <ViewCounter slug={blogSlug} />
      </span>
      <div className="m-3">{blog.readingTime.text}</div>
      <Link href={`/categories/${slug(blog.tags[0])}`} className="m-3">
        #{toCapitalizedName(blog.tags[0])}
      </Link>
    </div>
  );
};

export default BlogDetails;

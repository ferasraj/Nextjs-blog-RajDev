import { allBlogs } from "@/.contentlayer/generated";
import { slug } from "github-slugger";
import Categories from "../../components/Blog/Categories";
import BlogLayoutThree from "../../components/Blog/BlogLayoutThree";
import { getUniqueTags } from "@/src/utils/getUniqueTags";
import { toCapitalizedName } from "@/src/utils/toCapitalizedName";
import siteMetadata from "@/src/utils/siteMetaData";

// Create a dynamic route for each category using SSG (Static Site Generation) instead of Server-Side Rendering (SSR)
export async function generateStaticParams() {
  const allCategories = getUniqueTags(allBlogs);
  return allCategories.map((slug) => ({ slug }));
}

// (SEO) Metadata for title and description
export async function generateMetadata({ params }) {
  const categoryName = toCapitalizedName(params.slug);

  return {
    title: `Best ${categoryName} Tutorials & Articles | `,
    description: `Explore insightful blogs and tutorials on ${
      params.slug === "all" ? "web development" : categoryName
    }. Stay up to date with the latest in tech.`,
    alternates: {
      canonical: "https://example.com/categories/web-development",
    },
    openGraph: {
      title: `Best ${categoryName} Tutorials & Articles | Raj Dev Blog`,
      description: `Explore insightful blogs and tutorials on ${
        params.slug === "all" ? "web development" : categoryName
      }. Stay up to date with the latest in tech.`,
      url: `${siteMetadata.siteUrl}/categories/${params.slug}`,
      siteName: "Raj Dev Blog",
      type: "website",
      images: [siteMetadata.socialBanner], // أو صورة ديناميكية
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Blogs`,
      description: `Explore insightful blogs and tutorials on ${
        params.slug === "all" ? "web development" : categoryName
      }. Stay up to date with the latest in tech.`,
      images: [siteMetadata.socialBanner],
    },
  };
}
const CategoryPage = ({ params }) => {
  // 1. اجلب التصنيفات
  const allCategories = getUniqueTags(allBlogs);

  // 2. فلتر المقالات حسب التصنيف
  const blogs = allBlogs
    .filter((blog) => {
      if (params.slug === "all") return true;
      return blog.tags.some((tag) => slug(tag) === params.slug);
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return (
    <article className="mt-12 flex flex-col text-dark dark:text-light">
      <div className=" px-5 sm:px-10  md:px-24  sxl:px-32 flex flex-col">
        <h1 className="mt-6 font-semibold text-2xl md:text-4xl lg:text-5xl">
          #{toCapitalizedName(params.slug)}
        </h1>
        <span className="mt-2 inline-block">
          Discover more categories and expand your knowledge!
        </span>
      </div>
      <Categories categories={allCategories} currentSlug={params.slug} />

      <div className="grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 grid-rows-2 gap-16 mt-5 sm:mt-10 md:mt-24 sxl:mt-32 px-5 sm:px-10 md:px-24 sxl:px-32">
        {blogs.map((blog, index) => (
          <article key={index} className="col-span-1 row-span-1 relative">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </article>
  );
};

export default CategoryPage;

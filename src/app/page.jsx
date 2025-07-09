import { allBlogs } from "contentlayer/generated";
import HomeCoverSection from "./components/Home/HomeCoverSection";
import FeaturedPosts from "./components/Home/FeaturedPosts";
import RecentPosts from "./components/Home/RecentPosts";
import siteMetadata from "@/src/utils/siteMetaData";

export const metadata = {
  title: "My Blog | Frontend Articles, Tutorials & More",
  description:
    "Explore high-quality frontend development articles, tips, and tutorials on JavaScript, React, Tailwind CSS, and more. Stay up to date with modern web technologies.",
  alternates: {
    canonical: siteMetadata.siteUrl, // e.g., https://myblog.com/
  },
  openGraph: {
    title: "My Blog | Frontend Articles, Tutorials & More",
    description:
      "Explore high-quality frontend development articles, tips, and tutorials on JavaScript, React, Tailwind CSS, and more.",
    url: siteMetadata.siteUrl,
    siteName: "My Blog",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: siteMetadata.socialBanner, // or any general cover image
        width: 1200,
        height: 630,
        alt: "My Blog Open Graph Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Blog | Frontend Articles, Tutorials & More",
    description:
      "Explore high-quality frontend development articles, tips, and tutorials on JavaScript, React, Tailwind CSS, and more.",
    images: [siteMetadata.socialBanner],
    creator: siteMetadata.authorTwitter || "@your_twitter", // optional
  },
};

export default function Home() {
  // console.log("allBlogs", allBlogs);
  return (
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection blogs={allBlogs} />
      <FeaturedPosts blogs={allBlogs} />
      <RecentPosts blogs={allBlogs} />
    </main>
  );
}

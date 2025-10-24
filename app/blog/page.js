// @flow strict

import { personalData } from "@/utils/data/personal-data";
import BlogCard from "../components/homepage/blog/blog-card";

async function getBlogs() {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json();
  return data;
};

async function page() {
  const blogs = await getBlogs();

  return (
    <div className="py-8">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-2xl rounded-md">
            All Blog
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-8 xl:gap-10">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog, i) => (
            (blog?.cover_image || blog?.social_image) &&
            <BlogCard blog={blog} key={i} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-400 text-lg">No blogs available at the moment.</p>
            <p className="text-gray-500 text-sm mt-2">Check back later for new content!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
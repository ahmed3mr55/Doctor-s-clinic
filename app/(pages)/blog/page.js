import React from "react";
import BlogPage from "@/app/features/blog/BlogPage";

export const metadata = {
  title: "مدونة د. عبدالرحمن عوف - أحدث المقالات والنصائح الطبية",
  description: "اكتشف مقالات حصرية من د. عبدالرحمن عوف حول نحت القوام، تجميل الوجه، نصائح طبية والمزيد. كن أول من يعرف أحدث التقنيات والاتجاهات في عالم الجراحة التجميلية.",
};

const page = ({ searchParams }) => {
  return (
    <div>
      <BlogPage searchParams={searchParams} />
    </div>
  );
};

export default page;

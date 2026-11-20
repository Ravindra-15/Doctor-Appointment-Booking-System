import { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import PageBanner from "../../components/PageBanner/PageBanner";
import { blogs } from "../../assets/data/blogs";
import { formatDate } from "../../utils/formateDate";

const categories = ["All", ...new Set(blogs.map((b) => b.category))];

const Blog = () => {
  const [category, setCategory] = useState("All");
  const posts = category === "All" ? blogs : blogs.filter((b) => b.category === category);

  return (
    <>
      <PageBanner
        title="Health Blog"
        crumb="Blog"
        subtitle="Simple, trusted health tips and guides written by our doctors."
      />

      <section>
        <div className="container">
          {/* category filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-[50px]">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`px-5 py-2 rounded-full border border-solid border-primaryColor text-[15px] font-[600] transition
                ${category === item ? "bg-primaryColor text-white" : "text-headingColor hover:bg-[#0067ff14]"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-panelShadow transition-shadow duration-300 flex flex-col"
              >
                <Link to={`/blog/${post.id}`} className="block h-[220px] overflow-hidden bg-[#CCF0F3]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-3 text-[13px] font-semibold rounded">
                      {post.category}
                    </span>
                    <span className="text-[14px] text-textColor">{post.readTime}</span>
                  </div>

                  <h2 className="text-[20px] leading-[30px] font-[700] text-headingColor mt-4">
                    <Link to={`/blog/${post.id}`} className="hover:text-primaryColor transition">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-[16px] leading-7 text-textColor mt-3 flex-1">{post.excerpt}</p>

                  <div className="flex items-center justify-between mt-6">
                    <span className="text-[14px] text-textColor">{formatDate(post.date)}</span>
                    <Link
                      to={`/blog/${post.id}`}
                      aria-label={`Read ${post.title}`}
                      className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                    >
                      <BsArrowRight className="group-hover:text-white w-6 h-5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;

import { Link, useParams } from "react-router-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { blogs } from "../../assets/data/blogs";
import { formatDate } from "../../utils/formateDate";
import NotFound from "../NotFound";

const BlogDetails = () => {
  const { id } = useParams();
  const post = blogs.find((b) => b.id === id);

  if (!post) return <NotFound />;

  const related = blogs.filter((b) => b.id !== post.id).slice(0, 3);

  return (
    <section>
      <div className="max-w-[870px] px-5 mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-primaryColor font-[600] hover:gap-3 transition-all"
        >
          <BsArrowLeft /> Back to blog
        </Link>

        <div className="flex flex-wrap items-center gap-3 mt-6">
          <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-3 text-[14px] font-semibold rounded">
            {post.category}
          </span>
          <span className="text-[15px] text-textColor">
            {formatDate(post.date)} · {post.readTime}
          </span>
        </div>

        <h1 className="heading mt-4">{post.title}</h1>

        <figure className="mt-8 rounded-xl overflow-hidden bg-[#CCF0F3] max-h-[420px]">
          <img src={post.image} alt={post.title} className="w-full h-full max-h-[420px] object-cover object-top" />
        </figure>

        <div className="mt-6">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text__para">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-xl bg-[#fff9ea] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[18px] leading-7 font-[600] text-headingColor">
            Have questions about your health? Talk to a specialist.
          </p>
          <Link to="/doctors" className="btn mt-0 flex items-center gap-2 whitespace-nowrap">
            Find a Doctor <BsArrowRight />
          </Link>
        </div>

        <h2 className="text-[24px] leading-9 font-[700] text-headingColor mt-[60px] mb-6">
          More articles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {related.map((item) => (
            <Link
              key={item.id}
              to={`/blog/${item.id}`}
              className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-panelShadow transition-shadow"
            >
              <div className="h-[140px] overflow-hidden bg-[#CCF0F3]">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top" />
              </div>
              <p className="p-4 text-[16px] leading-6 font-[600] text-headingColor">{item.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;

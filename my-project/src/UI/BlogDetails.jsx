import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import blogbg from "../../public/blogbg.jpg";

const BlogDetails = () => {

  const { id } = useParams();

  const [post, setPost] = useState(null);

  // FETCH BLOG
  const fetchSingleBlog = async () => {

    try {

      const res = await axios.get(
        `https://photography-xzfi.onrender.com/api/blog/${id}`
      );

      setPost(res.data.blog);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchSingleBlog();

  }, [id]);

  // LOADING
  if (!post) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-black">

        <h1 className="text-white text-3xl font-bold animate-pulse">
          Loading Blog...
        </h1>

      </div>

    );

  }

  return (

    <div
      className="
        relative
        min-h-screen
        bg-cover
        bg-center
        py-20
        px-4
        md:px-10
        flex
        items-center
        justify-center
      "
      style={{
        backgroundImage: `url(${blogbg})`,
      }}
    >

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* MAIN CARD */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-6xl
          bg-white/10
          backdrop-blur-xl
          rounded-3xl
          overflow-hidden
          border
          border-white/20
          shadow-2xl
          mt-14
        "
      >

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="overflow-hidden">

            <img
              src={`https://photography-xzfi.onrender.com/uploads/${post.image}`}
              alt={post.title}
              className="
                w-full
                h-[350px]
                md:h-[500px]
                object-cover
                hover:scale-105
                duration-500
                transition
              "
            />

          </div>

          {/* CONTENT */}
          <div className="p-8 md:p-12 flex flex-col justify-center text-white">

            {/* BACK BUTTON */}
            <Link
              to="/blog"
              className="
                inline-flex
                items-center
                gap-2
                text-pink-400
                hover:text-pink-300
                transition
                font-semibold
                mb-6
              "
            >
              ← Back to Blog
            </Link>

            {/* DATE */}
            <p className="text-pink-300 uppercase tracking-widest text-sm mb-4">
              {post.date}
            </p>

            {/* TITLE */}
            <h1
              className="
                text-4xl
                md:text-5xl
                font-bold
                leading-tight
                mb-6
              "
            >
              {post.title}
            </h1>

            {/* EXCERPT */}
            <p
              className="
                text-gray-200
                text-lg
                leading-8
              "
            >
              {post.excerpt}
            </p>

          </div>

        </div>

        {/* FULL CONTENT */}
        <div
          className="
            border-t
            border-white/10
            p-8
            md:p-12
            text-white
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              mb-8
              text-pink-400
            "
          >
            Full Story
          </h2>

          <div
            className="
              text-gray-200
              leading-9
              text-lg
              whitespace-pre-line
            "
          >
            {post.fullText}
          </div>

        </div>

      </div>

    </div>

  );

};

export default BlogDetails;
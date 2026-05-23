import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import blogbg from "../../public/blogbg.jpg";

const Blog = () => {

  const [blogs, setBlogs] = useState([]);

  // FETCH BLOGS
  const fetchBlogs = async () => {

    try {

      const res = await axios.get(
        "https://photography-xzfi.onrender.com/api/blog/all"
      );

      setBlogs(res.data.blogs);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchBlogs();

  }, []);

  return (

    <div
      className="relative min-h-screen bg-cover bg-center px-5 py-16 text-white"
      style={{
        backgroundImage: `url(${blogbg})`,
      }}
    >

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto mt-14">

        {/* HEADER */}
        <header className="text-center mb-16">

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Photography Studio Blog
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Tips, inspiration, and behind-the-scenes from our studio
          </p>

        </header>

        {/* BLOG GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {
            blogs.map((post) => (

              <div
                key={post._id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition duration-300"
              >

                {/* IMAGE */}
                <div className="overflow-hidden">

                  <img
                    src={`https://photography-xzfi.onrender.com/uploads/${post.image}`}
                    alt={post.title}
                    className="w-full h-60 object-cover hover:scale-110 transition duration-500"
                  />

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  {/* DATE */}
                  <p className="text-pink-300 text-sm mb-3">
                    {post.date}
                  </p>

                  {/* TITLE */}
                  <h2 className="text-2xl font-bold mb-4">
                    {post.title}
                  </h2>

                  {/* EXCERPT */}
                  <p className="text-gray-200 leading-7">

                    {
                      (post.excerpt || "").length > 100
                        ? post.excerpt.slice(0, 100) + "..."
                        : post.excerpt
                    }

                  </p>

                  {/* BUTTON */}
                  <Link
                    to={`/blogdetails/${post._id}`}
                  >

                    <button
                      className="
                        mt-6
                        px-6
                        py-3
                        bg-gradient-to-r
                        from-pink-500
                        to-red-500
                        rounded-xl
                        font-semibold
                        hover:scale-105
                        transition
                        shadow-lg
                      "
                    >
                      Read More
                    </button>

                  </Link>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>

  );

};

export default Blog;
import React, { useEffect, useState } from "react";
import axios from "axios";

import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Testimonials = () => {

  const [reviews, setReviews] = useState([]);

  // Fetch Testimonials
  const fetchTestimonials = async () => {

    try {

      const res = await axios.get(
        "https://photography-xzfi.onrender.com/api/testimonials"
      );

      setReviews(res.data.testimonials);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchTestimonials();

  }, []);

  return (

    <section className="bg-zinc-950 text-white py-20 px-4 md:px-8">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">

          <p className="text-amber-400 uppercase tracking-[4px] mb-3">
            Testimonials
          </p>

          <h2 className="text-3xl md:text-5xl font-bold">
            What Clients Say
          </h2>

        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >

          {reviews.map((review) => (

            <SwiperSlide key={review._id}>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="bg-black p-8 rounded-2xl border border-zinc-800 h-full"
              >

                <p className="text-gray-400 mb-6 leading-7">
                  "{review.review}"
                </p>

                <div className="mt-6">

                  <h3 className="font-bold text-lg">
                    {review.name}
                  </h3>

                  <p className="text-amber-400 text-sm">
                    {review.role}
                  </p>

                </div>

              </motion.div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  );
};

export default Testimonials;
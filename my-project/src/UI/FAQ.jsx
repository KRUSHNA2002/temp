import React, { useState,useEffect } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"
const FAQ = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const [showQuestionBox, setShowQuestionBox] = useState(false);

  const [userQuestion, setUserQuestion] = useState("");

  const [faqs, setFaqs] = useState([]);

  const toggleFAQ = (index) => {

    setActiveIndex(
      activeIndex === index ? null : index
    );

  };

  // ================= FETCH FAQ =================
const fetchFaqs = async () => {

  try {

    const res = await axios.get(
      "https://photography-xzfi.onrender.com/api/faq/all"
    );

    setFaqs(res.data.faqs);

  } catch (error) {

    console.log(error);

  }

};

useEffect(() => {

  fetchFaqs();

}, []);
  // SUBMIT QUESTION
const handleQuestionSubmit = async (e) => {

  e.preventDefault();

  if (!userQuestion) {

    alert("Please enter your question");

    return;

  }

  try {

    const res = await axios.post(
      "https://photography-xzfi.onrender.com/api/faq/ask",
      {
        question: userQuestion,
      }
    );

    alert(res.data.message);

    setUserQuestion("");

    setShowQuestionBox(false);

    fetchFaqs();

  } catch (error) {

    console.log(error);

  }

};

console.log(faqs);
  return (

    <section className="bg-black text-white py-20 px-4 md:px-10">

      <div className="max-w-4xl mx-auto">

        {/* HEADING */}
<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-14 mt-10">

  {/* LEFT SIDE */}
  <div className="text-center md:text-left">

    <p className="text-amber-400 uppercase tracking-[4px] mb-3">
      Frequently Asked Questions
    </p>

    <h2 className="text-4xl md:text-5xl font-bold">
      Got Questions?
    </h2>

    <p className="text-gray-400 mt-4 max-w-2xl">
      Find answers to the most common questions about our photography
      services, booking process, and delivery.
    </p>

  </div>

  {/* RIGHT SIDE ICON */}
  <div className="flex justify-center md:justify-end">

    <button
      onClick={() =>
        setShowQuestionBox(!showQuestionBox)
      }
      className="
        w-16
        h-16
        rounded-2xl
        bg-gradient-to-r
        from-amber-500
        to-yellow-400
        flex
        items-center
        justify-center
        shadow-lg
        hover:scale-110
        transition
      "
    >

      <FaQuestionCircle className="text-3xl text-black" />

    </button>

  </div>

</div>


{/* QUESTION BOX */}
        <AnimatePresence>

          {
            showQuestionBox && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  mt-8
                  bg-white/5
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                  backdrop-blur-sm
                "
              >

                <form
                  onSubmit={handleQuestionSubmit}
                  className="space-y-5"
                >

                  <h3 className="text-2xl font-bold text-center">
                    Ask Your Question
                  </h3>

                  <textarea
                    rows="5"
                    value={userQuestion}
                    onChange={(e) =>
                      setUserQuestion(e.target.value)
                    }
                    placeholder="Write your question here..."
                    className="
                      w-full
                      bg-black/40
                      border
                      border-white/10
                      rounded-2xl
                      p-5
                      outline-none
                      focus:border-amber-400
                      text-white
                      resize-none
                    "
                  ></textarea>

                  <button
                    type="submit"
                    className="
                      w-full
                      bg-gradient-to-r
                      from-amber-500
                      to-yellow-400
                      text-black
                      py-4
                      rounded-2xl
                      font-bold
                      hover:scale-[1.01]
                      transition
                    "
                  >
                    Submit Question
                  </button>

                </form>

              </motion.div>

            )
          }

        </AnimatePresence>

        {/* FAQ LIST */}
        <div className="space-y-5">

          {
            faqs.map((faq, index) => (

              <motion.div
                key={faq._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                className="
                  border
                  border-white/10
                  rounded-2xl
                  bg-white/5
                  backdrop-blur-sm
                  overflow-hidden
                "
              >

                <button
                  onClick={() => toggleFAQ(index)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    p-5
                    text-left
                  "
                >

                  <span className="text-lg font-medium">
                    {faq.question}
                  </span>

                  <FaChevronDown
                    className={`
                      transition-transform
                      duration-300
                      ${
                        activeIndex === index
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />

                </button>

                <AnimatePresence>

                  {
                    activeIndex === index && (

                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                      >

                        <div className="px-5 pb-5 text-gray-400 leading-relaxed">
                          {
  faq.answer
    ? faq.answer
    : "Waiting for admin response..."
}
                        </div>

                      </motion.div>

                    )
                  }

                </AnimatePresence>

              </motion.div>

            ))
          }

        </div>

        

        

      </div>

    </section>

  );

};

export default FAQ;
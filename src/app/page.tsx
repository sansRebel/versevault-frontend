"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/animations";
import Hero from "@/components/Hero";
import Card from "@/components/Card";
import FAQSection from "@/components/FAQSection";
import Spinner from "@/components/Spinner"; // Import the Spinner component
import { useFetchBlogs } from "@/hooks/useBlogs";
import Button from "@/components/Button";
const features = [
  {
    icon: "🖋️",
    title: "Share Your Voice",
    description: "Publish your blogs and share your thoughts with the world.",
  },
  {
    icon: "🌐",
    title: "Engage with Community",
    description: "Connect with like-minded individuals and grow together.",
  },
  {
    icon: "🔍",
    title: "Explore Topics",
    description: "Discover blogs on topics you love, from tech to travel.",
  },
];

export default function HomePage() {
  const { blogs, loading } = useFetchBlogs();

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Spinner />
      </div>
    );
  }

  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Hero />
      </motion.div>

      {/* Value Proposition Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-gray-100 text-center"
      >
        <h2 className="text-4xl font-bold mb-12">Features</h2>
        <motion.div
          className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto px-6"
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Featured Blogs Section */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-base-100"
      >
        <h2 className="text-4xl font-bold text-center mb-12" >Featured Blogs</h2>
        <motion.div className="grid gap-8 px-6 md:grid-cols-3 max-w-6xl mx-auto">
          {safeBlogs.slice(0, 3).map((blog) => (
            <motion.div key={blog._id} variants={fadeIn}>
              <Card
                imageUrl={blog.imageUrl || "https://via.placeholder.com/150"}
                title={blog.title}
                description={blog.content.substring(0, 100) + "..."}
                onClick={() => (window.location.href = `/blogs/${blog._id}`)}
              />
            </motion.div>
          ))}
        </motion.div>
        <div className="flex justify-center mt-12">
          <Button
            label="View More Blogs"
            styleType="secondary"
            onClick={() => (window.location.href = "/blogs")} // Reuse the onClick logic
          />
        </div>

      </motion.section>

      {/* FAQ Section */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <FAQSection />
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { fadeIn,  } from "@/utils/animations";
import { FaEnvelope, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-base-100">
      <section className="py-16 px-4 lg:px-24">
        {/* About and Professional Showcase Section */}
        <motion.section
          className="mt-16 bg-gray-100 rounded-lg p-8 shadow-md"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6 text-center">About VerseVault</h2>
          <p className="text-lg text-gray-600 mb-6">
            VerseVault is more than just a blogging platform; it is a space for creativity, self-expression, and meaningful connections. Built as part of my final-year Software Engineering journey, this platform is designed to enable users to share their ideas, explore inspiring content, and engage with a vibrant community of thinkers, writers, and creators.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            As a software engineer, I wanted to create an application that not only demonstrates my technical skills but also provides a real-world solution that showcases best practices in web development. VerseVault embodies my dedication to building user-friendly and scalable web applications.
          </p>
          <p className="text-lg text-gray-600 mb-6">
            The platform leverages modern technologies and tools to deliver a seamless experience. The frontend is built using <strong>Next.js App Router</strong>, providing fast and dynamic routing capabilities. The backend is powered by <strong>Node.js</strong> with <strong>Express.js</strong>, ensuring a robust and efficient API layer. For data storage, I utilized <strong>MongoDB</strong>, which offers flexible and scalable database solutions. Images uploaded by users are securely stored and served using <strong>Cloudinary</strong>. The styling is crafted with <strong>Tailwind CSS</strong> and enhanced with <strong>DaisyUI</strong>, delivering a visually appealing and responsive design across devices.
          </p>
          <p className="text-lg text-gray-600">
            VerseVault is not just a platform—it is a testament to my ability to design, develop, and deploy full-stack applications. My goal with this project is to showcase my technical expertise, creativity, and commitment to producing high-quality software. I hope it serves as a portfolio piece for potential collaborators and employers, reflecting my proficiency in modern web technologies and my passion for building impactful solutions.
          </p>
        </motion.section>


        {/* Contact Section */}
        <motion.section
          className="mt-16 text-center"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
          <div className="flex justify-center gap-8">
            {/* Gmail */}
            <a
              href="mailto:your-email@example.com"
              className="text-gray-600 hover:text-primary transition-transform transform hover:scale-110 duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaEnvelope className="w-8 h-8" /> {/* Gmail Icon */}
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/your-profile"
              className="text-gray-600 hover:text-primary transition-transform transform hover:scale-110 duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-8 h-8" /> {/* LinkedIn Icon */}
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/your-profile"
              className="text-gray-600 hover:text-primary transition-transform transform hover:scale-110 duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-8 h-8" /> {/* Instagram Icon */}
            </a>
          </div>
        </motion.section>
      </section>
    </div>
  );
}

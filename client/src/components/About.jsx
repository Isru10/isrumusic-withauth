import React from 'react';
import { motion } from 'framer-motion';
import {
    FaReact, FaNodeJs, FaServer, FaCloud, FaDatabase, FaCogs, FaSyncAlt, FaBell, FaPlay, FaPalette
} from 'react-icons/fa';
import { SiMongodb, SiRedux, SiTailwindcss, SiExpress } from 'react-icons/si'; // Icons for specific tech

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const technologies = [
    { name: "React", icon: <FaReact />, color: "#61DAFB", description: "Frontend library for building dynamic user interfaces." },
    { name: "Node.js", icon: <FaNodeJs />, color: "#68A063", description: "JavaScript runtime for building scalable server-side applications." },
    { name: "Express", icon: <SiExpress />, color: "#FFFFFF", description: "Minimalist web framework for Node.js, used for the API." }, // Often associated with white/gray
    { name: "MongoDB", icon: <SiMongodb />, color: "#4DB33D", description: "NoSQL database for flexible and scalable data storage." },
    { name: "Cloudinary", icon: <FaCloud />, color: "#3448C5", description: "Cloud-based service for image and video management, handling audio storage." },
    { name: "Redux Toolkit", icon: <SiRedux />, color: "#764ABC", description: "Official, opinionated toolset for efficient Redux state management." },
    { name: "Redux Saga", icon: <FaSyncAlt />, color: "#9A65DB", description: "Middleware for Redux to handle asynchronous actions and side effects." },
    { name: "RTK Query", icon: <FaCogs />, color: "#764ABC", description: "Powerful data fetching and caching tool built into Redux Toolkit." },
    { name: "Framer Motion", icon: <FaPalette />, color: "#E429B4", description: "Production-ready motion library for React, used for animations." },
    { name: "React Toastify", icon: <FaBell />, color: "#8C5EFF", description: "Library for adding stylish notifications (toasts) to the app." },
    { name: "React H5 Player", icon: <FaPlay />, color: "#FFA500", description: "Customizable HTML5 audio player component for React." },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38B2AC", description: "Utility-first CSS framework for rapid UI development." }
];


const About = () => {
  return (
    <motion.div
      className="min-h-screen bg-[#101010] text-gray-200 p-6 md:p-10 lg:p-16 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeIn} // Gentle fade-in for the whole page
    >
      <div className="max-w-5xl mx-auto">

        {/* ========== Intro Section ========== */}
        <motion.section
            className="text-center mb-16 md:mb-24"
            initial="hidden"
            animate="visible"
            variants={containerVariants} // Stagger children
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            About  <span className="text-cyan-400">IsruMusic</span> 
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Hi there!. IsruMusic was built as a [Personal Project / Learning Exercise / Portfolio Piece ] to explore modern web technologies and create a simple, functional platform for handling audio files.
          </motion.p>
            <motion.a href="https://github.com/Isru10/" target="_blank" variants={itemVariants} className="mt-4 inline-block text-cyan-400 hover:text-cyan-300">View on GitHub → </motion.a>
        </motion.section>

        {/* ========== Technology Stack Section ========== */}
        <motion.section
             initial="hidden"
             whileInView="visible" // Animate when it comes into view
             viewport={{ once: true, amount: 0.1 }} // Trigger early, once
             variants={containerVariants} // Stagger tech cards
             className="mb-16 md:mb-24"
        >
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-center text-white mb-10 md:mb-16">
            Powered By These Technologies
          </motion.h2>

          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
           >
            {technologies.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants} // Each card uses the item variant
                whileHover={{
                    y: -8, // Lift effect
                    boxShadow: `0px 10px 20px rgba(${hexToRgb(tech.color)}, 0.2)`, // Use dynamic color shadow
                    borderColor: tech.color // Highlight border
                }}
                className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg border border-gray-700 transition-colors duration-300 cursor-default flex flex-col items-center text-center"
              >
                {/* Icon with dynamic color */}
                <div className="text-5xl mb-4" style={{ color: tech.color }}>
                  {tech.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{tech.name}</h3>
                <p className="text-gray-400 text-sm flex-grow">{tech.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ========== Closing Thoughts Section ========== */}
         <motion.section
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
         >
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Learning & Future
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
               Building IsruMusic was a great journey into integrating various parts of the MERN stack, handling state complexity with Redux, managing asynchronous operations, and creating a visually appealing interface with animations. Future possibilities could include [mention a potential future feature like playlists, sharing, etc.].
            </motion.p>
         </motion.section>

      </div>
    </motion.div>
  );
};

// Helper function to convert hex to rgb for boxShadow color
const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    }
    // 6 digits
    else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
    }
     return `${r}, ${g}, ${b}`;
}


export default About;
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // For Login/Signup buttons
import { FaHeadphonesAlt, FaCloudUploadAlt, FaLock, FaMobileAlt, FaPlayCircle } from 'react-icons/fa'; // Example Icons

// --- Animation Variants ---

// Container variant for staggering children
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Stagger effect delay between children
      delayChildren: 0.1,
    },
  },
};

// Item variant for fade-in-up effect
const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

// Fade in effect (simpler)
const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
}

// Variant for features section animating into view
const featuresVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
};


// --- Component ---

const Home = () => {
  return (
    <motion.div
      className="min-h-screen bg-[#101010] text-gray-200 overflow-x-hidden" // Base styles
      initial="hidden"
      animate="visible"
      variants={fadeIn} // Subtle overall fade-in for the page
    >
      {/* Navigation Placeholder (Optional - if you have a separate public nav) */}
      {/* <header className="absolute top-0 left-0 right-0 p-4 z-50"> ... </header> */}


      {/* ========== Hero Section ========== */}
      <motion.section
        className="relative flex flex-col items-center justify-center min-h-[80vh] sm:min-h-screen text-center px-4 pt-20 pb-10"
        variants={staggerContainer} // Stagger heading, paragraph, buttons
        initial="hidden"
        animate="visible"
        // Add a subtle background pattern or gradient if desired
        style={{
            background: 'radial-gradient(ellipse at bottom, #1f1f1f 20%, #101010 70%)'
        }}
      >
         <motion.div className="absolute top-20 left-10 w-16 h-16 bg-cyan-500 rounded-full opacity-20 blur-2xl animate-pulse" style={{animationDuration: '4s'}} />
         <motion.div className="absolute bottom-40 right-20 w-24 h-24 bg-purple-500 rounded-xl opacity-10 blur-2xl animate-pulse delay-1000" style={{animationDuration: '5s'}}/>

        {/* Headphones Icon */}
        <motion.div variants={fadeInUp} className="mb-4 text-7xl text-cyan-400">
             <FaHeadphonesAlt />
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
        >
          Isru<span className="text-cyan-400">Muisc</span>
        </motion.h1>
        <motion.h2
          variants={fadeInUp}
          className="text-2xl sm:text-3xl font-light text-gray-300 mb-6"
        >
          Your Personal Audio Sanctuary
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-lg text-gray-400 max-w-xl mx-auto mb-10 px-2"
        >
          Seamlessly upload, organize, and enjoy your private audio collection – music, podcasts and more – all in one secure place.
        </motion.p>
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row justify-center items-center gap-4 z-10">
          <motion.button
             whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(8, 145, 178, 0.5)" }} // Cyan-600 shadow
             whileTap={{ scale: 0.95 }}
             className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-300"
             // Using 'as={Link}' makes the motion component render a React Router Link
             as={Link}
             to="/register"
          >

              <Link to="/register">Get Started Free</Link>

          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-300 border border-gray-600 font-semibold rounded-lg shadow-md transition-colors duration-300"
            as={Link}
            to="/login" // Change to your actual login route
          >
            <Link to="/login">Login</Link>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* ========== Features Section ========== */}
      <motion.section
        className="py-16 sm:py-24 bg-[#1f1f1f] border-y border-gray-700"
        variants={featuresVariant} // Stagger animation for children in this section
        initial="hidden"
        whileInView="visible" // Trigger animation when section enters viewport
        viewport={{ once: true, amount: 0.2 }} // Animate once, when 20% is visible
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={fadeInUp}
            className="text-3xl sm:text-4xl font-bold text-center text-white mb-12 sm:mb-16"
          >
            Everything You Need for Your Audio
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            // The parent grid itself doesn't need variants if the SECTION handles staggering
          >
            {/* Feature Card 1 */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center p-6 bg-[#2a2a2a] rounded-lg border border-gray-600 hover:border-cyan-500 transition-colors duration-300">
              <FaCloudUploadAlt className="text-5xl text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Effortless Uploads</h3>
              <p className="text-gray-400 text-base">Drag & drop or select files. We support MP3, WAV, M4A, and more. Organize with titles and artists.</p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center p-6 bg-[#2a2a2a] rounded-lg border border-gray-600 hover:border-cyan-500 transition-colors duration-300">
              <FaPlayCircle className="text-5xl text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Clean & Simple Player</h3>
              <p className="text-gray-400 text-base">Enjoy your audio with a distraction-free, intuitive player designed for focused listening.</p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center text-center p-6 bg-[#2a2a2a] rounded-lg border border-gray-600 hover:border-cyan-500 transition-colors duration-300">
              <FaLock className="text-5xl text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Private & Secure</h3>
              <p className="text-gray-400 text-base">Your audio library is yours alone. Secure cloud storage keeps your files safe and accessible only to you.</p>
            </motion.div>
            {/* Add more features if needed */}
            {/* Example: */}
            {/* <motion.div variants={fadeInUp} className="..."> */}
            {/*   <FaMobileAlt className="..."/> */}
            {/*   <h3 className="...">Access Anywhere</h3> */}
            {/*   <p className="...">Listen on desktop or mobile web through your account.</p> */}
            {/* </motion.div> */}
          </motion.div>
        </div>
      </motion.section>

      {/* ========== About/Value Section ========== */}
        <motion.section
            className="py-16 sm:py-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer} // Stagger heading and paragraphs
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-white mb-6">
                     Built for <span className="text-cyan-400">Your</span> Sound World
                 </motion.h2>
                <motion.p variants={fadeInUp} className="text-lg text-gray-400 mb-4 leading-relaxed">
                   IsruMusic cuts through the noise. No complex algorithms, no social feeds – just a simple, elegant home for the audio that matters to you. Perfect for musicians tracking demos, students saving lectures, podcast lovers clipping highlights, or anyone needing a private audio archive.
                 </motion.p>
                 <motion.p variants={fadeInUp} className="text-lg text-gray-400 leading-relaxed">
                     Focus on your sound. We'll handle the rest.
                 </motion.p>
             </div>
        </motion.section>

        {/* ========== Final CTA ========== */}
        <motion.section
             className="py-16 sm:py-20 bg-gradient-to-t from-[#1f1f1f] via-[#1a1a1a] to-[#1f1f1f] border-t border-gray-700"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, amount: 0.5 }}
             variants={fadeInUp} // Simple fade up for the whole section
        >
            <div className="max-w-4xl mx-auto px-4 text-center">
                 <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Ready to Organize Your Audio?
                 </h2>
                 <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(8, 145, 178, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-colors duration-300"
                    as={Link}
                    to="/signup" // Link to signup
                >
                    <Link to="/register">Create Your Free Account</Link>
                 </motion.button>
            </div>
        </motion.section>


      {/* ========== Footer ========== */}
      <footer className="text-center py-8 border-t border-gray-700 bg-[#101010]">
        <p className="text-sm text-gray-500">
          IsruMusic © {new Date().getFullYear()}. Your sound, secured.
        </p>
        {/* Add privacy/terms links */}
        {/* <div className="mt-2"> */}
        {/*   <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-400 mx-2">Privacy Policy</Link> */}
        {/*   <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-400 mx-2">Terms of Service</Link> */}
        {/* </div> */}
      </footer>
    </motion.div>
  );
};

export default Home;
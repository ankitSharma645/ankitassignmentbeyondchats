import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hover: {
      y: -3,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.footer 
      className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-4 md:mb-0"
            whileHover="hover"
            variants={itemVariants}
          >
            <p className="text-gray-600 dark:text-gray-300">
              © {new Date().getFullYear()} AI Chat Assistant. All rights reserved.
            </p>
          </motion.div>

          <div className="flex space-x-6">
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              whileHover="hover"
              variants={itemVariants}
            >
              <FaGithub className="h-6 w-6" />
            </motion.a>
            <motion.a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              whileHover="hover"
              variants={itemVariants}
            >
              <FaTwitter className="h-6 w-6" />
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              whileHover="hover"
              variants={itemVariants}
            >
              <FaLinkedin className="h-6 w-6" />
            </motion.a>
          </div>
        </div>

        <motion.div 
          className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Built with React, Tailwind CSS, and Framer Motion. Powered by AI.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
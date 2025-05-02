import React from "react";

const Footer = () => {
  return (
    <footer className="mt-12 py-4 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
      Built by Stuart Gibson Learning |{" "}
      <a
        href="https://sglearning.netlify.app/"
        target="_blank"
        rel="noreferrer"
        className="underline text-blue-600 dark:text-blue-300"
      >
        Portfolio
      </a>
    </footer>
  );
};

export default Footer;

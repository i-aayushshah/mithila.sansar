// components/Footer.js
export default function Footer() {
  return (
      <footer className="bg-white shadow-inner">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
              <p className="text-center text-gray-500 text-sm mb-2">
                  &copy; {new Date().getFullYear()} Mithila Sansar (मिथिला सँसार). All rights reserved.
              </p>
              <div className="flex items-center space-x-2">
                  <span className="text-gray-500 text-xs">Made with</span>
                  <svg
                      className="h-5 w-5 text-red-500 animate-pulse"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                  >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="text-gray-500 text-xs">
                      by <a href="https://aayushshah0425.com.np" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Aayush Shah</a>
                  </span>
              </div>
          </div>
      </footer>
  );
}

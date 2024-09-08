import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const router = useRouter(); // Add useRouter hook

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event) => {
      if (
        (dropdownRef.current && !dropdownRef.current.contains(event.target)) &&
        (menuRef.current && !menuRef.current.contains(event.target))
      ) {
        setIsDropdownOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsDropdownOpen(false); // Close dropdown on route change
      setIsOpen(false); // Close mobile menu on route change
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownLinkClick = () => {
    setIsDropdownOpen(false);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/30 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl text-red-600 hover:text-red-700 transition duration-300">
            मिथिला सँसार
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-md font-medium transition duration-300"
              >
                <Link href="/culture" className="mr-2">Culture</Link>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white/80 backdrop-blur-md rounded-md shadow-lg py-1 flex flex-col">

                  <NavLink href="/culture/cuisine" onClick={handleDropdownLinkClick}>Cuisine</NavLink>
                  <NavLink href="/culture/festivals" onClick={handleDropdownLinkClick}>Festivals</NavLink>
                  <NavLink href="/culture/literature" onClick={handleDropdownLinkClick}>Literature</NavLink>
                  <NavLink href="/culture/history" onClick={handleDropdownLinkClick}>History</NavLink>
                  <NavLink href="/culture/arts-crafts" onClick={handleDropdownLinkClick}>Arts & Crafts</NavLink>
                </div>
              )}
            </div>
            <NavLink href="/chatbot">Chatbot</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink href="/culture" mobile onClick={closeMenu}>Culture</NavLink>

            <NavLink href="/culture/cuisine" mobile indent onClick={closeMenu}>Cuisine</NavLink>
            <NavLink href="/culture/festivals" mobile indent onClick={closeMenu}>Festivals</NavLink>
            <NavLink href="/culture/literature" mobile indent onClick={closeMenu}>Literature</NavLink>
            <NavLink href="/culture/history" mobile indent onClick={closeMenu}>History</NavLink>
            <NavLink href="/culture/arts-crafts" mobile indent onClick={closeMenu}>Arts & Crafts</NavLink>
            <NavLink href="/chatbot" mobile onClick={closeMenu}>Chatbot</NavLink>
            <NavLink href="/about" mobile onClick={closeMenu}>About</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, mobile, indent, onClick }) {
  return (
    <Link
      href={href}
      className={`
        ${mobile ? 'block text-base' : 'text-sm'}
        ${indent ? 'pl-6' : ''}
        text-gray-700 hover:bg-red-50 hover:text-red-600 px-3 py-2 rounded-md font-medium transition duration-300
      `}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

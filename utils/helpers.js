/**
 * Formats a timestamp into a human-readable string.
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  /**
   * Truncates a string to a specified length and adds ellipsis if necessary.
   * @param {string} str - The string to truncate
   * @param {number} maxLength - The maximum length of the string
   * @returns {string} Truncated string
   */
  export function truncateString(str, maxLength) {
    if (str.length <= maxLength) return str;
    // Find the last space within the maxLength limit
    const truncated = str.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.slice(0, lastSpace) + '...' : truncated.slice(0, maxLength - 3) + '...';
  }

  /**
   * Debounces a function call.
   * @param {Function} func - The function to debounce
   * @param {number} wait - The number of milliseconds to delay
   * @returns {Function} Debounced function
   */
  export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Capitalizes the first letter of each word in a string.
   * @param {string} str - The string to capitalize
   * @returns {string} Capitalized string
   */
  export function capitalizeWords(str) {
    return str.replace(/\b\w/g, l => l.toUpperCase());
  }

  /**
   * Generates a random color in hexadecimal format.
   * @returns {string} Random color in hex format
   */
  export function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  /**
   * Checks if a string is a valid email address.
   * @param {string} email - The email address to validate
   * @returns {boolean} True if valid, false otherwise
   */
  export function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

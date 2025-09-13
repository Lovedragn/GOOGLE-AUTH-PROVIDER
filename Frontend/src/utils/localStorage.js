// Utility functions for safe localStorage operations

/**
 * Safely get and parse JSON data from localStorage
 * @param {string} key - The localStorage key
 * @returns {any|null} - Parsed data or null if invalid/missing
 */
export const getStoredData = (key) => {
  try {
    const data = localStorage.getItem(key);
    if (!data || data === "undefined" || data === "null") {
      return null;
    }
    return JSON.parse(data);
  } catch (error) {
    console.warn(`Failed to parse ${key} from localStorage:`, error);
    // Clear invalid data
    localStorage.removeItem(key);
    return null;
  }
};

/**
 * Safely set JSON data to localStorage
 * @param {string} key - The localStorage key
 * @param {any} data - The data to store
 * @returns {boolean} - Success status
 */
export const setStoredData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Failed to store ${key} to localStorage:`, error);
    return false;
  }
};

/**
 * Get user data safely from localStorage
 * @returns {object|null} - User object or null
 */
export const getStoredUser = () => {
  return getStoredData("user");
};

/**
 * Set user data safely to localStorage
 * @param {object} user - User object to store
 * @returns {boolean} - Success status
 */
export const setStoredUser = (user) => {
  return setStoredData("user", user);
};

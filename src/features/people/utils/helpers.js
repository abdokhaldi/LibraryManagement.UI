// ─── Helper Functions ─────────────────────────────────────────────────────────────
import { AVATAR_COLORS } from "../constants";

/**
 * Get initials from first and last name
 * @param {string} firstName 
 * @param {string} lastName 
 * @returns {string}
 */
export const SORT_DIR = {
  ASC: "asc",
  DESC: "desc",
  NONE: "none",
};

export function getInitials(firstName, lastName) {
  if (!firstName && !lastName) return "?";
  return ((firstName?.[0] || "") + (lastName?.[0] || "")).toUpperCase();
}

/**
 * Get avatar color based on ID
 * @param {number|string} id 
 * @returns {string}
 */
export function getAvatarColor(id) {
  if (!id) return AVATAR_COLORS[0];
  const hash = id.toString().split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

/**
 * Get next sort direction
 * @param {string} current 
 * @returns {string}
 */
export function nextDirection(current) {
  if (current === "none") return "asc";
  if (current === "asc") return "desc";
  return "none";
}

/**
 * Sort array of objects by key
 * @param {Array} array 
 * @param {string} key 
 * @param {string} direction 
 * @returns {Array}
 */
export function sortByKey(array, key, direction) {
  return [...array].sort((a, b) => {
    let aVal = a[key];
    let bVal = b[key];

    if (aVal === null || aVal === undefined) aVal = "";
    if (bVal === null || bVal === undefined) bVal = "";

    if (typeof aVal === "string") aVal = aVal.toLowerCase();
    if (typeof bVal === "string") bVal = bVal.toLowerCase();

    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

/**
 * Filter people based on search query and filters
 * @param {Array} people 
 * @param {Object} filters 
 * @returns {Array}
 */
export function filterPeople(people, filters) {
  const { searchQuery, associationFilter, genderFilter, cityFilter } = filters;
  
  return people.filter((person) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = `${person.firstName} ${person.lastName}`.toLowerCase().includes(query);
      const matchesEmail = person.email?.toLowerCase().includes(query);
      const matchesNational = person.nationalNumber?.toLowerCase().includes(query);
      const matchesPhone = person.phone?.toLowerCase().includes(query);
      const matchesCity = person.city?.toLowerCase().includes(query);
      const matchesAddress = person.address?.toLowerCase().includes(query);
      
      if (!matchesName && !matchesEmail && !matchesNational && !matchesPhone && !matchesCity && !matchesAddress) {
        return false;
      }
    }

    // Association filter
    if (associationFilter !== "all" && person.association !== associationFilter) {
      return false;
    }

    // Gender filter
    if (genderFilter !== "all" && person.gender !== genderFilter) {
      return false;
    }

    // City filter
    if (cityFilter !== "all" && person.city !== cityFilter) {
      return false;
    }

    return true;
  });
}

/**
 * Get unique cities from people array
 * @param {Array} people 
 * @returns {Array}
 */
export function getUniqueCities(people) {
  return [...new Set(people.map((p) => p.city))].sort();
}

/**
 * Calculate people statistics
 * @param {Array} people 
 * @returns {Object}
 */
export function calculateStats(people) {
  const users = people.filter((p) => p.association === "user").length;
  const members = people.filter((p) => p.association === "member").length;
  const none = people.filter((p) => p.association === "none").length;
  const males = people.filter((p) => p.gender === "Male").length;
  const females = people.filter((p) => p.gender === "Female").length;

  return {
    total: people.length,
    users,
    members,
    none,
    males,
    females,
  };
}

/**
 * Paginate array
 * @param {Array} array 
 * @param {number} page 
 * @param {number} pageSize 
 * @returns {Array}
 */
export function paginate(array, page, pageSize) {
  const start = (page - 1) * pageSize;
  return array.slice(start, start + pageSize);
}

/**
 * Calculate total pages
 * @param {number} totalItems 
 * @param {number} pageSize 
 * @returns {number}
 */
export function calculateTotalPages(totalItems, pageSize) {
  return Math.ceil(totalItems / pageSize) || 1;
}
// ─── Helper Functions for Dashboard Feature ────────────────────────────────────

/**
 * Get Tailwind background color class for analytics card
 * @param {string} color - Color key (red, green, amber, yellow)
 * @returns {string} Tailwind background class
 */
export function getAnalyticsCardColor(color) {
  const colorMap = {
    red: "bg-red-500",
    green: "bg-green-300",
    amber: "bg-blue-300",
    yellow: "bg-yellow-300",
  };
  return colorMap[color] || "bg-gray-400";
}

/**
 * Get Tailwind height class based on percentage
 * @param {number} height - Height percentage value (0-100)
 * @returns {string} Tailwind height class
 */
export function getHeightClass(height) {
  const clampedHeight = Math.max(0, Math.min(100, Math.round(height)));
  return `h-[${clampedHeight}%]`;
}

/**
 * Get Tailwind width class and display percentage for category line
 * @param {number} percentage - Percentage value (0-100)
 * @returns {{ perColor: string, perNumber: string }}
 */
export function getPercentageClass(percentage) {
  const clampedPercentage = Math.max(0, Math.min(100, Math.round(percentage)));
  return { 
    perColor: `w-[${clampedPercentage}%]`, 
    perNumber: `${clampedPercentage}%` 
  };
}

/**
 * Get Tailwind background color class for activity status
 * @param {string} status - Activity status
 * @returns {string} Tailwind background class
 */
export function getStatusColor(status) {
  const statusMap = {
    borrowed: "bg-red-500",
    Completed: "bg-red-300",
    available: "bg-blue-600",
  };
  return statusMap[status] || "bg-green-400";
}
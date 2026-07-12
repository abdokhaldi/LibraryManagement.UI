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
 * @param {string|number} height - Height percentage value
 * @returns {string} Tailwind height class
 */
export function getHeightClass(height) {
  const heightPercentageMap = {
    10: "h-[10%]",
    20: "h-[20%]",
    30: "h-[30%]",
    40: "h-[40%]",
    50: "h-[50%]",
    60: "h-[60%]",
    70: "h-[70%]",
  };
  return heightPercentageMap[height] || "h-[10%]";
}

/**
 * Get Tailwind width class and display percentage for category line
 * @param {number} percentage - Percentage value
 * @returns {{ perColor: string, perNumber: string }}
 */
export function getPercentageClass(percentage) {
  const percentageMap = {
    10: { perColor: "w-[10%]", perNumber: "10%" },
    20: { perColor: "w-[20%]", perNumber: "20%" },
    30: { perColor: "w-[30%]", perNumber: "30%" },
    40: { perColor: "w-[40%]", perNumber: "40%" },
    50: { perColor: "w-[50%]", perNumber: "50%" },
    60: { perColor: "w-[60%]", perNumber: "60%" },
  };
  return percentageMap[percentage] || { perColor: "w-[10%]", perNumber: "10%" };
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
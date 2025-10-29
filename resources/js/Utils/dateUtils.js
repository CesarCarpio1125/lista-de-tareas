/**
 * Format a date string using the browser's built-in Intl API
 * @param {string|Date} date - The date to format
 * @param {Object} options - Options for date formatting
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
  if (!date) return 'Sin fecha';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    locale: 'es-ES',
    ...options
  };

  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) return 'Fecha inválida';
    
    return new Intl.DateTimeFormat(defaultOptions.locale, {
      year: defaultOptions.year,
      month: defaultOptions.month,
      day: defaultOptions.day,
    }).format(dateObj);
  } catch (e) {
    console.error('Error formatting date:', e);
    return 'Fecha inválida';
  }
}

/**
 * Get a color based on tag name (consistent hashing)
 * @param {string} tag - The tag name
 * @returns {string} Tailwind CSS classes for the tag
 */
export function getTagColor(tag) {
  const colors = [
    'bg-blue-100 text-blue-800',
    'bg-purple-100 text-purple-800',
    'bg-pink-100 text-pink-800',
    'bg-red-100 text-red-800',
    'bg-orange-100 text-orange-800',
    'bg-yellow-100 text-yellow-800',
    'bg-green-100 text-green-800',
    'bg-teal-100 text-teal-800',
    'bg-cyan-100 text-cyan-800',
    'bg-indigo-100 text-indigo-800'
  ];
  
  const index = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

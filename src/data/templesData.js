// Static JSON database import and helper accessors for TempleVerse
import templesJson from './temples.json' with { type: 'json' };
import categoriesJson from './categories.json' with { type: 'json' };

export const templesData = templesJson;
export const categoriesData = categoriesJson.categories;

/**
 * Find temple by ID
 */
export function getTempleById(id) {
  if (!id) return null;
  return templesData.find(t => t.id === id) || null;
}

/**
 * Filter temples by category keyword
 */
export function getTemplesByCategory(categoryName) {
  if (!categoryName) return templesData;
  const target = categoryName.toLowerCase();
  return templesData.filter(t => Array.isArray(t.category) && t.category.some(c => c.toLowerCase().includes(target)));
}

/**
 * Filter temples by State
 */
export function getTemplesByState(state) {
  if (!state) return templesData;
  return templesData.filter(t => t.location?.state?.toLowerCase() === state.toLowerCase());
}

/**
 * Search temples across name, deity, city, state, description
 */
export function searchTemples(query) {
  if (!query) return templesData;
  const q = query.toLowerCase().trim();
  return templesData.filter(t =>
    t.name.toLowerCase().includes(q) ||
    (t.deity && t.deity.toLowerCase().includes(q)) ||
    (t.location?.city && t.location.city.toLowerCase().includes(q)) ||
    (t.location?.state && t.location.state.toLowerCase().includes(q)) ||
    (t.description && t.description.toLowerCase().includes(q)) ||
    (Array.isArray(t.category) && t.category.some(c => c.toLowerCase().includes(q)))
  );
}

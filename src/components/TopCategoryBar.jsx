import React from 'react';

export default function TopCategoryBar({
  currentCategoryFilter,
  currentPage,
  onNavigate,
  dark,
}) {
  const categories = [
    { id: 'all', label: 'All Temples', icon: '🌟', page: 'explore', filter: null },
    { id: 'jyotirlinga', label: '12 Jyotilingas', icon: '🕉️', page: 'explore', filter: 'Jyotilinga' },
    { id: 'shakti', label: '18 Shakti Peethas', icon: '🌺', page: 'explore', filter: 'Maha Shakti Peetha' },
    { id: 'panchabhoota', label: '5 Pancha Bhoota Stalams', icon: '🌊', page: 'explore', filter: 'Pancha Bhoota Stalams' },
    { id: 'chardham', label: 'Char Dham', icon: '🏛️', page: 'explore', filter: 'Char Dham' },
    { id: 'pancharama', label: 'Pancharama Kshetrams', icon: '🌸', page: 'explore', filter: 'Pancharama Kshetrams' },
    { id: 'ancient', label: 'Ancient & UNESCO', icon: '📜', page: 'explore', filter: 'Ancient' },
    { id: 'planner', label: 'Journey Planner', icon: '🧭', page: 'planner', filter: null },
    { id: 'compare', label: 'Compare Temples', icon: '⚖️', page: 'compare', filter: null },
  ];

  const isCurrentActive = (item) => {
    if (item.page === 'planner' && currentPage === 'planner') return true;
    if (item.page === 'compare' && currentPage === 'compare') return true;
    if (currentPage === 'explore') {
      if (!currentCategoryFilter && item.filter === null && item.page === 'explore') return true;
      if (currentCategoryFilter === item.filter) return true;
    }
    return false;
  };

  return (
    <div className={`w-full overflow-x-auto no-scrollbar py-2.5 px-4 md:px-6 border-b transition-colors ${
      dark
        ? 'bg-gray-950/90 border-amber-950/50 backdrop-blur'
        : 'bg-amber-50/90 border-amber-200/70 backdrop-blur'
    }`}>
      <div className="flex items-center gap-2 min-w-max">
        <span className={`text-[11px] font-bold tracking-widest uppercase mr-1 hidden sm:inline-block ${
          dark ? 'text-amber-400/80' : 'text-amber-800'
        }`}>
          Sacred Groups:
        </span>
        {categories.map((cat) => {
          const active = isCurrentActive(cat);
          return (
            <button
              key={cat.id}
              onClick={() => onNavigate(cat.page, null, cat.filter, null)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                active
                  ? dark
                    ? 'bg-amber-500 text-gray-950 shadow-md shadow-amber-500/20'
                    : 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : dark
                  ? 'bg-gray-900/80 text-gray-300 hover:bg-gray-800 hover:text-amber-300 border border-gray-800'
                  : 'bg-white/90 text-gray-700 hover:bg-amber-100/80 hover:text-amber-900 border border-amber-200/70'
              }`}
            >
              <span className="text-sm">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

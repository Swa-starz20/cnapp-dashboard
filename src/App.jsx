import { SearchX } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import AddWidgetCard from './components/AddWidgetCard';
import AddWidgetDrawer from './components/AddWidgetDrawer';
import DashboardHeader from './components/DashboardHeader';
import TopNavbar from './components/TopNavbar';
import WidgetCard from './components/WidgetCard';
import { setSearchQuery } from './store/dashboardSlice';

export default function App() {
  const dispatch = useDispatch();
  const { categories, searchQuery } = useSelector((state) => state.dashboard);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const visibleCategories = categories
    .map((category) => {
      const checkedWidgets = category.widgets.filter((w) => w.checked);
      const matchingWidgets = normalizedQuery
        ? checkedWidgets.filter(
            (w) =>
              w.name.toLowerCase().includes(normalizedQuery) ||
              (w.text && w.text.toLowerCase().includes(normalizedQuery))
          )
        : checkedWidgets;

      return {
        ...category,
        matchingWidgets,
      };
    })
    .filter((category) => {
      if (normalizedQuery) {
        return category.matchingWidgets.length > 0;
      }
      return category.alwaysShow || category.matchingWidgets.length > 0;
    });

  return (
    <div className="min-h-screen bg-[#F0F5FA] flex flex-col">
      <TopNavbar />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-6">
        <DashboardHeader />

        {visibleCategories.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs py-16 px-6 flex flex-col items-center justify-center text-center mt-4">
            <SearchX className="w-10 h-10 text-slate-300 mb-3" />
            <h2 className="text-sm font-bold text-[#0F172A] mb-1">
              No matching widgets found
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              No widgets matched &ldquo;{searchQuery}&rdquo;. Try another keyword or clear your search.
            </p>
            <button
              type="button"
              onClick={() => dispatch(setSearchQuery(''))}
              className="bg-[#14147C] hover:bg-[#0F172A] text-white text-xs font-semibold px-4 py-2 rounded-md transition cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {visibleCategories.map((category) => (
              <section key={category.id} aria-labelledby={`cat-${category.id}`}>
                <h2
                  id={`cat-${category.id}`}
                  className="text-[14px] sm:text-[15px] font-bold text-[#0F172A] mb-3"
                >
                  {category.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.matchingWidgets.map((widget) => (
                    <WidgetCard
                      key={widget.id}
                      categoryId={category.id}
                      widget={widget}
                    />
                  ))}
                  {!normalizedQuery && <AddWidgetCard categoryId={category.id} />}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <AddWidgetDrawer />
    </div>
  );
}

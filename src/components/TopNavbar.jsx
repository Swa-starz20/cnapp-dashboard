import { Bell, ChevronDown, Search, User, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/dashboardSlice';

export default function TopNavbar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.dashboard.searchQuery);

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-slate-200/80 px-4 sm:px-8 py-2.5">
      <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm" aria-label="Breadcrumb">
          <span className="text-slate-400 font-medium">Home</span>
          <span className="text-slate-400">&gt;</span>
          <span className="text-[#1E293B] font-bold">Dashboard V2</span>
        </nav>

        {/* Center: Global Search */}
        <div className="flex-1 max-w-md mx-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search anything..."
              aria-label="Search widgets"
              className="w-full bg-[#F0F5FA] border border-slate-200/90 rounded-md pl-9 pr-8 py-1.5 text-xs sm:text-sm text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14147C]/20 focus:border-[#14147C] transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => dispatch(setSearchQuery(''))}
                aria-label="Clear search"
                className="absolute right-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Placeholder Selector, Notification Bell, User Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 border border-slate-200 rounded-md px-2.5 py-1.5 bg-slate-50/60 cursor-pointer"
          >
            <span>Production</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative p-1.5 text-slate-500 hover:text-[#14147C] rounded-md hover:bg-slate-100 transition cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-2 pl-1">
            <div className="w-7 h-7 rounded-full bg-[#14147C]/10 border border-[#14147C]/20 flex items-center justify-center text-[#14147C]">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

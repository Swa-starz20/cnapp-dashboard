import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Clock,
  MoreVertical,
  Plus,
  RefreshCw,
  RotateCcw,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  openDrawer,
  resetDefaultWidgets,
  setTimeframe,
} from '../store/dashboardSlice';

const TIMEFRAMES = ['Last 2 days', 'Last 7 days', 'Last 30 days'];

export default function DashboardHeader() {
  const dispatch = useDispatch();
  const timeframe = useSelector((state) => state.dashboard.timeframe);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [syncNotice, setSyncNotice] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [timeframeOpen, setTimeframeOpen] = useState(false);

  const menuRef = useRef(null);
  const timeframeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (timeframeRef.current && !timeframeRef.current.contains(event.target)) {
        setTimeframeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setSyncNotice(true);
    setTimeout(() => setIsRefreshing(false), 600);
    setTimeout(() => setSyncNotice(false), 2000);
  };

  const handleResetDefault = () => {
    dispatch(resetDefaultWidgets());
    setMenuOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
      {/* Left Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-[18px] sm:text-[20px] font-bold text-[#0F172A] tracking-tight">
          CNAPP Dashboard
        </h1>
        {syncNotice && (
          <span className="text-[11px] font-medium text-[#14147C] bg-[#14147C]/10 px-2 py-0.5 rounded-full animate-pulse">
            Synced
          </span>
        )}
      </div>

      {/* Right Controls (Exact left-to-right order) */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* 1. Add Widget + */}
        <button
          type="button"
          onClick={() => dispatch(openDrawer('cspm'))}
          className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-md flex items-center gap-2 shadow-2xs transition cursor-pointer"
        >
          <span>Add Widget</span>
          <Plus className="w-3.5 h-3.5 text-slate-600" />
        </button>

        {/* 2. Refresh icon button */}
        <button
          type="button"
          onClick={handleRefresh}
          aria-label="Refresh dashboard"
          title="Refresh dashboard"
          className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 p-2 rounded-md shadow-2xs transition cursor-pointer"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 transition-transform duration-500 ${
              isRefreshing ? 'rotate-180 text-[#14147C]' : ''
            }`}
          />
        </button>

        {/* 3. Three-dots menu button */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Dashboard options"
            aria-expanded={menuOpen}
            className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 p-2 rounded-md shadow-2xs transition cursor-pointer"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-20">
              <button
                type="button"
                onClick={handleResetDefault}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-[#F0F5FA] hover:text-[#14147C] flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Default Widgets</span>
              </button>
            </div>
          )}
        </div>

        {/* 4. Timeframe Filter Dropdown Pill */}
        <div className="relative" ref={timeframeRef}>
          <button
            type="button"
            onClick={() => setTimeframeOpen((prev) => !prev)}
            aria-expanded={timeframeOpen}
            className="bg-white border border-[#14147C] text-[#14147C] hover:bg-[#14147C]/5 rounded-md px-2.5 py-1.5 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 fill-[#14147C] text-white" />
            <span className="h-3.5 w-px bg-[#14147C]/40 mx-0.5" />
            <span>{timeframe}</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {timeframeOpen && (
            <div className="absolute right-0 mt-1.5 w-36 bg-white border border-slate-200 rounded-md shadow-lg py-1 z-20">
              {TIMEFRAMES.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    dispatch(setTimeframe(option));
                    setTimeframeOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium cursor-pointer ${
                    timeframe === option
                      ? 'bg-[#F0F5FA] text-[#14147C] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

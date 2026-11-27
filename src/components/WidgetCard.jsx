import { BarChart3, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeWidget } from '../store/dashboardSlice';
import DonutChart from './charts/DonutChart';
import StackedProgressBar from './charts/StackedProgressBar';

export default function WidgetCard({ categoryId, widget }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-4 flex flex-col min-h-[215px] relative hover:shadow-sm transition-shadow">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="text-[13px] font-bold text-[#0F172A] leading-snug">
          {widget.name}
        </h3>
        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove ${widget.name}`}
          title="Remove widget"
          className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded p-0.5 transition cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 flex items-center">
        {widget.type === 'donut' && (
          <DonutChart
            total={widget.total}
            totalLabel={widget.totalLabel}
            segments={widget.segments}
          />
        )}

        {widget.type === 'progress' && (
          <StackedProgressBar
            total={widget.total}
            totalLabel={widget.totalLabel}
            segments={widget.segments}
          />
        )}

        {widget.type === 'empty' && (
          <div className="w-full flex flex-col items-center justify-center text-center py-6 gap-2">
            <BarChart3 className="w-10 h-10 text-slate-300 stroke-[1.5]" />
            <p className="text-xs font-medium text-slate-500">
              {widget.text || 'No Graph data available!'}
            </p>
          </div>
        )}

        {widget.type === 'text' && (
          <div className="w-full h-full flex flex-col justify-center py-2">
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {widget.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

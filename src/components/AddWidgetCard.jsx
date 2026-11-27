import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openDrawer } from '../store/dashboardSlice';

export default function AddWidgetCard({ categoryId }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white/85 rounded-xl border border-slate-200/80 shadow-xs p-4 flex items-center justify-center min-h-[215px]">
      <button
        type="button"
        onClick={() => dispatch(openDrawer(categoryId))}
        className="border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-600 text-xs font-medium px-3.5 py-2 rounded-md flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add Widget</span>
      </button>
    </div>
  );
}

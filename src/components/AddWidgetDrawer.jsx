import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCustomWidget,
  applyWidgetSelections,
  closeDrawer,
  setActiveDrawerCategoryId,
} from '../store/dashboardSlice';

function DrawerContent() {
  const dispatch = useDispatch();
  const { categories, activeDrawerCategoryId } = useSelector(
    (state) => state.dashboard
  );

  const [overrides, setOverrides] = useState({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [formError, setFormError] = useState('');

  const activeCategory =
    categories.find((c) => c.id === activeDrawerCategoryId) || categories[0];

  const isWidgetChecked = (widget) =>
    Object.prototype.hasOwnProperty.call(overrides, widget.id)
      ? overrides[widget.id]
      : widget.checked;

  const handleToggleCheckbox = (widget) => {
    const current = isWidgetChecked(widget);
    setOverrides((prev) => ({
      ...prev,
      [widget.id]: !current,
    }));
  };

  const handleCreateCustomWidget = (e) => {
    e.preventDefault();
    if (!widgetName.trim()) {
      setFormError('Please enter a widget name.');
      return;
    }
    dispatch(
      addCustomWidget({
        categoryId: activeCategory.id,
        name: widgetName,
        text: widgetText,
      })
    );
    setWidgetName('');
    setWidgetText('');
    setFormError('');
    setShowCreateForm(false);
  };

  const handleConfirm = () => {
    const finalSelections = {};
    categories.forEach((cat) => {
      cat.widgets.forEach((w) => {
        finalSelections[w.id] = isWidgetChecked(w);
      });
    });
    dispatch(applyWidgetSelections(finalSelections));
    dispatch(closeDrawer());
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[1px] transition-opacity"
        onClick={() => dispatch(closeDrawer())}
        aria-hidden="true"
      />

      {/* Slide-over Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Add Widget"
        className="relative z-10 w-full max-w-[480px] bg-white h-full shadow-2xl flex flex-col"
      >
        {/* Drawer Header */}
        <div className="bg-[#14147C] text-white px-5 py-3.5 flex items-center justify-between shrink-0">
          <h2 className="text-sm font-semibold tracking-wide">Add Widget</h2>
          <button
            type="button"
            onClick={() => dispatch(closeDrawer())}
            aria-label="Close drawer"
            className="text-white/80 hover:text-white p-1 rounded transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Subtitle */}
        <p className="text-xs text-slate-600 px-5 pt-4 pb-3 shrink-0">
          Personalise your dashboard by adding the following widget
        </p>

        {/* Category Tabs */}
        <div className="border-b border-slate-200 px-5 flex gap-6 shrink-0 overflow-x-auto">
          {categories.map((category) => {
            const isActive = category.id === activeCategory?.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  dispatch(setActiveDrawerCategoryId(category.id));
                  setFormError('');
                }}
                className={`pb-2.5 text-xs whitespace-nowrap transition border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-[#14147C] text-[#14147C] font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                {category.tabKey}
              </button>
            );
          })}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Widget Checklist */}
          <div className="space-y-2.5">
            {activeCategory?.widgets.map((widget) => {
              const checked = isWidgetChecked(widget);
              return (
                <label
                  key={widget.id}
                  className="border border-slate-200 rounded px-3 py-2.5 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleToggleCheckbox(widget)}
                    className="w-4 h-4 accent-[#14147C] rounded cursor-pointer"
                  />
                  <span className="text-xs font-medium text-[#1E293B] select-none">
                    {widget.name}
                  </span>
                </label>
              );
            })}
          </div>

          {/* Create New Custom Widget Form */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setShowCreateForm((prev) => !prev)}
              className="w-full flex items-center justify-between text-xs font-semibold text-[#14147C] hover:bg-[#F0F5FA] px-3 py-2 rounded-md border border-dashed border-[#14147C]/40 transition cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                Create New Widget in {activeCategory?.tabKey}
              </span>
              {showCreateForm ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showCreateForm && (
              <form
                onSubmit={handleCreateCustomWidget}
                className="mt-3 p-3.5 bg-[#F0F5FA]/70 border border-slate-200 rounded-lg space-y-3"
              >
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Widget Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={widgetName}
                    onChange={(e) => {
                      setWidgetName(e.target.value);
                      if (formError) setFormError('');
                    }}
                    placeholder="e.g. Compliance Score Summary"
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#14147C]/20 focus:border-[#14147C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Widget Text
                  </label>
                  <textarea
                    rows={3}
                    value={widgetText}
                    onChange={(e) => setWidgetText(e.target.value)}
                    placeholder="Enter widget description or metrics summary..."
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#14147C]/20 focus:border-[#14147C] resize-none"
                  />
                </div>

                {formError && (
                  <p className="text-[11px] text-red-600 font-medium">{formError}</p>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#14147C] hover:bg-[#0F172A] text-white text-xs font-semibold px-3.5 py-1.5 rounded transition cursor-pointer"
                  >
                    Add Custom Widget
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Sticky Bottom Right Footer */}
        <div className="px-5 py-3.5 border-t border-slate-200 bg-white flex items-center justify-end gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => dispatch(closeDrawer())}
            className="bg-white border border-[#14147C] text-[#14147C] hover:bg-slate-50 text-xs font-semibold px-5 py-2 rounded-md transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="bg-[#14147C] hover:bg-[#0F172A] text-white text-xs font-semibold px-5 py-2 rounded-md transition cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </aside>
    </div>
  );
}

export default function AddWidgetDrawer() {
  const isDrawerOpen = useSelector((state) => state.dashboard.isDrawerOpen);
  if (!isDrawerOpen) return null;
  return <DrawerContent />;
}

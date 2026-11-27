import { createSlice } from '@reduxjs/toolkit';
import initialData from '../data/dashboardData.json';

const STORAGE_KEY = 'cnapp_dashboard_categories_v1';

const cloneInitialCategories = () =>
  JSON.parse(JSON.stringify(initialData.categories));

const loadCategoriesFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return cloneInitialCategories();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return cloneInitialCategories();
  } catch {
    return cloneInitialCategories();
  }
};

const saveCategoriesToStorage = (categories) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  } catch {
    // Ignore storage quota or private mode errors
  }
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    categories: loadCategoriesFromStorage(),
    searchQuery: '',
    timeframe: 'Last 2 days',
    isDrawerOpen: false,
    activeDrawerCategoryId: initialData.categories[0]?.id || 'cspm',
  },
  reducers: {
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category) {
        const widget = category.widgets.find((w) => w.id === widgetId);
        if (widget) {
          widget.checked = false;
        }
      }
      saveCategoriesToStorage(state.categories);
    },
    applyWidgetSelections: (state, action) => {
      const selections = action.payload; // { [widgetId]: boolean }
      state.categories.forEach((category) => {
        category.widgets.forEach((widget) => {
          if (Object.prototype.hasOwnProperty.call(selections, widget.id)) {
            widget.checked = Boolean(selections[widget.id]);
          }
        });
      });
      saveCategoriesToStorage(state.categories);
    },
    addCustomWidget: (state, action) => {
      const { categoryId, name, text } = action.payload;
      const category = state.categories.find((c) => c.id === categoryId);
      if (category && name.trim()) {
        const newWidget = {
          id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          name: name.trim(),
          type: 'text',
          checked: true,
          isCustom: true,
          text: text.trim() || 'Custom widget content',
        };
        category.widgets.push(newWidget);
        saveCategoriesToStorage(state.categories);
      }
    },
    resetDefaultWidgets: (state) => {
      state.categories = cloneInitialCategories();
      state.searchQuery = '';
      saveCategoriesToStorage(state.categories);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setTimeframe: (state, action) => {
      state.timeframe = action.payload;
    },
    openDrawer: (state, action) => {
      state.isDrawerOpen = true;
      if (action.payload) {
        state.activeDrawerCategoryId = action.payload;
      }
    },
    closeDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    setActiveDrawerCategoryId: (state, action) => {
      state.activeDrawerCategoryId = action.payload;
    },
  },
});

export const {
  removeWidget,
  applyWidgetSelections,
  addCustomWidget,
  resetDefaultWidgets,
  setSearchQuery,
  setTimeframe,
  openDrawer,
  closeDrawer,
  setActiveDrawerCategoryId,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

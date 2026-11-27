# CNAPP Dashboard

A responsive, JSON-driven **Cloud-Native Application Protection Platform (CNAPP) Dashboard** built with React, Vite, Tailwind CSS, and Redux Toolkit.

## Features

- **Enterprise CNAPP Layout:** Clean `#F0F5FA` canvas, full-width navigation header with breadcrumb (`Home > Dashboard V2`), global search, timeframe filter (`Last 2 days`, `Last 7 days`, `Last 30 days`), and 3-column responsive widget grid.
- **Custom Lightweight SVG Visuals:**
  - **Donut Charts:** Multi-segment proportional SVG rings with center totals and square-dot legends (`Cloud Accounts`, `Cloud Account Risk Assessment`).
  - **Horizontal Stacked Progress Bars:** Multi-segment vulnerability and image severity bars with 2×2 legend grids (`Image Risk Assessment`, `Image Security Issues`).
  - **Empty Chart States:** Clean placeholder states for categories without graph data (`CWPP Dashboard`).
- **Dynamic Widget Management:**
  - **Remove Widgets:** One-click `✕` button on any widget card to remove it from the active dashboard view.
  - **Slide-Over "Add Widget" Drawer:** Category tabs (`CSPM`, `CWPP`, `Image`, `Ticket`) with staged checkboxes (`Confirm` / `Cancel`) and an inline **Create New Widget** form to add custom text-based widgets to any category.
- **Real-Time Global Search:** Instant case-insensitive filtering across all visible widgets by name or text content.
- **Persistent State & Reset:** All widget toggles and custom widgets persist in `localStorage`, with a **Reset Default Widgets** option in the header's three-dots (`⋮`) menu.

## Architecture

### JSON Schema (`src/data/dashboardData.json`)

The dashboard is driven by a normalized category-and-widget JSON structure:

```json
{
  "categories": [
    {
      "id": "cspm",
      "name": "CSPM Executive Dashboard",
      "tabKey": "CSPM",
      "alwaysShow": true,
      "widgets": [
        {
          "id": "cloud-accounts",
          "name": "Cloud Accounts",
          "type": "donut",
          "checked": true,
          "total": 2,
          "totalLabel": "Total",
          "segments": [
            { "label": "Connected", "value": 2, "color": "#4C73FF" },
            { "label": "Not Connected", "value": 2, "color": "#E1E8FF" }
          ]
        }
      ]
    }
  ]
}
```

### Redux Toolkit Store (`src/store/dashboardSlice.js`)

- Initializes `categories` from `localStorage` (`cnapp_dashboard_categories_v1`), falling back to `src/data/dashboardData.json`.
- Exposes actions for `removeWidget`, `applyWidgetSelections`, `addCustomWidget`, `resetDefaultWidgets`, `setSearchQuery`, `setTimeframe`, `openDrawer`, `closeDrawer`, and `setActiveDrawerCategoryId`.

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Swa-starz20/cnapp-dashboard.git
   cd cnapp-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

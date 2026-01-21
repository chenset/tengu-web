# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **tengu-web**, a frontend web application for managing container instances (likely Alibaba Cloud Container Instances/ECI). It provides a web interface for creating, monitoring, and managing container groups with features like resource allocation, pricing estimation, and lifecycle management.

The application is a **pure static frontend** with no build step - it uses:
- Vue 3 (loaded via CDN)
- Vue Router (hash mode)
- http-vue-loader for single-file component loading
- Tailwind CSS (via CDN)
- Native ES5 JavaScript (no transpilation)

## Architecture

### Frontend-Only Static Application
- No build process, bundler, or compilation required
- All dependencies loaded via CDN (Vue 3, Vue Router, Tailwind)
- Vue components are loaded asynchronously at runtime using http-vue-loader
- Designed to be served as static files from any web server

### Routing (Vue Router Hash Mode)
Routes are defined in `index.html` lines 34-65:
- `/` or `/index` - Main landing page (index.vue)
- `/list` - Container instance list and management (list.vue)
- `/t-env/:ip/:port/:id/*` - Container environment viewer (t-env.vue) - embeds remote container terminal in iframe

### Component Structure
Components located in `static/component/`:
- `common.vue` - Global message/notification system, dialogs, loading overlays
- `index.vue` - Landing page with iframe for external content
- `list.vue` - **Main application** - Container group CRUD interface with complex form validation, pricing calculator, data table
- `t-env.vue` - Container terminal viewer with draggable control panel overlay
- `404.vue` - Not found page

### Global Utilities (static/app.js)
Contains extensive utility functions used across components:
- **Dark mode**: `darkModeToggle()`, `isDarkMode()` - Cookie-based theme switching
- **Formatting**: `byteFormat()`, `fileSizeH()`, `timestampHumanReadable()`, `numFormat()`
- **Date/Time**: Timezone conversions for Shanghai (+8), Mexico (-6), with Number prototype extensions
- **UI**: `popupWindow()`, `showLoading()`, `hideLoading()`, `tableToExcel()`
- **Network**: `jsonpRequest()`, `checkParseJson()` for backend API calls
- **Browser ID**: `getBrowserUniqueId()` - Canvas-based fingerprinting
- **SMS Highlighting**: Custom regex-based content highlighting for financial keywords (appears to be legacy code from a previous project)

### Backend Integration
The application communicates with a backend API at:
- **Production**: Same-origin requests (empty base URL)
- **Development**: Configurable local URL (default: `http://127.0.0.1:44056`)
- API detection logic in `list.vue` computed property `apiBaseUrl()` (line 1111)

Key API endpoints (all POST with JSON):
- `/tengu/instance/describeContainerGroupPage` - List container groups with pagination
- `/tengu/instance/getContainerGroupDictOptions` - Get form dropdown options/defaults
- `/tengu/instance/createContainerGroup` - Create new container group
- `/tengu/instance/refreshContainerGroup` - Refresh container state
- `/tengu/container/open/redirect` - Redirect to container terminal

### Key Features
1. **Container Management** (list.vue):
   - Dynamic form with 10+ configurable options (region, CPU, memory, network, etc.)
   - Real-time pricing calculator (fetches hourly costs from backend)
   - Memory options filtered by CPU selection
   - Spot instance support with price limits
   - Default values pre-populated from backend

2. **Data Table** (list.vue):
   - Paginated container group listing
   - Status badges (运行中/Running, 创建中/Creating, 已终止/Stopped, etc.)
   - Actions: Open terminal, Refresh state, Release/Delete
   - Auto-refresh capability

3. **Global Messaging System** (common.vue):
   - Toast notifications (success/error/warning/info)
   - Confirmation dialogs
   - Large modal dialogs for complex content
   - Exposed via `window.$message()` and `window.$confirm()`

## Development Workflow

### Running Locally
Since this is a static frontend application:

1. **Using any static file server**:
   ```bash
   # Python 3
   python -m http.server 8080

   # Python 2
   python -m SimpleHTTPServer 8080

   # Node.js (if you have http-server installed)
   npx http-server -p 8080

   # PHP
   php -S localhost:8080
   ```

2. **Access the application**:
   ```
   http://localhost:8080/index.html
   ```

3. **Backend API Configuration**:
   - For local development, the app expects backend at `http://127.0.0.1:44056`
   - Modify `apiBaseUrl()` in `list.vue` line 1111 if your backend runs elsewhere
   - Or use port 8551 to automatically use same-origin requests

### No Build Process Required
- Edit `.vue` files directly - changes take effect on browser refresh
- Edit `static/app.js` for utility functions
- Edit `index.html` for routing or adding new global scripts
- No npm install, no webpack, no compilation

## Code Style & Patterns

### Vue 3 Composition
Components use Vue 3 Options API (exported as CommonJS modules):
```javascript
module.exports = {
  data() { return {...} },
  computed: {...},
  methods: {...},
  mounted() {...}
}
```

### Async/Await Pattern
All API calls use modern async/await with try/catch:
```javascript
async methodName() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // handle result
  } catch (error) {
    window.$message('Error: ' + error.message, 'error');
  }
}
```

### Tailwind CSS
Styling uses Tailwind utility classes directly in templates:
```html
<div class="bg-blue-100 text-blue-800 px-2 py-1 rounded">
```

### Global Messaging
Use the global notification system from any component:
```javascript
window.$message('Operation successful', 'success');
const confirmed = await window.$confirm('Are you sure?', 'Confirm');
```

## Important Constraints

1. **No Modern JS Syntax**: Code must be ES5-compatible (no arrow functions in certain contexts, no optional chaining)
2. **No Build Tools**: Cannot use import/export, TypeScript, JSX, or any bundler features
3. **CDN Dependencies Only**: All libraries must be loaded via `<script>` tags in index.html
4. **Hash Routing Only**: Vue Router uses hash mode (`#/path`), not history mode
5. **Backend Dependency**: Application requires backend API for all data operations

## File Organization

```
tengu-web/
├── index.html              # Entry point, router config, global scripts
├── static/
│   ├── app.js             # Global utilities (1026 lines)
│   ├── app.min.js         # Minified third-party libraries
│   ├── app.css            # Global styles
│   ├── tailwind.4.1.17.prod.js  # Tailwind CSS
│   ├── component/
│   │   ├── common.vue     # Global UI components
│   │   ├── list.vue       # Main container management (1959 lines)
│   │   ├── index.vue      # Landing page
│   │   ├── t-env.vue      # Terminal viewer
│   │   └── 404.vue        # Error page
│   └── icon/              # Favicon files (icloud-red-*.png)
└── .gitignore
```

## Common Tasks

### Adding a New Route
Edit `index.html` routes array (line 36):
```javascript
{
  path: '/new-route',
  component: Vue.defineAsyncComponent(httpVueLoaderVersion('/static/component/new-page.vue')),
  meta: { title: "Page Title" }
}
```

### Adding a New Component
Create `static/component/your-component.vue`:
```vue
<template>
  <div>Content</div>
</template>

<script>
module.exports = {
  data() {
    return {}
  }
}
</script>

<style scoped>
/* component styles */
</style>
```

### Calling Backend APIs
Follow the pattern in `list.vue`:
```javascript
const response = await fetch(`${this.apiBaseUrl}/api/endpoint`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});
const result = await response.json();
if (result.resultCode === 1) {
  // success
} else {
  window.$message('Error: ' + result.message, 'error');
}
```

### Debugging
- Open browser DevTools console
- Check Network tab for API calls
- Vue components are loaded asynchronously - check for 404s on .vue files
- Backend API errors are logged to console with descriptive messages

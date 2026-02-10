# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **tengu-web**, a frontend web application for managing container instances (likely Alibaba Cloud Container Instances/ECI). It provides a web interface for user authentication, role-based access control, and container lifecycle management with features like resource allocation, pricing estimation, and terminal access.

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

### Authentication & Authorization

**Token-Based Authentication:**
- Login flow: User submits email/password → Backend returns `apiAccessToken` → Stored in localStorage
- All API calls automatically include token via `fetchWithToken()` helper
- Token sent in `X-API-ACCESS-TOKEN` header
- 401 responses trigger automatic redirect to `/login`
- Logout clears localStorage and redirects to login page

**Role-Based Access Control (RBAC):**
- Roles: `admin` | `user`
- Admin features: User management, view all containers, access to `/user` route
- User features: View/manage own containers only
- Current user data stored in localStorage as `_current_login_account`

### Routing (Vue Router Hash Mode)

Routes are defined in `index.html` lines 37-80:
- `/login` - User authentication login page (login.vue)
- `/user` - User management interface (user.vue) - **admin only**
- `/` or `/list` - Container instance list and management (list.vue) - **default route**
- `/t-env/:ip/:port/:id/*` - Container environment viewer (t-env.vue) - embeds terminal in iframe
- `/:pathMatch(.*)*` - 404 error page

### Component Structure

Components located in `static/component/`:

**Authentication & User Management:**
- `login.vue` - User login form with email/password authentication
- `user.vue` - Admin-only user management (create, list, enable/disable, password reset)
- `header.vue` - Shared header component with logout button and role-based navigation

**Container Management:**
- `list.vue` - Main application: container group list, status filtering, event viewer
- `create-container.vue` - Modal dialog for creating container groups with dynamic form and pricing calculator
- `t-env.vue` - Container terminal viewer with draggable control panel overlay

**Utilities:**
- `common.vue` - Global message/notification system, dialogs, loading overlays
- `404.vue` - Not found page

### Global Utilities (static/app.js)

Contains extensive utility functions used across components:

**Authentication & API:**
- `fetchWithToken(url, options)` - Wrapper around fetch() that automatically adds `X-API-ACCESS-TOKEN` header and handles 401 redirects
- `setApiAccessToken(token)` - Store token in localStorage
- `getApiAccessToken()` - Retrieve token from localStorage
- `removeApiAccessToken()` - Clear token from localStorage
- `apiBaseUrl()` - Returns empty string for production (same-origin), or `http://127.0.0.1:44056` for development (local/private IPs)

**Formatting & Display:**
- `byteFormat()`, `fileSizeH()` - Human-readable file sizes
- `timestampHumanReadable()` - Duration formatting
- `numFormat()` - Number formatting with thousands separator

**Date/Time:**
- Timezone conversions for Shanghai (+8), Mexico (-6)
- Number prototype extensions: `timestamp2yyyymmddhmShangHaiTime()`, `timestamp2yyyymmddhms()`

**UI Helpers:**
- `darkModeToggle()`, `isDarkMode()` - Cookie-based dark mode
- `popupWindow()` - Window.open wrapper
- `showLoading()`, `hideLoading()` - Global loading spinner
- `tableToExcel()` - Export table to Excel

**Other:**
- `getBrowserUniqueId()` - Canvas-based browser fingerprinting
- `isMobile()` - Mobile device detection
- `sleep(ms)` - Promise-based delay

### Backend Integration

The application communicates with a backend API:
- **Production**: Same-origin requests (empty base URL)
- **Development**: Auto-detected for private/local IPs (returns `http://127.0.0.1:44056`)
- API base URL determined by `apiBaseUrl()` function in `static/app.js`
- **All API calls must use `fetchWithToken()` instead of `fetch()`** to include authentication token

#### API Endpoints

**Authentication:**
- `POST /tengu/login` - User login (returns apiAccessToken)
- `GET /tengu/logout` - User logout
- `POST /tengu/account/my` - Get current user session info

**User Management (Admin Only):**
- `POST /tengu/account/create` - Create new user
- `POST /tengu/account/page` - List users (paginated)
- `POST /tengu/account/status/switch` - Enable/disable user account
- `POST /tengu/account/password/reset` - Reset user password

**Container Instance Management:**
- `POST /tengu/instance/describeContainerGroupPage` - List container groups (paginated, filtered)
- `POST /tengu/instance/getContainerGroupDictOptions` - Get form dropdown options, defaults, and read-only field config
- `POST /tengu/instance/createContainerGroup` - Create new container group
- `POST /tengu/instance/describeContainerGroupPrice` - Get real-time pricing estimate
- `POST /tengu/instance/refreshContainerGroup` - Refresh container state from cloud provider
- `POST /tengu/instance/deleteContainerGroup` - Delete/release container group

**Container Terminal:**
- `GET /tengu/container/open/redirect` - Get redirect URL to container terminal
- `GET /tengu/container/control/panel` - Get control panel configuration for container

### Key Features

1. **User Authentication System**:
   - Login page with email/password
   - Token stored in localStorage with automatic injection into API calls
   - 401 responses trigger logout and redirect to login
   - Session persistence across page refreshes

2. **User Management (Admin Only)**:
   - Create users with email, nickname, role (admin/user)
   - View paginated user list with statistics (total cost, time consumed)
   - Enable/disable user accounts
   - Reset user passwords
   - Role-based menu visibility

3. **Container Management**:
   - Dynamic form with cascading options (CPU → Memory filtering)
   - Real-time pricing calculator (fetches hourly cost from backend)
   - Container scene support (`R_LAN` vs `R_WAN`)
   - Backend-controlled form behavior (read-only fields, defaults, available options)
   - Spot instance support with price limits

4. **Container List & Monitoring**:
   - Paginated container group listing
   - Status filtering with tag-based UI (运行中/Running, 创建中/Creating, etc.)
   - Event viewer for container warnings and errors
   - Quick actions: Open terminal, Refresh state, Release/Delete
   - Visual indicators for user ownership (admin see highlighted containers)

5. **Container Terminal Viewer**:
   - Embedded iframe showing container terminal
   - Draggable control panel overlay
   - Release/delete functionality from terminal view

6. **Global UI Components**:
   - Toast notifications (success/error/warning/info) via `window.$message()`
   - Confirmation dialogs via `window.$confirm()`
   - Large modal dialogs for complex content
   - Loading overlays

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
   - Modify `apiBaseUrl()` in `static/app.js` if your backend runs elsewhere
   - Using port 8551 or 8552 forces same-origin requests

### No Build Process Required
- Edit `.vue` files directly - changes take effect on browser refresh
- Edit `static/app.js` for utility functions
- Edit `index.html` for routing or adding new global scripts
- No npm install, no webpack, no compilation

## Code Style & Patterns

### Vue 3 Options API
Components use Vue 3 Options API (exported as CommonJS modules):
```javascript
module.exports = {
  data() { return {...} },
  computed: {...},
  methods: {...},
  mounted() {...}
}
```

### Async/Await with Error Handling
All API calls use modern async/await with try/catch:
```javascript
async methodName() {
  try {
    const response = await fetchWithToken(url, options);
    const result = await response.json();
    if (result.resultCode === 1) {
      // success
    } else {
      window.$message(result.message || 'Error', 'error');
    }
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
6. **Authentication Required**: Most routes require valid `apiAccessToken` in localStorage

## Common Tasks

### Adding a New Route
Edit `index.html` routes array (line 37):
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
**IMPORTANT**: Always use `fetchWithToken()` instead of `fetch()`:

```javascript
// apiBaseUrl() is a global function from app.js
const response = await fetchWithToken(`${apiBaseUrl()}/tengu/endpoint`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
});

const result = await response.json();
if (result.resultCode === 1) {
  // success - result.data contains response data
  console.log(result.data);
} else {
  window.$message(result.message || 'Error occurred', 'error');
}
```

**Note**: `fetchWithToken()` automatically:
- Adds `X-API-ACCESS-TOKEN` header from localStorage
- Redirects to `/login` on 401 responses
- Returns the fetch Response object for chaining

### Checking User Role
```javascript
// Fetch current user info
const response = await fetchWithToken(apiBaseUrl() + '/tengu/account/my', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
});
const result = await response.json();

if (result.resultCode === 1) {
  const currentUser = result.data;
  if (currentUser.role === 'admin') {
    // Show admin-only features
  }
}
```

### Debugging
- Open browser DevTools console
- Check Network tab for API calls
- Inspect localStorage for `apiAccessToken` and `_current_login_account`
- Vue components are loaded asynchronously - check for 404s on .vue files
- Backend API errors are logged to console with descriptive messages
- Check for 401 responses if automatically redirected to login

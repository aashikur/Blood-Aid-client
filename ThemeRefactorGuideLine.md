# BloodAid Theme Refactoring Guideline

**Version:** 2.0 (Updated: December 3, 2025)  
**Purpose:** Complete reference for implementing Dark Glassmorphism design system across all pages and components.  
**Status:** Production-Ready - Any AI or developer can use this to build/refactor pages independently.

This document serves as the **single source of truth** for the BloodAid application's **Dark Glassmorphism** design system. All future development must strictly adhere to these guidelines.

---

## 1. Core Design Philosophy: "Dark Glassmorphism"

The design language combines:
- **Deep, rich dark backgrounds** for reduced eye strain
- **Glass-like transparency effects** for depth perception
- **Vibrant purple/pink gradients** for accent and focus
- **Subtle animations** for smooth interactions
- **Inclusive contrast ratios** for accessibility

### **Color Palette**

| Role | Tailwind Class | Hex Value | Usage |
|:---|:---|:---|:---|
| **Main Background** | `bg-[#0B0B15]` | `#0B0B15` | Page background, input fields |
| **Card Background** | `bg-[#131320]` | `#131320` | Alternative card styling |
| **Glass Overlay** | `bg-white/5 backdrop-blur-sm` | `rgba(255,255,255,0.05)` | Cards, panels, modals |
| **Glass Hover** | `bg-white/10 backdrop-blur-sm` | `rgba(255,255,255,0.10)` | Interactive glass elements |
| **Border (Default)** | `border-white/10` | `rgba(255,255,255,0.10)` | Card and component borders |
| **Border (Hover)** | `border-white/20` | `rgba(255,255,255,0.20)` | Border on hover/focus |
| **Primary Gradient** | `from-purple-600 to-pink-600` | `#9333ea → #db2777` | Buttons, CTAs, highlights |
| **Primary Text** | `text-white` | `#FFFFFF` | Headings, primary text |
| **Secondary Text** | `text-gray-400` | `#9CA3AF` | Body text, descriptions |
| **Muted Text** | `text-gray-500` | `#6B7280` | Placeholders, captions |
| **Success** | `bg-emerald-500/20 text-emerald-300` | Semantic | Status badges, confirmations |
| **Warning** | `bg-yellow-500/20 text-yellow-300` | Semantic | Alerts, pending states |
| **Danger** | `bg-red-500/20 text-red-300` | Semantic | Errors, delete actions |
| **Info** | `bg-blue-500/20 text-blue-300` | Semantic | Information, neutral status |

### **Typography**

| Element | Style | Notes |
|:---|:---|:---|
| **Headings (H1)** | `text-4xl font-bold text-white` | Page titles |
| **Headings (H2)** | `text-2xl font-bold text-white` | Section titles |
| **Headings (H3)** | `text-xl font-bold text-white` | Subsection titles |
| **Body Text** | `text-base text-gray-400` | Main content |
| **Label Text** | `text-sm font-medium text-gray-400` | Form labels, captions |
| **Small Text** | `text-xs text-gray-500` | Secondary info, timestamps |

---

## 2. Component Styling Guidelines

### **A. Page Layout & Containers**

**Main Page Container:**
```jsx
<div className="min-h-screen bg-gradient-to-br from-[#0B0B15] via-[#0B0B15] to-purple-900/20 p-4 md:p-8">
  <div className="max-w-7xl mx-auto">
    {/* Content */}
  </div>
</div>
```

**Card / Panel:**
```jsx
<div className="rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
  {/* Content */}
</div>
```

**Spacing Standards:**
- **Section spacing**: `mb-8` or `space-y-8`
- **Card padding**: `p-6` (standard) or `p-4` (compact)
- **Grid gaps**: `gap-6` (standard) or `gap-4` (tight)

---

### **B. Buttons & CTAs**

**Primary Button (CTA):**
```jsx
<button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2">
  <Icon className="text-sm" />
  Action Text
</button>
```

**Secondary Button (Outline):**
```jsx
<button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300">
  Secondary Action
</button>
```

**Icon Button (Compact):**
```jsx
<button className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 transition-all duration-200 border border-white/10 hover:border-blue-500/30">
  <FaIcon className="text-sm" />
</button>
```

**Button States:**
- **Hover**: Add `scale-105` or shadow
- **Disabled**: `opacity-50 cursor-not-allowed`
- **Loading**: Use spinner with `animate-spin`

---

### **C. Form Elements**

**Input Field:**
```jsx
<input
  type="text"
  placeholder="Enter text..."
  className="w-full bg-[#0B0B15] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-purple-500 focus:outline-none placeholder-gray-500 transition-colors"
/>
```

**Select Dropdown:**
```jsx
<select className="w-full bg-[#0B0B15] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-purple-500 focus:outline-none cursor-pointer">
  <option>Option 1</option>
</select>
```

**Form Label:**
```jsx
<label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
  <Icon className="text-purple-500" />
  Label Text
</label>
```

**Form Section Divider:**
```jsx
<div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>
```

---

### **D. Tables**

**Table Container:**
```jsx
<div className="rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 overflow-hidden">
  <table className="w-full">
    {/* ... */}
  </table>
</div>
```

**Table Header:**
```jsx
<thead className="bg-white/5 border-b border-white/10">
  <tr>
    <th className="px-6 py-4 text-left text-white font-semibold text-sm">Column</th>
  </tr>
</thead>
```

**Table Body:**
```jsx
<tbody className="divide-y divide-white/5">
  <tr className="hover:bg-white/5 transition-colors duration-200">
    <td className="px-6 py-4 text-white font-medium">Data</td>
  </tr>
</tbody>
```

---

### **E. Status Badges & Tags**

**Status Badge Pattern:**
```jsx
<span className="px-3 py-1 rounded-full text-xs font-bold inline-block border {STATUS_CLASS}">
  {status}
</span>
```

**Status Classes:**
```javascript
const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  inprogress: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  done: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  canceled: "bg-red-500/20 text-red-300 border border-red-500/30",
};
```

---

### **F. Stat/Summary Cards**

**Stat Card Component Pattern:**
```jsx
const StatCard = ({ icon: Icon, label, value, trend }) => (
  <div className="rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <Icon className="text-2xl text-purple-400 group-hover:text-purple-300 transition-colors" />
      <span className="text-xs font-semibold text-emerald-400">{trend}</span>
    </div>
    <p className="text-gray-400 text-sm mb-2">{label}</p>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);
```

**Usage:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <StatCard icon={FaUser} label="Total Users" value={123} trend="+12.5%" />
</div>
```

---

### **G. Modal/Dialog Patterns**

**Modal Container:**
```jsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-md w-full mx-4">
    <div className="px-6 py-4 border-b border-white/10">
      <h2 className="text-xl font-bold text-white">Modal Title</h2>
    </div>
    <div className="px-6 py-6">{/* Content */}</div>
    <div className="px-6 py-4 border-t border-white/10 flex gap-3 justify-end">
      <button className="px-4 py-2 rounded-lg bg-white/5 text-white">Cancel</button>
      <button className="px-4 py-2 rounded-lg bg-purple-600 text-white">Confirm</button>
    </div>
  </div>
</div>
```

---

### **H. Empty States**

```jsx
<div className="px-6 py-16 text-center">
  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
    <Icon className="text-3xl text-gray-600" />
  </div>
  <p className="text-gray-400 mb-6">No items found</p>
  <button className="px-6 py-2 rounded-lg bg-purple-600/50 hover:bg-purple-600 text-white">
    Create One
  </button>
</div>
```

---

### **I. Loading States**

**Spinner:**
```jsx
<div className="inline-block animate-spin">
  <div className="w-8 h-8 border-4 border-purple-400/30 border-t-purple-400 rounded-full"></div>
</div>
```

**Full Page Loading:**
```jsx
<div className="px-6 py-12 text-center">
  <div className="inline-block animate-spin">
    <div className="w-8 h-8 border-4 border-purple-400/30 border-t-purple-400 rounded-full"></div>
  </div>
  <p className="text-gray-400 mt-4">Loading...</p>
</div>
```

---

## 3. Reusable Components Library

These components are already built and should be used in all new pages:

### **FilterBar.jsx**
**Location:** `src/components/dashboard/shared/FilterBar.jsx`

**Usage:**
```jsx
import FilterBar from "@/components/dashboard/shared/FilterBar";

<FilterBar 
  searchTerm={search}
  onSearch={(e) => setSearch(e.target.value)}
  filters={[
    {
      value: statusFilter,
      onChange: (e) => setStatusFilter(e.target.value),
      options: [
        { label: "All", value: "all" },
        { label: "Pending", value: "pending" }
      ]
    }
  ]}
/>
```

**Features:**
- Search input with icon
- Multiple filter dropdowns
- Glass styling
- Responsive layout

---

### **Pagination.jsx**
**Location:** `src/components/dashboard/shared/Pagination.jsx`

**Usage:**
```jsx
import Pagination from "@/components/dashboard/shared/Pagination";

<Pagination 
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>
```

**Features:**
- Page number navigation
- Ellipsis for large page counts
- Active page highlighting with gradient
- Disabled states

---

### **DonationRequestForm.jsx**
**Location:** `src/components/dashboard/shared/DonationRequestForm.jsx`

**Usage:**
```jsx
import DonationRequestForm from "@/components/dashboard/shared/DonationRequestForm";

<DonationRequestForm 
  initialData={requestData}
  mode="view"  // or "edit"
  onSubmit={handleSubmit}
  isSubmitting={isLoading}
/>
```

**Features:**
- View and edit modes
- Icon-prefixed input fields
- District/Upazila cascading selectors
- Form validation
- Icon-based field labels

---

### **StatCard Component**
**Location:** No separate file (inline in pages)

**Pattern:** Always create this component at the top of dashboard pages
```jsx
const StatCard = ({ icon: Icon, label, value, trend }) => (
  <div className="rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <Icon className="text-2xl text-purple-400 group-hover:text-purple-300 transition-colors" />
      <span className="text-xs font-semibold text-emerald-400">{trend}</span>
    </div>
    <p className="text-gray-400 text-sm mb-2">{label}</p>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);
```

---

## 4. Data State Management Patterns

### **Using TanStack Query**

**Standard Pattern:**
```jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";

const { data = [], isLoading, isError } = useQuery({
  queryKey: ["endpoint-name", userId],
  queryFn: async () => {
    const { data } = await axiosSecure.get(`/endpoint?id=${userId}`);
    return data;
  },
});
```

**Query Invalidation (After Mutations):**
```jsx
import { useQueryClient } from "@tanstack/react-query";

const queryClient = useQueryClient();

// After creating/updating data
queryClient.invalidateQueries(["endpoint-name"]);
```

**Loading State:**
```jsx
{isLoading ? (
  <LoadingSpinner />
) : data.length > 0 ? (
  <DataTable data={data} />
) : (
  <EmptyState />
)}
```

---

## 5. Page Refactoring Workflow

### **Step-by-Step Process**

**1. Analyze & Plan**
- Identify data being displayed (tables, forms, stats)
- Note functional requirements (actions, filters, pagination)
- List all interactive elements

**2. Create Page Structure**
```jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaIcon } from "react-icons/fa";

export default function PageName() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  
  // Fetch data
  const { data = [], isLoading } = useQuery({
    queryKey: ["data-name"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/endpoint");
      return data;
    },
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B15] via-[#0B0B15] to-purple-900/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome/Header */}
        {/* Stats */}
        {/* Main Content */}
      </div>
    </div>
  );
}
```

**3. Add Components in Order**
- ✅ Welcome/Header section
- ✅ Stat cards
- ✅ Filters/Search
- ✅ Main table/list
- ✅ Loading state
- ✅ Empty state
- ✅ Pagination

**4. Apply Styling**
- Use classes from guideline
- Add transitions and hover effects
- Ensure responsive design
- Test dark mode

---

## 6. Icon Usage

**Import Pattern:**
```jsx
import { 
  FaUser, FaTint, FaDonate, FaRegListAlt,
  FaArrowRight, FaEdit, FaEye, FaPlus,
  FaCheckCircle, FaClock, FaTimesCircle
} from "react-icons/fa";
```

**Icon Placement:**
- **Buttons:** Before text with `gap-2`
- **Headers:** Next to title with `text-purple-400`
- **Empty states:** Large centered icon `text-3xl text-gray-600`
- **Status:** Inline with status badge
- **Form labels:** Inline with label text `text-purple-500`

---

## 7. Responsive Design

### **Grid Breakpoints**

| Grid Type | Classes |
|:---|:---|
| **1 column** | `grid-cols-1` |
| **2 columns** | `md:grid-cols-2` |
| **3 columns** | `md:grid-cols-3` |
| **4 columns** | `md:grid-cols-4` |
| **5 columns** | `sm:grid-cols-2 md:grid-cols-5` |

**Example:**
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
  {/* Cards */}
</div>
```

### **Mobile-First Approach**
- Start with `grid-cols-1`
- Add `md:` prefixes for desktop
- Use `sm:` for small screens
- Tables always have `overflow-x-auto`

---

## 8. Animation & Transitions

**Standard Transition:**
```jsx
className="transition-all duration-300"
```

**Hover Scales:**
```jsx
className="hover:scale-105 transition-transform duration-300"
```

**Hover Shadow:**
```jsx
className="hover:shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300"
```

**Icon Animations:**
```jsx
className="group-hover:translate-x-1 transition-transform"
className="group-hover:-translate-y-0.5 transition-transform"
```

---

## 9. File Structure & Organization

```
src/
├── components/
│   ├── dashboard/
│   │   ├── shared/
│   │   │   ├── DonationRequestForm.jsx      ✅ Reusable form
│   │   │   ├── FilterBar.jsx                ✅ Reusable filter
│   │   │   ├── Pagination.jsx               ✅ Reusable pagination
│   │   │   └── README.md
│   │   ├── [Feature]Component.jsx
│   │   └── [RoleSpecific]Component.jsx
│   ├── home/
│   ├── funding/
│   ├── loading/
│   │   └── DashboardLoading.jsx             ✅ Loading skeleton
│   └── ui/
├── pages/
│   ├── _dashboard/
│   │   ├── DonorDashboard.jsx               ✅ Redesigned
│   │   ├── VolunteerDashboard.jsx           ✅ Redesigned
│   │   ├── admin/
│   │   ├── shared/
│   │   └── [Role]/
│   ├── _fronted/
│   │   ├── home/
│   │   ├── blog/
│   │   ├── funding/
│   │   └── ...
│   └── ...
├── hooks/
│   ├── axiosPublic.js
│   ├── useAxiosSecure.js
│   └── useDistrictUpazila.js
└── ...
```

---

## 10. Color Reference for Different States

### **Form Validation**
```jsx
// Valid
className="border-emerald-500/30 focus:border-emerald-500"

// Invalid/Error
className="border-red-500/30 focus:border-red-500"

// Warning
className="border-yellow-500/30 focus:border-yellow-500"
```

### **Status Indicators in Tables**
```javascript
const statusStyles = {
  pending: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  inprogress: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  rejected: "bg-red-500/20 text-red-300 border-red-500/30",
  archived: "bg-gray-500/20 text-gray-300 border-gray-500/30",
};
```

---

## 11. Accessibility Guidelines

- **Color Contrast:** All text meets WCAG AA standards
- **Focus States:** Always visible with `focus:border-purple-500 focus:outline-none`
- **Semantic HTML:** Use proper headings, labels, and buttons
- **Icon Labels:** Always pair icons with text or use `title` attribute
- **Keyboard Navigation:** All interactive elements must be keyboard accessible
- **ARIA Labels:** Use for complex components

**Example:**
```jsx
<button 
  aria-label="Delete item"
  className="focus:outline-none focus:ring-2 focus:ring-purple-500"
>
  <FaTrash />
</button>
```

---

## 12. Real-World Page Example

Here's a complete, production-ready example:

```jsx
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaUser, FaPlus, FaEye, FaEdit } from "react-icons/fa";
import FilterBar from "@/components/dashboard/shared/FilterBar";
import Pagination from "@/components/dashboard/shared/Pagination";

const StatCard = ({ icon: Icon, label, value, trend }) => (
  <div className="rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <Icon className="text-2xl text-purple-400 group-hover:text-purple-300 transition-colors" />
      <span className="text-xs font-semibold text-emerald-400">{trend}</span>
    </div>
    <p className="text-gray-400 text-sm mb-2">{label}</p>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

export default function ExampleDashboard() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["items", page, search, status],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/items", {
        params: { page, search, status }
      });
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0B15] via-[#0B0B15] to-purple-900/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your data here</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={FaUser} label="Total" value={items.length} trend="+5%" />
        </div>

        {/* Filter Bar */}
        <FilterBar 
          searchTerm={search}
          onSearch={(e) => setSearch(e.target.value)}
          filters={[{ value: status, onChange: (e) => setStatus(e.target.value), options: [...] }]}
        />

        {/* Table */}
        <div className="rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 overflow-hidden mt-8">
          {isLoading ? (
            <div className="px-6 py-12 text-center">Loading...</div>
          ) : items.length > 0 ? (
            <>
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {items.map(item => (
                    <tr key={item._id} className="hover:bg-white/5">
                      <td className="px-6 py-4 text-white">{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
            </>
          ) : (
            <div className="px-6 py-16 text-center">No items</div>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 13. Testing & Validation Checklist

Before pushing changes:

- ✅ Page loads without errors
- ✅ Dark glassmorphism styling applied
- ✅ All buttons and links work
- ✅ Forms submit correctly
- ✅ Tables display data properly
- ✅ Responsive on mobile/tablet/desktop
- ✅ Loading states display correctly
- ✅ Empty states display correctly
- ✅ Icons render properly
- ✅ No console errors
- ✅ Transitions smooth
- ✅ Hover states visible
- ✅ Focus states visible (keyboard nav)

---

## 14. Common Mistakes to Avoid

❌ **Don't:**
- Use light colors for backgrounds
- Mix old theme colors with new theme
- Forget `backdrop-blur-sm` on glass elements
- Use shadows instead of borders
- Forget responsive classes
- Create new components instead of using shared ones
- Forget loading/empty states
- Use old button styles with inline colors

✅ **Do:**
- Use `bg-[#0B0B15]` and `bg-white/5` combinations
- Apply gradients from purple-600 to pink-600
- Use `transition-all duration-300` on interactive elements
- Use borders `border-white/10` consistently
- Test all screen sizes
- Reuse `FilterBar`, `Pagination`, `StatCard`, etc.
- Always show loading and empty states
- Use gradient buttons for CTAs

---

## 15. Future Maintenance & Updates

**When adding new features:**
1. Follow this guideline exactly
2. Use existing reusable components
3. Update this document if you add new patterns
4. Tag components with version numbers
5. Keep backward compatibility

**Version History:**
- v1.0 (Initial): Basic Dark Glassmorphism
- v2.0 (Current): Added reusable components, query patterns, StatCard component, loading skeleton

---

## 16. Questions & Support

For questions about:
- **Styling:** Check section 2 (Component Styling)
- **Components:** Check section 3 (Reusable Components)
- **Patterns:** Check section 4 & 5 (State Management & Workflow)
- **Examples:** Check section 12 (Real-World Example)

---

**Last Updated:** December 3, 2025  
**Maintainer:** Blood-Aid Dev Team  
**Status:** ✅ Production Ready
    *   **Cards**: Replace white shadows with dark borders and glass backgrounds.
    *   **Tables**: Use the standard table styles defined above.
    *   **Forms**: Update all `<input>` and `<select>` fields to the dark theme style.
    *   **Buttons**: Replace solid colors with the Primary Gradient or Secondary Outline styles.

4.  **Enhance Visuals**:
    *   Add **Icons** (React Icons) to headers, buttons, and empty states.
    *   Add **Gradients** to key areas (hero sections, active states).
    *   Add **Transitions** (`transition-all duration-300`) to interactive elements.

5.  **Check Responsiveness**:
    *   Ensure grids collapse correctly (`grid-cols-1 md:grid-cols-2`).
    *   Ensure tables have `overflow-x-auto`.

---

## 4. Common Code Snippets

### **Page Header**
```jsx
<div className="relative overflow-hidden rounded-3xl bg-[#131320] border border-white/10 p-8">
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-600/10 to-pink-600/10" />
  <div className="relative z-10">
    <h2 className="text-3xl font-bold text-white mb-2">Page Title</h2>
    <p className="text-gray-400">Subtitle or description goes here.</p>
  </div>
</div>
```

### **Gradient Text**
```jsx
<span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
  Highlighted Text
</span>
```

### **Loading State**
```jsx
<div className="flex justify-center items-center h-64">
  <span className="loading loading-spinner loading-lg text-purple-500"></span>
</div>
```

---

## 5. File Structure for Dashboard Pages

Keep dashboard pages modular:

```
src/pages/_dashboard/
├── [Role]Dashboard.jsx       # Main dashboard view for a role
├── shared/                   # Components shared across dashboard pages
│   ├── FilterBar.jsx
│   ├── Pagination.jsx
│   └── ...
└── [Feature]/                # Feature-specific pages
    ├── [Feature]List.jsx     # Table/List view
    ├── [Feature]Form.jsx     # Create/Edit view
    └── ...
```

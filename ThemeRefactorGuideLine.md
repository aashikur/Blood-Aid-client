# BloodAid Theme Refactoring Guideline

This document serves as the comprehensive guide for refactoring the BloodAid application to the new **Dark Glassmorphism** design system. All future development and refactoring tasks must adhere to these guidelines to ensure visual consistency and code maintainability.

---

## 1. Core Design Philosophy: "Dark Glassmorphism"

The new design language is built on a deep, rich dark mode foundation accented with vibrant gradients and glass-like transparency effects.

### **Color Palette**

| Role | Color / Gradient | Tailwind Class | Hex / CSS |
| :--- | :--- | :--- | :--- |
| **Background (Main)** | Deep Navy/Black | `bg-[#0B0B15]` | `#0B0B15` |
| **Background (Card)** | Darker Navy | `bg-[#131320]` | `#131320` |
| **Glass Panel** | Translucent White | `bg-white/5 backdrop-blur-sm` | `rgba(255, 255, 255, 0.05)` |
| **Border (Subtle)** | White Opacity | `border-white/10` | `rgba(255, 255, 255, 0.1)` |
| **Primary Gradient** | Purple to Pink | `from-purple-600 to-pink-600` | `linear-gradient(to right, #9333ea, #db2777)` |
| **Text (Primary)** | White | `text-white` | `#FFFFFF` |
| **Text (Secondary)** | Gray | `text-gray-400` | `#9CA3AF` |
| **Text (Muted)** | Dark Gray | `text-gray-500` | `#6B7280` |
| **Success** | Emerald Green | `text-emerald-400` | `#34D399` |
| **Danger** | Red | `text-red-400` | `#F87171` |
| **Warning** | Yellow | `text-yellow-400` | `#FACC15` |

### **Typography**

*   **Font Family**: Sans-serif (Inter / System Default).
*   **Headings**: Bold, often White or Gradient Text (`bg-clip-text text-transparent`).
*   **Body**: Regular/Medium, Gray-400 for readability on dark backgrounds.

---

## 2. Component Styling Guidelines

When refactoring a page, break it down into these standard components and apply the following styles.

### **A. Layout & Containers**

*   **Page Background**: Always use `min-h-screen bg-[#0B0B15] text-white`.
*   **Cards / Panels**:
    *   Use `rounded-2xl` or `rounded-3xl`.
    *   Background: `bg-[#131320]` OR `bg-white/5` (for glass effect).
    *   Border: `border border-white/10`.
    *   Shadow: `shadow-xl` (optional, for elevation).
    *   **Example**:
        ```jsx
        <div className="bg-[#131320] border border-white/10 rounded-3xl p-6">
          {/* Content */}
        </div>
        ```

### **B. Buttons & Actions**

*   **Primary Button**:
    *   Gradient background.
    *   Hover effects: Scale or shadow glow.
    *   **Class**: `bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all`
*   **Secondary / Outline Button**:
    *   Transparent background with border.
    *   **Class**: `bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl hover:bg-white/10 transition-all`
*   **Icon Button**:
    *   **Class**: `p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors`

### **C. Form Elements**

*   **Inputs / Selects**:
    *   Dark background, light text, subtle border.
    *   **Class**: `w-full bg-[#0B0B15] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-purple-500 focus:outline-none placeholder-gray-500`
*   **Labels**:
    *   **Class**: `block text-sm font-medium text-gray-400 mb-1.5`

### **D. Tables**

*   **Container**: `bg-white/5 border border-white/10 rounded-2xl overflow-hidden`.
*   **Header**: `bg-white/5 text-gray-400 text-xs uppercase tracking-wider border-b border-white/10`.
*   **Row**: `border-b border-white/5 hover:bg-white/5 transition-colors`.
*   **Cell**: `p-4 text-sm`.

### **E. Status Badges**

*   Use `bg-{color}-500/10`, `text-{color}-400`, and `border-{color}-500/20`.
*   **Example (Active)**: `bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-medium`.

---

## 3. Refactoring Workflow

When tasked with refactoring a page (e.g., "Redesign the Donation Request page"), follow these steps:

1.  **Analyze the Existing Page**:
    *   Identify the key data being displayed (lists, forms, stats).
    *   Note the functional requirements (buttons, inputs, interactions).

2.  **Apply the Layout Shell**:
    *   Wrap the content in the standard page container (`space-y-6`).
    *   Add a **Header Section** with a title and breadcrumb/subtitle.

3.  **Replace UI Components**:
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

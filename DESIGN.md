# Figma Design - Marketing Trend Analysis Application

## 🎨 Design System

This document describes the UI/UX design for the Marketing Trend Analysis Web Application. While we've implemented the entire application in code, this outlines the design specifications that were used.

### Color Palette

#### Primary Colors
- **Primary Brand:** `#667eea` (Blue-Purple) - Main actions, links, hover states
- **Primary Dark:** `#764ba2` (Deep Purple) - Gradients, secondary elements
- **Gradient:** `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` - Hero sections, buttons

#### Status Colors
- **Success:** `#10b981` (Green) - GROWTH trend, positive actions
- **Danger:** `#ef4444` (Red) - DECLINE trend, errors, alerts
- **Warning:** `#f59e0b` (Amber) - STABLE trend, warnings
- **Info:** `#3b82f6` (Blue) - General information

#### Neutral Colors
- **Background:** `#f3f4f6` (Light Gray)
- **Surface:** `#ffffff` (White)
- **Border:** `#e5e7eb` (Light Border)
- **Text Primary:** `#1f2937` (Dark Gray)
- **Text Secondary:** `#6b7280` (Medium Gray)

### Typography

#### Font Family
- System Fonts: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif`
- Fallback: Arial, sans-serif

#### Sizes & Weights
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 32px | Bold (700) | 1.2 |
| H2 | 24px | Bold (700) | 1.3 |
| H3 | 20px | Semibold (600) | 1.4 |
| Body | 14px | Regular (400) | 1.6 |
| Small | 12px | Regular (400) | 1.5 |
| Button | 14px | Semibold (600) | 1 |
| Label | 12px | Semibold (600) | 1.2 |

### Spacing System

Based on 4px grid:
- **xs:** 4px
- **sm:** 8px
- **md:** 12px
- **lg:** 16px
- **xl:** 20px
- **2xl:** 24px
- **3xl:** 32px
- **4xl:** 40px

### Components

#### Buttons
- **Primary Button**
  - Background: Gradient (#667eea → #764ba2)
  - Color: White
  - Padding: 12px 20px
  - Border Radius: 8px
  - Hover: Translate -2px, Shadow increase
  - Disabled: Opacity 0.7

- **Secondary Button**
  - Background: Transparent
  - Border: 1px solid #667eea
  - Color: #667eea
  - Padding: 12px 20px
  - Border Radius: 8px

- **Danger Button**
  - Background: #ef4444
  - Color: White
  - Padding: 8px 16px
  - Font Size: 12px
  - Hover: #dc2626

#### Input Fields
- **Style:** Clean, minimal borders
- **Border:** 1px solid #e5e7eb
- **Padding:** 10px 12px
- **Border Radius:** 8px
- **Focus State:** 
  - Border: #667eea
  - Box Shadow: 0 0 0 3px rgba(102, 126, 234, 0.1)

#### Cards
- **Background:** White
- **Border:** None or 1px #e5e7eb
- **Box Shadow:** 0 1px 3px rgba(0, 0, 0, 0.1)
- **Border Radius:** 12px
- **Padding:** 20px

#### Forms
- **Gaps:** 15px between fields, 20px between form groups
- **Labels:** Above input, font-weight 600
- **Error Messages:** 
  - Background: #fee2e2
  - Color: #dc2626
  - Padding: 12px
  - Border Radius: 8px

### Layout & Spacing

#### Container
- **Max Width:** 1400px
- **Padding:** 20px (responsive)
- **Centered:** Auto margins

#### Grid Systems
- **Dashboard Metrics:** `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`
- **Charts Layout:** 2 columns (50% each)
- **Mobile:** Single column layout

### Pages & Screens

#### 1. Login/Register Page
**Purpose:** User authentication entry point

**Sections:**
- Header: Logo/Title + Subtitle
- Form Container: Centered white card
  - Email input
  - Password input
  - (Name input - register only)
  - Primary button
  - Toggle link for register/login

**Design Notes:**
- Full-screen gradient background
- Centered card (max-width: 400px)
- Vertical form layout
- Clean, minimal design

**Responsive:**
- Desktop: Card centered, full gradient visible
- Mobile: Card full-width with padding

#### 2. Dashboard Page
**Purpose:** Main application hub

**Sections:**
- **Header Bar**
  - Logo + Title on left
  - Welcome message
  - Logout button on right
  - Background: White with shadow
  
- **Tab Navigation**
  - 3 tabs: Analyze | Dashboard | History
  - Underline style for active tab
  - Border-bottom indicator
  
- **Content Areas** (3 views)
  
  **A. Analyze Tab**
  - Form card with inputs
  - Category (text input)
  - Period (select dropdown)
  - Budget (number input)
  - Target Group (text input)
  - Submit button
  - Result card (appears after submission)
  
  **B. Dashboard Tab**
  - Metrics grid (4 cards in 2x2 grid)
    - Total Analyses
    - High Confidence
    - Categories
    - Primary Trend
  - Chart section (2 columns)
    - Pie chart (trend distribution)
    - Bar chart (analyses by category)
  
  **C. History Tab**
  - Data table
  - Columns: Category, Period, Budget, Target Group, Trend, Confidence, Date
  - Striped rows with hover effect
  - Sorted by date descending

**Responsive:**
- Desktop: Full layout with multiple columns
- Tablet: Adjusted spacing, 2-column grids
- Mobile: Single column, stacked layout, horizontal scroll for tables

### Animations & Transitions

#### Page Transitions
```css
@keyframes fadeIn {
  from: opacity 0, transform translateY(10px)
  to: opacity 1, transform translateY(0)
}
Duration: 0.3s ease-in
```

#### Result Card Appearance
```css
@keyframes slideUp {
  from: opacity 0, transform translateY(20px)
  to: opacity 1, transform translateY(0)
}
Duration: 0.3s ease-in
```

#### Hover Effects
- Buttons: Transform translateY(-2px), enhanced shadow
- Cards: Subtle shadow increase
- Links: Color change, underline
- Duration: 0.3s

#### Loading States
- Opacity changes
- Button text changes to "Loading..."
- Spinner icon (optional)

### Accessibility

- **Color Contrast:** WCAG AA compliant
- **Focus States:** Visible outline on all interactive elements
- **Keyboard Navigation:** All features keyboard accessible
- **Semantic HTML:** Proper heading hierarchy, form labels
- **ARIA:** Where applicable for screen readers

### Responsive Breakpoints

| Breakpoint | Size | Usage |
|-----------|------|-------|
| Mobile | < 640px | Small phones |
| Tablet | 640px - 1024px | Tablets |
| Desktop | > 1024px | Full design |
| Large | > 1400px | Large monitors |

**Key Layout Changes:**
- Mobile: Single column, full-width inputs
- Tablet: 2 columns where appropriate
- Desktop: Full multi-column layout

### Visual Hierarchy

**Highest Priority:**
- Primary headings (H1, H2)
- Call-to-action buttons
- Metric numbers
- Current user info

**Medium Priority:**
- Form labels
- Secondary headings (H3)
- Trend badges
- Secondary buttons

**Lower Priority:**
- Helper text
- Dates
- Metadata
- Disabled elements

### Dark Mode (Future Enhancement)

While currently light-mode only, the design system is prepared for dark mode with:
- Dark background variables
- Light text variables
- Adjusted shadows for dark backgrounds
- Sufficient contrast ratios maintained

### Brand Guidelines

#### Logo
- Primary Color: #667eea
- Icon: 📊 (Chart emoji)
- Placement: Top left corner
- Size: 32px × 32px

#### Tone
- Professional yet friendly
- Clear and direct communication
- Confident in predictions
- Supportive of user decisions

#### Voice
- Use active voice
- Keep instructions concise
- Provide helpful feedback
- Celebrate user actions

### Implementation Notes

All designs have been fully implemented in:
- **Frontend:** React components with CSS
- **Backend:** Go API following RESTful conventions
- **Database:** SQLite with proper schema
- **Styling:** Pure CSS3 (no CSS frameworks for custom control)

### Files Reference

```
frontend/src/styles/
├── index.css        - Global styles & resets
├── auth.css         - Login/Register page styles
├── dashboard.css    - Dashboard layout & components
└── components.css   - Form & card component styles
```

### Design Tokens (CSS Variables - Future)

Can be implemented as CSS variables for easier maintenance:
```css
:root {
  --color-primary: #667eea;
  --color-primary-dark: #764ba2;
  --color-success: #10b981;
  --color-danger: #ef4444;
  --spacing-unit: 4px;
  --border-radius: 8px;
  --transition-duration: 0.3s;
}
```

---

**Design Status:** ✅ Fully Implemented in Code

All UI/UX specifications have been implemented in the React frontend with responsive CSS styling. The design system ensures consistency, accessibility, and excellent user experience across all devices.

For detailed component implementation, see the React component files:
- [TrendForm](../../frontend/src/components/TrendForm.jsx)
- [TrendChart](../../frontend/src/components/TrendChart.jsx)
- [DashboardPage](../../frontend/src/pages/DashboardPage.jsx)
- [LoginPage](../../frontend/src/pages/LoginPage.jsx)

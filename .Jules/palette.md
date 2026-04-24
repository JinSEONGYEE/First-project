## 2024-05-18 - Interactive Elements and Semantic HTML
**Learning:** Using `<div>` for interactive elements like custom selectors severely degrades keyboard accessibility (no Tab or Space/Enter support natively).
**Action:** Always use semantic `<button>` tags for interactive custom UI elements to gain native keyboard support, and add `aria-pressed` for selection states to communicate to screen readers.


## 2024-05-18 - Semantic HTML for Interactive Lists
**Learning:** Using `<div>` elements with `onClick` handlers for selectable items creates accessibility barriers, as they lack semantic meaning and keyboard interaction by default.
**Action:** Always use `<button type="button">` for interactive, selectable list items, and ensure `aria-pressed` or `aria-selected` is used to communicate the current state, alongside clear `focus-visible` styles.

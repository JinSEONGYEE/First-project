## 2024-05-24 - Semantic HTML and ARIA labels
**Learning:** Using semantic HTML (`<button>` instead of `<div>`) for interactive elements is crucial for out-of-the-box keyboard accessibility (tabbing and Enter/Space activation). Additionally, icon-only buttons require `aria-label` for screen readers to understand their function.
**Action:** Always use `<button type="button">` for click interactions instead of `<div onClick={...}>`. Always verify icon-only buttons have an `aria-label` or `title`.

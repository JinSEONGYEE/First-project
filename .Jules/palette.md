## 2025-02-28 - Avoid interactive divs for selection cards
**Learning:** Using `div` with `onClick` is an accessibility anti-pattern. Screen readers may not identify it as interactive, and keyboard users can't easily tab to or activate it. Additionally, icon-only buttons like the Trash icon must have an `aria-label` to provide context.
**Action:** Always use `<button type="button">` with an `aria-pressed` state for selectable cards or toggles. Provide visual focus indicators (`focus-visible:ring-2`) and ensure all icon-only buttons have descriptive `aria-label` attributes.

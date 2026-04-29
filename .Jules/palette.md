## 2026-04-29 - Semantic buttons for custom interactable elements
**Learning:** Replacing interactive `div`s with semantic `button`s provides native screen reader focus, keyboard navigation, and the correct ARIA role without complex custom properties, significantly increasing accessibility and lowering maintenance overhead.
**Action:** Use native semantic `button` elements rather than attaching `onClick` events to generic `div`s for complex UI widgets (like cards acting as toggles) and always ensure clear focus outlines.

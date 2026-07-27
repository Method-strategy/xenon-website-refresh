import { useEffect } from "react";

// Set document title + meta description per page. Lightweight, no deps.
// Convention: title becomes "{page} | Xenon Ophthalmics" unless raw=true.
export function usePageMeta({ title, description, raw = false } = {}) {
  useEffect(() => {
    if (title) {
      document.title = raw ? title : `${title} | Xenon Ophthalmics`;
    }
    if (description) {
      let el = document.querySelector('meta[name="description"]');
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", "description");
        document.head.appendChild(el);
      }
      el.setAttribute("content", description);
    }
  }, [title, description, raw]);
}

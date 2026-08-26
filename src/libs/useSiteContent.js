"use client";

import { useEffect, useState } from "react";

// Fetches a content section from /api/content/:section. Always returns
// `defaultData` immediately (so the page renders instantly with no flash of
// empty content), then swaps in the live/admin-edited data once it loads.
export function useSiteContent(section, defaultData) {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`/api/content/${section}`, { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        if (!cancelled && json?.data) {
          setData(json.data);
        }
      } catch (err) {
        console.error(`Failed to load content for section "${section}":`, err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [section]);

  return { data, loading };
}

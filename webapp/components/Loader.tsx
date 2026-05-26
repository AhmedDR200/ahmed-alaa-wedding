"use client";

import { useEffect, useState } from "react";

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className={`loader ${hidden ? "hidden" : ""}`}>
      <div className="loader-ring">A &amp; A</div>
    </div>
  );
}

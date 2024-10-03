"use client"; // This ensures that the component is client-side

import  { useEffect } from "react";

export default function BootstrapJS() {
    useEffect(() => {
        // Load Bootstrap JavaScript
        import("@/components/JsComponents/BootstrapJS.mjs");
    }, []);
  return null;
}

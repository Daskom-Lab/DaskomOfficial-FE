"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

/**
 * Conditionally renders the main Navbar.
 * Hidden on /admin routes so the CMS has its own full-screen layout.
 */
export const ConditionalNavbar = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return <Navbar />;
};

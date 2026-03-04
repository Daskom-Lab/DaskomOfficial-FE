export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Offcial Daskom Lab",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Recruitment",
      href: "/dlor",
    },
    {
      label: "Showcase Project",
      href: "/project",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About Us",
      href: "/about",
    },
    {
      label: "Recruitment",
      href: "/dlor",
    },
    {
      label: "Showcase Project",
      href: "/project",
    },
  ],
  links: {
    dlor: "https://recruitment.daskomlab.com/",
    sponsor: "https://lms2.daskomlab.com/",
  },
  cmsApiUrl: process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:8787",
};

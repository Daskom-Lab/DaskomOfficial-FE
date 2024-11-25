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
      href: "/recruitment",
    },
    {
      label: "Showcase Project",
      href: "/project",
    },
  ],
  links: {
    dlor: "https://recruitment.daskomlab.com/",
    sponsor: "https://daskomlab.com/",
  },
};

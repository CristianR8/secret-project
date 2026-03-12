export interface SitePage {
  href: string;
  link: string;
}

export const sitePages: SitePage[] = [
  { href: "/", link: "Home" },
  { href: "/#research", link: "Research" },
  { href: "/news", link: "News" },
  { href: "/people", link: "People" },
  { href: "/overfit-with-series", link: "Overfit" },
];

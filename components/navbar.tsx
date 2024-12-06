import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  return (
    <section className="m-5">
      <NextUINavbar
        maxWidth="xl"
        position="sticky"
        className="border-2 shadow-sm shadow-black mt-2 rounded-full max-w-6xl mx-auto"
      >
        {/* Logo di Kiri */}
        <NavbarContent className="flex basis-auto sm:basis-1/5" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Logo />
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

       {/* Menu Navbar di Tengah */}
        <NavbarContent className="hidden lg:flex basis-auto flex-grow justify-center">
          <ul className="flex gap-4">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "relative px-2 py-1 transition duration-200 hover:text-darkGreen",
                    "hover:border-b-2 hover:border-darkGreen",
                    "font-semibold text-xl"
                  )}                  
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>


        {/* Button LMS di Kanan */}
        <NavbarContent className="basis-auto sm:basis-1/5" justify="end">
          <NavbarItem className="hidden md:flex">
            <Button
              isExternal
              as={Link}
              className="text-md font-semibold text-white bg-lightGreen"
              href={siteConfig.links.sponsor}
              variant="flat"
            >
              LMS
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarContent className="sm:hidden basis-auto pl-4" justify="end">
          <NavbarMenuToggle />
        </NavbarContent>

        {/* Mobile Menu Items */}
        <NavbarMenu>
          <div className="mx-4 mt-16 flex flex-col gap-2">
            {siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </section>
  );
};


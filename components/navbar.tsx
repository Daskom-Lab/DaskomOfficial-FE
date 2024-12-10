"use client";

import { useState } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <section className="m-5">
      <NextUINavbar
        maxWidth="xl"
        position="sticky"
        className="z-50 bg-white border-2 shadow-sm shadow-black mt-2 rounded-full max-w-6xl mx-auto"
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
        <NavbarContent className="hidden lg:flex basis-auto sm:basis-1/5" justify="end">
          <NavbarItem className="hidden md:flex">
            <Button
              isExternal
              as={Link}
              className="text-md font-semibold text-white bg-darkGreen"
              href={siteConfig.links.sponsor}
              variant="flat"
            >
              LMS
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu Toggle */}
        <NavbarContent className="lg:hidden basis-auto pl-4" justify="end">
          <button
            aria-expanded={isMenuOpen}
            className="relative w-8 h-8 flex flex-col justify-between items-center group focus:outline-none"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <span
              className={clsx(
                "block w-full h-1 bg-darkGreen rounded-sm transition-transform duration-300 ease-in-out",
                isMenuOpen && "rotate-45 translate-y-4"
              )}
            ></span>
            <span
              className={clsx(
                "block w-full h-1 bg-darkGreen rounded-sm transition-opacity duration-300 ease-in-out",
                isMenuOpen && "opacity-0"
              )}
            ></span>
            <span
              className={clsx(
                "block w-full h-1 bg-darkGreen rounded-sm transition-transform duration-300 ease-in-out",
                isMenuOpen && "-rotate-45 -translate-y-3"
              )}
            ></span>
          </button>
        </NavbarContent>

        {/* Mobile Menu */}
        {isMenuOpen && (
        <div className="absolute mt-3 top-full left-0 w-full rounded-lg bg-white shadow-lg p-4 z-50">
          <ul className="flex flex-col items-center gap-7">
            {siteConfig.navMenuItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    "text-lg text-darkGreen font-semibold",
                    "hover:text-lightGreen"
                  )}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
            <NavbarItem>
              <Button
                isExternal
                as={Link}
                className="text-md font-semibold text-white bg-darkGreen w-full" // Sama dengan gaya desktop
                href={siteConfig.links.sponsor}
                variant="flat"
              >
                LMS
              </Button>
            </NavbarItem>
          </ul>
        </div>
        )}
      </NextUINavbar>
    </section>
  );
};


"use client";

import NextLink from "next/link";

import { GithubIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";

import { useAppSelector } from "@/store";
import {
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Navbar as NextUINavbar,
} from "@nextui-org/react";
import { UserDropdown } from "./user-dropdown";

export const Navbar = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
      <NextUINavbar
        maxWidth="xl"
        position="sticky"
        className="py-3 border-b-1 light:border-gray-100 dark:border-gray-900"
      >
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <GithubIcon size={32} />
              <p className="ml-2 md:text-xl text-inherit">
                <span className="font-bold">GitHub </span>
                <span>Jobs</span>
              </p>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="flex gap-2">
            <ThemeSwitch />
          </NavbarItem>
          {isAuthenticated && (
            <NavbarItem className="sm:flex gap-2">
              <UserDropdown />
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            <NavbarMenuItem>
              <Link color="danger" href="#" size="lg">
                Sign Out
              </Link>
            </NavbarMenuItem>
          </div>
        </NavbarMenu>
      </NextUINavbar>
    </>
  );
};

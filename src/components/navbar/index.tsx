import { useSession } from "next-auth/react";
import { AdminBadge } from "@/components/navbar/components/admin-badge";
import React from "react";
import { AuthenticatedOptions } from "@/components/navbar/components/authentication-options";
import logo from "@/../public/logo.svg";
import logoDark from "@/../public/logo-dark.svg";
import Image from "next/image";
import { DarkModeToggle } from "@/components/navbar/components/dark-mode-toggle";
import { useDarkMode, useMediaQuery } from "usehooks-ts";
import { switchCaseReturn } from "@/helpers/array";
import { SidebarToggle } from "@/components/navbar/components/sidebar-toggle";

interface NavbarProps {
  isAdmin?: boolean;
}

const defaultProps: NavbarProps = {};

const PREFERRED_THEME_KEY = "(prefers-color-scheme: dark)";

export const Navbar: React.FC<NavbarProps> = () => {
  const { status } = useSession();
  const { isDarkMode: isThemeReverted } = useDarkMode();
  const isDarkModePreferred = useMediaQuery(PREFERRED_THEME_KEY);

  const isDarkMode = isDarkModePreferred !== isThemeReverted;

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start gap-x-5">
        <div className="mx-3">
          <SidebarToggle />
        </div>
        <div>
          {switchCaseReturn(
            isDarkMode,
            {
              case: true,
              return: (
                <Image
                  src={logoDark}
                  alt="Logo Dark"
                  width={128}
                  height={128}
                />
              ),
            },
            {
              case: false,
              return: <Image src={logo} alt="Logo" width={128} height={128} />,
            }
          )}
        </div>
        <AdminBadge />
      </div>
      <div className="navbar-end flex flex-row gap-x-5">
        <DarkModeToggle />
        {status === "authenticated" && <AuthenticatedOptions />}
      </div>
    </div>
  );
};

Navbar.defaultProps = defaultProps;

export default Navbar;

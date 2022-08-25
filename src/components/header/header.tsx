import UserSearch from "../common/user-search";
import Link from "next/link";
import React from "react";
import Menu from "@/components/header/menu";
import ThemeSwitch from "../common/theme-switch";

const Header = () => {
  return (
    <div className="dark:bg-slate-800 flex items-center justify-between bg-white py-3 px-5 sticky top-0 z-[10] shadow-md">
      <Link href="/" passHref>
        <a>
          <p className="text-blue-900 dark:text-white font-poppins font-semibold text-2xl mr-10">
            Twitterek
          </p>
        </a>
      </Link>

      <UserSearch />
      <div className="flex space-x-3">
        <ThemeSwitch />
        <Menu />
      </div>
    </div>
  );
};

export default Header;

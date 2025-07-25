"use client";

import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="remove-scrollbar hidden h-screen w-[90px] flex-col overflow-auto px-5 py-7 sm:flex lg:w-[280px] xl:w-[325px] !important">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full-brand.svg"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />

        <Image
          src="/assets/icons/logo-brand.svg"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>

      <nav className="text-[16px] leading-[24px] font-semibold mt-9 flex-1 gap-1 !important">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <li
                className={cn(
                  "flex text-light-100 gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center h5 lg:px-[30px] h-[52px] lg:rounded-full !important",
                  pathname === url && "bg-[#FA7275] text-white shadow-drop-2 !important",
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "w-6 filter invert opacity-25 !important",
                    pathname === url && "invert-0 opacity-100 !important",
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        src="/assets/images/files-2.png"
        alt="logo"
        width={506}
        height={418}
        className="w-full"
      />

      <div className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#FA7275]/10 p-1 text-light-100 lg:justify-start lg:p-3 !important">
        <Image
          src={avatar}
          alt="Avatar"
          width={44}
          height={44}
          className="aspect-square w-10 rounded-full object-cover !important"
        />
        <div className="hidden lg:block">
          <p className="text-[14px] leading-[20px] font-semibold capitalize">{fullName}</p>
          <p className="text-[12px] leading-[16px] font-normal">{email}</p>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
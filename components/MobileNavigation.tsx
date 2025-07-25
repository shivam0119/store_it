"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@radix-ui/react-separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="flex h-[60px] justify-between px-5 sm:hidden !important">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="logo"
        width={120}
        height={52}
        className="h-auto"
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/assets/icons/menu.svg"
            alt="Search"
            width={30}
            height={30}
          />
        </SheetTrigger>
        <SheetContent className="pt-0 !important h-screen px-3">
          <SheetTitle>
            <div className=" my-3 flex items-center gap-2 rounded-full p-1 text-light-100 sm:justify-center sm:bg-[#FA7275]/10 lg:justify-start lg:p-3 !important">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="aspect-square w-10 rounded-full object-cover !important"
              />
              <div className="sm:hidden lg:block">
                <p className="text-[14px] leading-[20px] font-semibold capitalize">{fullName}</p>
                <p className="text-[12px] leading-[16px] font-normal">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>

          <nav className="text-[16px] leading-[24px] font-semibold flex-1 gap-1 text-[#FA7275] !important">
            <ul className="flex flex-1 flex-col gap-4 !important">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className="lg:w-full">
                  <li
                    className={cn(
                      "flex text-light-100 gap-4 w-full justify-start items-center text-[16px] leading-[24px] font-semibold px-6 h-[52px] rounded-full !important",
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
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          <Separator className="my-5 bg-light-200/20" />

          <div className=" flex flex-col justify-between gap-5 pb-5">
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <Button
              type="submit"
              className="text-[16px] leading-[24px] font-semibold flex h-[52px] w-full items-center gap-4 rounded-full bg-[#FA7275]/10 px-6 text-[#FA7275] shadow-none transition-all hover:bg-[#FA7275]/20 !important"
              onClick={async () => await signOutUser()}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logo"
                width={24}
                height={24}
              />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
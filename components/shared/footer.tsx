"use client";

import React from "react";
import sidebarLinks from "@/constants/index.js";
import Link from "next/link";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-sm  md:hidden">
      <section className=" flex flex-row  justify-between items-center ">
        {sidebarLinks.map((links) => {
          const isActive = pathname === links.route;
          console.log(`___pathname ${pathname} ${links.route} ${isActive}`);

          return (
            <Link
              href={links.route}
              key={links.route}
              className={` ${
                isActive && "bg-primary-500"
              }    rounded-lg p-2  text-white`}
            >
              <Image src={links.imgURL} width={14} height={14} alt="" />
            </Link>
          );
        })}
      </section>
    </div>
  );
};

export default Footer;

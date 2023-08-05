import React from "react";
import sidebarLinks from "@/constants/index.js";
import Link from "next/link";
import Image from "next/image";


const leftSideBar = () => {
  return (
    <div className="custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28 max-md:hidden">
      <div className="flex  flex-1 flex-col gap-6 px-6 ">
        {sidebarLinks.map((links) => {
          return (
            <Link
              href={links.route}
              key={links.route}
              className="relative flex justify-start gap-4 rounded-lg p-4  text-white"
            >
              <Image src={links.imgURL} width={30} height={30} alt="" />
              <p className="text-light-1 max-lg:hidden"> {links.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default leftSideBar;

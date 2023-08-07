"use client";
import sidebarLinks from "@/constants/index.js";
import {
  SignOutButton,
  SignedIn
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const leftSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className=" custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col  justify-between overflow-auto border-r border-r-dark-4 bg-dark-2 pb-5 pt-28 max-md:hidden">
      <div className="flex  flex-1 flex-col gap-6 px-6 ">
        {sidebarLinks.map((links) => {
          const isActive = pathname === links.route;
          console.log(`___pathname ${pathname} ${links.route} ${isActive}`);

          return (
            <Link
              href={links.route}
              key={links.route}
              className={` ${
                isActive && "bg-primary-500"
              } relative flex justify-start gap-4  rounded-lg p-4  text-white`}
            >
              <Image src={links.imgURL} width={30} height={30} alt="" />
              <p className="text-light-1 max-lg:hidden"> {links.label}</p>
            </Link>
          );
        })}
      </div>
      <div className=" gap-6 px-6 ">
        <SignedIn>
          <SignOutButton signOutCallback={()=>{
            router.push('/signIn');
          }}>
            <div className="flex cursor-pointer  justify-start gap-4  rounded-lg p-4 ">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                height={30}
                width={30}
              />
              <p className="text-light-1 max-lg:hidden"> logout </p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};

export default leftSideBar;

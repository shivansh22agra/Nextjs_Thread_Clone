import Link from "next/link";
import Image from "next/image";
import {
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  SignedIn,
} from "@clerk/nextjs";
const NavBar = () => {
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-dark-2 px-6 py-3">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" width={30} height={30} alt="logo" />
        <h1 className="text-heading3-bold text-white max-xs:hidden">Threads</h1>
      </Link>
      <div className="flex items-center gap1-3">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  height={30}
                  width={30}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher />
      </div>
    </nav>
  );
};

export default NavBar;

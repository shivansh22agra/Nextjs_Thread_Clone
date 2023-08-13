import Footer from "@/components/shared/footer";
import LeftSidebar from "@/components/shared/leftSideBar";
import NavBar from "@/components/shared/navBar";
import RightSideBar from "@/components/shared/rightSideBar";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Threads",
  description: "Threads clone using Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          <main className="flex flex-row ">
            <LeftSidebar />
            <section className="flex min-h-screen flex-1 flex-col items-center bg-dark-1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSideBar />
          </main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

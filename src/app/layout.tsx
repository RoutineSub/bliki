import type { Metadata } from "next";
import { Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";
import { getAllCategories, getAllPosts } from "@/lib/posts";
import Nav from "../components/nav";
import Footer from "@/components/footer";
import Header from "@/components/header";

const atkinson = Atkinson_Hyperlegible({ subsets: ['latin'], weight: ["400","700"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Routine Sub",
    default: 'Routine Sub'
  },
  description: "Just a normal sandwich",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${atkinson.className} bg-base3 dark:bg-base03 text-base00 dark:text-base0`}>
        <Header />
        <div className="flex flex-col md:flex-row justify-around min-h-[calc(100vh-200px)] mx-2">
          <main className="flex-grow-1 w-full sm:w-9/12 mt-3">
            {children}
          </main>
          <Nav posts={(await getAllPosts()).filter(({ discoverable }) => discoverable)} categories={(await getAllCategories()).filter(({ posts }) => posts.length > 0)} />
        </div>
        <Footer />
      </body>
    </html>
  );
}

import { Providers } from "@/store/providers";
import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
//import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "ComicWiki",
  description: "The place for all things comedy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          </Providers>
      </body>
    </html>
  );
}

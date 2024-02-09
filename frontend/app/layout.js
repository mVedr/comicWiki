import "bootstrap/dist/css/bootstrap.min.css";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";
import { Providers } from "../store/providers";
import './globals.css';
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "ComicWiki",
  description: "The place for all things comedy",
};

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <NavBar />
          {children}
        </body>
      </html>
    </Providers>
  );
}

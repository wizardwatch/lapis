// @ts-ignore
globalThis.isSpace = (code) => {
  switch (code) {
    case 0x09:
    case 0x20:
      return true;
  }
  return false;
};
import "./globals.scss";
import Header from "../components/Header";
import AuthRedirect from "../components/AuthRedirect";
import Providers from "../components/Providers";


export const metadata = {
  title: "The Everpresent Past",
  description: "Notes portal",
};

import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <Providers>
          <AuthRedirect>
            <Header />
            {children}
          </AuthRedirect>
        </Providers>
      </body>
    </html>
  );
}

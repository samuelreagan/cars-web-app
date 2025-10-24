import "./globals.css";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Car Management System</title>
      </head>
      <body>
        <header className="p-4 font-semibold">
          <Typography
            variant="h6"
            component="h6"
          >
            <Link href="/">Car Management System</Link>
          </Typography>
        </header>
        <main className="px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}

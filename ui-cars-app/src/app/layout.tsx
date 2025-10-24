'use client';

import "./globals.css";
import Link from "next/link";
import { Typography } from "@mui/material";
import { MessageContext, MessageData } from "./context/MessageContext";
import { AppAlert } from "./components/shared-components";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [messageData, setMessageData] = useState<MessageData | null>(null);
  function showMessage(data: MessageData | undefined) {
    setMessageData(data ?? null);
  }

  function closeMessage() {
    setMessageData(null);
  }

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
          <AppAlert messageData={messageData} onCloseHandler={closeMessage}></AppAlert>
          <MessageContext value={{ showMessage }}>
            {children}
          </MessageContext>
        </main>
      </body>
    </html>
  );
}

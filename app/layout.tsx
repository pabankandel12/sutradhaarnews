import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "सूत्रधार न्यूज | सत्यसँग जोडिएको खबर",
  description: "नेपाल र विश्वका ताजा, विश्वसनीय र निष्पक्ष समाचार",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    shortcut: ["/logo.png"],
    apple: [{ url: "/logo.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ne">
      <body>{children}</body>
    </html>
  );
}

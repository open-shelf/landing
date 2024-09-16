import "./globals.css";

export const metadata = {
  title: "OpenShelf",
  description:
    "New Media Paradigm: Pay for What You Use, Stake What You Love, and Earn Passively",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  title: "Revolutionize Your Reading Experience",
  description:
    "Read by the chapter. Support your favorite authors. Earn rewards.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

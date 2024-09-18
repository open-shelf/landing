import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "OpenShelf",
  description:
    "New Media Paradigm: Pay for What You Use, Stake What You Love, and Earn Passively",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.amplitude.com/libs/analytics-browser-2.11.1-min.js.gz"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.amplitude.com/libs/plugin-session-replay-browser-1.6.22-min.js.gz"
          strategy="beforeInteractive"
        />
        <Script id="amplitude-init" strategy="afterInteractive">
          {`
            window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));
            window.amplitude.init('2c7ccf63efcf1551b707688f9117645', {"serverZone":"EU","autocapture":{"elementInteractions":true}});
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}

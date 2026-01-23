import { Baloo_Bhaina_2, Plus_Jakarta_Sans } from "next/font/google";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import "@/styles/fontawesome-all.min.css";
import "@/styles/flaticon_pet_care.css";
import "@/styles/animate.min.css";
import "@/styles/animation.css";
import "@/styles/main.css";

const { SITE_NAME, PROJECT_PRODUCTION_URL } = process.env;

export const metadata = {
  metadataBase: new URL(PROJECT_PRODUCTION_URL!),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

const balooBhaina2 = Baloo_Bhaina_2({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--heading-font-family",
  fallback: ["system-ui", "arial"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--body-font-family",
  fallback: ["system-ui", "arial"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${plusJakartaSans.variable} ${balooBhaina2.variable}`}
      suppressHydrationWarning
      data-scroll-behavior='smooth'
    >
      <body>{children}</body>
    </html>
  );
}

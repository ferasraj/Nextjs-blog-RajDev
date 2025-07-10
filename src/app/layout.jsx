import { twJoin } from "tailwind-merge";
import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import siteMetadata from "../utils/siteMetaData";

// Importing Inter and Manrope fonts from Google Fonts
// These fonts will be used in the application
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,

  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={twJoin(inter.variable, manrope.variable)}>
      <head>
        {/* 👇 سكربت الثيم لمنع الوميض */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (
                localStorage.getItem('theme') === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
              ) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            `,
          }}
        />
      </head>
      <body className={twJoin("font-mr bg-light dark:bg-dark")}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

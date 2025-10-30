export const seoConfig = {
  siteName: "LSV Battery Depot",
  siteUrl: "https://lsvbatterydepot.com",
  defaultTitle: "LSV Battery Depot - Low Speed Vehicle Batteries | LSV, NEV & MSV Battery Experts",
  defaultDescription: "LSV Battery Depot specializes in Low Speed Vehicle (LSV) Batteries, Neighborhood Electric Vehicle (NEV) Batteries, Medium Speed Vehicle (MSV) Batteries, and Golf Cart Batteries. Call 1-844-888-7732",
  defaultImage: "/lsv-battery-depot-logo.png",
  phoneNumber: "1-844-888-7732",
  
  // Social Media
  social: {
    twitter: "@LSVBatteryDepot",
    facebookPage: "https://facebook.com/lsvbatterydepot",
    twitterProfile: "https://twitter.com/lsvbatterydepot",
  },
  
  // Search Engine Verification Codes
  verification: {
    google: "", // Add Google verification code when available
    bing: "", // Add Bing verification code when available
    pinterest: "", // Add Pinterest verification code when available
    yandex: "", // Add Yandex verification code when available
  },
  
  // Open Graph defaults
  ogLocale: "en_US",
  ogType: "website",
  
  // Twitter Card defaults
  twitterCard: "summary_large_image",
  
  // Image dimensions
  defaultImageWidth: "1200",
  defaultImageHeight: "630",
  defaultImageType: "image/png",
};

export interface PageSEO {
  title?: string;
  description?: string;
  image?: string;
  imageWidth?: string;
  imageHeight?: string;
  imageType?: string;
  url?: string;
  type?: "website" | "article";
  modifiedTime?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

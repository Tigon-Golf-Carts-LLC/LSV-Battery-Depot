import { Helmet } from 'react-helmet-async';
import { seoConfig, type PageSEO } from '@shared/seo-config';

interface SEOProps extends PageSEO {
  children?: React.ReactNode;
}

export function SEO({
  title,
  description,
  image,
  imageWidth,
  imageHeight,
  imageType,
  url,
  type = "website",
  modifiedTime,
  noindex = false,
  nofollow = false,
  children,
}: SEOProps) {
  const pageTitle = title || seoConfig.defaultTitle;
  const pageDescription = description || seoConfig.defaultDescription;
  const pageImage = image 
    ? (image.startsWith('http') ? image : `${seoConfig.siteUrl}${image}`)
    : `${seoConfig.siteUrl}${seoConfig.defaultImage}`;
  const pageUrl = url 
    ? (url.startsWith('http') ? url : `${seoConfig.siteUrl}${url}`)
    : seoConfig.siteUrl;
  const pageImageWidth = imageWidth || seoConfig.defaultImageWidth;
  const pageImageHeight = imageHeight || seoConfig.defaultImageHeight;
  const pageImageType = imageType || seoConfig.defaultImageType;

  const robotsContent = [];
  if (noindex) robotsContent.push('noindex');
  if (nofollow) robotsContent.push('nofollow');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {robotsContent.length > 0 && (
        <meta name="robots" content={robotsContent.join(', ')} />
      )}

      {/* Open Graph Meta Tags */}
      <meta property="og:locale" content={seoConfig.ogLocale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content={pageImageWidth} />
      <meta property="og:image:height" content={pageImageHeight} />
      <meta property="og:image:type" content={pageImageType} />
      
      {/* Article specific tags */}
      {type === "article" && (
        <>
          {seoConfig.social.facebookPage && (
            <meta property="article:publisher" content={seoConfig.social.facebookPage} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={seoConfig.twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      {seoConfig.social.twitter && (
        <meta name="twitter:site" content={seoConfig.social.twitter} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {children}
    </Helmet>
  );
}

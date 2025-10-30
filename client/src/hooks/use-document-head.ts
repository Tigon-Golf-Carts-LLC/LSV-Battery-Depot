import { useEffect } from 'react';
import { seoConfig } from '@shared/seo-config';

export interface SEOData {
  title: string;
  description: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
}

// Enhanced SEO hook with comprehensive meta tags
export function useDocumentHead({ title, description, ogImage, ogImageWidth, ogImageHeight }: SEOData) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Update or create Open Graph meta tags
    const updateOrCreateMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Update or create Twitter Card meta tags
    const updateOrCreateTwitterMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // Set Open Graph tags
    updateOrCreateMeta('og:title', title);
    updateOrCreateMeta('og:description', description);
    updateOrCreateMeta('og:type', seoConfig.ogType);
    updateOrCreateMeta('og:url', window.location.href);
    updateOrCreateMeta('og:site_name', seoConfig.siteName);
    updateOrCreateMeta('og:locale', seoConfig.ogLocale);
    
    // Always set image tags using provided image or fallback to default
    const imageToUse = ogImage || seoConfig.defaultImage;
    const fullImageUrl = imageToUse.startsWith('http') ? imageToUse : `${seoConfig.siteUrl}${imageToUse}`;
    updateOrCreateMeta('og:image', fullImageUrl);
    updateOrCreateMeta('og:image:width', (ogImageWidth || parseInt(seoConfig.defaultImageWidth)).toString());
    updateOrCreateMeta('og:image:height', (ogImageHeight || parseInt(seoConfig.defaultImageHeight)).toString());
    
    // Detect image type from extension
    const imageExt = fullImageUrl.split('.').pop()?.toLowerCase();
    let imageType = seoConfig.defaultImageType;
    if (imageExt === 'png') imageType = 'image/png';
    else if (imageExt === 'jpg' || imageExt === 'jpeg') imageType = 'image/jpeg';
    else if (imageExt === 'gif') imageType = 'image/gif';
    else if (imageExt === 'webp') imageType = 'image/webp';
    else if (imageExt === 'svg') imageType = 'image/svg+xml';
    updateOrCreateMeta('og:image:type', imageType);

    // Set Twitter Card tags
    updateOrCreateTwitterMeta('twitter:card', seoConfig.twitterCard);
    updateOrCreateTwitterMeta('twitter:title', title);
    updateOrCreateTwitterMeta('twitter:description', description);
    updateOrCreateTwitterMeta('twitter:site', seoConfig.social.twitter);
    updateOrCreateTwitterMeta('twitter:image', fullImageUrl);
  }, [title, description, ogImage, ogImageWidth, ogImageHeight]);
}
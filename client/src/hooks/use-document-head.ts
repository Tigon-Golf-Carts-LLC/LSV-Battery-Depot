import { useEffect } from 'react';

export interface SEOData {
  title: string;
  description: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
}

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
    updateOrCreateMeta('og:type', 'website');
    updateOrCreateMeta('og:url', window.location.href);
    
    if (ogImage) {
      updateOrCreateMeta('og:image', ogImage);
      if (ogImageWidth) updateOrCreateMeta('og:image:width', ogImageWidth.toString());
      if (ogImageHeight) updateOrCreateMeta('og:image:height', ogImageHeight.toString());
    }

    // Set Twitter Card tags
    updateOrCreateTwitterMeta('twitter:card', 'summary_large_image');
    updateOrCreateTwitterMeta('twitter:title', title);
    updateOrCreateTwitterMeta('twitter:description', description);
    if (ogImage) {
      updateOrCreateTwitterMeta('twitter:image', ogImage);
    }
  }, [title, description, ogImage, ogImageWidth, ogImageHeight]);
}
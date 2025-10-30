import { useState } from "react";
import { SEO } from "@/components/SEO";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Settings, Share2, Search } from "lucide-react";
import { seoConfig } from "@shared/seo-config";

export default function SEOConfigAdmin() {
  const [config, setConfig] = useState(seoConfig);
  const [previewUrl, setPreviewUrl] = useState("/");

  const handleSave = () => {
    // In a real app, this would save to a database or config file
    console.log("SEO Configuration saved:", config);
    alert("SEO configuration would be saved (demo only)");
  };

  return (
    <>
      <SEO
        title="SEO Configuration - LSV Battery Depot Admin"
        description="Manage SEO settings, meta tags, and social media optimization for LSV Battery Depot"
        noindex={true}
        nofollow={true}
      />
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              SEO Configuration
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage meta tags and social media optimization settings for all pages
            </p>
          </div>

          <Tabs defaultValue="site" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="site" data-testid="tab-site-info">
                <Settings className="h-4 w-4 mr-2" />
                Site Info
              </TabsTrigger>
              <TabsTrigger value="social" data-testid="tab-social-media">
                <Share2 className="h-4 w-4 mr-2" />
                Social Media
              </TabsTrigger>
              <TabsTrigger value="verification" data-testid="tab-verification">
                <Search className="h-4 w-4 mr-2" />
                Verification
              </TabsTrigger>
            </TabsList>

            {/* Site Information Tab */}
            <TabsContent value="site" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Site Information</CardTitle>
                  <CardDescription>
                    Basic site settings used across all meta tags
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={config.siteName}
                        onChange={(e) => setConfig({...config, siteName: e.target.value})}
                        data-testid="input-site-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="siteUrl">Site URL</Label>
                      <Input
                        id="siteUrl"
                        value={config.siteUrl}
                        onChange={(e) => setConfig({...config, siteUrl: e.target.value})}
                        placeholder="https://lsvbatterydepot.com"
                        data-testid="input-site-url"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultTitle">Default Page Title</Label>
                    <Input
                      id="defaultTitle"
                      value={config.defaultTitle}
                      onChange={(e) => setConfig({...config, defaultTitle: e.target.value})}
                      data-testid="input-default-title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultDescription">Default Meta Description</Label>
                    <Input
                      id="defaultDescription"
                      value={config.defaultDescription}
                      onChange={(e) => setConfig({...config, defaultDescription: e.target.value})}
                      data-testid="input-default-description"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultImage">Default OG Image URL</Label>
                    <Input
                      id="defaultImage"
                      value={config.defaultImage}
                      onChange={(e) => setConfig({...config, defaultImage: e.target.value})}
                      placeholder="/lsv-battery-depot-logo.png"
                      data-testid="input-default-image"
                    />
                    <p className="text-sm text-gray-500">
                      Recommended: 1200x630px for optimal social media display
                    </p>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="imageWidth">Image Width (px)</Label>
                      <Input
                        id="imageWidth"
                        value={config.defaultImageWidth}
                        onChange={(e) => setConfig({...config, defaultImageWidth: e.target.value})}
                        data-testid="input-image-width"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imageHeight">Image Height (px)</Label>
                      <Input
                        id="imageHeight"
                        value={config.defaultImageHeight}
                        onChange={(e) => setConfig({...config, defaultImageHeight: e.target.value})}
                        data-testid="input-image-height"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        value={config.phoneNumber}
                        onChange={(e) => setConfig({...config, phoneNumber: e.target.value})}
                        data-testid="input-phone-number"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Social Media Tab */}
            <TabsContent value="social" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Social Media Settings</CardTitle>
                  <CardDescription>
                    Configure how your site appears when shared on social platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter Handle</Label>
                    <Input
                      id="twitter"
                      value={config.social.twitter}
                      onChange={(e) => setConfig({
                        ...config,
                        social: {...config.social, twitter: e.target.value}
                      })}
                      placeholder="@LSVBatteryDepot"
                      data-testid="input-twitter-handle"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="facebookPage">Facebook Page URL</Label>
                    <Input
                      id="facebookPage"
                      value={config.social.facebookPage}
                      onChange={(e) => setConfig({
                        ...config,
                        social: {...config.social, facebookPage: e.target.value}
                      })}
                      placeholder="https://facebook.com/lsvbatterydepot"
                      data-testid="input-facebook-page"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="twitterProfile">Twitter Profile URL</Label>
                    <Input
                      id="twitterProfile"
                      value={config.social.twitterProfile}
                      onChange={(e) => setConfig({
                        ...config,
                        social: {...config.social, twitterProfile: e.target.value}
                      })}
                      placeholder="https://twitter.com/lsvbatterydepot"
                      data-testid="input-twitter-profile"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media Preview</CardTitle>
                  <CardDescription>
                    See how your site will appear when shared
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
                    <div className="space-y-4">
                      {/* Facebook Preview */}
                      <div>
                        <Badge className="mb-2">Facebook / LinkedIn</Badge>
                        <div className="border rounded overflow-hidden">
                          <img 
                            src={config.defaultImage.startsWith('http') ? config.defaultImage : `${config.siteUrl}${config.defaultImage}`}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-3 bg-gray-50 dark:bg-gray-700">
                            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">
                              {config.siteUrl.replace('https://', '')}
                            </div>
                            <div className="font-semibold text-sm mt-1">{config.defaultTitle}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                              {config.defaultDescription}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Twitter Preview */}
                      <div>
                        <Badge className="mb-2">Twitter / X</Badge>
                        <div className="border rounded-lg overflow-hidden">
                          <img 
                            src={config.defaultImage.startsWith('http') ? config.defaultImage : `${config.siteUrl}${config.defaultImage}`}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-3 border-t">
                            <div className="font-semibold text-sm">{config.defaultTitle}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                              {config.defaultDescription}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              {config.siteUrl.replace('https://', '')}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Search Engine Verification Tab */}
            <TabsContent value="verification" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Search Engine Verification</CardTitle>
                  <CardDescription>
                    Add verification codes from search engines to verify site ownership
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="googleVerification">Google Search Console</Label>
                    <Input
                      id="googleVerification"
                      value={config.verification.google}
                      onChange={(e) => setConfig({
                        ...config,
                        verification: {...config.verification, google: e.target.value}
                      })}
                      placeholder="Your Google verification code"
                      data-testid="input-google-verification"
                    />
                    <p className="text-sm text-gray-500">
                      Get from <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-lsv-green hover:underline">Google Search Console</a>
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bingVerification">Bing Webmaster Tools</Label>
                    <Input
                      id="bingVerification"
                      value={config.verification.bing}
                      onChange={(e) => setConfig({
                        ...config,
                        verification: {...config.verification, bing: e.target.value}
                      })}
                      placeholder="Your Bing verification code"
                      data-testid="input-bing-verification"
                    />
                    <p className="text-sm text-gray-500">
                      Get from <a href="https://www.bing.com/webmasters" target="_blank" rel="noopener noreferrer" className="text-lsv-green hover:underline">Bing Webmaster Tools</a>
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pinterestVerification">Pinterest</Label>
                    <Input
                      id="pinterestVerification"
                      value={config.verification.pinterest}
                      onChange={(e) => setConfig({
                        ...config,
                        verification: {...config.verification, pinterest: e.target.value}
                      })}
                      placeholder="Your Pinterest verification code"
                      data-testid="input-pinterest-verification"
                    />
                    <p className="text-sm text-gray-500">
                      Get from <a href="https://www.pinterest.com/settings/claim" target="_blank" rel="noopener noreferrer" className="text-lsv-green hover:underline">Pinterest Settings</a>
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="yandexVerification">Yandex</Label>
                    <Input
                      id="yandexVerification"
                      value={config.verification.yandex}
                      onChange={(e) => setConfig({
                        ...config,
                        verification: {...config.verification, yandex: e.target.value}
                      })}
                      placeholder="Your Yandex verification code"
                      data-testid="input-yandex-verification"
                    />
                    <p className="text-sm text-gray-500">
                      Get from <a href="https://webmaster.yandex.com" target="_blank" rel="noopener noreferrer" className="text-lsv-green hover:underline">Yandex Webmaster</a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Implementation Status</CardTitle>
                  <CardDescription>
                    Current SEO implementation across your site
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Open Graph meta tags configured</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Twitter Card meta tags configured</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Dynamic meta tags on all pages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Favicon and social profile links</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Google Tag Manager & Analytics installed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleSave}
              size="lg"
              className="bg-lsv-orange hover:bg-lsv-orange/90"
              data-testid="button-save-config"
            >
              Save Configuration
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

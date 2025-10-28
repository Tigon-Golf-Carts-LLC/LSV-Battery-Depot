import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useDocumentHead } from "@/hooks/use-document-head";

export default function NotFound() {
  // Set SEO metadata
  useDocumentHead({
    title: "404 Page Not Found",
    description: "The page you're looking for doesn't exist. Browse our complete catalog of LSV Battery Depot Golf Cart Batteries, LSV, NEV & MSV solutions. Call 1-844-888-7732.",
    ogImage: "/og/logo.png",
    ogImageWidth: 512,
    ogImageHeight: 512
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

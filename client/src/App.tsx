import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import BatteryGuide from "@/pages/battery-guide";
import BatterySelector from "@/pages/battery-selector";
import Contact from "@/pages/contact";
import SEOConfigAdmin from "@/pages/seo-config-admin";
import { useAnalytics } from "./hooks/use-analytics";

function Router() {
  useAnalytics();
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/products/:category" component={Products} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/battery-guide" component={BatteryGuide} />
      <Route path="/battery-selector" component={BatterySelector} />
      <Route path="/contact" component={Contact} />
      <Route path="/admin/seo-config" component={SEOConfigAdmin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

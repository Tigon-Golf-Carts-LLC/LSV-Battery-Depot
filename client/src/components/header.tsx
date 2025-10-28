import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu, Phone, Battery } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import ShoppingCartComponent from "./shopping-cart";

export default function Header() {
  const [location] = useLocation();
  const { openCart, itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Products", href: "/products" },
    { name: "Battery Guide", href: "/battery-guide" },
    { name: "Battery Selector", href: "/battery-selector" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-lsv-green text-white" data-testid="header-topbar">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center text-xs sm:text-sm min-h-[48px]">
            <span className="hidden sm:inline mr-1 sm:mr-2 text-xs sm:text-sm">Expert Battery Support:</span>
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-white flex-shrink-0" />
            <a 
              href="tel:1-844-888-7732" 
              className="font-semibold text-lsv-orange hover:text-white transition-colors text-xs sm:text-sm whitespace-nowrap touch-manipulation inline-flex items-center min-h-[48px]"
              data-testid="link-phone-topbar"
            >
              1-844-888-7732
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 sm:py-3 md:py-4">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center cursor-pointer" data-testid="link-home-logo">
                <img 
                  src="/lsv-battery-depot-logo.png" 
                  alt="LSV Battery Depot Logo" 
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className={`text-gray-700 hover:text-lsv-red font-medium transition-colors cursor-pointer ${
                    location === item.href ? "text-lsv-red" : ""
                  }`} data-testid={`link-nav-${item.name.toLowerCase().replace(' ', '-')}`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Header CTA & Cart */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <a 
                href="tel:1-844-888-7732" 
                className="hidden sm:flex bg-lsv-orange text-white px-3 sm:px-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors items-center text-sm md:text-base min-h-[48px] touch-manipulation"
                data-testid="link-phone-header"
              >
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                <span className="hidden lg:inline">1-844-888-7732</span>
                <span className="lg:hidden">Call</span>
              </a>
              
              <Button
                variant="ghost"
                onClick={openCart}
                className="relative p-2 min-h-[48px] min-w-[48px] text-gray-600 hover:text-lsv-red touch-manipulation"
                data-testid="button-lsv-toggle"
              >
                <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-xs font-bold bg-lsv-orange" data-testid="text-lsv-count">
                    {itemCount}
                  </Badge>
                )}
              </Button>
              
              {/* Mobile menu button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="md:hidden p-2 min-h-[48px] min-w-[48px] touch-manipulation">
                    <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] max-w-sm">
                  <div className="flex flex-col space-y-2 mt-8">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <span 
                          className="block px-4 py-3.5 text-base sm:text-lg font-medium text-gray-700 hover:text-lsv-red hover:bg-gray-50 rounded-lg cursor-pointer transition-colors min-h-[48px] flex items-center touch-manipulation"
                          onClick={() => setIsMobileMenuOpen(false)}
                          data-testid={`link-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      <a 
                        href="tel:1-844-888-7732" 
                        className="flex items-center justify-center bg-lsv-orange text-white px-4 py-4 rounded-lg font-semibold text-base sm:text-lg min-h-[56px] touch-manipulation hover:bg-orange-600 transition-colors"
                        data-testid="link-phone-mobile"
                      >
                        <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                        <span className="whitespace-nowrap">Call Expert: 1-844-888-7732</span>
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <ShoppingCartComponent />
    </>
  );
}

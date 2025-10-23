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
      <div className="bg-cart-red text-white py-2" data-testid="header-topbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center text-sm">
            <span className="hidden sm:inline mr-2">Expert Battery Support:</span>
            <Phone className="h-4 w-4 mr-2 text-cart-green" />
            <a 
              href="tel:1-844-888-7732" 
              className="font-semibold hover:text-white transition-colors"
              data-testid="link-phone-topbar"
            >
              1-844-888-7732
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center cursor-pointer" data-testid="link-home-logo">
                <img 
                  src="/cart-battery-depot-logo.png" 
                  alt="Cart Battery Depot Logo" 
                  className="h-16 w-auto"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className={`text-gray-700 hover:text-cart-red font-medium transition-colors cursor-pointer ${
                    location === item.href ? "text-cart-red" : ""
                  }`} data-testid={`link-nav-${item.name.toLowerCase().replace(' ', '-')}`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Header CTA & Cart */}
            <div className="flex items-center space-x-4">
              <a 
                href="tel:1-844-888-7732" 
                className="hidden sm:flex bg-cart-orange text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors items-center"
                data-testid="link-phone-header"
              >
                <Phone className="h-4 w-4 mr-2" />
                1-844-888-7732
              </a>
              
              <Button
                variant="ghost"
                onClick={openCart}
                className="relative p-2 text-gray-600 hover:text-cart-red"
                data-testid="button-cart-toggle"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-cart-orange" data-testid="text-cart-count">
                    {itemCount}
                  </Badge>
                )}
              </Button>
              
              {/* Mobile menu button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="md:hidden p-2">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <span 
                          className="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-cart-red cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                          data-testid={`link-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                    <div className="border-t pt-4">
                      <a 
                        href="tel:1-844-888-7732" 
                        className="flex items-center justify-center bg-cart-orange text-white px-4 py-3 rounded-lg font-semibold"
                        data-testid="link-phone-mobile"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Expert: 1-844-888-7732
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

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
      <div className="bg-tigon-red text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center text-sm">
            <span className="hidden sm:inline mr-2">Expert Battery Support:</span>
            <Phone className="h-4 w-4 mr-2" />
            <a 
              href="tel:1-844-844-6638" 
              className="font-semibold hover:text-tigon-green transition-colors"
            >
              1-844-844-6638
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
              <div className="flex items-center cursor-pointer">
                <img 
                  src="@assets/tigon-logo.png" 
                  alt="TIGON Batteries Logo" 
                  className="h-10 w-auto mr-3"
                />
                <div className="text-2xl font-bold text-tigon-red">
                  TIGON<span className="text-tigon-green">Batteries</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className={`text-gray-700 hover:text-tigon-red font-medium transition-colors cursor-pointer ${
                    location === item.href ? "text-tigon-red" : ""
                  }`}>
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Header CTA & Cart */}
            <div className="flex items-center space-x-4">
              <a 
                href="tel:1-844-844-6638" 
                className="hidden sm:flex bg-tigon-orange text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors items-center"
              >
                <Phone className="h-4 w-4 mr-2" />
                1-844-844-6638
              </a>
              
              <Button
                variant="ghost"
                onClick={openCart}
                className="relative p-2 text-gray-600 hover:text-tigon-red"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-tigon-orange">
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
                          className="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-tigon-red cursor-pointer"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                    <div className="border-t pt-4">
                      <a 
                        href="tel:1-844-844-6638" 
                        className="flex items-center justify-center bg-tigon-orange text-white px-4 py-3 rounded-lg font-semibold"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Expert: 1-844-844-6638
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

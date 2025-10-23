import { Link } from "wouter";
import { Battery, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/cart-battery-depot-logo.png" 
                alt="Cart Battery Depot Logo" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6">
              Cart Battery Depot specializes in Golf Cart Batteries, Low Speed Vehicle (LSV) Batteries, 
              Neighborhood Electric Vehicle (NEV) Batteries, and Medium Speed Vehicle (MSV) Batteries. 
              Trusted by over 10,000 customers nationwide.
            </p>
            
            {/* Footer Phone CTA */}
            <div className="bg-cart-orange p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Need Help? Call Our Battery Experts</h3>
              <a 
                href="tel:1-844-888-7732" 
                className="text-2xl font-bold hover:text-yellow-200 transition-colors flex items-center"
                data-testid="link-phone-footer"
              >
                <Phone className="h-6 w-6 mr-2 text-cart-green" />
                1-844-888-7732
              </a>
              <p className="text-sm text-orange-100 mt-1">Monday - Saturday: 8AM - 5PM EST</p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-lg mb-4">Products</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/products/golf-cart">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-golf-cart">
                    Golf Cart Batteries
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products/lsv">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-lsv">
                    LSV Batteries
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products/nev">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-nev">
                    NEV Batteries
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products/msv">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-msv">
                    MSV Batteries
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products?voltage=6">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-6v">
                    6V Battery Series
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products?voltage=8">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-8v">
                    8V Battery Series
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products?voltage=12">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-12v">
                    12V Battery Series
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/battery-guide">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-battery-guide">
                    Battery Guide
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/battery-guide/voltage">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-voltage-guide">
                    Voltage Guide
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/battery-guide/technology">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-technology">
                    Technology Comparison
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/battery-guide/maintenance">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-maintenance">
                    Maintenance Tips
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/battery-guide/installation">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-installation">
                    Installation Guide
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/battery-selector">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-battery-selector">
                    Battery Selector
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a 
                  href="tel:1-844-888-7732" 
                  className="hover:text-cart-orange transition-colors font-semibold flex items-center"
                  data-testid="link-footer-phone"
                >
                  <Phone className="h-4 w-4 mr-1 text-cart-green" />
                  1-844-888-7732
                </a>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-support">
                    Technical Support
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/warranty">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-warranty">
                    Warranty Info
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/returns">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-returns">
                    Returns
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/shipping">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-shipping">
                    Shipping Info
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:text-cart-green transition-colors cursor-pointer" data-testid="link-footer-contact">
                    Contact Us
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © 2025 Cart Battery Depot. All rights reserved. Golf Cart Batteries, LSV, NEV & MSV Battery Specialists.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy">
                <span className="text-gray-400 hover:text-cart-green transition-colors text-sm cursor-pointer" data-testid="link-footer-privacy">
                  Privacy Policy
                </span>
              </Link>
              <Link href="/terms">
                <span className="text-gray-400 hover:text-cart-green transition-colors text-sm cursor-pointer" data-testid="link-footer-terms">
                  Terms of Service
                </span>
              </Link>
              <Link href="/sitemap">
                <span className="text-gray-400 hover:text-cart-green transition-colors text-sm cursor-pointer" data-testid="link-footer-sitemap">
                  Sitemap
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-cart-orange p-4 shadow-lg md:hidden z-50">
        <a 
          href="tel:1-844-888-7732" 
          className="flex items-center justify-center text-white font-bold text-lg"
          data-testid="link-phone-sticky"
        >
          <Phone className="h-5 w-5 mr-2 text-cart-green" />
          Call Battery Experts: 1-844-888-7732
        </a>
      </div>
    </footer>
  );
}

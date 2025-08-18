import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Search, CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero-gradient text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Power Your <span className="text-tigon-green">Golf Cart</span> with TIGON Batteries Reliability
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              TIGON Batteries specializes in Golf Cart Batteries, LSV, NEV & MSV battery solutions. 
              Choose from 96+ professional-grade battery configurations with expert support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/battery-selector">
                <Button 
                  size="lg" 
                  className="bg-tigon-orange text-white px-8 py-4 text-lg hover:bg-orange-600 w-full sm:w-auto"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Find Your Perfect Battery
                </Button>
              </Link>
              <a 
                href="tel:1-844-844-6638"
                className="bg-white text-tigon-red px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center border-2 border-white"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call Expert: 1-844-844-6638
              </a>
            </div>
            <div className="mt-6 flex items-center text-blue-100">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Free Expert Consultation • Trusted by 10,000+ Customers</span>
            </div>
          </div>
          <div className="lg:text-right">
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600" 
                alt="TIGON Batteries Golf Cart Power Solutions" 
                className="rounded-xl shadow-2xl w-full h-auto" 
              />
              <div className="mt-4 text-center">
                <div className="text-tigon-green font-semibold">96+ Battery Configurations Available</div>
                <div className="text-blue-100 text-sm">6V • 8V • 12V | Flooded • AGM • Gel • Lithium</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

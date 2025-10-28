import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Search, CheckCircle, Battery, Truck, Zap, Shield } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative text-white py-8 sm:py-12 md:py-16 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/hero-background.jpg)'
        }}
      />
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-5 md:mb-6">
              Power Your <span className="text-lsv-green">Low Speed Vehicle</span> with LSV Battery Depot Reliability
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-7 md:mb-8 text-blue-100 leading-relaxed">
              LSV Battery Depot specializes in Low Speed Vehicle (LSV) Batteries, NEV, MSV & Golf Cart battery solutions. 
              Choose from 96+ professional-grade battery configurations with expert support.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4">
              <Link href="/battery-selector">
                <Button 
                  size="lg" 
                  className="bg-lsv-orange text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover:bg-orange-600 w-full min-h-[52px] sm:min-h-[56px] touch-manipulation"
                  data-testid="button-battery-selector-hero"
                >
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-lsv-green flex-shrink-0" />
                  <span className="whitespace-nowrap">Find Your Perfect Battery</span>
                </Button>
              </Link>
              <a 
                href="tel:1-844-888-7732"
                className="bg-white text-lsv-green px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-100 transition-colors flex items-center justify-center border-2 border-white w-full min-h-[52px] sm:min-h-[56px] touch-manipulation"
                data-testid="link-phone-hero"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-lsv-green flex-shrink-0" />
                <span className="whitespace-nowrap">Speak To A Expert</span>
              </a>
            </div>
            <div className="mt-4 sm:mt-5 md:mt-6 flex items-center text-blue-100 text-sm sm:text-base">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-lsv-green flex-shrink-0" />
              <span className="leading-snug">Free Expert Consultation • Trusted by 10,000+ Customers</span>
            </div>
          </div>
          <div className="lg:text-right mt-6 lg:mt-0">
            <div className="bg-white/10 p-4 sm:p-6 md:p-8 rounded-2xl backdrop-blur-sm text-center">
              <div className="bg-white/20 p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                  <div className="bg-lsv-green/20 p-3 sm:p-4 rounded-lg">
                    <Truck className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-lsv-green mx-auto mb-1 sm:mb-2" />
                    <div className="text-white font-semibold text-xs sm:text-sm md:text-base">LSV/NEV</div>
                  </div>
                  <div className="bg-lsv-blue/20 p-3 sm:p-4 rounded-lg">
                    <Battery className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-lsv-blue mx-auto mb-1 sm:mb-2" />
                    <div className="text-white font-semibold text-xs sm:text-sm md:text-base">Golf Cart</div>
                  </div>
                  <div className="bg-lsv-green/20 p-3 sm:p-4 rounded-lg">
                    <Zap className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-lsv-green mx-auto mb-1 sm:mb-2" />
                    <div className="text-white font-semibold text-xs sm:text-sm md:text-base">Lithium</div>
                  </div>
                  <div className="bg-lsv-green/20 p-3 sm:p-4 rounded-lg">
                    <Shield className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-lsv-green mx-auto mb-1 sm:mb-2" />
                    <div className="text-white font-semibold text-xs sm:text-sm md:text-base">AGM/Gel</div>
                  </div>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 text-center">
                <div className="text-lsv-green font-semibold text-sm sm:text-base md:text-lg">96+ Battery Configurations Available</div>
                <div className="text-blue-100 text-xs sm:text-sm leading-relaxed mt-1">6V • 8V • 12V | Flooded • AGM • Gel • Lithium</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

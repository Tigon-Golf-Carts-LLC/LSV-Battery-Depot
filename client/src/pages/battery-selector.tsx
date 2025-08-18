import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BatterySelectorQuiz from "@/components/battery-selector-quiz";
import ProductCard from "@/components/product-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Zap, CheckCircle, ArrowRight, RotateCcw } from "lucide-react";
import { type Product } from "@shared/schema";
import { type BatteryQuizState } from "@/types";

export default function BatterySelector() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState<BatteryQuizState | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const { data: allProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const handleQuizComplete = (results: BatteryQuizState) => {
    setQuizResults(results);
    setQuizCompleted(true);
    
    // Filter products based on quiz results
    const filtered = allProducts.filter(product => {
      let matches = true;

      // Filter by vehicle type
      if (results.vehicleType) {
        const categoryMap: Record<string, string> = {
          "golf-cart": "Golf Cart Batteries",
          "lsv": "Low Speed Vehicle (LSV) Batteries",
          "nev": "Neighborhood Electric Vehicle (NEV) Batteries",
          "msv": "Medium Speed Vehicle (MSV) Batteries"
        };
        matches = matches && product.category === categoryMap[results.vehicleType];
      }

      // Filter by voltage system if specified
      if (results.voltageSystem && results.voltageSystem !== "not-sure") {
        const specs = typeof product.specifications === 'object' ? product.specifications : {};
        const voltage = specs.voltage;
        
        if (results.voltageSystem === "36v" && voltage !== 6) matches = false;
        if (results.voltageSystem === "48v" && ![6, 8].includes(voltage)) matches = false;
        if (results.voltageSystem === "72v" && voltage !== 12) matches = false;
      }

      // Filter by technology based on usage and budget
      if (results.usage && results.budget) {
        if (results.budget === "economy" && !product.technology.includes("Flooded")) {
          matches = false;
        }
        if (results.budget === "professional" && !product.technology.includes("Lithium")) {
          matches = false;
        }
        if (results.usage === "heavy" && product.technology.includes("Flooded")) {
          matches = false;
        }
      }

      return matches;
    });

    // Sort by relevance (prioritize based on quiz answers)
    const sorted = filtered.sort((a, b) => {
      let scoreA = 0, scoreB = 0;

      // Score based on technology preference
      if (results.budget === "professional") {
        if (a.technology.includes("Lithium")) scoreA += 10;
        if (b.technology.includes("Lithium")) scoreB += 10;
      }
      if (results.budget === "economy") {
        if (a.technology.includes("Flooded")) scoreA += 10;
        if (b.technology.includes("Flooded")) scoreB += 10;
      }

      // Score based on usage pattern
      if (results.usage === "heavy") {
        if (a.technology.includes("AGM") || a.technology.includes("Gel")) scoreA += 5;
        if (b.technology.includes("AGM") || b.technology.includes("Gel")) scoreB += 5;
      }

      return scoreB - scoreA;
    });

    setRecommendedProducts(sorted.slice(0, 6));
  };

  const resetQuiz = () => {
    setQuizCompleted(false);
    setQuizResults(null);
    setRecommendedProducts([]);
  };

  const getRecommendationSummary = () => {
    if (!quizResults) return "";

    const vehicleMap: Record<string, string> = {
      "golf-cart": "Golf Cart",
      "lsv": "LSV",
      "nev": "NEV",
      "msv": "MSV"
    };

    const voltageMap: Record<string, string> = {
      "36v": "36V",
      "48v": "48V", 
      "72v": "72V",
      "not-sure": "Various Voltages"
    };

    const usageMap: Record<string, string> = {
      "light": "Light Use",
      "moderate": "Moderate Use",
      "heavy": "Heavy Use",
      "professional": "Professional Use"
    };

    const budgetMap: Record<string, string> = {
      "economy": "Economy",
      "standard": "Standard",
      "premium": "Premium",
      "professional": "Professional"
    };

    return `${vehicleMap[quizResults.vehicleType]} • ${voltageMap[quizResults.voltageSystem]} • ${usageMap[quizResults.usage]} • ${budgetMap[quizResults.budget]} Budget`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Find Your Perfect TIGON Battery Match
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Our Battery Selector Quiz helps you choose the optimal battery from our complete 
              lineup of 96+ Golf Cart, LSV, NEV & MSV battery configurations. Get personalized 
              recommendations based on your specific needs.
            </p>
            {!quizCompleted && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:1-844-844-6638">
                  <Button size="lg" className="bg-tigon-orange text-white px-8 py-4 text-lg hover:bg-orange-600">
                    <Phone className="h-5 w-5 mr-2" />
                    Skip Quiz - Call Expert: 1-844-844-6638
                  </Button>
                </a>
                <Button size="lg" variant="outline">
                  <Zap className="h-5 w-5 mr-2" />
                  Start Battery Selector Below
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!quizCompleted ? (
          /* Quiz Section */
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Answer a Few Questions to Get Started
              </h2>
              <p className="text-gray-600">
                Our quiz takes less than 2 minutes and provides personalized TIGON battery recommendations.
              </p>
            </div>
            
            <BatterySelectorQuiz onComplete={handleQuizComplete} />
          </div>
        ) : (
          /* Results Section */
          <div>
            {/* Results Header */}
            <Card className="mb-8 bg-gradient-to-r from-tigon-red to-tigon-green text-white">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 mx-auto mb-4 text-tigon-orange" />
                <h2 className="text-3xl font-bold mb-4">
                  Your TIGON Battery Recommendations Are Ready!
                </h2>
                <p className="text-xl mb-4 text-blue-100">
                  Based on your selections: {getRecommendationSummary()}
                </p>
                <p className="text-blue-100 mb-6">
                  We found {recommendedProducts.length} TIGON battery configurations that match your needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:1-844-844-6638">
                    <Button size="lg" className="bg-tigon-orange text-white hover:bg-orange-600">
                      <Phone className="h-5 w-5 mr-2" />
                      Discuss Results: 1-844-844-6638
                    </Button>
                  </a>
                  <Button size="lg" variant="outline" className="bg-white text-tigon-red hover:bg-gray-100" onClick={resetQuiz}>
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Retake Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Recommended TIGON Batteries for You
                  </h3>
                  <Badge className="bg-tigon-green text-white px-3 py-1">
                    {recommendedProducts.length} Matches Found
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {recommendedProducts.map((product, index) => (
                    <div key={product.id} className="relative">
                      {index === 0 && (
                        <Badge className="absolute -top-2 -right-2 z-10 bg-tigon-orange text-white">
                          Best Match
                        </Badge>
                      )}
                      <ProductCard product={product} showBestSeller={index === 0} />
                    </div>
                  ))}
                </div>

                {/* Why These Recommendations */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-tigon-green" />
                      Why We Recommend These TIGON Batteries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Perfect for Your Vehicle Type:</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          These batteries are specifically designed for {quizResults?.vehicleType === 'golf-cart' ? 'Golf Cart' : 
                          quizResults?.vehicleType === 'lsv' ? 'Low Speed Vehicle (LSV)' :
                          quizResults?.vehicleType === 'nev' ? 'Neighborhood Electric Vehicle (NEV)' :
                          'Medium Speed Vehicle (MSV)'} applications, ensuring optimal performance and reliability.
                        </p>

                        <h4 className="font-semibold mb-2">Matched to Your Usage Pattern:</h4>
                        <p className="text-sm text-gray-600">
                          Selected for {quizResults?.usage} applications, these TIGON batteries provide 
                          the right balance of performance, longevity, and value for your specific needs.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Fits Your Budget Range:</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          These recommendations align with your {quizResults?.budget} budget preference, 
                          offering the best value and performance within your range.
                        </p>

                        <h4 className="font-semibold mb-2">Voltage System Compatible:</h4>
                        <p className="text-sm text-gray-600">
                          {quizResults?.voltageSystem === 'not-sure' 
                            ? 'Multiple voltage options included to help you determine the best system for your vehicle.'
                            : `Optimized for ${quizResults?.voltageSystem} systems as specified.`
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* No Results */
              <Card className="p-12 text-center">
                <Zap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Let Our Experts Help You Find the Perfect Battery
                </h3>
                <p className="text-gray-600 mb-6">
                  Based on your specific requirements, we'd like to discuss your needs personally 
                  to recommend the best TIGON battery configuration for your vehicle.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:1-844-844-6638">
                    <Button size="lg" className="bg-tigon-orange text-white hover:bg-orange-600">
                      <Phone className="h-5 w-5 mr-2" />
                      Call TIGON Experts: 1-844-844-6638
                    </Button>
                  </a>
                  <Button size="lg" variant="outline" onClick={resetQuiz}>
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Retake Quiz
                  </Button>
                </div>
              </Card>
            )}

            {/* Next Steps */}
            <section className="mt-12">
              <Card className="overflow-hidden">
                <CardHeader className="bg-tigon-red/5">
                  <CardTitle className="text-2xl">Next Steps with Your TIGON Battery Selection</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-tigon-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="h-8 w-8 text-tigon-red" />
                      </div>
                      <h4 className="font-semibold mb-2">1. Consult with Experts</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Discuss your recommendations with our TIGON battery specialists for personalized advice.
                      </p>
                      <a href="tel:1-844-844-6638">
                        <Button size="sm" variant="outline" className="border-tigon-red text-tigon-red">
                          Call 1-844-844-6638
                        </Button>
                      </a>
                    </div>

                    <div className="text-center">
                      <div className="bg-tigon-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-tigon-green" />
                      </div>
                      <h4 className="font-semibold mb-2">2. Verify Compatibility</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Confirm the exact specifications and compatibility with your vehicle model.
                      </p>
                      <Link href="/products">
                        <Button size="sm" variant="outline" className="border-tigon-green text-tigon-green">
                          View Details
                        </Button>
                      </Link>
                    </div>

                    <div className="text-center">
                      <div className="bg-tigon-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ArrowRight className="h-8 w-8 text-tigon-orange" />
                      </div>
                      <h4 className="font-semibold mb-2">3. Order & Install</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Place your order and schedule professional installation for optimal performance.
                      </p>
                      <a href="tel:1-844-844-6638">
                        <Button size="sm" variant="outline" className="border-tigon-orange text-tigon-orange">
                          Get Quote
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {/* Expert Help CTA */}
        <section className="mt-16">
          <Card className="p-8 text-center bg-tigon-red text-white">
            <h3 className="text-2xl font-bold mb-4">
              Still Have Questions About TIGON Batteries?
            </h3>
            <p className="text-xl mb-6 text-blue-100">
              Our battery experts are standing by to help you make the perfect choice for your 
              Golf Cart, LSV, NEV, or MSV application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:1-844-844-6638">
                <Button size="lg" className="bg-tigon-orange text-white hover:bg-orange-600">
                  <Phone className="h-5 w-5 mr-2" />
                  Call TIGON Experts: 1-844-844-6638
                </Button>
              </a>
              <Button size="lg" variant="outline" className="bg-white text-tigon-red hover:bg-gray-100" asChild>
                <Link href="/battery-guide">
                  <Zap className="h-5 w-5 mr-2" />
                  Learn More in Our Guide
                </Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
}

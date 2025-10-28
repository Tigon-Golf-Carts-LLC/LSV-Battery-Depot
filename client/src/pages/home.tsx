import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import ProductCard from "@/components/product-card";
import BatterySelectorQuiz from "@/components/battery-selector-quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Settings, Shield, Truck, GraduationCap, Wrench, Star, CheckCircle } from "lucide-react";
import { type Product } from "@shared/schema";
import { useDocumentHead } from "@/hooks/use-document-head";

export default function Home() {
  // Set SEO metadata
  useDocumentHead({
    title: "Power Your Low Speed Vehicle with LSV Battery Depot Reliability",
    description: "Premium Low Speed Vehicle (LSV) Batteries, NEV, MSV & Golf Cart solutions from LSV Battery Depot. 96+ professional-grade battery configurations with expert support. Call 1-844-888-7732.",
    ogImage: "/hero-background.jpg",
    ogImageWidth: 1200,
    ogImageHeight: 630
  });

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Get featured products (first 4 from each category)
  const featuredProducts = products.slice(0, 4);

  const categories = [
    {
      name: "LSV Batteries",
      slug: "lsv",
      description: "Low Speed Vehicle (LSV) Batteries designed for neighborhood transportation and utility applications. 6V, 8V & 12V configurations available.",
      image: "/favicon.png",
      icon: "🚗",
      count: 24
    },
    {
      name: "Golf Cart Batteries",
      slug: "golf-cart",
      description: "Premium Golf Cart Batteries for reliable performance on the course and recreational use.",
      image: "/favicon.png",
      icon: "🏌️",
      count: 24
    },
    {
      name: "NEV Batteries",
      slug: "nev",
      description: "Neighborhood Electric Vehicle (NEV) Batteries meeting DOT regulations for street-legal operation.",
      image: "/favicon.png",
      icon: "🏠",
      count: 24
    },
    {
      name: "MSV Batteries",
      slug: "msv",
      description: "Medium Speed Vehicle (MSV) Batteries for enhanced performance and extended range applications.",
      image: "/favicon.png",
      icon: "⚡",
      count: 24
    }
  ];

  const benefits = [
    {
      icon: Settings,
      title: "96+ Battery Configurations",
      description: "Complete lineup covering every voltage, capacity and technology combination for Low Speed Vehicle (LSV) Batteries and electric vehicles.",
      color: "lsv-green"
    },
    {
      icon: Phone,
      title: "Expert Phone Support",
      description: "Talk directly to LSV Battery Depot battery specialists. Get personalized advice for your specific Low Speed Vehicle or electric vehicle needs.",
      color: "lsv-green"
    },
    {
      icon: Truck,
      title: "Fast Nationwide Shipping",
      description: "Quick delivery of LSV Battery Depot batteries across the country. Get your Low Speed Vehicle back on the road faster.",
      color: "lsv-green"
    },
    {
      icon: Shield,
      title: "Industry-Leading Warranty",
      description: "Comprehensive warranty coverage on all LSV Battery Depot Low Speed Vehicle Batteries and electric vehicle battery solutions.",
      color: "lsv-green"
    },
    {
      icon: GraduationCap,
      title: "Educational Resources",
      description: "Comprehensive guides on Low Speed Vehicle (LSV) Batteries, voltage systems, maintenance and installation from LSV Battery Depot experts.",
      color: "lsv-green"
    },
    {
      icon: Wrench,
      title: "Professional Installation",
      description: "Expert installation services and detailed guides ensure optimal performance of your LSV Battery Depot battery system.",
      color: "lsv-green"
    }
  ];

  const testimonials = [
    {
      rating: 5,
      text: "LSV Battery Depot transformed my neighborhood electric vehicle performance! The 6V-225 LSV Batteries have been running strong for 3 years. Excellent customer support when I called 1-844-888-7732.",
      author: "John Smith",
      title: "LSV Fleet Manager, Texas",
      initials: "JS"
    },
    {
      rating: 5,
      text: "Outstanding LSV Batteries from LSV Battery Depot! Perfect for our neighborhood electric vehicles. The phone support at 1-844-888-7732 helped us choose exactly what we needed.",
      author: "Maria Rodriguez",
      title: "Community Manager, California",
      initials: "MR"
    },
    {
      rating: 5,
      text: "LSV Battery Depot's lithium Low Speed Vehicle Batteries are incredible! Extended range and fast charging. The expert advice I received when calling 1-844-888-7732 was invaluable.",
      author: "Bob Kim",
      title: "NEV Owner, Florida",
      initials: "BK"
    }
  ];

  const educationalContent = [
    {
      title: "Complete Low Speed Vehicle Battery Guide 2025",
      description: "Everything you need to know about Low Speed Vehicle (LSV) Batteries: voltage configurations, LSV Battery Depot options, maintenance tips and installation.",
      readTime: "5 min read",
      category: "GUIDE",
      image: "/favicon.png"
    },
    {
      title: "Understanding Battery Technologies",
      description: "Compare Flooded Lead-Acid, AGM, Gel and Lithium technologies. LSV Battery Depot explains pros, cons and best applications.",
      readTime: "8 min read",
      category: "TECHNICAL",
      image: "/favicon.png"
    },
    {
      title: "Vehicle-Specific Battery Requirements",
      description: "Learn the power needs for LSV, NEV, MSV & Golf Cart applications. LSV Battery Depot selection guide for each vehicle type.",
      readTime: "6 min read",
      category: "VEHICLES",
      image: "/favicon.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <Hero />

      {/* Product Categories Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              LSV Battery Depot for Every Electric Vehicle
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From Low Speed Vehicle (LSV) Batteries to specialized NEV, MSV & Golf Cart solutions, LSV Battery Depot offers the complete lineup for all your electric vehicle needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {categories.map((category) => (
              <Card key={category.slug} className="card-hover overflow-hidden border-2 border-transparent hover:border-lsv-red">
                <img 
                  src={category.image}
                  alt={`${category.name} by LSV Battery Depot`}
                  className="w-full h-48 object-contain bg-gray-50" 
                />
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <span className="text-xl sm:text-2xl mr-2 sm:mr-3">{category.icon}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">{category.name}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{category.description}</p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                    <Link href={`/products/${category.slug}`}>
                      <span className="text-lsv-red font-semibold hover:underline cursor-pointer text-sm sm:text-base touch-manipulation">
                        View All {category.name} →
                      </span>
                    </Link>
                    <Badge className="bg-lsv-green text-white text-xs sm:text-sm">
                      {category.count} Models
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <a href="tel:1-844-888-7732" className="block w-full sm:w-auto sm:inline-block">
              <Button size="lg" className="bg-lsv-orange text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg hover:bg-orange-600 w-full sm:w-auto min-h-[52px] sm:min-h-[56px] touch-manipulation">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-lsv-green flex-shrink-0" />
                <span className="hidden md:inline">Need Help Choosing? Call LSV Battery Depot Battery Experts: 1-844-888-7732</span>
                <span className="hidden sm:inline md:hidden">Call Battery Experts: 1-844-888-7732</span>
                <span className="sm:hidden">Call 1-844-888-7732</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Battery Selector Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Find Your Perfect LSV Battery Depot Battery Match
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our Battery Selector Quiz helps you choose the optimal battery from our complete lineup of 96+ LSV, NEV, MSV & Golf Cart battery configurations.
            </p>
          </div>

          <BatterySelectorQuiz />
        </div>
      </section>

      {/* Why Choose LSV Battery Depot Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Why Low Speed Vehicle Owners Choose LSV Battery Depot
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Over 10,000 customers trust LSV Battery Depot for reliable Low Speed Vehicle (LSV), NEV, MSV & Golf Cart power solutions. Here's why we're the industry leader.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center px-4 sm:px-0">
                  <div className={`bg-${benefit.color}/10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                    <Icon className={`text-${benefit.color} h-7 w-7 sm:h-8 sm:w-8`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 leading-snug">{benefit.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <a href="tel:1-844-888-7732" className="block w-full sm:w-auto sm:inline-block">
              <Button size="lg" className="bg-lsv-red text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg hover:bg-blue-700 w-full sm:w-auto min-h-[52px] sm:min-h-[56px] touch-manipulation">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-lsv-green flex-shrink-0" />
                <span className="hidden md:inline">Experience LSV Battery Depot Excellence: Call 1-844-888-7732</span>
                <span className="hidden sm:inline md:hidden">Call 1-844-888-7732</span>
                <span className="sm:hidden">Call Now</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Popular LSV Battery Depot Battery Solutions
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Top-selling Low Speed Vehicle (LSV) Batteries and electric vehicle solutions trusted by thousands of customers nationwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showBestSeller={index === 0}
              />
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/products" className="w-full sm:w-auto">
              <Button size="lg" className="bg-lsv-red text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg hover:bg-blue-700 w-full sm:w-auto min-h-[52px] sm:min-h-[56px] touch-manipulation">
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-lsv-green flex-shrink-0" />
                View All 96+ Battery Models
              </Button>
            </Link>
            <a href="tel:1-844-888-7732" className="w-full sm:w-auto">
              <Button size="lg" className="bg-lsv-orange text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg hover:bg-orange-600 w-full sm:w-auto min-h-[52px] sm:min-h-[56px] touch-manipulation">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-lsv-green flex-shrink-0" />
                <span className="hidden sm:inline">Questions? Call 1-844-888-7732</span>
                <span className="sm:hidden">Questions? Call Now</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              LSV Battery Depot Educational Resources
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Learn everything about Low Speed Vehicle (LSV) Batteries, electric vehicle power systems, and battery maintenance from LSV Battery Depot experts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {educationalContent.map((article, index) => (
              <Card key={index} className="card-hover overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-contain bg-gray-50" 
                />
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <Badge 
                      className={`text-white mr-2 text-xs ${
                        article.category === 'GUIDE' ? 'bg-lsv-green' :
                        article.category === 'TECHNICAL' ? 'bg-lsv-red' :
                        'bg-lsv-orange'
                      }`}
                    >
                      {article.category}
                    </Badge>
                    <span className="text-gray-500 text-xs sm:text-sm">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-snug">{article.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{article.description}</p>
                  <Link href="/battery-guide">
                    <span className="text-lsv-red font-semibold hover:underline flex items-center cursor-pointer text-sm sm:text-base touch-manipulation">
                      Read Guide <span className="ml-2">→</span>
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <a href="tel:1-844-888-7732" className="block w-full sm:w-auto sm:inline-block">
              <Button size="lg" className="bg-lsv-orange text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg hover:bg-orange-600 w-full sm:w-auto min-h-[52px] sm:min-h-[56px] touch-manipulation">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-lsv-green flex-shrink-0" />
                <span className="hidden md:inline">Still Have Questions? Call LSV Battery Depot Experts: 1-844-888-7732</span>
                <span className="hidden sm:inline md:hidden">Questions? Call 1-844-888-7732</span>
                <span className="sm:hidden">Call 1-844-888-7732</span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              What Customers Say About LSV Battery Depot
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Over 10,000 satisfied customers trust LSV Battery Depot for their Low Speed Vehicle (LSV), NEV, MSV & Golf Cart battery needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-4 sm:p-5 md:p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="text-yellow-400 flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-500 text-xs sm:text-sm ml-2">5.0/5</span>
                  </div>
                  <blockquote className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-lsv-red rounded-full flex items-center justify-center text-white font-semibold mr-2 sm:mr-3 text-sm sm:text-base flex-shrink-0">
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.author}</div>
                      <div className="text-gray-600 text-xs sm:text-sm">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 md:mt-12 mb-20 md:mb-0">
            <Card className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
              <CardContent className="p-0 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-lsv-red mb-2">10,000+</div>
                <div className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Satisfied Customers</div>
                <div className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">Trust LSV Battery Depot for Low Speed Vehicle (LSV), NEV, MSV & Golf Cart solutions nationwide</div>
                <a href="tel:1-844-888-7732" className="block w-full sm:w-auto sm:inline-block">
                  <Button className="bg-lsv-orange text-white px-4 sm:px-6 md:px-8 py-3 hover:bg-lsv-blue w-full sm:w-auto min-h-[48px] touch-manipulation text-sm sm:text-base">
                    <Phone className="h-4 w-4 mr-2 text-lsv-green flex-shrink-0" />
                    <span className="hidden sm:inline">Join Our Happy Customers: 1-844-888-7732</span>
                    <span className="sm:hidden">Join: 1-844-888-7732</span>
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-100 mb-20 md:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 leading-tight">
            Ready to Power Up with LSV Battery Depot?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-7 md:mb-8 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get expert advice on Low Speed Vehicle (LSV) Batteries, NEV, MSV & Golf Cart solutions. Our battery specialists are standing by to help you choose from our complete lineup of 96+ configurations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-6 sm:mb-7 md:mb-8">
            <a 
              href="tel:1-844-888-7732"
              className="bg-lsv-orange text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg md:text-xl hover:bg-orange-600 transition-colors flex items-center min-h-[52px] sm:min-h-[56px] touch-manipulation w-full sm:w-auto justify-center"
            >
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-lsv-green flex-shrink-0" />
              <div>
                <div className="text-sm sm:text-base md:text-lg">Call Battery Experts</div>
                <div className="text-xs sm:text-sm md:text-base font-normal">1-844-888-7732</div>
              </div>
            </a>
            
            <div className="text-gray-600 text-sm sm:text-base">
              <div className="font-semibold">Monday - Saturday</div>
              <div>8AM - 5PM EST</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-lsv-green">96+</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600">Battery Configurations</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-lsv-green">10,000+</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-lsv-green">24/7</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600">Online Shopping</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-lsv-green">Fast</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600">Nationwide Shipping</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

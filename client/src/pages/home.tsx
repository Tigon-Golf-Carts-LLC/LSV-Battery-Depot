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

export default function Home() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  // Get featured products (first 4 from each category)
  const featuredProducts = products.slice(0, 4);

  const categories = [
    {
      name: "Golf Cart Batteries",
      slug: "golf-cart",
      description: "Premium Golf Cart Batteries for reliable performance on the course. 6V, 8V & 12V configurations available.",
      image: "/attached_assets/tigon-logo.png",
      icon: "🏌️",
      count: 24
    },
    {
      name: "LSV Batteries",
      slug: "lsv",
      description: "Low Speed Vehicle (LSV) Batteries designed for neighborhood transportation and utility applications.",
      image: "/attached_assets/tigon-logo.png",
      icon: "🚗",
      count: 24
    },
    {
      name: "NEV Batteries",
      slug: "nev",
      description: "Neighborhood Electric Vehicle (NEV) Batteries meeting DOT regulations for street-legal operation.",
      image: "/attached_assets/tigon-logo.png",
      icon: "🏠",
      count: 24
    },
    {
      name: "MSV Batteries",
      slug: "msv",
      description: "Medium Speed Vehicle (MSV) Batteries for enhanced performance and extended range applications.",
      image: "/attached_assets/tigon-logo.png",
      icon: "⚡",
      count: 24
    }
  ];

  const benefits = [
    {
      icon: Settings,
      title: "96+ Battery Configurations",
      description: "Complete lineup covering every voltage, capacity and technology combination for Golf Cart Batteries and electric vehicles.",
      color: "tigon-red"
    },
    {
      icon: Phone,
      title: "Expert Phone Support",
      description: "Talk directly to TIGON battery specialists. Get personalized advice for your specific Golf Cart or electric vehicle needs.",
      color: "tigon-green"
    },
    {
      icon: Truck,
      title: "Fast Nationwide Shipping",
      description: "Quick delivery of TIGON Batteries across the country. Get your Golf Cart back on the course faster.",
      color: "tigon-orange"
    },
    {
      icon: Shield,
      title: "Industry-Leading Warranty",
      description: "Comprehensive warranty coverage on all TIGON Golf Cart Batteries and electric vehicle battery solutions.",
      color: "tigon-red"
    },
    {
      icon: GraduationCap,
      title: "Educational Resources",
      description: "Comprehensive guides on Golf Cart Batteries, voltage systems, maintenance and installation from TIGON experts.",
      color: "tigon-green"
    },
    {
      icon: Wrench,
      title: "Professional Installation",
      description: "Expert installation services and detailed guides ensure optimal performance of your TIGON battery system.",
      color: "tigon-orange"
    }
  ];

  const testimonials = [
    {
      rating: 5,
      text: "TIGON Batteries transformed my golf cart performance! The 6V-225 Golf Cart Batteries have been running strong for 3 years. Excellent customer support when I called 1-844-844-6638.",
      author: "John Smith",
      title: "Golf Course Manager, Texas",
      initials: "JS"
    },
    {
      rating: 5,
      text: "Outstanding LSV Batteries from TIGON! Perfect for our neighborhood electric vehicles. The phone support at 1-844-844-6638 helped us choose exactly what we needed.",
      author: "Maria Rodriguez",
      title: "Fleet Manager, California",
      initials: "MR"
    },
    {
      rating: 5,
      text: "TIGON's lithium Golf Cart Batteries are incredible! Extended range and fast charging. The expert advice I received when calling 1-844-844-6638 was invaluable.",
      author: "Bob Kim",
      title: "Golf Enthusiast, Florida",
      initials: "BK"
    }
  ];

  const educationalContent = [
    {
      title: "Complete Golf Cart Battery Guide 2024",
      description: "Everything you need to know about Golf Cart Batteries: voltage configurations, TIGON Batteries options, maintenance tips and installation.",
      readTime: "5 min read",
      category: "GUIDE",
      image: "/attached_assets/tigon-logo.png"
    },
    {
      title: "Understanding Battery Technologies",
      description: "Compare Flooded Lead-Acid, AGM, Gel and Lithium technologies. TIGON Batteries explains pros, cons and best applications.",
      readTime: "8 min read",
      category: "TECHNICAL",
      image: "/attached_assets/tigon-logo.png"
    },
    {
      title: "Vehicle-Specific Battery Requirements",
      description: "Learn the power needs for Golf Carts, LSV, NEV & MSV applications. TIGON Batteries selection guide for each vehicle type.",
      readTime: "6 min read",
      category: "VEHICLES",
      image: "/attached_assets/tigon-logo.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <Hero />

      {/* Product Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              TIGON Batteries for Every Electric Vehicle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From Golf Cart Batteries to specialized LSV, NEV & MSV solutions, TIGON Batteries offers the complete lineup for all your electric vehicle needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Card key={category.slug} className="card-hover overflow-hidden border-2 border-transparent hover:border-tigon-red">
                <img 
                  src={category.image}
                  alt={`${category.name} by TIGON`}
                  className="w-full h-48 object-contain bg-gray-50" 
                />
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <Link href={`/products/${category.slug}`}>
                      <span className="text-tigon-red font-semibold hover:underline cursor-pointer">
                        View All {category.name} →
                      </span>
                    </Link>
                    <Badge className="bg-tigon-green text-white">
                      {category.count} Models
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="tel:1-844-844-6638">
              <Button size="lg" className="bg-tigon-orange text-white px-8 py-4 text-lg hover:bg-orange-600">
                <Phone className="h-5 w-5 mr-2" />
                Need Help Choosing? Call TIGON Battery Experts: 1-844-844-6638
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Battery Selector Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect TIGON Battery Match
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our Battery Selector Quiz helps you choose the optimal battery from our complete lineup of 96+ Golf Cart, LSV, NEV & MSV battery configurations.
            </p>
          </div>

          <BatterySelectorQuiz />
        </div>
      </section>

      {/* Why Choose TIGON Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Golf Cart Owners Choose TIGON Batteries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over 10,000 customers trust TIGON Batteries for reliable Golf Cart, LSV, NEV & MSV power solutions. Here's why we're the industry leader.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`bg-${benefit.color}/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <Icon className={`text-${benefit.color} h-8 w-8`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <a href="tel:1-844-844-6638">
              <Button size="lg" className="bg-tigon-red text-white px-8 py-4 text-lg hover:bg-blue-700">
                <Phone className="h-5 w-5 mr-2" />
                Experience TIGON Excellence: Call 1-844-844-6638
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular TIGON Battery Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Top-selling Golf Cart Batteries and electric vehicle solutions trusted by thousands of customers nationwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showBestSeller={index === 0}
              />
            ))}
          </div>

          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-tigon-red text-white px-8 py-4 text-lg hover:bg-blue-700">
                <Settings className="h-5 w-5 mr-2" />
                View All 96+ Battery Models
              </Button>
            </Link>
            <a href="tel:1-844-844-6638">
              <Button size="lg" className="bg-tigon-orange text-white px-8 py-4 text-lg hover:bg-orange-600">
                <Phone className="h-5 w-5 mr-2" />
                Questions? Call 1-844-844-6638
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Educational Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              TIGON Batteries Educational Resources
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn everything about Golf Cart Batteries, electric vehicle power systems, and battery maintenance from TIGON Batteries experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationalContent.map((article, index) => (
              <Card key={index} className="card-hover overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-contain bg-gray-50" 
                />
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <Badge 
                      className={`text-white mr-2 ${
                        article.category === 'GUIDE' ? 'bg-tigon-green' :
                        article.category === 'TECHNICAL' ? 'bg-tigon-red' :
                        'bg-tigon-orange'
                      }`}
                    >
                      {article.category}
                    </Badge>
                    <span className="text-gray-500 text-sm">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <Link href="/battery-guide">
                    <span className="text-tigon-red font-semibold hover:underline flex items-center cursor-pointer">
                      Read Guide <span className="ml-2">→</span>
                    </span>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="tel:1-844-844-6638">
              <Button size="lg" className="bg-tigon-orange text-white px-8 py-4 text-lg hover:bg-orange-600">
                <Phone className="h-5 w-5 mr-2" />
                Still Have Questions? Call TIGON Experts: 1-844-844-6638
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Customers Say About TIGON Batteries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Over 10,000 satisfied customers trust TIGON Batteries for their Golf Cart, LSV, NEV & MSV battery needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-400 flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">5.0/5</span>
                  </div>
                  <blockquote className="text-gray-700 mb-4">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-tigon-red rounded-full flex items-center justify-center text-white font-semibold mr-3">
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-gray-600 text-sm">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto p-8">
              <CardContent className="p-0 text-center">
                <div className="text-4xl font-bold text-tigon-red mb-2">10,000+</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">Satisfied Customers</div>
                <div className="text-gray-600 mb-6">Trust TIGON Batteries for Golf Cart, LSV, NEV & MSV solutions nationwide</div>
                <a href="tel:1-844-844-6638">
                  <Button className="bg-tigon-red text-white px-8 py-3 hover:bg-blue-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Join Our Happy Customers: 1-844-844-6638
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-tigon-red text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Power Up with TIGON Batteries?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Get expert advice on Golf Cart Batteries, LSV, NEV & MSV solutions. Our battery specialists are standing by to help you choose from our complete lineup of 96+ configurations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <a 
              href="tel:1-844-844-6638"
              className="bg-tigon-orange text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-orange-600 transition-colors flex items-center"
            >
              <Phone className="h-6 w-6 mr-3" />
              <div>
                <div>Call Battery Experts</div>
                <div className="text-lg font-normal">1-844-844-6638</div>
              </div>
            </a>
            
            <div className="text-blue-100">
              <div className="text-lg font-semibold">Monday - Friday</div>
              <div>8AM - 6PM EST</div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-tigon-green">96+</div>
              <div className="text-blue-100">Battery Configurations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-tigon-green">10,000+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-tigon-green">24/7</div>
              <div className="text-blue-100">Online Shopping</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-tigon-green">Fast</div>
              <div className="text-blue-100">Nationwide Shipping</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

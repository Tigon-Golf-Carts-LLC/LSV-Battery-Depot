import { useState, useMemo } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Phone, Search, Filter, Grid, List, ArrowUpDown } from "lucide-react";
import { type Product, safeGetSpecs } from "@shared/schema";
import { type ProductFilter } from "@/types";
import { useDocumentHead } from "@/hooks/use-document-head";

export default function Products() {
  const [location] = useLocation();
  const { category } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<ProductFilter>({});
  const [sortBy, setSortBy] = useState<string>("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Determine category from URL or filters
  const categoryMap: Record<string, string> = {
    "golf-cart": "Golf Cart Batteries",
    "lsv": "Low Speed Vehicle (LSV) Batteries", 
    "nev": "Neighborhood Electric Vehicle (NEV) Batteries",
    "msv": "Medium Speed Vehicle (MSV) Batteries"
  };

  const currentCategory = category ? categoryMap[category] : filters.category;

  const { data: allProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: currentCategory ? ["/api/products", { category: currentCategory }] : ["/api/products"],
  });

  const { data: searchResults = [] } = useQuery<Product[]>({
    queryKey: ["/api/products", { search: searchQuery }],
    enabled: !!searchQuery.trim(),
  });

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = searchQuery.trim() ? searchResults : allProducts;

    // Apply filters
    if (filters.voltage) {
      products = products.filter(p => {
        const specs = safeGetSpecs(p);
        return specs.voltage?.toString() === filters.voltage;
      });
    }

    if (filters.technology) {
      products = products.filter(p => p.technology === filters.technology);
    }

    if (filters.series) {
      products = products.filter(p => p.series === filters.series);
    }

    if (filters.priceRange) {
      products = products.filter(p => {
        const price = parseFloat(p.price);
        return price >= filters.priceRange![0] && price <= filters.priceRange![1];
      });
    }

    // Sort products
    products.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.price) - parseFloat(b.price);
        case "price-high":
          return parseFloat(b.price) - parseFloat(a.price);
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return products;
  }, [allProducts, searchResults, searchQuery, filters, sortBy]);

  // Get unique values for filter options
  const uniqueVoltages = useMemo(() => {
    const voltages = new Set<string>();
    allProducts.forEach(p => {
      const specs = safeGetSpecs(p);
      if (specs.voltage) voltages.add(specs.voltage.toString());
    });
    return Array.from(voltages).sort((a, b) => parseInt(a) - parseInt(b));
  }, [allProducts]);

  const uniqueTechnologies = useMemo(() => {
    const techs = new Set(allProducts.map(p => p.technology));
    return Array.from(techs);
  }, [allProducts]);

  const uniqueSeries = useMemo(() => {
    const series = new Set(allProducts.map(p => p.series));
    return Array.from(series);
  }, [allProducts]);

  const pageTitle = category 
    ? `${categoryMap[category]} by Cart Battery Depot - 6V, 8V, 12V Deep Cycle Battery Solutions`
    : "Cart Battery Depot - Complete Golf Cart, LSV, NEV & MSV Battery Catalog";

  const pageDescription = category
    ? `Premium ${categoryMap[category]} from Cart Battery Depot. Flooded, AGM, Gel & Lithium options. Expert support for all battery needs. Call 1-844-888-7732`
    : "Browse Cart Battery Depot complete catalog of Golf Cart Batteries, LSV, NEV & MSV solutions. 96+ configurations available. Call 1-844-888-7732";

  const displayTitle = category 
    ? categoryMap[category] 
    : "Cart Battery Depot Complete Catalog";

  // Set SEO metadata
  useDocumentHead({
    title: displayTitle,
    description: pageDescription,
    ogImage: "/og/logo.png",
    ogImageWidth: 512,
    ogImageHeight: 512
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-gray-200 animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Page Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {category ? categoryMap[category] : "Cart Battery Depot Complete Catalog"}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              {pageDescription}
            </p>
            <a href="tel:1-844-888-7732">
              <Button className="bg-cart-orange text-white px-6 py-3 hover:bg-orange-600">
                <Phone className="h-4 w-4 mr-2 text-cart-green" />
                Call Battery Experts: 1-844-888-7732
              </Button>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Filter className="h-5 w-5 mr-2" />
                  <h3 className="font-semibold">Filters</h3>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search batteries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Voltage Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Voltage</label>
                  <Select value={filters.voltage || "all"} onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, voltage: value === "all" ? undefined : value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="All Voltages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Voltages</SelectItem>
                      {uniqueVoltages.map(voltage => (
                        <SelectItem key={voltage} value={voltage}>{voltage}V</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Technology Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Technology</label>
                  <Select value={filters.technology || "all"} onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, technology: value === "all" ? undefined : value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="All Technologies" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Technologies</SelectItem>
                      {uniqueTechnologies.map(tech => (
                        <SelectItem key={tech} value={tech}>{tech}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Series Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Series</label>
                  <Select value={filters.series || "all"} onValueChange={(value) => 
                    setFilters(prev => ({ ...prev, series: value === "all" ? undefined : value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="All Series" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Series</SelectItem>
                      {uniqueSeries.map(series => (
                        <SelectItem key={series} value={series}>{series}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFilters({});
                    setSearchQuery("");
                  }}
                  className="w-full"
                >
                  Clear All Filters
                </Button>

                <Separator className="my-6" />

                {/* Expert Help CTA */}
                <div className="bg-cart-red/10 p-4 rounded-lg text-center">
                  <h4 className="font-semibold text-cart-red mb-2">Need Expert Help?</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Talk to our Cart Battery Depot battery specialists for personalized recommendations.
                  </p>
                  <a href="tel:1-844-888-7732">
                    <Button size="sm" className="bg-cart-red text-white hover:bg-blue-700 w-full text-xs px-3">
                      <Phone className="h-4 w-4 mr-1 text-cart-green" />
                      Call 1-844-888-7732
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-lg font-semibold">
                  {filteredProducts.length} Battery{filteredProducts.length !== 1 ? 's' : ''} Found
                </h2>
                {(searchQuery || Object.keys(filters).some(key => filters[key as keyof ProductFilter])) && (
                  <p className="text-sm text-gray-600">
                    {searchQuery && `Searching for "${searchQuery}"`}
                    {(searchQuery && Object.keys(filters).some(key => filters[key as keyof ProductFilter])) && " • "}
                    {Object.keys(filters).some(key => filters[key as keyof ProductFilter]) && "Filters applied"}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No batteries found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters, or contact our experts for help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setFilters({});
                      setSearchQuery("");
                    }}
                  >
                    Clear All Filters
                  </Button>
                  <a href="tel:1-844-888-7732">
                    <Button className="bg-cart-orange text-white hover:bg-orange-600">
                      <Phone className="h-4 w-4 mr-2 text-cart-green" />
                      Call Expert: 1-844-888-7732
                    </Button>
                  </a>
                </div>
              </Card>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Load More / Pagination could go here */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <Card className="p-6 max-w-lg mx-auto">
                  <h3 className="font-semibold mb-2">Looking for something specific?</h3>
                  <p className="text-gray-600 mb-4">
                    Our Cart Battery Depot battery experts can help you find the perfect match for your vehicle.
                  </p>
                  <a href="tel:1-844-888-7732">
                    <Button className="bg-cart-red text-white hover:bg-blue-700">
                      <Phone className="h-4 w-4 mr-2 text-cart-green" />
                      Call Cart Battery Depot Experts: 1-844-888-7732
                    </Button>
                  </a>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

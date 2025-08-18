import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, ShoppingCart, ArrowLeft, CheckCircle, Truck, Shield, Wrench, Star } from "lucide-react";
import { type Product } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";

export default function ProductDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const { setItemCount } = useCart();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", id],
    enabled: !!id,
  });

  const { data: relatedProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    select: (products) => {
      if (!product) return [];
      return products
        .filter(p => p.id !== product.id && (p.series === product.series || p.category === product.category))
        .slice(0, 4);
    },
    enabled: !!product,
  });

  const { data: cartItems } = useQuery({
    queryKey: ["/api/cart"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/cart", { productId: id, quantity });
    },
    onSuccess: () => {
      toast({
        title: "Added to cart",
        description: `${product?.name} has been added to your cart.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      if (cartItems) {
        setItemCount(cartItems.length + 1);
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 animate-pulse rounded" />
              <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />
              <div className="h-12 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-12 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
              The battery you're looking for doesn't exist or may have been discontinued.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/products">
                <Button>View All Products</Button>
              </Link>
              <a href="tel:1-844-844-6638">
                <Button className="bg-tigon-orange text-white hover:bg-orange-600">
                  <Phone className="h-4 w-4 mr-2" />
                  Call 1-844-844-6638
                </Button>
              </a>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const specs = typeof product.specifications === 'object' ? product.specifications : {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/products">
              <span className="text-tigon-red hover:underline cursor-pointer">Products</span>
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/products/${product.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
              <span className="text-tigon-red hover:underline cursor-pointer">{product.category}</span>
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/products">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <Card className="overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                  alt={product.altText}
                  className="w-full h-96 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-tigon-green text-white">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </Badge>
                <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">
                  {specs.voltage}V {specs.ampHours}Ah
                </Badge>
              </div>
            </Card>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Badge variant="outline" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-xl text-gray-600">{product.technology}</p>
            </div>

            <div className="mb-6">
              <div className="text-4xl font-bold text-tigon-red mb-2">${product.price}</div>
              <p className="text-gray-600">
                Professional-grade battery with proven TIGON reliability
              </p>
            </div>

            {/* Quick Specs */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Voltage:</span>
                    <div className="font-semibold">{specs.voltage}V</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Capacity:</span>
                    <div className="font-semibold">{specs.ampHours}Ah</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Lifespan:</span>
                    <div className="font-semibold">{specs.lifespan}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Technology:</span>
                    <div className="font-semibold">{product.technology}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Options */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium">Quantity:</label>
                <select 
                  value={quantity} 
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border rounded px-3 py-2"
                >
                  {[1,2,3,4,5,6,8].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="bg-tigon-orange text-white hover:bg-orange-600 flex-1"
                  onClick={() => addToCartMutation.mutate()}
                  disabled={!product.inStock || addToCartMutation.isPending}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
                </Button>
                <a href="tel:1-844-844-6638" className="flex-1">
                  <Button 
                    variant="outline" 
                    className="w-full border-tigon-red text-tigon-red hover:bg-tigon-red hover:text-white"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Expert: 1-844-844-6638
                  </Button>
                </a>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div className="flex flex-col items-center">
                <CheckCircle className="h-6 w-6 text-tigon-green mb-1" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="h-6 w-6 text-tigon-red mb-1" />
                <span>Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="h-6 w-6 text-tigon-orange mb-1" />
                <span>Warranty Included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableHead>Voltage</TableHead>
                        <TableCell>{specs.voltage}V</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Amp Hours (Ah)</TableHead>
                        <TableCell>{specs.ampHours}Ah</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Terminal Type</TableHead>
                        <TableCell>{specs.terminalType}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Dimensions</TableHead>
                        <TableCell>{specs.dimensions}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Weight</TableHead>
                        <TableCell>{specs.weight}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Expected Lifespan</TableHead>
                        <TableCell>{specs.lifespan}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Cycle Life</TableHead>
                        <TableCell>{specs.cycleLife}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableHead>Technology</TableHead>
                        <TableCell>{product.technology}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compatibility" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Compatibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Voltage System Configurations:</h4>
                      <ul className="space-y-1">
                        {product.systemCompatibility.map((config, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-tigon-green mr-2" />
                            {config}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-semibold mb-2">Vehicle Applications:</h4>
                      <ul className="space-y-1">
                        {product.applications.map((app, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-tigon-green mr-2" />
                            {app}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Features & Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-tigon-green mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="support" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Installation & Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="text-center p-6 border rounded-lg">
                        <Phone className="h-8 w-8 text-tigon-orange mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">Expert Installation Help</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Get professional guidance for battery installation and setup.
                        </p>
                        <a href="tel:1-844-844-6638">
                          <Button size="sm" className="bg-tigon-orange text-white hover:bg-orange-600">
                            Call 1-844-844-6638
                          </Button>
                        </a>
                      </div>
                      
                      <div className="text-center p-6 border rounded-lg">
                        <Wrench className="h-8 w-8 text-tigon-red mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">Professional Installation</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Connect with certified installers in your area.
                        </p>
                        <a href="tel:1-844-844-6638">
                          <Button size="sm" variant="outline" className="border-tigon-red text-tigon-red">
                            Find Installer
                          </Button>
                        </a>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Important Installation Notes:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Always disconnect power before battery replacement</li>
                        <li>• Use proper safety equipment and follow manufacturer guidelines</li>
                        <li>• Ensure proper ventilation for non-sealed batteries</li>
                        <li>• Professional installation recommended for optimal performance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related TIGON Batteries</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="mt-16">
          <Card className="p-8 text-center bg-tigon-red text-white">
            <h3 className="text-2xl font-bold mb-4">
              Questions About This TIGON Battery?
            </h3>
            <p className="mb-6 text-blue-100">
              Our battery experts are standing by to help you with installation, compatibility, 
              and technical questions about {product.name}.
            </p>
            <a href="tel:1-844-844-6638">
              <Button size="lg" className="bg-tigon-orange text-white hover:bg-orange-600">
                <Phone className="h-5 w-5 mr-2" />
                Call TIGON Experts: 1-844-844-6638
              </Button>
            </a>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
}

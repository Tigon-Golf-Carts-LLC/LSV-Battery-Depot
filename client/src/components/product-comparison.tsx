import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, Phone, ShoppingCart, CheckCircle, AlertTriangle, Battery } from "lucide-react";
import { type Product } from "@shared/schema";

interface ProductComparisonProps {
  products: Product[];
  onRemoveProduct: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

export default function ProductComparison({ products, onRemoveProduct, onAddToCart }: ProductComparisonProps) {
  if (products.length === 0) {
    return (
      <Card className="p-12 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products to Compare</h3>
        <p className="text-gray-600">Add products to start comparing TIGON battery specifications.</p>
      </Card>
    );
  }

  const getSpecValue = (product: Product, specKey: string) => {
    const specs = typeof product.specifications === 'object' ? product.specifications : {};
    return specs[specKey] || 'N/A';
  };

  const formatPrice = (price: string) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Product Overview Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveProduct(product.id)}
              className="absolute top-2 right-2 p-1 h-auto"
            >
              <X className="h-4 w-4" />
            </Button>
            
            <CardContent className="p-4">
              <img 
                src="/attached_assets/TIGON BATTERIES TRANS BG (2)_1755533020429.png"
                alt={product.altText}
                className="w-full h-32 object-contain rounded mb-3 bg-gray-50"
              />
              
              <h4 className="font-semibold text-sm mb-2">{product.name}</h4>
              <Badge variant="outline" className="mb-2">{product.technology}</Badge>
              
              <div className="text-lg font-bold text-tigon-red mb-3">
                {formatPrice(product.price)}
              </div>
              
              <div className="space-y-2">
                <Button 
                  size="sm" 
                  className="w-full bg-tigon-orange text-white hover:bg-orange-600"
                  onClick={() => onAddToCart(product.id)}
                >
                  <ShoppingCart className="h-3 w-3 mr-1" />
                  Add to Cart
                </Button>
                <a href="tel:1-844-844-6638" className="block">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full border-tigon-red text-tigon-red hover:bg-tigon-red hover:text-white"
                  >
                    <Phone className="h-3 w-3 mr-1" />
                    Call Expert
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Specification Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-48">Specification</TableHead>
                  {products.map((product) => (
                    <TableHead key={product.id} className="text-center min-w-40">
                      <div className="font-semibold">{product.series}</div>
                      <div className="text-xs text-gray-500">{product.technology}</div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Price</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="text-center">
                      <span className="font-bold text-tigon-red">{formatPrice(product.price)}</span>
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Voltage</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="text-center">
                      {getSpecValue(product, 'voltage')}V
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Capacity (Ah)</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="text-center">
                      {getSpecValue(product, 'ampHours')}Ah
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Expected Lifespan</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="text-center">
                      {getSpecValue(product, 'lifespan')}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Cycle Life</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="text-center">
                      {getSpecValue(product, 'cycleLife')}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Dimensions</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="text-center text-xs">
                      {getSpecValue(product, 'dimensions')}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Weight</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="text-center">
                      {getSpecValue(product, 'weight')}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Terminal Type</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="text-center">
                      {getSpecValue(product, 'terminalType')}
                    </TableCell>
                  ))}
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">Availability</TableCell>
                  {products.map((product) => (
                    <TableCell key={product.id} className="text-center">
                      {product.inStock ? (
                        <Badge className="bg-tigon-green text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          In Stock
                        </Badge>
                      ) : (
                        <Badge variant="destructive">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Out of Stock
                        </Badge>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Technology Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Technology Features Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="space-y-3">
                <h4 className="font-semibold">{product.name}</h4>
                <div className="text-sm">
                  <Badge className="mb-2">{product.technology}</Badge>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-xs">
                        <CheckCircle className="h-3 w-3 text-tigon-green mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Compatibility */}
      <Card>
        <CardHeader>
          <CardTitle>System Compatibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="space-y-3">
                <h4 className="font-semibold text-sm">{product.series} Compatibility</h4>
                <div>
                  <h5 className="text-xs font-medium mb-1">Voltage Systems:</h5>
                  <ul className="text-xs space-y-1">
                    {product.systemCompatibility.map((config, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-tigon-green mr-2" />
                        {config}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-medium mb-1">Applications:</h5>
                  <ul className="text-xs space-y-1">
                    {product.applications.map((app, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-3 w-3 text-tigon-green mr-2" />
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Section */}
      <Card className="bg-tigon-red text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-bold mb-4">
            Need Help Choosing Between These TIGON Batteries?
          </h3>
          <p className="mb-6 text-blue-100">
            Our battery experts can help you select the best option based on your specific 
            vehicle requirements, usage patterns, and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1-844-844-6638">
              <Button size="lg" className="bg-tigon-orange text-white hover:bg-orange-600">
                <Phone className="h-5 w-5 mr-2" />
                Call TIGON Experts: 1-844-844-6638
              </Button>
            </a>
            <Button size="lg" variant="outline" className="bg-white text-tigon-red hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add All to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

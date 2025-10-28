import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, ShoppingCart, Battery } from "lucide-react";
import { type Product, safeGetSpecs } from "@shared/schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  product: Product;
  showBestSeller?: boolean;
}

export default function ProductCard({ product, showBestSeller = false }: ProductCardProps) {
  const { toast } = useToast();
  const { setItemCount } = useCart();
  const queryClient = useQueryClient();

  const { data: cartItems } = useQuery({
    queryKey: ["/api/cart"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async (productId: string) => {
      return apiRequest("POST", "/api/cart", { productId, quantity: 1 });
    },
    onSuccess: () => {
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      // Update cart count
      if (cartItems && Array.isArray(cartItems)) {
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

  const specs = safeGetSpecs(product);

  return (
    <Card className="card-hover overflow-hidden border-2 border-transparent hover:border-lsv-red flex flex-col h-full" data-testid={`card-product-${product.id}`}>
      <div className="relative bg-gray-50">
        <img 
          src="/battery-product.png" 
          alt={product.altText || product.name}
          className="w-full h-40 sm:h-44 md:h-48 object-contain p-3 sm:p-4"
        />
        {showBestSeller && (
          <Badge className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-lsv-green text-white text-xs">
            Best Seller
          </Badge>
        )}
        <Badge className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-white/90 text-gray-900 text-xs">
          {specs.voltage}V {specs.ampHours}Ah
        </Badge>
      </div>
      
      <CardContent className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 leading-snug">{product.name}</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-3">{product.technology}</p>
        
        <div className="mb-3 sm:mb-4 space-y-1">
          <div className="flex justify-between text-xs sm:text-sm text-gray-600">
            <span>Voltage:</span>
            <span className="font-medium">{specs.voltage}V</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-gray-600">
            <span>Capacity:</span>
            <span className="font-medium">{specs.ampHours}Ah</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-gray-600">
            <span>Lifespan:</span>
            <span className="font-medium">{specs.lifespan}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="text-xl sm:text-2xl font-bold text-lsv-red" data-testid={`text-price-${product.id}`}>
            {product.price === "Call for Pricing" ? (
              <span className="text-base sm:text-lg">Call for Pricing</span>
            ) : (
              `$${product.price}`
            )}
          </div>
          <Badge variant={product.inStock ? "default" : "destructive"} className="bg-lsv-green text-xs sm:text-sm">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        <div className="space-y-2 mt-auto">
          <Button 
            className="w-full bg-lsv-orange text-white hover:bg-orange-600 text-sm sm:text-base min-h-[48px] touch-manipulation"
            onClick={() => addToCartMutation.mutate(product.id)}
            disabled={!product.inStock || addToCartMutation.isPending || product.price === "Call for Pricing"}
            data-testid={`button-add-to-lsv-${product.id}`}
          >
            <ShoppingCart className="h-4 w-4 mr-2 flex-shrink-0" />
            {product.price === "Call for Pricing" ? "Call for Quote" : 
             addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
          </Button>
          <div className="flex gap-2">
            <Link href={`/product/${product.id}`} className="flex-1">
              <Button variant="outline" className="w-full px-2 sm:px-3 py-2 text-xs sm:text-sm min-h-[48px] touch-manipulation" data-testid={`button-view-details-${product.id}`}>
                View Details
              </Button>
            </Link>
            <a href="tel:1-844-888-7732" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-lsv-red text-lsv-red hover:bg-lsv-red hover:text-white px-2 sm:px-3 py-2 text-xs sm:text-sm min-h-[48px] touch-manipulation"
                data-testid={`button-call-expert-${product.id}`}
              >
                <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 text-lsv-green flex-shrink-0" />
                <span className="hidden sm:inline">Call Expert</span>
                <span className="sm:hidden">Call</span>
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, ShoppingCart, Battery } from "lucide-react";
import { type Product } from "@shared/schema";
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

  const specs = typeof product.specifications === 'object' ? product.specifications : {};

  return (
    <Card className="card-hover overflow-hidden border-2 border-transparent hover:border-tigon-red">
      <div className="relative">
        <img 
          src="/attached_assets/TIGON BATTERIES TRANS BG (2)_1755533020429.png" 
          alt={product.altText}
          className="w-full h-48 object-contain bg-gray-50" 
        />
        {showBestSeller && (
          <Badge className="absolute top-4 left-4 bg-tigon-green text-white">
            Best Seller
          </Badge>
        )}
        <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">
          {specs.voltage}V {specs.ampHours}Ah
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-3">{product.technology}</p>
        
        <div className="mb-4 space-y-1">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Voltage:</span>
            <span>{specs.voltage}V</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Capacity:</span>
            <span>{specs.ampHours}Ah</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Lifespan:</span>
            <span>{specs.lifespan}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-tigon-red">${product.price}</div>
          <Badge variant={product.inStock ? "default" : "destructive"} className="bg-tigon-green">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        <div className="space-y-2">
          <Button 
            className="w-full bg-tigon-orange text-white hover:bg-orange-600"
            onClick={() => addToCartMutation.mutate(product.id)}
            disabled={!product.inStock || addToCartMutation.isPending}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {addToCartMutation.isPending ? "Adding..." : "Add to Cart"}
          </Button>
          <div className="flex gap-2">
            <Link href={`/product/${product.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </Link>
            <a href="tel:1-844-844-6638" className="flex-1">
              <Button 
                variant="outline" 
                className="w-full border-tigon-red text-tigon-red hover:bg-tigon-red hover:text-white"
              >
                <Phone className="h-4 w-4 mr-1" />
                Call Expert
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

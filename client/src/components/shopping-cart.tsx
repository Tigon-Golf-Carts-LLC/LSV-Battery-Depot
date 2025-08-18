import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, Phone, ShoppingBag, Battery } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { type CartItemWithProduct } from "@/types";

export default function ShoppingCartComponent() {
  const { isOpen, closeCart, setItemCount } = useCart();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      return apiRequest("PUT", `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("DELETE", "/api/cart");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      setItemCount(0);
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    },
  });

  const total = cartItems.reduce((sum, item) => {
    const price = item.product ? parseFloat(item.product.price) : 0;
    return sum + (price * item.quantity);
  }, 0);

  // Update cart count when cart items change
  React.useEffect(() => {
    setItemCount(cartItems.length);
  }, [cartItems.length, setItemCount]);

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            Shopping Cart ({cartItems.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-gray-500">Loading cart...</div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some TIGON batteries to get started</p>
              <Button onClick={closeCart} className="bg-tigon-red text-white hover:bg-blue-700">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                      <img
                        src="/attached_assets/TIGON BATTERIES TRANS BG_1755534409586.png"
                        alt={item.product?.name || "Battery"}
                        className="w-16 h-16 object-contain rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.product?.name}</h4>
                        <p className="text-xs text-gray-500">{item.product?.technology}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-tigon-red">
                            ${item.product?.price}
                          </span>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantityMutation.mutate({ 
                                id: item.id, 
                                quantity: Math.max(1, item.quantity - 1) 
                              })}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantityMutation.mutate({ 
                                id: item.id, 
                                quantity: item.quantity + 1 
                              })}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeItemMutation.mutate(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-tigon-red">${total.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button className="w-full bg-tigon-orange text-white hover:bg-orange-600">
                    Request Quote
                  </Button>
                  <a href="tel:1-844-844-6638" className="block">
                    <Button variant="outline" className="w-full border-tigon-red text-tigon-red hover:bg-tigon-red hover:text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      Call for Pricing: 1-844-844-6638
                    </Button>
                  </a>
                  <Button 
                    variant="ghost" 
                    onClick={() => clearCartMutation.mutate()}
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    disabled={clearCartMutation.isPending}
                  >
                    Clear Cart
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  Call <a href="tel:1-844-844-6638" className="text-tigon-red">1-844-844-6638</a> for 
                  bulk pricing and installation services
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

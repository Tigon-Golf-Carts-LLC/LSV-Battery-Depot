import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, Mail, MapPin, Clock, CheckCircle, MessageSquare, Users, Headphones } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useDocumentHead } from "@/hooks/use-document-head";

const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  vehicleType: z.string().min(1, "Please select a vehicle type"),
  batteryNeeds: z.string().min(1, "Please describe your battery needs"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  message: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

export default function Contact() {
  // Set SEO metadata
  useDocumentHead({
    title: "Contact LSV Battery Depot Battery Experts",
    description: "Get expert guidance on Low Speed Vehicle (LSV) Batteries, NEV, MSV & Golf Cart solutions from LSV Battery Depot specialists. Our team is ready to help you choose from 96+ battery configurations. Call 1-844-888-7732.",
    ogImage: "/og/logo.png",
    ogImageWidth: 512,
    ogImageHeight: 512
  });

  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      vehicleType: "",
      batteryNeeds: "",
      quantity: 1,
      message: "",
    },
  });

  const submitQuoteMutation = useMutation({
    mutationFn: async (data: QuoteFormData) => {
      return apiRequest("POST", "/api/quote-request", data);
    },
    onSuccess: () => {
      setFormSubmitted(true);
      toast({
        title: "Quote request submitted!",
        description: "Our LSV Battery Depot battery experts will contact you within 24 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: QuoteFormData) => {
    submitQuoteMutation.mutate(data);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Our Battery Experts",
      description: "Speak directly with LSV Battery Depot battery specialists for immediate assistance",
      contact: "1-844-888-7732",
      link: "tel:1-844-888-7732",
      hours: "Monday - Friday: 8AM - 6PM EST",
      primary: true
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your detailed questions and requirements",
      contact: "experts@lsvbatterydepot.com",
      link: "mailto:experts@lsvbatterydepot.com",
      hours: "Response within 24 hours"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant answers to your LSV Battery Depot battery questions",
      contact: "Available on website",
      link: "#",
      hours: "Monday - Friday: 8AM - 6PM EST"
    }
  ];

  const supportAreas = [
    {
      icon: Headphones,
      title: "Technical Support",
      description: "Battery specifications, compatibility, and installation guidance",
      areas: ["Voltage system selection", "Technology comparison", "Installation support", "Troubleshooting"]
    },
    {
      icon: Users,
      title: "Sales Consultation",
      description: "Product recommendations and custom battery solutions",
      areas: ["Vehicle compatibility", "Bulk pricing", "Fleet solutions", "Custom configurations"]
    },
    {
      icon: CheckCircle,
      title: "Order Support",
      description: "Order tracking, shipping, and delivery coordination",
      areas: ["Order status", "Shipping tracking", "Delivery scheduling", "Returns & exchanges"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Contact LSV Battery Depot Battery Experts
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Get expert guidance on Low Speed Vehicle (LSV) Batteries, NEV, MSV & Golf Cart solutions. Our specialists 
              are here to help you choose from our complete lineup of 96+ battery configurations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:1-844-888-7732">
                <Button size="lg" className="bg-lsv-orange text-white px-8 py-4 text-lg hover:bg-orange-600">
                  <Phone className="h-5 w-5 mr-2 text-lsv-green" />
                  Call Now: 1-844-888-7732
                </Button>
              </a>
              <Button size="lg" variant="outline">
                <MessageSquare className="h-5 w-5 mr-2" />
                Request Quote Below
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Methods */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Get in Touch with LSV Battery Depot
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Card key={index} className={`text-center ${method.primary ? 'ring-2 ring-lsv-orange' : ''}`}>
                  <CardContent className="p-6">
                    {method.primary && (
                      <Badge className="mb-4 bg-lsv-orange text-white">Recommended</Badge>
                    )}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      method.primary ? 'bg-lsv-orange/10' : 'bg-lsv-red/10'
                    }`}>
                      <Icon className={`h-8 w-8 text-lsv-green`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <div className="mb-2">
                      <a 
                        href={method.link} 
                        className={`font-semibold text-lg ${
                          method.primary ? 'text-lsv-orange hover:text-orange-600' : 'text-lsv-red hover:text-blue-700'
                        }`}
                      >
                        {method.contact}
                      </a>
                    </div>
                    <p className="text-sm text-gray-500">{method.hours}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quote Request Form */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Request a Custom Battery Quote
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Fill out the form below and our LSV Battery Depot battery experts will provide you with 
                a personalized quote for your Low Speed Vehicle (LSV), NEV, MSV, or Golf Cart battery needs.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-lsv-green mr-3" />
                  <span className="text-gray-700">Expert consultation included</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-lsv-green mr-3" />
                  <span className="text-gray-700">Competitive pricing guarantee</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-lsv-green mr-3" />
                  <span className="text-gray-700">Professional installation available</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-lsv-green mr-3" />
                  <span className="text-gray-700">24-hour response guarantee</span>
                </div>
              </div>

              <Card className="mt-8 p-4 bg-lsv-red text-white">
                <h4 className="font-bold mb-2">Prefer to Talk? Call Us Now!</h4>
                <p className="text-blue-100 mb-3">
                  Or call us directly at 1-844-888-7732 for immediate assistance.
                </p>
                <a href="tel:1-844-888-7732">
                  <Button className="bg-lsv-orange text-white hover:bg-orange-600">
                    <Phone className="h-4 w-4 mr-2 text-lsv-green" />
                    Call 1-844-888-7732
                  </Button>
                </a>
              </Card>
            </div>

            <div>
              {formSubmitted ? (
                <Card className="p-8 text-center bg-lsv-green/5 border-lsv-green">
                  <CheckCircle className="h-16 w-16 text-lsv-green mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Quote Request Submitted Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for your interest in LSV Battery Depot. Our battery experts will 
                    review your requirements and contact you within 24 hours with a personalized quote.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <Clock className="h-5 w-5 text-lsv-green mr-2" />
                      <span className="text-gray-700">Expected response: Within 24 hours</span>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm text-gray-600 mb-3">Need immediate assistance?</p>
                      <a href="tel:1-844-888-7732">
                        <Button className="bg-lsv-orange text-white hover:bg-orange-600">
                          <Phone className="h-4 w-4 mr-2 text-lsv-green" />
                          Call 1-844-888-7732
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Get Your Custom Quote</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address *</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number *</FormLabel>
                                <FormControl>
                                  <Input placeholder="(555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Company name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="vehicleType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Vehicle Type *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select vehicle type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="golf-cart">Golf Cart</SelectItem>
                                    <SelectItem value="lsv">Low Speed Vehicle (LSV)</SelectItem>
                                    <SelectItem value="nev">Neighborhood Electric Vehicle (NEV)</SelectItem>
                                    <SelectItem value="msv">Medium Speed Vehicle (MSV)</SelectItem>
                                    <SelectItem value="multiple">Multiple Types</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Quantity Needed *</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    min="1" 
                                    placeholder="Number of batteries" 
                                    {...field}
                                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="batteryNeeds"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Battery Requirements *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your battery needs (voltage, technology preference, budget range, timeline, etc.)"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Information (Optional)</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Any additional details about your project or specific questions"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          className="w-full bg-lsv-orange text-white hover:bg-orange-600"
                          disabled={submitQuoteMutation.isPending}
                        >
                          {submitQuoteMutation.isPending ? "Submitting..." : "Request Quote"}
                        </Button>

                        <p className="text-center text-sm text-gray-600">
                          Or call us directly at{" "}
                          <a href="tel:1-844-888-7732" className="text-lsv-red font-semibold">
                            1-844-888-7732
                          </a>
                        </p>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Support Areas */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How Our LSV Battery Depot Battery Experts Can Help
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {supportAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="bg-lsv-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-lsv-green" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-3">{area.title}</h3>
                    <p className="text-gray-600 text-center mb-4">{area.description}</p>
                    <ul className="space-y-2">
                      {area.areas.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-lsv-green mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Business Hours & Location */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-lsv-green" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-gray-600">8:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span className="text-gray-600">9:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span className="text-gray-600">Emergency Support Only</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-lsv-green/10 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Emergency Support:</strong> For critical battery failures, 
                    call our emergency line at{" "}
                    <a href="tel:1-844-888-7732" className="text-lsv-green font-semibold">
                      1-844-888-7732
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-lsv-green" />
                  Service Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Nationwide Shipping</h4>
                    <p className="text-sm text-gray-600">
                      We ship LSV Battery Depot to all 50 states with fast, 
                      reliable delivery options.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Installation Network</h4>
                    <p className="text-sm text-gray-600">
                      Certified installers available in major metropolitan areas 
                      across the United States.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Technical Support</h4>
                    <p className="text-sm text-gray-600">
                      Remote technical support and consultation available 
                      nationwide via phone and video calls.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section>
          <Card className="p-8 text-center bg-lsv-red text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Get Started with LSV Battery Depot?
            </h3>
            <p className="text-xl mb-6 text-blue-100">
              Don't wait - our battery experts are standing by to help you choose the perfect 
              LSV Battery Depot battery solution for your Golf Cart, LSV, NEV, or MSV needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:1-844-888-7732">
                <Button size="lg" className="bg-lsv-orange text-white hover:bg-orange-600">
                  <Phone className="h-5 w-5 mr-2 text-lsv-green" />
                  Call LSV Battery Depot Experts: 1-844-888-7732
                </Button>
              </a>
              <Button size="lg" variant="outline" className="bg-white text-lsv-red hover:bg-gray-100">
                <MessageSquare className="h-5 w-5 mr-2" />
                Start Live Chat
              </Button>
            </div>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
}

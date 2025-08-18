import { type User, type InsertUser, type Product, type InsertProduct, type CartItem, type InsertCartItem, type QuoteRequest, type InsertQuoteRequest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart methods
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<boolean>;
  
  // Quote methods
  createQuoteRequest(quote: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequests(): Promise<QuoteRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private quoteRequests: Map<string, QuoteRequest>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.quoteRequests = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    // Generate complete product lineup: 96 products (6 series × 4 categories × 4 technologies)
    const voltageSeriesConfig = [
      { series: "6V-225", voltage: 6, ampHours: 225, basePrice: 168.00 },
      { series: "6V-305", voltage: 6, ampHours: 305, basePrice: 168.00 },
      { series: "8V-170", voltage: 8, ampHours: 170, basePrice: 178.00 },
      { series: "8V-225", voltage: 8, ampHours: 225, basePrice: 178.00 },
      { series: "12V-100", voltage: 12, ampHours: 100, basePrice: 265.00 },
      { series: "12V-150", voltage: 12, ampHours: 150, basePrice: 265.00 }
    ];

    const categories = [
      { name: "Golf Cart", slug: "golf-cart", description: "Golf Cart Batteries" },
      { name: "LSV", slug: "lsv", description: "Low Speed Vehicle (LSV) Batteries" },
      { name: "NEV", slug: "nev", description: "Neighborhood Electric Vehicle (NEV) Batteries" },
      { name: "MSV", slug: "msv", description: "Medium Speed Vehicle (MSV) Batteries" }
    ];

    const technologies = [
      { 
        name: "Flooded Lead-Acid", 
        slug: "flooded", 
        description: "Traditional, economical", 
        priceMultiplier: 1.0,
        lifespan: "3-5 years",
        cycleLife: "500-800 cycles"
      },
      { 
        name: "AGM", 
        slug: "agm", 
        description: "Sealed, maintenance-free", 
        priceMultiplier: 1.3,
        callForPricing: true,
        lifespan: "4-6 years",
        cycleLife: "600-1000 cycles"
      },
      { 
        name: "Gel", 
        slug: "gel", 
        description: "Deep-cycle performance", 
        priceMultiplier: 1.7,
        lifespan: "5-7 years",
        cycleLife: "800-1200 cycles"
      },
      { 
        name: "Lithium-Ion (LiFePO4)", 
        slug: "lithium", 
        description: "Premium, long-lasting", 
        priceMultiplier: 3.0,
        callForPricing: true,
        lifespan: "8-10 years",
        cycleLife: "2000-5000 cycles"
      }
    ];

    voltageSeriesConfig.forEach(voltageSeries => {
      categories.forEach(category => {
        technologies.forEach(technology => {
          const productId = `tigon-${voltageSeries.series.toLowerCase()}-${category.slug}-${technology.slug}`;
          const price = technology.callForPricing ? "Call for Pricing" : (Math.round(voltageSeries.basePrice * technology.priceMultiplier * 100) / 100).toString();
          
          const product: Product = {
            id: productId,
            name: `TIGON ${voltageSeries.series} ${category.description}`,
            series: voltageSeries.series,
            category: category.description,
            technology: technology.name,
            seoTitle: `TIGON ${voltageSeries.series} ${category.description} - ${technology.description}`,
            metaDescription: `TIGON Batteries ${voltageSeries.series} ${category.description} with ${voltageSeries.ampHours}Ah capacity. Professional ${category.description} for reliable performance. Call 1-844-844-6638`,
            specifications: {
              voltage: voltageSeries.voltage,
              ampHours: voltageSeries.ampHours,
              terminalType: "Universal",
              dimensions: `${10 + voltageSeries.voltage * 0.5} x ${7 + voltageSeries.voltage * 0.2} x ${10 + voltageSeries.voltage * 0.3} inches`,
              weight: `${50 + voltageSeries.ampHours * 0.2} lbs`,
              lifespan: technology.lifespan,
              cycleLife: technology.cycleLife
            },
            systemCompatibility: voltageSeries.voltage === 6 
              ? ["36V (6 batteries)", "48V (8 batteries)"]
              : voltageSeries.voltage === 8
              ? ["48V (6 batteries)", "72V (9 batteries)"]
              : ["12V (1 battery)", "24V (2 batteries)", "48V (4 batteries)"],
            applications: category.name === "Golf Cart" 
              ? ["Golf Carts", "Utility Vehicles", "Club Cars"]
              : category.name === "LSV"
              ? ["Low Speed Vehicles", "Neighborhood Transport", "Campus Vehicles"]
              : category.name === "NEV"
              ? ["Neighborhood Electric Vehicles", "Street Legal Vehicles", "Community Transport"]
              : ["Medium Speed Vehicles", "Enhanced Performance", "Extended Range"],
            features: [
              `Deep-cycle design for ${category.description}`,
              `${technology.description} TIGON Batteries standard`,
              `Professional ${category.description} solution`,
              `Proven TIGON Batteries reliability`
            ],
            price: price,
            inStock: true,
            images: [`tigon-${category.slug}-battery-1.jpg`, `tigon-${category.slug}-battery-2.jpg`],
            relatedProducts: [],
            focusKeywords: ["TIGON Batteries", category.description, `${voltageSeries.series} ${category.description}`],
            altText: `TIGON ${voltageSeries.series} ${category.description} - ${technology.description} by TIGON Batteries`,
            createdAt: new Date()
          };

          this.products.set(productId, product);
        });
      });
    });

    // Add additional services and products
    const additionalProducts: Product[] = [
      {
        id: "tigon-battery-installation",
        name: "Professional Battery Installation Service",
        series: "Installation",
        category: "Services",
        technology: "Professional Service",
        seoTitle: "TIGON Battery Installation Service - Expert Professional Installation",
        metaDescription: "Professional battery installation service by TIGON Batteries experts. Safe, reliable installation for all battery types. Call 1-844-844-6638",
        specifications: {
          voltage: 0,
          ampHours: 0,
          terminalType: "All Types",
          dimensions: "Service",
          weight: "N/A",
          lifespan: "N/A",
          cycleLife: "N/A"
        },
        systemCompatibility: ["All Systems"],
        applications: ["Golf Carts", "LSV", "NEV", "MSV", "All Electric Vehicles"],
        features: [
          "Professional installation by TIGON certified technicians",
          "Proper battery placement and securing",
          "Electrical connection verification", 
          "System testing and validation"
        ],
        price: "200.00",
        inStock: true,
        images: ["tigon-installation-service.jpg"],
        relatedProducts: [],
        focusKeywords: ["TIGON Battery Installation", "Professional Installation", "Battery Service"],
        altText: "TIGON Professional Battery Installation Service",
        createdAt: new Date()
      },
      {
        id: "tigon-6v-8v-core-charge",
        name: "6V/8V Battery Core Charge",
        series: "Core",
        category: "Core Charges",
        technology: "Core Exchange",
        seoTitle: "TIGON 6V 8V Battery Core Charge - Recycling Fee",
        metaDescription: "6V and 8V battery core charge for recycling old batteries. Environmental responsibility by TIGON Batteries. Call 1-844-844-6638",
        specifications: {
          voltage: 0,
          ampHours: 0,
          terminalType: "Core Exchange",
          dimensions: "Varies",
          weight: "Varies",
          lifespan: "N/A",
          cycleLife: "N/A"
        },
        systemCompatibility: ["6V Systems", "8V Systems"],
        applications: ["Golf Carts", "LSV", "NEV", "Battery Recycling"],
        features: [
          "Environmental battery recycling",
          "Core exchange program",
          "Refundable upon old battery return",
          "TIGON eco-friendly initiative"
        ],
        price: "29.00",
        inStock: true,
        images: ["tigon-core-charge.jpg"],
        relatedProducts: [],
        focusKeywords: ["TIGON Core Charge", "Battery Recycling", "6V 8V Core"],
        altText: "TIGON 6V 8V Battery Core Charge",
        createdAt: new Date()
      },
      {
        id: "tigon-12v-core-charge",
        name: "12V Battery Core Charge",
        series: "Core",
        category: "Core Charges",
        technology: "Core Exchange",
        seoTitle: "TIGON 12V Battery Core Charge - Recycling Fee",
        metaDescription: "12V battery core charge for recycling old batteries. Environmental responsibility by TIGON Batteries. Call 1-844-844-6638",
        specifications: {
          voltage: 0,
          ampHours: 0,
          terminalType: "Core Exchange",
          dimensions: "Varies",
          weight: "Varies",
          lifespan: "N/A",
          cycleLife: "N/A"
        },
        systemCompatibility: ["12V Systems"],
        applications: ["NEV", "MSV", "Golf Carts", "Battery Recycling"],
        features: [
          "Environmental battery recycling",
          "Core exchange program",
          "Refundable upon old battery return",
          "TIGON eco-friendly initiative"
        ],
        price: "57.00",
        inStock: true,
        images: ["tigon-core-charge.jpg"],
        relatedProducts: [],
        focusKeywords: ["TIGON Core Charge", "Battery Recycling", "12V Core"],
        altText: "TIGON 12V Battery Core Charge",
        createdAt: new Date()
      },
      {
        id: "tigon-battery-cable",
        name: "TIGON Battery Cable",
        series: "Accessories",
        category: "Cables & Accessories",
        technology: "Heavy-Duty Cable",
        seoTitle: "TIGON Battery Cable - Professional Grade Connection Cable",
        metaDescription: "Professional grade battery cables by TIGON Batteries. Reliable connections for all battery systems. $10 per cable. Call 1-844-844-6638",
        specifications: {
          voltage: 0,
          ampHours: 0,
          terminalType: "Universal",
          dimensions: "Various Lengths",
          weight: "Varies by length",
          lifespan: "10+ years",
          cycleLife: "N/A"
        },
        systemCompatibility: ["All Voltage Systems"],
        applications: ["Golf Carts", "LSV", "NEV", "MSV", "All Electric Vehicles"],
        features: [
          "Professional grade construction",
          "Corrosion-resistant terminals",
          "Flexible heavy-duty cable",
          "TIGON quality standard"
        ],
        price: "10.00",
        inStock: true,
        images: ["tigon-battery-cable.jpg"],
        relatedProducts: [],
        focusKeywords: ["TIGON Battery Cable", "Battery Connections", "Professional Cable"],
        altText: "TIGON Professional Battery Cable",
        createdAt: new Date()
      }
    ];

    // Add additional products to the map
    additionalProducts.forEach(product => {
      this.products.set(product.id, product);
    });

    // Update related products
    this.products.forEach((product, id) => {
      const related = Array.from(this.products.values())
        .filter(p => p.id !== id && (p.series === product.series || p.category === product.category))
        .slice(0, 4)
        .map(p => p.id);
      product.relatedProducts = related;
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.products.values()).filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.technology.toLowerCase().includes(searchTerm) ||
      product.series.toLowerCase().includes(searchTerm)
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const item: CartItem = { 
      ...insertItem, 
      id,
      createdAt: new Date()
    };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      item.quantity = quantity;
      this.cartItems.set(id, item);
      return item;
    }
    return undefined;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<boolean> {
    const items = await this.getCartItems(sessionId);
    items.forEach(item => this.cartItems.delete(item.id));
    return true;
  }

  async createQuoteRequest(insertQuote: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = randomUUID();
    const quote: QuoteRequest = { 
      ...insertQuote, 
      id,
      createdAt: new Date()
    };
    this.quoteRequests.set(id, quote);
    return quote;
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values());
  }
}

export const storage = new MemStorage();

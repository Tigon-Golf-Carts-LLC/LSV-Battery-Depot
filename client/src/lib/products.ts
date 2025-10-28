import { type Product, safeGetSpecs } from "@shared/schema";

// Product filtering and organization utilities
export class ProductCatalog {
  static getProductsByCategory(products: Product[], category: string): Product[] {
    return products.filter(product => product.category === category);
  }

  static getProductsByVoltage(products: Product[], voltage: number): Product[] {
    return products.filter(product => {
      const specs = safeGetSpecs(product);
      return specs.voltage === voltage;
    });
  }

  static getProductsByTechnology(products: Product[], technology: string): Product[] {
    return products.filter(product => product.technology === technology);
  }

  static getProductsBySeries(products: Product[], series: string): Product[] {
    return products.filter(product => product.series === series);
  }

  static searchProducts(products: Product[], query: string): Product[] {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return products;

    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.technology.toLowerCase().includes(searchTerm) ||
      product.series.toLowerCase().includes(searchTerm) ||
      product.focusKeywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      )
    );
  }

  static sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];
    
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      case "price-high":
        return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      case "voltage":
        return sorted.sort((a, b) => {
          const aVoltage = safeGetSpecs(a).voltage || 0;
          const bVoltage = safeGetSpecs(b).voltage || 0;
          return aVoltage - bVoltage;
        });
      case "capacity":
        return sorted.sort((a, b) => {
          const aCapacity = safeGetSpecs(a).ampHours || 0;
          const bCapacity = safeGetSpecs(b).ampHours || 0;
          return bCapacity - aCapacity;
        });
      case "name":
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  static getRelatedProducts(products: Product[], currentProduct: Product, limit: number = 4): Product[] {
    return products
      .filter(product => 
        product.id !== currentProduct.id && (
          product.series === currentProduct.series || 
          product.category === currentProduct.category ||
          product.technology === currentProduct.technology
        )
      )
      .slice(0, limit);
  }

  static getFeaturedProducts(products: Product[], limit: number = 4): Product[] {
    // Return products with good mix of categories and technologies
    const categories = ["Golf Cart Batteries", "Low Speed Vehicle (LSV) Batteries", "Neighborhood Electric Vehicle (NEV) Batteries", "Medium Speed Vehicle (MSV) Batteries"];
    const featured: Product[] = [];
    
    for (const category of categories) {
      const categoryProducts = this.getProductsByCategory(products, category);
      if (categoryProducts.length > 0 && featured.length < limit) {
        // Prefer lithium or AGM for featured products
        const premium = categoryProducts.find(p => p.technology.includes("Lithium") || p.technology.includes("AGM"));
        featured.push(premium || categoryProducts[0]);
      }
    }
    
    return featured.slice(0, limit);
  }

  static getUniqueValues(products: Product[]): {
    voltages: number[];
    technologies: string[];
    series: string[];
    categories: string[];
  } {
    const voltages = new Set<number>();
    const technologies = new Set<string>();
    const series = new Set<string>();
    const categories = new Set<string>();

    products.forEach(product => {
      const specs = safeGetSpecs(product);
      if (specs.voltage) voltages.add(specs.voltage);
      technologies.add(product.technology);
      series.add(product.series);
      categories.add(product.category);
    });

    return {
      voltages: Array.from(voltages).sort((a, b) => a - b),
      technologies: Array.from(technologies),
      series: Array.from(series),
      categories: Array.from(categories)
    };
  }

  static getPriceRange(products: Product[]): { min: number; max: number } {
    const prices = products.map(p => parseFloat(p.price)).filter(p => !isNaN(p));
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }

  static filterByPriceRange(products: Product[], minPrice: number, maxPrice: number): Product[] {
    return products.filter(product => {
      const price = parseFloat(product.price);
      return price >= minPrice && price <= maxPrice;
    });
  }

  static getProductStatistics(products: Product[]): {
    totalProducts: number;
    byCategory: Record<string, number>;
    byTechnology: Record<string, number>;
    byVoltage: Record<string, number>;
    averagePrice: number;
    inStockCount: number;
  } {
    const stats = {
      totalProducts: products.length,
      byCategory: {} as Record<string, number>,
      byTechnology: {} as Record<string, number>,
      byVoltage: {} as Record<string, number>,
      averagePrice: 0,
      inStockCount: 0
    };

    let totalPrice = 0;

    products.forEach(product => {
      // Count by category
      stats.byCategory[product.category] = (stats.byCategory[product.category] || 0) + 1;
      
      // Count by technology
      stats.byTechnology[product.technology] = (stats.byTechnology[product.technology] || 0) + 1;
      
      // Count by voltage
      const specs = typeof product.specifications === 'object' ? product.specifications : {};
      const voltage = `${specs.voltage}V`;
      stats.byVoltage[voltage] = (stats.byVoltage[voltage] || 0) + 1;
      
      // Price calculation
      const price = parseFloat(product.price);
      if (!isNaN(price)) {
        totalPrice += price;
      }
      
      // In stock count
      if (product.inStock) {
        stats.inStockCount++;
      }
    });

    stats.averagePrice = totalPrice / products.length;

    return stats;
  }

  static formatProductUrl(product: Product): string {
    return `/product/${product.id}`;
  }

  static formatCategoryUrl(category: string): string {
    const categoryMap: Record<string, string> = {
      "Golf Cart Batteries": "golf-cart",
      "Low Speed Vehicle (LSV) Batteries": "lsv",
      "Neighborhood Electric Vehicle (NEV) Batteries": "nev",
      "Medium Speed Vehicle (MSV) Batteries": "msv"
    };
    
    return `/products/${categoryMap[category] || category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
  }

  static getProductSpecs(product: Product): {
    voltage: number | string;
    ampHours: number | string;
    lifespan: string;
    cycleLife: string;
    dimensions: string;
    weight: string;
    terminalType: string;
  } {
    const specs = typeof product.specifications === 'object' ? product.specifications : {};
    
    return {
      voltage: specs.voltage || 'N/A',
      ampHours: specs.ampHours || 'N/A',
      lifespan: specs.lifespan || 'N/A',
      cycleLife: specs.cycleLife || 'N/A',
      dimensions: specs.dimensions || 'N/A',
      weight: specs.weight || 'N/A',
      terminalType: specs.terminalType || 'Universal'
    };
  }

  static generateSEOData(product: Product): {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl: string;
  } {
    return {
      title: product.seoTitle,
      description: product.metaDescription,
      keywords: product.focusKeywords,
      canonicalUrl: this.formatProductUrl(product)
    };
  }

  static recommendProducts(products: Product[], criteria: {
    vehicleType?: string;
    voltageSystem?: string;
    usage?: string;
    budget?: string;
  }): Product[] {
    let filtered = products;

    // Filter by vehicle type
    if (criteria.vehicleType) {
      const categoryMap: Record<string, string> = {
        "golf-cart": "Golf Cart Batteries",
        "lsv": "Low Speed Vehicle (LSV) Batteries",
        "nev": "Neighborhood Electric Vehicle (NEV) Batteries",
        "msv": "Medium Speed Vehicle (MSV) Batteries"
      };
      
      const targetCategory = categoryMap[criteria.vehicleType];
      if (targetCategory) {
        filtered = this.getProductsByCategory(filtered, targetCategory);
      }
    }

    // Filter by voltage system
    if (criteria.voltageSystem && criteria.voltageSystem !== "not-sure") {
      const voltageMap: Record<string, number[]> = {
        "36v": [6],
        "48v": [6, 8],
        "72v": [12]
      };
      
      const allowedVoltages = voltageMap[criteria.voltageSystem];
      if (allowedVoltages) {
        filtered = filtered.filter(product => {
          const specs = typeof product.specifications === 'object' ? product.specifications : {};
          return allowedVoltages.includes(specs.voltage);
        });
      }
    }

    // Filter by budget preference
    if (criteria.budget) {
      if (criteria.budget === "economy") {
        filtered = filtered.filter(product => product.technology.includes("Flooded"));
      } else if (criteria.budget === "professional") {
        filtered = filtered.filter(product => product.technology.includes("Lithium"));
      }
    }

    // Sort by relevance
    return filtered.sort((a, b) => {
      let scoreA = 0, scoreB = 0;

      // Boost lithium for professional use
      if (criteria.budget === "professional") {
        if (a.technology.includes("Lithium")) scoreA += 10;
        if (b.technology.includes("Lithium")) scoreB += 10;
      }

      // Boost flooded for economy
      if (criteria.budget === "economy") {
        if (a.technology.includes("Flooded")) scoreA += 10;
        if (b.technology.includes("Flooded")) scoreB += 10;
      }

      // Boost AGM/Gel for heavy use
      if (criteria.usage === "heavy") {
        if (a.technology.includes("AGM") || a.technology.includes("Gel")) scoreA += 5;
        if (b.technology.includes("AGM") || b.technology.includes("Gel")) scoreB += 5;
      }

      return scoreB - scoreA;
    });
  }
}

// Utility functions for common product operations
export const ProductUtils = {
  formatPrice: (price: string | number): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return `$${numPrice.toFixed(2)}`;
  },

  getPriceForQuantity: (price: string, quantity: number): number => {
    return parseFloat(price) * quantity;
  },

  isProductInStock: (product: Product): boolean => {
    return product.inStock;
  },

  getProductImageUrl: (product: Product, index: number = 0): string => {
    // Since we're using placeholder images, return a consistent URL
    return "";
  },

  generateProductId: (series: string, category: string, technology: string): string => {
    const categorySlug = category.toLowerCase()
      .replace(/[()]/g, '')
      .replace(/\s+/g, '-')
      .replace('golf-cart-batteries', 'golf-cart')
      .replace('low-speed-vehicle-lsv-batteries', 'lsv')
      .replace('neighborhood-electric-vehicle-nev-batteries', 'nev')
      .replace('medium-speed-vehicle-msv-batteries', 'msv');
    
    const techSlug = technology.toLowerCase()
      .replace(/[()]/g, '')
      .replace(/\s+/g, '-')
      .replace('flooded-lead-acid', 'flooded')
      .replace('lithium-ion-lifepo4', 'lithium');
    
    return `lsv-battery-depot-${series.toLowerCase()}-${categorySlug}-${techSlug}`;
  },

  extractVoltageFromSpecs: (product: Product): number => {
    const specs = typeof product.specifications === 'object' ? product.specifications : {};
    return specs.voltage || 0;
  },

  extractCapacityFromSpecs: (product: Product): number => {
    const specs = typeof product.specifications === 'object' ? product.specifications : {};
    return specs.ampHours || 0;
  },

  isCompatibleWithVoltageSystem: (product: Product, systemVoltage: string): boolean => {
    return product.systemCompatibility.some(config => 
      config.toLowerCase().includes(systemVoltage.toLowerCase())
    );
  },

  getTechnologyBenefits: (technology: string): string[] => {
    const benefits: Record<string, string[]> = {
      "Flooded Lead-Acid": [
        "Lowest upfront cost",
        "Proven reliability",
        "Recyclable",
        "Wide availability"
      ],
      "AGM": [
        "Maintenance-free",
        "Spill-proof design",
        "Better deep-cycle performance",
        "Faster charging"
      ],
      "Gel": [
        "Excellent deep-cycle capability",
        "Temperature tolerant",
        "Long service life",
        "No maintenance required"
      ],
      "Lithium-Ion (LiFePO4)": [
        "Longest lifespan",
        "Lightweight design",
        "Fast charging capability",
        "Consistent power delivery"
      ]
    };

    return benefits[technology] || [];
  }
};

// Constants for product catalog
export const PRODUCT_CONSTANTS = {
  CATEGORIES: [
    "Golf Cart Batteries",
    "Low Speed Vehicle (LSV) Batteries", 
    "Neighborhood Electric Vehicle (NEV) Batteries",
    "Medium Speed Vehicle (MSV) Batteries"
  ],
  
  TECHNOLOGIES: [
    "Flooded Lead-Acid",
    "AGM", 
    "Gel",
    "Lithium-Ion (LiFePO4)"
  ],
  
  VOLTAGE_SERIES: [
    { series: "6V-225", voltage: 6, ampHours: 225 },
    { series: "6V-305", voltage: 6, ampHours: 305 },
    { series: "8V-170", voltage: 8, ampHours: 170 },
    { series: "8V-225", voltage: 8, ampHours: 225 },
    { series: "12V-100", voltage: 12, ampHours: 100 },
    { series: "12V-150", voltage: 12, ampHours: 150 }
  ],

  PHONE_NUMBER: "1-844-888-7732",
  
  SEO_KEYWORDS: [
    "LSV Battery Depot",
    "Low Speed Vehicle Battery Depot",
    "Golf Cart Batteries", 
    "LSV Batteries",
    "NEV Batteries",
    "MSV Batteries"
  ]
};

export default ProductCatalog;

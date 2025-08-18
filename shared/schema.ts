import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const products = pgTable("products", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  series: text("series").notNull(), // 6V-225, 8V-170, etc.
  category: text("category").notNull(), // Golf Cart, LSV, NEV, MSV
  technology: text("technology").notNull(), // Flooded, AGM, Gel, Lithium
  seoTitle: text("seo_title").notNull(),
  metaDescription: text("meta_description").notNull(),
  specifications: jsonb("specifications").notNull(), // voltage, ampHours, etc.
  systemCompatibility: text("system_compatibility").array().notNull(),
  applications: text("applications").array().notNull(),
  features: text("features").array().notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  inStock: boolean("in_stock").notNull().default(true),
  images: text("images").array().notNull(),
  relatedProducts: text("related_products").array().notNull(),
  focusKeywords: text("focus_keywords").array().notNull(),
  altText: text("alt_text").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  productId: varchar("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  vehicleType: text("vehicle_type").notNull(),
  batteryNeeds: text("battery_needs").notNull(),
  quantity: integer("quantity").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
  createdAt: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  createdAt: true,
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;

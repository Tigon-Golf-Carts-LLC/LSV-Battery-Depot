# Overview

TIGON Batteries is a professional e-commerce website specializing in electric vehicle batteries across four main categories: Golf Cart Batteries (primary focus), Low Speed Vehicles (LSV), Neighborhood Electric Vehicle (NEV), and Medium Speed Vehicle (MSV) batteries. The application features a comprehensive product catalog with 96+ battery configurations across different voltage systems (6V, 8V, 12V) and technologies (Flooded, AGM, Gel, Lithium), along with educational content, battery selection tools, and quote request functionality.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The application uses a **React with TypeScript** frontend built with Vite as the build tool. The UI framework leverages **shadcn/ui** components with **Tailwind CSS** for styling, implementing a modern design system with custom color schemes for the TIGON brand. The application follows a **single-page application (SPA)** pattern using Wouter for client-side routing.

Key architectural decisions:
- **Component-based architecture** with reusable UI components in the `/components` directory
- **Custom hooks** for state management (cart, mobile detection, toast notifications)
- **TanStack Query** for server state management and caching
- **Zustand** for client-side state persistence (shopping cart)
- **React Hook Form** with Zod validation for form handling

## Backend Architecture
The backend uses **Express.js** with TypeScript in an ESM configuration. The server implements a **RESTful API** pattern with routes organized in `/server/routes.ts`. The application uses an **in-memory storage system** (`MemStorage`) that implements the `IStorage` interface, allowing for easy migration to a database-backed solution later.

API endpoints include:
- Product management (`/api/products`)
- Shopping cart functionality (`/api/cart`)
- Quote request handling (`/api/quotes`)

## Data Storage Solutions
Currently implements **in-memory storage** with a well-defined interface pattern. The system is designed with **Drizzle ORM** configuration for PostgreSQL migration, with schema definitions in `/shared/schema.ts`. The database schema supports:
- User management with session-based authentication
- Product catalog with comprehensive metadata and SEO fields
- Shopping cart with session tracking
- Quote requests with customer information

## Authentication and Authorization
The application uses **session-based authentication** with Express sessions. Session management is configured for PostgreSQL storage using `connect-pg-simple`, though currently operating with in-memory sessions.

## Development and Build System
- **Vite** for development server and build optimization
- **TypeScript** with strict configuration across client, server, and shared code
- **Path aliases** for clean imports (`@/` for client, `@shared/` for shared code)
- **Hot module replacement** in development with error overlay
- **esbuild** for production server bundling

# External Dependencies

## Database
- **Neon Database** (@neondatabase/serverless) - Serverless PostgreSQL solution
- **Drizzle ORM** with PostgreSQL dialect for database operations
- **connect-pg-simple** for PostgreSQL session storage

## UI and Styling
- **Radix UI** components for accessible, unstyled UI primitives
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Embla Carousel** for image carousels and product showcases
- **Lucide React** for consistent iconography

## State Management and Data Fetching
- **TanStack React Query** for server state management and caching
- **Zustand** with persistence for client-side state management
- **React Hook Form** with **@hookform/resolvers** for form validation

## Form Validation
- **Zod** for runtime type validation and schema definition
- **drizzle-zod** for automatic schema generation from Drizzle schemas

## Development Tools
- **Replit-specific plugins** for development environment integration
- **Font Awesome** and **Google Fonts (Inter)** for typography and icons
- **PostCSS** with **Autoprefixer** for CSS processing

## Utilities
- **class-variance-authority** for component variant management
- **clsx** and **tailwind-merge** for conditional CSS classes
- **date-fns** for date manipulation and formatting
- **nanoid** for unique ID generation
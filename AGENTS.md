# Contributor Guide

## Dev Environment Tips
- Use pnpm dlx turbo run where <project_name> to jump to a package instead of scanning with ls.
- Run pnpm install --filter <project_name> to add the package to your workspace so Vite, ESLint, and TypeScript can see it.
- Use pnpm create vite@latest <project_name> -- --template react-ts to spin up a new React + Vite package with TypeScript checks ready.
- Check the name field inside each package's package.json to confirm the right name—skip the top-level one.

## Testing Instructions
- Find the CI plan in the .github/workflows folder.
- Run pnpm turbo run test --filter <project_name> to run every check defined for that package.
- From the package root you can just call pnpm test. The commit should pass all tests before you merge.
- To focus on one step, add the Vitest pattern: pnpm vitest run -t "<test name>".
- Fix any test or type errors until the whole suite is green.
- After moving files or changing imports, run pnpm lint --filter <project_name> to be sure ESLint and TypeScript rules still pass.
- Add or update tests for the code you change, even if nobody asked.

## PR instructions
Title format: [Social-Media-Content-Creator-and-Media-Display] <Title>

Complete Project Plan History
Plan – 2025-06-14 15:13
Overall Project Status
Significant progress has been made on the backend content generation service. The service can now produce enhanced, platform-specific content for Facebook, Instagram, and X (Twitter), dynamically detecting and incorporating 360° media. The Prisma database client has been configured for write access to allow for post-tracking updates. The immediate focus is to complete the content templates for the remaining platforms and integrate the entire service into a dedicated API endpoint before beginning frontend dashboard development.

Completed Tasks
Backend
 Set up project structure and repository.
 Implemented Prisma client and connected to Neon PostgreSQL.
 Configured backend to use writable DATABASE_URL and removed read-only middleware to allow for updates to specific fields.
 Built and enhanced Content Generation Engine (contentGenerator.ts) for Facebook, Instagram, and X, with dynamic 360° media detection.
 Set up API endpoints for:
 List vehicles (GET /api/vehicles)
 Get vehicle by ID (GET /api/vehicles/:id)
 Generate content (POST /api/content/generate)
 Generate email content (POST /api/content/email)
 Updated backend .env to use READ_ONLY_DATABASE_URL.
 Refactored Prisma client initialization into src/lib/prismaClient.ts using read-only credentials.
 Added read-only middleware to block write operations.
 Configured database connection with read-only credentials.
 Built Content Generation Engine (basic functionality).
Frontend
 Initialized React project (Vite + TypeScript).
 Installed and configured frontend dependencies (React Router, React Query, etc.).
 Set up project structure and environment variables.
 Created base pages (ShowroomPage, DashboardPage, NotFoundPage) and set up React Router.
 Implemented VehicleListPage (GET /api/vehicles).
 Implemented VehicleDetailPage (GET /api/vehicles/:id).
 Implemented content preview functionality.
 Added copy-to-clipboard functionality.
 Implemented export functionality (Text, Markdown, HTML).
 Created and integrated ErrorBoundary component for robust error handling.
 Created and integrated LoadingSpinner component for Suspense fallbacks.
 Refined loading states with skeleton loaders:
 VehicleCardSkeleton for VehicleListPage.
 VehicleDetailSkeleton for VehicleDetailPage.
 Created and integrated Panorama360Viewer component for interactive 360° vehicle images.
 Defined TypeScript types (Vehicle, VehicleContent, VehicleStatus) in src/types/Vehicle.ts.
 Replaced any type usage with specific types in VehicleListPage and VehicleDetailPage.
 Resolved various linting and TypeScript errors, including hook placement and enum syntax.
Next Essential Steps
Backend: Finalize Content Generation
 Enhance YouTube Shorts Script: Flesh out the generateYouTubeShortsScript function with more detailed, scene-by-scene prompts.
 Enhance Email Content: Improve the generateEmail function with templates for different scenarios (e.g., new arrival, manager's special).
 Implement Content Generation API Endpoint: Create a new endpoint (e.g., POST /api/vehicles/:id/generate-all-content) that utilizes the contentGenerator service.
 Enable Post Tracking Updates: The new API endpoint should be capable of updating post-tracking fields (lastFacebookPostDate, facebookPostId, etc.) in the database upon content generation.
Frontend: Dashboard & Content Management
 Build Inventory Dashboard: Begin creating the inventory management page (DashboardPage.tsx) to list vehicles.
 Integrate Content API: Fetch and display the generated content for a selected vehicle using the new API endpoint.
 Add Content Actions: Implement UI buttons for "Regenerate Content", "Copy to Clipboard", etc.
Future Enhancements & Other Pending Tasks
Frontend
 Responsive Design: Fully optimize the application for various mobile devices and screen sizes.
 Unit Tests: Implement unit tests for critical components and utility functions.
 End-to-End Tests: Create end-to-end tests for key user flows.
Documentation
 Create User Guide: Develop a guide for end-users on how to use the application's features.
 Add Extensive Code Comments: Further improve code clarity with more detailed comments throughout the codebase.
Testing
 Test Responsive Design: Conduct thorough testing on different devices and browsers once responsive design is implemented.

## Module 1: Finalize Backend Content Generation

### Backend (Node.js/Express with Prisma)
-   **Content Generation Logic Service (`contentGenerator.ts`):**
    -   [ ] **Enhance YouTube Shorts Script:** Flesh out the `generateYouTubeShortsScript` function with more detailed, scene-by-scene prompts.
    -   [ ] **Enhance Email Content:** Improve the `generateEmail` function with templates for different scenarios (e.g., new arrival, manager's special).
-   **API Endpoint for Content Generation & Post Tracking Updates:**
    -   [ ] **Implement Content Generation API Endpoint:** Create a new endpoint (e.g., `POST /api/vehicles/:id/generate-all-content`) that utilizes the `contentGenerator` service.
    -   [ ] **Enable Post Tracking Updates:** The new API endpoint should be capable of updating post-tracking fields (`lastFacebookPostDate`, `facebookPostId`, etc.) in the database upon content generation.

## Module 2: Frontend Dashboard & Content Management

### Frontend (React with TypeScript)
-   **Inventory Dashboard (`DashboardPage.tsx`):**
    -   [ ] Build the basic layout for the inventory management page.
    -   [ ] Fetch and display the list of vehicles from the backend.
-   **Content Integration:**
    -   [ ] Integrate the new content generation API endpoint.
    -   [ ] On the `VehicleDetailPage`, add a button to trigger content generation for all platforms.
    -   [ ] Display the generated content in their respective sections.
-   **Content Actions:**
    -   [ ] Implement UI buttons for "Regenerate Content" and "Copy to Clipboard" for the newly generated content.

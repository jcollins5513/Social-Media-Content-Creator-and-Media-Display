# Granular Plan - 2025-06-14 (Revised)

## Module 1: Enhanced Content Generation Engine

### Backend (Node.js/Express with Prisma)
- [ ] **Vehicle Data Integration (Using Existing Schema):**
    - [ ] Confirm Prisma `Vehicle` model (current, fixed schema) provides necessary fields: `year` (Int), `make` (String), `model` (String), `price` (Int), `features` (String[]), `images` (String[]), `vin` (String @unique), `status` (VehicleStatus), `description` (String), `mileage` (Int), `color` (String), `engine` (String?), `transmission` (String?), `lastFacebookPostDate` (DateTime?), `lastMarketplacePostDate` (DateTime?), `facebookPostId` (String?).
    - [ ] Ensure API endpoint (e.g., `GET /api/vehicles/:id`) fetches all necessary vehicle details for content generation.
- [x] **Content Generation Logic Service:**
    - [x] Create a new service/module (e.g., `contentGenerator.ts`) for platform-specific content generation.
    - [x] **Facebook Content:**
        - [x] Implement function to generate bold, emoji-rich posts with dealership flair and relevant hashtags.
    - [x] **Instagram Content:**
        - [x] Implement function for short, high-engagement captions with CTA, tags, and emojis.
    - [x] **X (Twitter) Content:**
        - [x] Implement function for catchy one-liners with smart hashtags and emoji use.
    - [ ] **YouTube Shorts Script:**
        - [ ] Implement function to generate video script prompts based on vehicle highlights and emotional selling points.
    - [ ] **Email Content:**
        - [ ] Implement function for subject line, preheader, and branded email body (HTML/text).
- [x] **360° Image Detection (Dynamic):**
    - [x] Implement a utility function (e.g., `is360Image(filename: string): boolean`) to detect 360° images in `vehicle.images[]` based on filename patterns (e.g., "360", "pano", "sphere").
- [x] **360° Content Augmentation (Dynamic):**
    - [x] In the content generation service, if 360° media is detected for a vehicle, append phrases like "Take a spin inside with a 360° interior view!" or "See every angle with our immersive tour." to relevant platform content.
    - [x] Add `has360Media: true` flag dynamically to the generated content output object for the vehicle. This flag is NOT stored in the database.
- [ ] **API Endpoint for Content Generation & Post Tracking Updates:**
    - [ ] Enhance existing `POST /api/content/generate` (or create `POST /api/vehicles/:id/generate-all-content`) to accept a vehicle ID.
    - [ ] Endpoint should fetch vehicle data, use the content generation service, and return structured content for all platforms, including the dynamic `has360Media` flag.
    - [ ] Upon successful content generation/use for a platform, this endpoint (or a subsequent call triggered by the frontend) will update `lastFacebookPostDate`, `lastMarketplacePostDate`, and/or `facebookPostId` on the `Vehicle` record in the database.

## Module 2: Firestick/Showroom Display Mode

### Frontend (React with TypeScript) - `ShowroomPage.tsx`
- [ ] **Data Fetching:**
    - [ ] Fetch all vehicle data for slideshow mode.
    - [ ] Fetch single vehicle data for highlight mode.
- [ ] **Layout & Styling:**
    - [ ] Implement a fullscreen, visually appealing layout suitable for large screens (TVs).
    - [ ] Ensure clean, branded visuals.
- [ ] **Display Modes Logic:**
    - [ ] **Highlight Mode:**
        - [ ] Component to display one vehicle at a time.
        - [ ] Show AI-generated content (captions, highlights, price) prominently.
    - [ ] **Slideshow Mode:**
        - [ ] Component to cycle through all (or a selection of) vehicles.
        - [ ] Display AI-generated content for each vehicle.
        - [ ] Implement autoplay with configurable transition timing.
- [ ] **Media Rendering:**
    - [ ] **Standard Photos:**
        - [ ] Use a responsive gallery/carousel component for standard images.
    - [ ] **360° Image Display:**
        - [ ] Integrate/enhance `Panorama360Viewer` component.
        - [ ] Detect 360° images (client-side filename check on `vehicle.images[]` or using dynamic `has360Media` flag from API if content is fetched).
        - [ ] If in an interactive context, allow users to toggle between 360° and regular views. For pure autoplay, prioritize showcasing the 360 view if available.
    - [ ] **Video Content:**
        - [ ] If video URLs are present, implement autoplaying video display.
- [ ] **Navigation/Controls (Minimal for TV):**
    - [ ] Consider simple controls if any (e.g., pause/play for slideshow, next/prev if manually controlled). Arrow key navigation for desktop.

## Module 3: Dashboard + Inventory Management (Personal Use)

### Backend (Node.js/Express with Prisma)
- [ ] **API Endpoints (Supporting Writable Fields):**
    - [x] **NOTE:** Confirmed backend Prisma client now uses credentials allowing write access for updating specified fields (`lastFacebookPostDate`, `lastMarketplacePostDate`, `facebookPostId`).
    - [ ] `GET /api/vehicles`:
        - [ ] Add query parameters for filtering (VIN, status, keyword) and sorting.
    - [ ] `PUT /api/vehicles/:id/update-post-info` (or integrate into content generation endpoint):
        - [ ] Endpoint to update `lastFacebookPostDate`, `lastMarketplacePostDate`, `facebookPostId`.
    - [ ] (Add/Edit/Delete of entire vehicle records is out of scope for this module as per schema constraints; data is sourced from scrape).

### Frontend (React with TypeScript)
- [ ] **Inventory Table View (`DashboardPage.tsx` or new `InventoryManagementPage.tsx`):**
    - [ ] Fetch vehicles using the `GET /api/vehicles` endpoint.
    - [ ] Display in a table: make, model, year, price, status, `lastFacebookPostDate`, `lastMarketplacePostDate`.
    - [ ] Implement UI for filtering/searching.
    - [ ] Display icon/indicator for vehicles with 360° media (based on client-side image name check or dynamic flag from content).
    - [ ] Link to `VehicleDetailPage` for each vehicle.
- [ ] **Vehicle Detail Page (`VehicleDetailPage.tsx` Enhancements):**
    - [ ] Display all relevant `Vehicle` fields from the existing schema.
    - [ ] **Image Gallery:**
        - [ ] Enhance to robustly show standard images and integrate `Panorama360Viewer` if 360 images are detected.
    - [ ] **AI-Generated Content Section:**
        - [ ] Fetch/display content previews for Facebook, Instagram, X, YouTube, Email.
        - [ ] "Regenerate Content" button (calls backend, which can also update post dates).
        - [ ] "Copy to Clipboard" for each content piece.
        - [ ] "Export" or "View".
- [ ] **Add/Edit Vehicle Form (Simplified for Post Tracking):**
    - [ ] UI elements on the Vehicle Detail Page or a simple modal to manually update `lastFacebookPostDate`, `lastMarketplacePostDate`, `facebookPostId` if needed, separate from automatic updates via content generation. (Core vehicle data is not editable here).
- [ ] **State Management:**
    - [ ] Use React Query for server state.

## General Tasks & Workflow
- [ ] **Project Setup Review:**
    - [ ] Confirm backend `DATABASE_URL` in `.env` allows write operations for updating existing vehicle fields.
- [ ] **Logging:**
    - [ ] Create/Update `.CHANGELOG.md` for significant changes.
    - [ ] Create/Update `.FEATURE_LOG.md` for new features.
    - [ ] Create/Update `.BUG_FIX_LOG.md` if fixes are made.
    - [ ] Create/Update `.NEW_PACKAGE_LOG.md` if new dependencies are added.
- [ ] **Planning & Memory:**
    - [x] This `granular-plan.md` is created and revised.
    - [x] Commit revised `granular-plan.md` to memory.
    - [x] Commit `complete-plan.md` to memory.
    - [ ] Update `complete-plan.md` with high-level objectives from this revised granular plan.

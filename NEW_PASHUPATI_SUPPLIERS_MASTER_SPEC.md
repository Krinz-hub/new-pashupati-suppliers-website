# NEW PASHUPATI SUPPLIERS

## Complete Business Website Master Specification

**Project type:** Modern responsive business website\
**Current phase:** Business showcase, product discovery, wholesale
inquiries, portfolio and contact\
**Future phase:** Full e-commerce platform\
**Framework:** React + TypeScript + Vite + Tailwind CSS\
**Routing:** React Router\
**Icons:** Lucide React\
**Primary integration:** Existing Google Apps Script contact endpoint

------------------------------------------------------------------------

# 1. PROJECT OBJECTIVE

Build a polished, trustworthy, modern, production-quality website for
**New Pashupati Suppliers**, a wholesale and retail supplier based in
Nepal.

The website must represent a real, established physical business. It
should communicate:

-   A wide range of products
-   Wholesale and bulk supply capability
-   Trust and reliability
-   Physical store presence
-   Easy ways to contact the business
-   A professional foundation that can later expand into e-commerce

The first version is **NOT an online shopping store**. Do not build
cart, checkout, payment, authentication, or order management yet.

Instead, the current website should focus on:

1.  Brand awareness
2.  Business credibility
3.  Product category discovery
4.  Product showcase
5.  Wholesale lead generation
6.  Store portfolio/gallery
7.  Customer inquiries
8.  Contact conversion

Every architectural decision should make it easy to add e-commerce later
without redesigning the application.

------------------------------------------------------------------------

# 2. BUSINESS INFORMATION

## Business Name

**New Pashupati Suppliers**

## Brand Positioning

A trusted supplier of household, kitchen, plastic, electrical, cleaning,
storage and general utility products for:

-   Individual customers
-   Homes
-   Retail shops
-   Resellers
-   Local businesses
-   Offices
-   Institutions
-   Bulk buyers

## Primary Location

Kathmandu, Nepal

Use placeholders for any exact address, phone number, email address, map
URL, social links, or business hours that have not yet been finalized.

All business information must be centralized in one file so it can be
updated easily.

Create:

`src/config/business.ts`

Example:

``` ts
export const BUSINESS = {
  name: "New Pashupati Suppliers",
  tagline: "Your Trusted Supply Partner",
  location: "Kathmandu, Nepal",
  phone: "01-XXXXXXX",
  email: "your-email@example.com",
  address: "Kathmandu, Nepal",
  hours: {
    weekdays: "9:00 AM – 6:00 PM",
    saturday: "9:00 AM – 6:00 PM",
    sunday: "Closed",
  },
  social: {
    facebook: "#",
    instagram: "#",
    whatsapp: "#",
  },
};
```

Do not duplicate business contact details throughout the application.

------------------------------------------------------------------------

# 3. CORE BRAND IDENTITY

## Brand Personality

The visual identity must feel:

-   Reliable
-   Established
-   Organized
-   Professional
-   Friendly
-   Practical
-   Modern
-   Trustworthy

It must **not** feel:

-   Overly luxurious
-   Overly corporate
-   Generic SaaS
-   Childish
-   Like a cryptocurrency website
-   Like an AI-generated template
-   Like an unfinished dashboard

## Brand Colors

Use these as the base design tokens.

``` ts
export const colors = {
  navy: "#0B1F3A",
  navyDark: "#07182D",
  navyLight: "#132B4D",

  red: "#F23822",
  orange: "#FF5533",
  redHover: "#D92A18",

  white: "#FFFFFF",
  background: "#F7F8FA",
  surface: "#FFFFFF",

  text: "#172033",
  muted: "#667085",
  subtle: "#98A2B3",

  border: "#E5E7EB",
  borderStrong: "#D0D5DD",

  success: "#16A34A",
  successLight: "#DCFCE7",

  error: "#DC2626",
  errorLight: "#FEE2E2",
};
```

## Color Usage

-   Navy: navigation, headings, footer, dark CTA sections
-   Red/orange: primary CTA buttons, active states, small highlights
-   White: cards and primary surfaces
-   Light gray: section backgrounds
-   Dark text: headings and body hierarchy
-   Green: success states only

Do not use random additional brand colors.

------------------------------------------------------------------------

# 4. TYPOGRAPHY

Use a clean modern sans-serif font suitable for both English and future
multilingual content.

Recommended:

-   Inter
-   Manrope
-   Plus Jakarta Sans

Preferred hierarchy:

``` text
Hero heading:        56–72px desktop
Page heading:        44–56px desktop
Section heading:     32–42px desktop
Card heading:        18–22px
Body large:          18px
Body normal:         16px
Small/meta text:     13–14px
```

Mobile:

``` text
Hero heading:        38–48px
Page heading:        34–42px
Section heading:     28–34px
Body:                15–17px
```

Typography rules:

-   Strong visual hierarchy
-   Comfortable line height
-   Avoid excessively bold body copy
-   Do not use too many font weights
-   Keep paragraphs readable
-   Use uppercase only for small eyebrow labels or navigation where
    appropriate

------------------------------------------------------------------------

# 5. DESIGN SYSTEM

Create reusable primitives.

## Container

Create a `Container` component.

Desktop maximum width:

`1280px`

Recommended horizontal padding:

``` text
Mobile: 20px
Tablet: 32px
Desktop: 48px
Large desktop: 64px where appropriate
```

## Section Spacing

Recommended:

``` text
Desktop top/bottom: 96px – 128px
Tablet: 72px – 96px
Mobile: 56px – 72px
```

Avoid making every section identical in spacing if visual hierarchy
benefits from variation.

## Border Radius

Use restrained rounding.

``` text
Buttons: 8px – 12px
Cards: 14px – 18px
Images: 16px – 24px
```

Do not turn every element into a pill.

## Shadows

Use subtle shadows only.

Cards should primarily rely on:

-   Borders
-   Background contrast
-   Very soft shadow on hover

Do not use heavy floating shadows everywhere.

------------------------------------------------------------------------

# 6. REQUIRED TECHNOLOGY

Use:

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   React Router
-   Lucide React

Optional only if genuinely useful:

-   Framer Motion for subtle animation
-   React Hook Form for form handling
-   Zod for form validation

Avoid unnecessary dependencies.

------------------------------------------------------------------------

# 7. PROJECT ARCHITECTURE

Use the following scalable structure:

``` text
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx
│
├── assets/
│
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── SectionHeading.tsx
│   │   ├── ImageWithFallback.tsx
│   │   ├── PageHero.tsx
│   │   ├── EmptyImage.tsx
│   │   └── LoadingState.tsx
│   │
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Footer.tsx
│   │   └── ScrollToTop.tsx
│   │
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── ValueStrip.tsx
│   │   ├── AboutPreview.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── WholesaleCTA.tsx
│   │   ├── PortfolioPreview.tsx
│   │   └── FinalCTA.tsx
│   │
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── ProductInquiryButton.tsx
│   │
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   ├── ContactInfo.tsx
│   │   └── FormStatus.tsx
│   │
│   └── portfolio/
│       ├── GalleryGrid.tsx
│       ├── GalleryFilter.tsx
│       └── Lightbox.tsx
│
├── config/
│   ├── business.ts
│   └── contact.ts
│
├── data/
│   ├── categories.ts
│   ├── products.ts
│   ├── benefits.ts
│   └── gallery.ts
│
├── hooks/
│   ├── useScrollPosition.ts
│   └── usePrefersReducedMotion.ts
│
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Products.tsx
│   ├── Wholesale.tsx
│   ├── Portfolio.tsx
│   ├── Contact.tsx
│   └── NotFound.tsx
│
├── services/
│   └── contactService.ts
│
├── types/
│   └── index.ts
│
├── utils/
│   └── helpers.ts
│
├── main.tsx
└── index.css
```

Do not create giant page components containing hundreds of lines of
repeated markup.

------------------------------------------------------------------------

# 8. ASSET STRATEGY

The real business images may be added later.

Create this directory structure:

``` text
public/
└── assets/
    ├── logo/
    │   ├── logo.svg
    │   ├── logo-dark.svg
    │   └── logo-light.svg
    │
    ├── hero/
    │   └── hero-products.jpg
    │
    ├── about/
    │   └── store-about.jpg
    │
    ├── categories/
    │   ├── kitchen.jpg
    │   ├── household.jpg
    │   ├── plastic.jpg
    │   ├── electrical.jpg
    │   ├── cleaning.jpg
    │   └── storage.jpg
    │
    ├── products/
    │   └── .gitkeep
    │
    ├── gallery/
    │   ├── store-1.jpg
    │   ├── store-2.jpg
    │   ├── store-3.jpg
    │   ├── store-4.jpg
    │   ├── store-5.jpg
    │   └── store-6.jpg
    │
    ├── wholesale/
    │   └── wholesale.jpg
    │
    └── placeholders/
        └── placeholder.svg
```

## Critical Asset Rule

Do not allow missing images to produce:

-   Broken image icons
-   Console errors that break UI
-   Collapsed layouts

Create a reusable `ImageWithFallback` component.

Behavior:

1.  Attempt to render local image.
2.  If image does not exist or fails to load, display a visually
    appropriate fallback.
3.  Maintain aspect ratio.
4.  Show a neutral branded placeholder.
5.  Never use external image URLs as a required dependency.

The placeholder should use the brand's light background, subtle
iconography, and category-specific icon when possible.

------------------------------------------------------------------------

# 9. REUSABLE LOGO

Create:

`src/components/common/Logo.tsx`

The component must support:

``` ts
type LogoVariant = "default" | "light" | "compact";
```

When actual SVG assets are unavailable, render a temporary text-based
logo:

``` text
NEW
PASHUPATI
SUPPLIERS
```

Use the existing navy and red/orange visual identity.

The logo must be defined in one component only.

------------------------------------------------------------------------

# 10. ROUTING

Implement these routes:

``` text
/             Home
/about        About Us
/products     Products
/wholesale    Wholesale
/portfolio    Portfolio
/contact      Contact Us
*             404
```

All navigation must work.

Use React Router.

On every route change:

-   Scroll to the top
-   Update the page title if practical
-   Keep layout consistent

Do not leave dead links.

------------------------------------------------------------------------

# 11. GLOBAL NAVIGATION

Create a sticky navigation system.

## Desktop Navigation

Left:

Logo

Center:

-   Home
-   About Us
-   Our Products
-   Wholesale
-   Portfolio
-   Contact Us

Right:

Primary CTA:

**Get In Touch**

Route:

`/contact`

## Navigation Behavior

-   Transparent/white initial appearance depending on page design
-   On scroll, use a solid white background with subtle border/shadow
-   Active route receives a red/orange underline or equivalent
    restrained indicator
-   CTA remains visually prominent
-   Navigation should not become overly tall

## Mobile Navigation

Use a menu button.

When opened:

-   Display all navigation links
-   Display Get In Touch CTA
-   Prevent confusing overlapping content
-   Close on route change
-   Support Escape key where practical
-   Keep focus behavior accessible

------------------------------------------------------------------------

# 12. HOME PAGE

Route:

`/`

The homepage should be a complete conversion-focused business landing
page.

------------------------------------------------------------------------

## SECTION 1 --- HERO

### Purpose

Immediately communicate:

-   What the business supplies
-   Who it serves
-   Product variety
-   A clear next action

### Eyebrow

`YOUR ONE-STOP SUPPLIER`

### Main Heading

**Everything Your Business and Home Needs**

### Supporting Copy

We supply a wide range of quality household, kitchen, plastic,
electrical, cleaning, storage and general products for everyday needs,
retail businesses and bulk buyers.

### Buttons

Primary:

`Explore Products`

→ `/products`

Secondary:

`Contact Us`

→ `/contact`

### Visual

Use:

`/assets/hero/hero-products.jpg`

The intended image composition should contain a visually organized
selection of:

-   Buckets
-   Storage containers
-   Kitchenware
-   Cooking pots
-   Cleaning tools
-   Household products
-   Electrical accessories

Do not make the composition cluttered.

### Desktop Layout

Two columns:

``` text
TEXT + CTA                 PRODUCT / STORE VISUAL
```

### Mobile

``` text
TEXT
CTA BUTTONS
IMAGE
```

### Visual Treatment

-   Light neutral background
-   Optional subtle store blur behind image
-   Strong navy typography
-   Red/orange primary CTA
-   No excessive gradient

------------------------------------------------------------------------

## SECTION 2 --- VALUE STRIP

Create four equal feature items.

### Quality Products

Carefully selected products for everyday use.

### Bulk & Wholesale

Reliable supply solutions for retailers and businesses.

### Competitive Prices

Great value and competitive pricing.

### Reliable Support

Friendly assistance whenever you need us.

Each item:

-   Lucide icon
-   Heading
-   One or two lines of text

Desktop: horizontal row

Mobile: 2×2 or vertical stack depending on available space.

------------------------------------------------------------------------

## SECTION 3 --- ABOUT PREVIEW

### Left

Image:

`/assets/about/store-about.jpg`

Overlay statistic card:

``` text
10+
Years of Trust
& Service
```

### Right

Eyebrow:

`ABOUT US`

Heading:

**Your Trusted Supply Partner**

Copy:

New Pashupati Suppliers offers a broad range of practical products for
households, retailers, businesses and bulk buyers. Our goal is to make
quality products accessible through dependable service and competitive
pricing.

Statistics:

``` text
5000+   Products
1000+   Happy Customers
10+     Years of Experience
50+     Business Partners
```

These values must be treated as editable placeholders unless confirmed.

Button:

`Learn More About Us`

→ `/about`

------------------------------------------------------------------------

## SECTION 4 --- PRODUCT CATEGORIES

Eyebrow:

`OUR PRODUCT CATEGORIES`

Heading:

**Everything You Need Under One Roof**

Categories:

1.  Kitchen
2.  Household
3.  Plastic
4.  Electrical
5.  Cleaning
6.  Storage

Each category card includes:

-   Image
-   Icon fallback
-   Category name
-   Short description
-   Placeholder product count
-   Hover state

Example:

``` text
Kitchen
Cookware, utensils and everyday essentials.
120+ Products
```

Card action:

`Explore Category`

This can navigate to:

`/products?category=kitchen`

The Products page must read the query parameter if implemented.

Primary section CTA:

`View All Products`

→ `/products`

------------------------------------------------------------------------

## SECTION 5 --- WHY CHOOSE US

Heading:

**Why Choose New Pashupati Suppliers?**

Create six benefit cards.

1.  Wide Product Range
2.  Reliable Quality
3.  Competitive Pricing
4.  Bulk Order Support
5.  Trusted Supplier
6.  Friendly Customer Service

Each card:

-   Relevant Lucide icon
-   Short title
-   1--2 sentence description

Use a light background section.

Avoid excessive card shadows.

------------------------------------------------------------------------

## SECTION 6 --- WHOLESALE CTA

Dark navy section.

Optional image:

`/assets/wholesale/wholesale.jpg`

Use subtle overlay so text remains readable.

Heading:

**Looking for Wholesale Supply?**

Copy:

Whether you run a retail shop, business or require products in bulk, we
can help you source a wide range of everyday essentials with reliable
service and competitive pricing.

Buttons:

Primary:

`Request Wholesale Inquiry`

Secondary:

`Contact Our Team`

Both lead to `/contact`, with optional query parameters to prefill
inquiry type.

Example:

`/contact?type=wholesale`

------------------------------------------------------------------------

## SECTION 7 --- PORTFOLIO PREVIEW

Heading:

**Inside Our Store**

Supporting text:

Explore our store, product range and the variety of supplies available.

Desktop gallery:

``` text
[         LARGE IMAGE         ][ SMALL ]
[         LARGE IMAGE         ][ SMALL ]
                              [ SMALL ][ SMALL ]
```

Mobile:

Simple stacked masonry/grid.

Use gallery assets.

Button:

`View Full Portfolio`

→ `/portfolio`

------------------------------------------------------------------------

## SECTION 8 --- FINAL CTA

Full-width strong CTA.

Heading:

**Need Products in Bulk?**

Copy:

Contact New Pashupati Suppliers today and let us help you find products
that match your business or household requirements.

Buttons:

-   Call Us Now
-   Send Inquiry

Call button should use a `tel:` link based on centralized business
configuration.

Send Inquiry:

→ `/contact`

------------------------------------------------------------------------

# 13. ABOUT PAGE

Route:

`/about`

## Page Hero

Eyebrow:

`ABOUT NEW PASHUPATI SUPPLIERS`

Heading:

**Your Trusted Partner for Everyday Supplies**

Copy:

A short introduction explaining the business's focus on practical
products, variety, service and supply.

------------------------------------------------------------------------

## OUR STORY

Do not invent fake history.

Use editable, honest placeholder copy such as:

> New Pashupati Suppliers serves customers looking for a dependable
> source of household, kitchen, plastic, electrical, cleaning and
> general products. As the business continues to grow, our focus remains
> on product variety, reliable service and long-term customer
> relationships.

Use image:

`/assets/about/store-about.jpg`

------------------------------------------------------------------------

## MISSION

**To provide dependable access to quality everyday products through a
wide selection, fair pricing and helpful service.**

## VISION

**To become a trusted supply partner for households, retailers and
businesses seeking reliable everyday products.**

------------------------------------------------------------------------

## CORE VALUES

Create cards:

-   Quality
-   Trust
-   Reliability
-   Customer Focus
-   Fair Pricing
-   Continuous Improvement

------------------------------------------------------------------------

## BUSINESS STATS

Reuse `StatCard`.

Use centralized editable data.

------------------------------------------------------------------------

## ABOUT CTA

Heading:

**Have a Product or Wholesale Inquiry?**

Button:

`Contact Us`

------------------------------------------------------------------------

# 14. PRODUCTS PAGE

Route:

`/products`

This is a **product showcase**, not e-commerce.

## Page Hero

Heading:

**Explore Our Products**

Description:

Discover a wide range of everyday products available across multiple
categories.

------------------------------------------------------------------------

## CATEGORY FILTER

Implement accessible category filtering.

Categories:

-   All
-   Kitchen
-   Household
-   Plastic
-   Electrical
-   Cleaning
-   Storage
-   General Supplies

Use URL query parameter if practical.

Example:

`/products?category=plastic`

The UI should work with mock data.

------------------------------------------------------------------------

## PRODUCT DATA

Create:

`src/data/products.ts`

Define a type:

``` ts
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  featured?: boolean;
}
```

Use realistic placeholder names without fake pricing if prices are not
yet confirmed.

Examples:

-   Stainless Steel Cooking Pot
-   Plastic Storage Container
-   Household Water Bucket
-   Floor Cleaning Broom
-   Extension Board
-   Plastic Storage Basket

------------------------------------------------------------------------

## PRODUCT CARD

Display:

-   Product image/fallback
-   Category
-   Product name
-   Short description
-   CTA

CTA:

`Inquire About This Product`

On click:

Navigate to:

`/contact?product=PRODUCT_NAME`

The contact form should automatically prefill the message with:

`I would like to know more about: PRODUCT_NAME`

Do not add:

-   Add to Cart
-   Buy Now
-   Wishlist
-   Payment
-   Checkout

------------------------------------------------------------------------

# 15. WHOLESALE PAGE

Route:

`/wholesale`

## Hero

Eyebrow:

`BULK & BUSINESS SUPPLY`

Heading:

**Wholesale Solutions for Your Business**

Description:

We help retailers, local shops, businesses and bulk buyers source a wide
range of everyday products through a simple inquiry process.

------------------------------------------------------------------------

## WHO WE SERVE

Create cards:

-   Retail Shops
-   Local Businesses
-   Offices
-   Institutions
-   Resellers
-   Bulk Buyers

------------------------------------------------------------------------

## WHOLESALE BENEFITS

-   Wide product selection
-   Competitive bulk pricing
-   Flexible product inquiries
-   Reliable supply
-   Business-focused support

------------------------------------------------------------------------

## HOW IT WORKS

Create a 5-step visual process.

### 1. Send an Inquiry

Tell us what products or categories you need.

### 2. Discuss Requirements

We review quantity, product requirements and availability.

### 3. Receive a Quote

Receive information and pricing based on your requirements.

### 4. Confirm Your Order

Confirm the products and order details.

### 5. Delivery or Pickup

Coordinate collection or delivery according to the available service.

Do not promise delivery capabilities that are not confirmed.

------------------------------------------------------------------------

## WHOLESALE CTA

`Request a Wholesale Quote`

→ `/contact?type=wholesale`

------------------------------------------------------------------------

# 16. PORTFOLIO PAGE

Route:

`/portfolio`

## Hero

Heading:

**Our Store & Product Range**

Copy:

Take a look inside New Pashupati Suppliers and explore the variety of
products we supply.

------------------------------------------------------------------------

## FILTERS

-   All
-   Store
-   Products
-   Wholesale

Implement client-side filtering using local data.

## GALLERY

Use:

`src/data/gallery.ts`

Type:

``` ts
export interface GalleryItem {
  id: string;
  title: string;
  category: "store" | "products" | "wholesale";
  image: string;
  alt: string;
}
```

Grid:

-   Desktop: responsive masonry-like grid or balanced CSS grid
-   Tablet: 2--3 columns
-   Mobile: 1--2 columns

Each image:

-   Uses fallback
-   Has descriptive alt text
-   Opens a lightbox

## LIGHTBOX

Requirements:

-   Open selected image
-   Next/previous navigation
-   Close button
-   Escape closes modal
-   Click outside closes when appropriate
-   Keyboard accessible
-   Prevent background scrolling while open

------------------------------------------------------------------------

# 17. CONTACT PAGE

Route:

`/contact`

This page must be fully functional.

## Left Column

Heading:

**Let's Work Together**

Copy:

Contact us for product inquiries, wholesale requirements, bulk orders or
general questions.

Contact information:

### Call Us

Use configured phone number.

### Email Us

Use configured email.

### Visit Us

Kathmandu, Nepal

### Business Hours

Use configured hours.

Social links:

-   Facebook
-   Instagram
-   WhatsApp

Use actual URLs later. For now, if links are placeholders, visually
indicate them but do not create misleading functionality.

------------------------------------------------------------------------

# 18. CONTACT FORM

Create a reusable `ContactForm`.

Fields:

1.  Full Name
2.  Phone Number
3.  Email Address
4.  Message

Labels must be visible or accessible.

## Validation

### Name

-   Required
-   Minimum sensible length

### Phone

-   Required
-   Accept international/phone formatting reasonably
-   Do not impose an unnecessarily strict Nepal-only format unless
    specifically requested

### Email

-   Required
-   Valid email format

### Message

-   Required
-   Minimum meaningful length

Display inline validation errors.

Do not use browser alert dialogs.

------------------------------------------------------------------------

# 19. GOOGLE APPS SCRIPT INTEGRATION

An existing Google Apps Script Web App has already been created and
authorized.

**Do not create another backend.**

**Do not replace the existing Apps Script integration.**

Create:

`src/config/contact.ts`

``` ts
export const CONTACT_API_URL =
  "PASTE_EXISTING_GOOGLE_APPS_SCRIPT_EXEC_URL_HERE";
```

The exact existing `/exec` URL should be inserted by the developer.

Later, this can be moved to an environment variable.

Create:

`src/services/contactService.ts`

``` ts
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  message?: string;
}

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  // Implement Google Apps Script submission here.
}
```

## Request

Send POST data in this format:

``` json
{
  "name": "John Doe",
  "phone": "9800000000",
  "email": "john@example.com",
  "message": "I would like information about wholesale products."
}
```

For compatibility with Google Apps Script, use:

``` text
Content-Type: text/plain;charset=utf-8
```

with:

``` ts
body: JSON.stringify(data)
```

Do not send credentials.

Handle responses safely.

Because Google Apps Script/CORS behavior may vary, the UI should:

-   Show sending state
-   Handle network failure
-   Avoid crashing if response parsing fails unexpectedly
-   Provide a meaningful fallback error

------------------------------------------------------------------------

# 20. CONTACT FORM UX STATES

## Default

Button:

`Send Message`

## Sending

Button:

`Sending...`

-   Disable inputs if appropriate
-   Prevent duplicate submissions
-   Show small loading spinner

## Success

Show a professional success message:

**Thank you! Your message has been sent successfully. We will get back
to you soon.**

Then:

-   Clear the form
-   Return button to default state

## Error

Show:

**Unable to send your message. Please try again or contact us
directly.**

Keep entered values so the user does not lose their message.

------------------------------------------------------------------------

# 21. PRODUCT INQUIRY PREFILL

The contact page must support:

``` text
/contact?product=Stainless%20Steel%20Cooking%20Pot
```

When present, prefill the message:

``` text
Hello, I would like to know more about: Stainless Steel Cooking Pot
```

For wholesale:

``` text
/contact?type=wholesale
```

Prefill:

``` text
Hello, I am interested in wholesale or bulk supply. Please contact me with more information.
```

If both exist, combine intelligently.

------------------------------------------------------------------------

# 22. FOOTER

Create a reusable footer.

Background:

Dark navy.

## Column 1

Logo

Short description:

New Pashupati Suppliers provides a wide range of everyday products for
households, retailers, businesses and bulk buyers.

## Column 2 --- Quick Links

-   Home
-   About Us
-   Our Products
-   Wholesale
-   Portfolio
-   Contact Us

## Column 3 --- Categories

-   Kitchen
-   Household
-   Plastic
-   Electrical
-   Cleaning
-   Storage

## Column 4 --- Contact

-   Location
-   Phone
-   Email
-   Business hours

Bottom bar:

`© 2026 New Pashupati Suppliers. All Rights Reserved.`

Optional:

Privacy Policy and Terms links only if actual pages are created.

Do not create fake routes.

------------------------------------------------------------------------

# 23. 404 PAGE

Route fallback:

`*`

Heading:

**Page Not Found**

Text:

The page you are looking for does not exist or may have been moved.

Button:

`Back to Home`

Use a clean, branded illustration/icon.

------------------------------------------------------------------------

# 24. BUTTON SYSTEM

Create reusable button variants.

``` ts
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "dark"
  | "ghost";
```

Primary:

Red/orange background.

Secondary:

Navy background or defined visual secondary.

Outline:

Border with clear hover.

All buttons:

-   Keyboard accessible
-   Visible focus ring
-   Disabled state
-   Loading state when relevant
-   Touch-friendly minimum height

------------------------------------------------------------------------

# 25. RESPONSIVE DESIGN REQUIREMENTS

The website must work correctly at:

``` text
320px
375px
390px
414px
768px
1024px
1280px
1440px+
```

## Mobile

-   No horizontal overflow
-   Hero stacks vertically
-   Navigation becomes mobile menu
-   Buttons are touch-friendly
-   Multi-column layouts collapse logically
-   Gallery adapts cleanly
-   Contact columns stack
-   Footer columns stack
-   Text never becomes too small

## Tablet

-   Use intermediate grid layouts
-   Do not simply use desktop compressed into tablet

## Desktop

-   Maximum readable content width
-   Strong alignment
-   Comfortable whitespace
-   Balanced image/text proportions

------------------------------------------------------------------------

# 26. ACCESSIBILITY

Meet practical accessibility standards.

Include:

-   Semantic HTML
-   One logical H1 per page
-   Proper heading hierarchy
-   Accessible labels
-   Keyboard navigation
-   Visible focus styles
-   Alt text
-   Adequate color contrast
-   Buttons with meaningful accessible names
-   Decorative icons marked appropriately
-   Form errors associated with fields
-   Mobile menu accessible by keyboard
-   Lightbox keyboard controls

Respect:

``` css
@media (prefers-reduced-motion: reduce)
```

Reduce non-essential motion.

------------------------------------------------------------------------

# 27. ANIMATION

Use subtle animation only.

Examples:

-   Card hover: 2--4px translate
-   Image hover: gentle scale
-   Section reveal: subtle fade/translate
-   Mobile menu: short opacity/transform transition
-   Buttons: small color transition

Avoid:

-   Constant floating elements
-   Excessive parallax
-   Long animations
-   Bouncing buttons
-   Distracting motion

------------------------------------------------------------------------

# 28. DATA ARCHITECTURE

Keep content separate from UI.

Create:

`src/data/categories.ts`

``` ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number | null;
}
```

Create:

`src/data/products.ts`

Create:

`src/data/gallery.ts`

Do not hardcode repeated data directly inside JSX.

This architecture must allow a future API or CMS to replace local mock
data.

------------------------------------------------------------------------

# 29. FUTURE E-COMMERCE ARCHITECTURE

Do not build these features now, but do not architect in a way that
prevents them.

Future pages may include:

``` text
/products/:slug
/categories/:slug
/cart
/wishlist
/checkout
/account
/orders
/login
```

Future services may include:

``` text
ProductService
CartService
OrderService
AuthService
PaymentService
```

The current `ProductCard` and data types should be reusable later.

Do not prematurely implement complex global state.

------------------------------------------------------------------------

# 30. PERFORMANCE

Requirements:

-   Avoid huge JavaScript bundles
-   Lazy load route pages if useful
-   Use optimized local images when actual assets are added
-   Use proper image dimensions/aspect ratios
-   Avoid layout shift
-   Do not use unnecessary animation libraries
-   Avoid unnecessary dependencies

Image component should support:

-   `loading="lazy"` for below-the-fold images
-   meaningful `alt`
-   fixed aspect ratio wrappers where appropriate

------------------------------------------------------------------------

# 31. SEO FOUNDATION

Implement basic page metadata.

Suggested titles:

``` text
Home:
New Pashupati Suppliers | Household & Wholesale Supplies

About:
About Us | New Pashupati Suppliers

Products:
Our Products | New Pashupati Suppliers

Wholesale:
Wholesale Supply | New Pashupati Suppliers

Portfolio:
Store & Product Gallery | New Pashupati Suppliers

Contact:
Contact Us | New Pashupati Suppliers
```

Meta descriptions should be concise and business-focused.

Use semantic page structure.

------------------------------------------------------------------------

# 32. QUALITY CHECKLIST

Before considering the project complete, verify:

## Navigation

-   Every nav item works
-   CTA buttons work
-   Mobile menu works
-   Active route state works
-   No dead links

## Images

-   Missing images show fallback
-   No broken image icons
-   No layout collapse
-   Gallery works

## Forms

-   Validation works
-   Loading state works
-   Duplicate submissions prevented
-   Success state works
-   Error state works
-   Existing Google Apps Script endpoint is used

## Responsive

-   No horizontal scrolling
-   Mobile menu works
-   Hero works at small widths
-   Footer stacks correctly
-   Forms remain usable

## Accessibility

-   Keyboard navigation works
-   Focus states visible
-   Form labels accessible
-   Lightbox accessible

## Code

-   TypeScript types are meaningful
-   No unnecessary `any`
-   Components are reusable
-   Configuration is centralized
-   Data is separated from UI
-   No duplicate business details

------------------------------------------------------------------------

# 33. FINAL IMPLEMENTATION INSTRUCTION

Build the entire website as a complete, functional React application.

The finished project must include:

-   Home page
-   About page
-   Products showcase
-   Wholesale page
-   Portfolio/gallery page
-   Contact page
-   Working Google Apps Script contact form integration
-   Responsive navigation
-   Mobile menu
-   Reusable footer
-   404 page
-   Asset fallback system
-   Local mock product data
-   Gallery filtering
-   Image lightbox
-   Responsive design
-   Accessible interactions
-   Clean component architecture

Do not leave unfinished placeholder buttons.

Every interactive element must:

1.  Navigate to a valid route,
2.  Scroll to a meaningful section,
3.  Submit a real form, or
4.  Perform a clearly useful interface action.

Do not add fake e-commerce functionality.

Do not add cart, checkout, payments, user authentication or order
management yet.

The final visual identity must remain consistent:

**NAVY + WHITE + RED/ORANGE**

The overall feeling should be:

**A modern, trustworthy, established wholesale and retail supplier
website that represents a real physical business and is architecturally
ready to grow into a complete e-commerce platform.**

------------------------------------------------------------------------

# 34. IMPLEMENTATION PRIORITY

Implement in this order:

1.  Project setup and routing
2.  Global design tokens
3.  Container, buttons and shared components
4.  Navbar and mobile navigation
5.  Footer
6.  Asset fallback system
7.  Home page
8.  About page
9.  Products page
10. Wholesale page
11. Portfolio and lightbox
12. Contact page
13. Google Apps Script integration
14. Responsive testing
15. Accessibility pass
16. Final cleanup

Do not skip testing the contact form after the UI is complete.

------------------------------------------------------------------------

# 35. DEFINITION OF DONE

The project is complete only when:

-   The app starts without errors
-   All required routes render
-   Navigation is functional
-   Desktop and mobile layouts are usable
-   Missing images fail gracefully
-   Product filtering works
-   Portfolio filtering works
-   Lightbox works
-   Product inquiry prefilling works
-   Wholesale inquiry prefilling works
-   Contact validation works
-   Contact form sends to the existing Google Apps Script URL
-   Success and error states are visible
-   No broken links remain
-   No placeholder button is non-functional
-   Code is clean and maintainable
-   The design consistently represents New Pashupati Suppliers

# END OF MASTER SPECIFICATION

# Salla Dashboard Pages Analysis

## Scope

This file tracks the Salla merchant dashboard UI we need to reproduce for Middar as visual screens only.
Backend, payment activation, shipping integrations, product creation, and real verification actions are deferred.

Observed account context:
- Merchant name: سعيد
- Plan badge: Basic
- Main dashboard URL family: `https://s.salla.sa/`

## Core Dashboard Shell

Salla uses a dark dashboard shell, not a left-sidebar admin layout.

Top header:
- Salla logo on the far left.
- Horizontal navigation: All, Home, Orders, Products, Marketing, Store & Channels, Reports.
- Active nav item uses mint/teal filled pill.
- Right utility cluster: AI/helper icon, search, apps/grid, chat/messages, notifications, settings, profile avatar, merchant name, Basic plan badge, dropdown arrow.

Second-level navigation:
- Appears directly below the main header.
- Uses horizontal tabs for the current section.
- Active tab uses mint text and underline.
- Most pages use a primary action button on the right side of this row.

Common visual language:
- Background: near-black charcoal.
- Cards: dark gray panels with subtle borders and 8px-ish radius.
- Accent: mint/teal.
- Warnings: brown/gold dark alert strip.
- Locked plan banners: dark cards with `Available on Plus, Pro, and Special`, `Learn more`, `Start your free trial`.
- Empty states often split the page into a list/filter area and an empty detail panel.
- Tables and cards use skeleton placeholders when data is missing or loading.
- Arabic and English labels are mixed in the real dashboard.

## Home / Store Summary

Route:
- `/`

Structure:
- Subtab: Store Summary.
- Email activation alert:
  - Title: تفعيل البريد الإلكتروني
  - Message: يرجى تفعيل بريدك الإلكتروني للوصول الكامل إلى جميع مزايا المتجر.
  - Action: إعادة إرسال رابط التفعيل
- Main setup checklist:
  - Title: Continue setting up your store
  - Progress: 1/7
  - Step 1 expanded by default: Add your branding

Setup checklist steps:
- Add your branding
- Add a support number
- Set up your domain
- Add your first product
- Set your pickup location
- Design your store
- Verify your store

Expanded branding UI:
- Store name input.
- Store description textarea with optional badge and 0/200 counter.
- Store logo drag and drop box.
- Store primary color input.
- Save button.
- Right-side store preview illustration showing header/footer branding placement.

## All Menu Page Map

The `All` menu is the full dashboard map. For Middar, this should become a large dark overlay/mega menu with grouped columns.

Orders:
- `/orders` - All orders
- `/orders/statuses` - Order statuses
- `/orders/auto-assignee` - Auto assignment
- `/orders/invoice-settings` - Invoice settings
- `/orders/reservations` - Reservations
- `/orders/custom-fields` - Order custom fields
- `/orders/options` - Order options
- `/orders/exports` - Order exports
- `/orders/auto-tags` - Automatic tags

Products:
- `/products` - All products
- `/products/options` - Categories and options
- `/products/editor` - Bulk product editor
- `/products/quantities/bulk` - Bulk quantities
- `/products/inventory-transfer` - Inventory transfer
- `/products/campaigns` - Product campaigns
- `/products/restrictions` - Product restrictions
- `/products/quantities` - Inventory quantities
- `/products/importer` - Product importer
- `/products/imports` - Product imports
- `/products/exports` - Product exports
- `/products/branches` - Branches
- `/products/branches/stock-management` - Branch stock management
- `/products/quantities/audit` - Quantity audit

Marketing:
- `/marketing/ads/dashboard` - Ads dashboard
- `/marketing/integration-tools/snapchat` - Snapchat integration
- `/marketing/carts` - Abandoned carts
- `/marketing/coupons` - Coupons
- `/marketing/offers/cashback` - Cashback
- `/marketing/influencers` - Influencers
- `/marketing/offers` - Promotional offers
- `/marketing/campaign/retargeting` - Retargeting
- `/marketing/offers/conditional` - Conditional/cart offers
- `/marketing/calendar` - Marketing calendar
- `/marketing/customer_wallet` - Customer wallet
- `/marketing/affiliate` - Affiliate
- `/marketing/seo/homepage` - SEO homepage
- `/marketing/loyalty` - Loyalty
- `/marketing/quick_checkout` - Quick checkout
- `/marketing/gift` - Gift
- `/marketing/reorder-reminders` - Reorder reminders

Store and channels:
- `/themes` - Store design
- `/themes/marketplace` - Theme marketplace
- `/manage/domain` - Domain
- `/channel/pages` - Information pages
- `/manage/custom-urls` - Custom URLs
- `/channel/sallapoint` - Salla Point
- `/channel/mobile` - Mobile app
- `/themes/landing-pages` - Landing pages

Customers:
- `/customers` - All customers
- `/customers/settings` - Customer settings
- `/customers/groups` - Customer groups
- `/customers/imports` - Customer imports

Staff:
- `/users` - Staff
- `/users/roles` - Roles and permissions
- `/users/targets` - Employee targets

Reports:
- `/reports/performance` - Store performance
- `/reports/smart-analysis` - Smart analytics
- `/reports` - Reports

Support:
- `/feedback` - Reviews/questions
- `/tickets` - Tickets
- `/shipping/tickets` - Shipping tickets
- `/channel/chat` - Chat
- `/manage/complaints` - Complaints

Shipping:
- `/shipping` - Shipping and delivery
- `/shipping/setting` - Shipping settings
- `/shipping/setting/routes` - Shipping routes
- `/shipping/international` - International shipping readiness

Payments:
- `/payments` - Payment methods
- `/payments/wallet` - Wallet
- `/payments/rules` - Payment restrictions
- `/payments/taxes` - Tax settings
- `/payments/transactions` - Transactions
- `/payments/kyc` - Store verification

Apps and tools:
- `/apps/installed` - My apps
- `/apps` - App Store
- `/manage/experts` - Experts
- `/manage/webhooks` - Webhooks

Logs:
- `/logs/messages` - SMS log
- `/logs/audit` - Activity history
- `/logs/export` - Export log

## Section Details

### Orders

Route:
- `/orders`

Subtabs:
- All orders
- Order settings
- Order statuses
- Bulk status update
- Auto assignment
- Invoice settings
- More

Actions and content:
- Primary action: New order.
- Secondary action: Filter.
- Locked feature card: Order Editing, available on Plus, Pro, and Special.
- Status filters with zero counts: All orders, deleted, pending payment, under review, in progress, fulfilled, delivering, delivered, shipped, canceled, returned, returning, quotation request, completed.
- Saved filters area.
- Customize statuses action.

### Products

Route:
- `/products`

Subtabs:
- All products
- Product settings
- Categories & options
- Product editor
- Inventory management
- Inventory transfer
- More

Actions and content:
- Primary action: New product.
- Secondary action: Filter.
- Left filter chips/categories: unpriced, pinned, hidden, hidden in store app, discounted, out of stock, for sale, uncategorized, taxable, requires shipping, nearly out of stock, without description.
- Empty detail message: No products selected.
- Product editor is a Plus/Pro/Special locked feature.

### Marketing

Route:
- `/marketing/ads/dashboard`

Subtabs:
- Dashboard
- Campaigns
- Integrations
- Audience manager
- Ad credits
- UTM Builder

Actions and content:
- Primary action: Create Ad.
- Locked feature card: Salla Ads, available on Plus, Pro, and Special.
- Channel tabs: Snapchat, TikTok, Google, Meta, YouTube.
- Metrics cards: Impressions, Avg. CPC, Clicks, Spent.
- Chart area with dates.
- Store credits card with Low balance and Top up.
- Spendings overview by ad channel.
- Latest campaigns empty state.

Marketing sibling pages use the same top subnav pattern for coupons, offers, carts, calendar, wallet, loyalty, quick checkout, gifts, and reminders.

### Store And Channels

Route:
- `/themes`

Subtabs:
- Store design
- Theme Marketplace
- Domain
- Information pages
- Custom URLs
- Translation log

Actions and content:
- Feature card: Theme editor, available on current plan.
- Primary CTA: Manage themes.
- Hero copy: Stand out with your design.
- Supporting feature bullets: guided steps, launch in minutes, simple design experience, flexible customization, reliability, easier choices for customers.
- CTA: Start for free.

Theme marketplace:
- Search/discovery page for themes.
- Filters by suggested, popular, latest, discounts, free, and industries.

Pages:
- Uses a split layout with `New page`, information pages, and no selected page state.

### Customers

Route:
- `/customers`

Subtabs:
- All customers
- Customer groups
- Import customers
- Custom fields
- Settings

Actions and content:
- Primary action: New customer.
- Locked feature card: Add New Customer, available on Plus, Pro, and Special.
- Secondary action: Filter.
- Empty detail message: No customer selected.
- Empty groups state.

### Staff

Route:
- `/users`

Subtabs:
- Staff
- Roles & permissions
- Employees targets

Actions and content:
- Primary action: New staff.
- Locked feature card for staff accounts on higher plans.
- Table includes Store Owner, email, joined date, and active status.

### Reports

Route:
- `/reports/performance`

Subtabs:
- Store performance
- Smart analytics
- Reports

Actions and content:
- Primary action: Create report.
- Left report navigation: Performance summary, Sales, Orders, Customers, Visits, Landing pages, Conversion rate beta, Abandoned carts, Payments, Shipping, Inventory, Customer wallet.
- Manage reports button at bottom of the left nav.
- Date range selector.
- Metric cards: Gross sales, Net sales, Total costs, Net profit.
- Cards show skeleton placeholders when there is no data.

### Support

Route:
- `/feedback`

Subtabs:
- Reviews
- Questions
- Reported reviews
- Settings

Content pattern:
- Review/question management tabs.
- Likely list/detail empty-state layout for a new store.

### Shipping

Route:
- `/shipping`

Subtabs:
- Shipping & delivery
- Shipping performance
- Bullet Delivery
- Shipping routes
- International shipping readiness
- More

Actions and content:
- Feature card: Manage shipping, available on current plan.
- Prompt to explore more shipping solutions in App Store.
- Filter controls.
- Carrier categories: all, standard, express, economy, international, refrigerated, freight.
- Carrier cards show name, rating, inactive status, delivery time, services, shipping type.

### Payments

Route:
- `/payments`

Subtabs:
- Payment methods
- Wallet
- Payment restrictions
- Tax settings
- Transactions
- Store Verification

Actions and content:
- Locked feature card: Salla Payments, available on Plus, Pro, and Special.
- Verification warning: Your store isn't verified.
- Action: Verify now.
- Payment method blocks: Salla Payments, buy now pay later, Tabby, Tamara, digital wallets, PayPal.
- Activation buttons should be visual-only in Middar for now.

### Apps

Route:
- `/apps`

Subtabs:
- App Store
- My apps
- Settings

Content:
- App cards with category, title, rating, price, trial badge, and View action.
- Featured app strip.
- Recommended apps carousel/grid.
- Category discovery section: Convert visitors into buyers, Increase cart value, Loyalty, Starter Pack, AI growth, automation, design, customer reach, analytics.
- Trust bullets: High Performance, Easy Activation, Guaranteed Security, Salla Compliant.

### Logs

Route:
- `/logs/audit`

Subtabs:
- SMS log
- Activity history
- Export log

Content:
- Locked feature card: Activity Log, available on Plus, Pro, and Special.
- CTA buttons: Start free trial, Learn more.

## Middar UI Build Priorities

1. Replace any left-sidebar dashboard with Salla-like dark top-header dashboard.
2. Build `All` mega menu with grouped columns and all routes above.
3. Build Home setup checklist exactly as the dashboard entry experience.
4. Build section templates:
   - list/detail empty state
   - locked feature promo card
   - report metric cards
   - app marketplace card grid
   - carrier card grid
   - payments verification panel
5. Keep actions visual-only:
   - Create report
   - New order
   - New product
   - New customer
   - Verify now
   - Activate payment/shipping
   - Start free trial

## Notes For Bahrain/Middar

Salla itself appears focused on Saudi Arabia and UAE in onboarding. Middar should not copy that limitation blindly.
For our UI, Bahrain should be a first-class country in onboarding and store setup, while legal/payment/shipping activation remains a future backend phase.

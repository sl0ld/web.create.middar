# Salla Onboarding Questions Map

## Context

User location: Bahrain.

Observed Salla availability message for unsupported countries:
Salla is currently available in Saudi Arabia and the UAE.

Recommended research path for our product:
- For the real Bahrain path: choose `Other country`, then show an availability/waitlist state.
- For completing the full UX research flow: use the UAE-style test path only as a simulation, without claiming legal eligibility.

## Visual Pattern

- White full-screen page.
- Centered narrow content column.
- Large dark-teal question heading.
- Small muted helper text.
- Options appear as simple full-width rows or rounded chips.
- `Go back` appears as a small button above the question.
- No heavy cards, no sidebar, no header except in auth/verification pages.

## Flow

### 1. Country

Question:
Where is your business based?

Helper:
Your country selection sets the legal requirements for your store.

Options:
- Saudi Arabia
- United Arab Emirates
- Kuwait
- Other country

Observed behavior:
- Unsupported-country style path shows: `Thanks for your interest in joining Salla!`
- Message says Salla is currently available in Saudi Arabia and the UAE.

### 2. Business Status

Question:
Is your business up and running?

Options:
- Yes, I'm already selling (online or offline)
- No, I’m starting a new business

### 3A. Already Selling Branch

Question:
Do you have a valid trade license or commercial registration?

Options:
- Yes
- No

If `Yes`:

Question:
What type of license do you hold?

Options:
- Commercial
- E-trader
- Freezone
- Freelancer permit
- Other

If `No`:

Question:
Are you in the process of getting a license?

Options:
- Yes, in progress
- No

Both options continue to current sales channel.

### 3B. New Business Branch

Question:
Do you have the legal requirements to sell in the UAE?

Helper:
To activate your store and receive payouts you need: Valid trade license/commercial registration & Business bank account (UAE)

Options:
- Yes, I have both
- I have a license but no business bank account
- I don't have either

Observed sub-branches:
- `I have a license but no business bank account` continues to license type.
- `I don't have either` continues to planning question.

Planning question:
Are you actively planning to get licensed?

Options:
- Yes, actively planning
- Still exploring / just browsing

### 4. Current Sales Channel

Question:
Where are you currently selling?

Helper:
We’ll tailor your experience to your main sales channel.

Options:
- Physical store
- Already using Salla (creating a new store)
- Another e-commerce platform (Shopify, Zid, etc.)
- Social media (Instagram, TikTok, etc.)
- Online marketplaces (Amazon, noon, etc.)

If `Another e-commerce platform`:

Question:
Where is your store today?

Helper:
We'll help move your store data to Salla.

Options:
- zid
- shopify
- WooCommerce
- Magento
- Other

All options continue to product type.

### 5. Product Type

Question:
What do you plan to sell?

Helper:
This helps us prepare the right tools for you.

Options:
- Physical products (I ship them myself)
- Dropshipping products
- Digital products (eBooks, gift cards, etc.)
- Services (bookings, print-on-demand, etc.)
- Other

All options continue to monthly sales.

### 6. Monthly Sales

Question:
What are your current monthly sales?

Options:
- Under AED 5K
- AED 5K–25K
- AED 25K–100K
- AED 100K–500K
- Over AED 500K

All options continue to team size.

### 7. Team Size

Question:
How many people will work on your store?

Options:
- Just me
- 2 to 5
- 6 to 20
- 20 More than

All options continue to industry selection.

### 8. Industries

Question:
Almost there - What do you plan to sell?

Helper:
Pick the industries that match your products or services.

Observed industry chips:
- Electronics
- Home Supplies
- Fashion
- Jewelery
- Cosmetics and care
- Accessories and gifts
- Arts and Music
- Books and Education
- Services
- Health and Fitness
- Restaurants and cafes
- Food and Grocery
- Animals
- Cars
- Digital products
- Charity
- Toys
- Medical clinic

Example branch:
`Accessories and gifts` opens subcategories:
- glasses
- Whatches
- Wallets
- Flower
- Gift distributions
- Pins and Stickers

After choosing a subcategory, button appears:
Let’s set up your store

## Newly Observed Branches

### Product Type Branch

Question:
What do you plan to sell?

Options:
- Physical products (I ship them myself)
- Dropshipping products
- Digital products (eBooks, gift cards, etc.)
- Services (bookings, print-on-demand, etc.)
- Other

Observed behavior:
All options continue to monthly sales.

### Monthly Sales Branch

Question:
What are your current monthly sales?

Options:
- Under AED 5K
- AED 5K–25K
- AED 25K–100K
- AED 100K–500K
- Over AED 500K

Observed behavior:
All options continue to team size.

### Team Size Branch

Question:
How many people will work on your store?

Options:
- Just me
- 2 to 5
- 6 to 20
- 20 More than

Observed behavior:
All options continue to industry selection.

### Industry Subcategories

Electronics:
- No subcategories observed in this run; it stayed on the industry list.

Home Supplies:
- Gardens and plants
- Furniture
- Construction materials
- Plumbing and Electricity

Fashion:
- Women's Fashion
- Children Fashion
- Abayas
- Socks
- Men's Fashion
- shoes
- Thobe and shemagh

Jewelery:
- Gold and Jewelry
- Men's Accessories
- Gold or Silver Bullion
- Precious Metals
- Women's Accessories
- Imitation Accessories from International Brands
- Watches
- Prayer Beads
- Watch Repair
- Custom Accessories
- Eyeglasses and Lenses

Cosmetics and care:
- Makeup
- Contact Lenses
- Personal Care
- Eyelashes
- Perfumes
- Oud Increase

Accessories and gifts:
- glasses
- Whatches
- Wallets
- Flower
- Gift distributions
- Pins and Stickers

Arts and Music:
- Painting
- Handicrafts and Business
- Musical instruments

Books and Education:
- Books and Novels
- Stationery
- Educational Courses
- Comics / Manga
- Office resources

Services:
- Design and print
- Travel and tourism and reservations
- Consulting
- Photography
- Devices maintenance

Health and Fitness:
- Food Supplements
- Healthy foods / products
- Sports equipment and accessories
- Pharmacy

Restaurants and cafes:
- Food trucks
- Restaurant
- Cafe
- Coffee machines and accessories

Food and Grocery:
- Frozen food
- drinks
- Food supplies
- Honey
- dates
- Cake and Pastry Bakeries
- Restaurant / Food Truck
- Water
- Spices, Herbs & Natural Oils Store
- Coffee Roastery
- Grocery Store / Supermarket
- Coffee Equipment
- Specialized Supermarket (Organic/Diet)
- Food Stands and Carts Rental
- Dates
- Slaughter & Banquets / Slaughtering Services
- Meal Subscription
- Vegetables and Fruits
- Wholesale Grocery Products
- Custom Food / Home-Based Producers
- Healthy Meals and Snacks

Animals:
- Pets
- pet foods
- Pet supplies

Cars:
- Cars

Digital products:
- Digital cards
- Software / games Licensing
- Movies and TV shows
- Video games
- Subscriptions

Charity:
- Donations
- Charity and Zakat
- Call and Guidance
- Orphanages

Toys:
- Kids Games
- Board Games
- Garden Games
- Figures

Medical clinic:
- Medical clinic

### Electronics Subcategories

Electronics opens:
- Smart phones and accessories
- Computers, mobile devices and accessories
- Digital cameras and accessories
- Televisions
- Headphones
- Household Appliance

After choosing a subcategory, button appears:
Let’s set up your store

## Plan Selection After Persona

After clicking `Let’s set up your store`, Salla shows a loading page:

Messages observed:
- Reach more customers with built-in marketing tools
- Getting your shelves ready...

Then it opens plan selection:

Heading:
Grow your business with the right plan

Controls:
- Monthly
- Annually
- Save 16%
- Compare plans

Plans:

Salla Basic:
- For new sellers & explorers
- Free
- Select Salla Basic
- Unlimited Products
- Unlimited Customers
- Discount Coupons
- Customer Inquiries & Reviews
- Cash on Delivery & Bank Transfer

Salla Plus:
- For small businesses
- AED 99.00 / Month
- Select Salla Plus
- Enable electronic payment methods
- Salla Point
- Add all types of products
- Marketing tools
- Customer Wallet
- Global shipping fleet

Salla Pro:
- For established companies
- AED 299.00 / Month
- Select Salla Pro
- VAT
- ZATCA integration
- Staff accounts
- Accounting and financial app integrations
- CSS and JavaScript customization
- Salla Twilight custom theme

Observed action:
Selecting Salla Basic opens the merchant dashboard.

## Post-Plan Dashboard Setup

After selecting Salla Basic, the dashboard opens at:
`Store Summary`

Top navigation:
- All
- Home
- Orders
- Products
- Marketing
- Store & Channels
- Reports

User/account area:
- Merchant name
- Basic plan badge

Alert:
تفعيل البريد الإلكتروني

Message:
يرجى تفعيل بريدك الإلكتروني للوصول الكامل إلى جميع مزايا المتجر.

Action:
إعادة إرسال رابط التفعيل

Setup widget:
Continue setting up your store 🚀

Progress:
1/7

### Setup Step 1: Add Your Branding

Fields:
- Store name
- Store description (Optional)
- Store logo (Optional)
- Store primary color (Optional)

Helper:
Your branding appears in your store’s header and footer.

Action:
Save

### Setup Step 2: Add A Support Number

Field:
- Support phone number

Helper:
Provide a number customers can contact you on.

Observed status:
Verified

Helper:
Your support number appears in your store’s footer.

### Setup Step 3: Set Up Your Domain

Field:
- Store domain

Prefix:
salla.sa/

Helper:
This domain is the link customers use to visit your store.

Example:
Salla.sa/brand-name or Salla.sa/brandname

Action:
Save

Helper:
Your store domain appears in browser tabs and shared links.

### Setup Step 4: Add Your First Product

Product type cards:
- Physical Product: Items that can be shipped or picked up
- Custom Service: Design, research, writing, printing & more
- Food & Beverage: Products that need special shipping
- Digital Product: Files, eBooks, recorded courses & more
- Digital Card: Prepaid cards, gift cards, or subscriptions
- Bookings: Courses, consultations, medical, or travel services

Product details:
- Product image
- Maximum file size is 2MB
- The image must be at least 250 × 100 pixels
- Product name
- Price
- Shipping
- Requires shipping
- Doesn't require shipping
- Product weight
- Kilogram
- Quantity
- Unlimited stock

Preview:
- Product name
- Reviews
- Price placeholder
- Buy now
- Add to cart
- Add product details to see a preview here

Action:
Add product

### Setup Step 5: Set Your Pickup Location

Helper:
Ship to your customers locally and worldwide with leading shipping carriers.

Action:
Set pickup location

### Setup Step 6: Design Your Store

Heading:
Style your store, your way

Helper:
From layout to fonts and colors, make it yours!

Action:
Start designing

### Setup Step 7: Verify Your Store

Action:
Verify

The verification step appears in the 1/7 setup checklist, but was not opened in this pass.

## Product Notes For Middar

- Add Bahrain explicitly in our onboarding country selector.
- If Bahrain is selected, do not block the user like Salla unless required by our business rules.
- Use the same branching pattern, but localize labels to Arabic.
- Save legal questions as configurable content, because country-specific requirements will change.
- Keep backend deferred; for now this is only a UI/state-flow prototype.

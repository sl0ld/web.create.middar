import { useMemo, useState } from 'react'
import {
  AppWindow,
  BarChart3,
  Bell,
  Boxes,
  ChevronDown,
  ClipboardList,
  CreditCard,
  FileClock,
  Filter,
  Grid3X3,
  Headphones,
  Home,
  MessageCircle,
  Megaphone,
  Menu,
  MoreHorizontal,
  Palette,
  Plus,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  UserRound,
  Users,
  WalletCards,
  X,
} from 'lucide-react'
import './App.css'

type DashboardScreen =
  | 'summary'
  | 'orders'
  | 'products'
  | 'marketing'
  | 'store'
  | 'customers'
  | 'staff'
  | 'reports'
  | 'support'
  | 'shipping'
  | 'payments'
  | 'apps'
  | 'logs'
  | 'settings'

type Screen = 'landing' | 'register' | 'verification' | 'onboarding' | DashboardScreen

type Section = {
  id: DashboardScreen
  label: string
  icon: React.ElementType
  tabs: string[]
  action?: string
}

const sections: Section[] = [
  { id: 'summary', label: 'Home', icon: Home, tabs: ['Store Summary'] },
  { id: 'orders', label: 'Orders', icon: ClipboardList, tabs: ['All orders', 'Order settings', 'Order statuses', 'Bulk status update', 'Auto assignment', 'Invoice settings', 'More'], action: 'New order' },
  { id: 'products', label: 'Products', icon: ShoppingBag, tabs: ['All products', 'Product settings', 'Categories & options', 'Product editor', 'Inventory management', 'Inventory transfer', 'More'], action: 'New product' },
  { id: 'marketing', label: 'Marketing', icon: Megaphone, tabs: ['Dashboard', 'Campaigns', 'Integrations', 'Audience manager', 'Ad credits', 'UTM Builder'], action: 'Create Ad' },
  { id: 'store', label: 'Store & Channels', icon: Store, tabs: ['Store design', 'Theme Marketplace', 'Domain', 'Information pages', 'Custom URLs', 'Translation log'], action: 'Manage themes' },
  { id: 'customers', label: 'Customers', icon: Users, tabs: ['All customers', 'Customer groups', 'Import customers', 'Custom fields', 'Settings'], action: 'New customer' },
  { id: 'staff', label: 'Staff', icon: UserRound, tabs: ['Staff', 'Roles & permissions', 'Employees targets'], action: 'New staff' },
  { id: 'reports', label: 'Reports', icon: BarChart3, tabs: ['Store performance', 'Smart analytics', 'Reports'], action: 'Create report' },
  { id: 'support', label: 'Support', icon: Headphones, tabs: ['Reviews', 'Questions', 'Reported reviews', 'Settings'] },
  { id: 'shipping', label: 'Shipping', icon: Truck, tabs: ['Shipping & delivery', 'Shipping performance', 'Bullet Delivery', 'Shipping routes', 'International shipping readiness', 'More'] },
  { id: 'payments', label: 'Payments', icon: CreditCard, tabs: ['Payment methods', 'Wallet', 'Payment restrictions', 'Tax settings', 'Transactions', 'Store Verification'] },
  { id: 'apps', label: 'Apps & Tools', icon: AppWindow, tabs: ['App Store', 'My apps', 'Settings'] },
  { id: 'logs', label: 'Logs', icon: FileClock, tabs: ['SMS log', 'Activity history', 'Export log'] },
  { id: 'settings', label: 'Settings', icon: Settings, tabs: ['Your profile', 'General', 'Store plan', 'Balance & billing', 'Payments', 'Notifications'] },
]

const menuGroups: Array<[string, string[]]> = [
  ['Orders', ['All orders', 'Order settings', 'Order statuses', 'Bulk status update', 'Auto assignment', 'Invoice settings', 'Bookings', 'Custom fields', 'Cart options', 'Export templates', 'Auto tags']],
  ['Products', ['All products', 'Product settings', 'Categories & options', 'Product editor', 'Inventory management', 'Inventory transfer', 'Pre-order campaigns', 'Product restrictions', 'Inventory audit', 'Import from platforms', 'Import & export', 'Export templates', 'Warehouses & branches', 'Retail stores']],
  ['Marketing', ['إعلانات مدار', 'Pixels & feeds', 'Abandoned carts', 'Coupons', 'Cashback offers', 'Influencers', 'Special offers', 'Campaigns', 'Cart offers', 'Marketing calendar', 'Customer wallet', 'Affiliate marketing', 'SEO', 'Loyalty program', 'Quick checkout', 'Gifting', 'Reorder Reminder']],
  ['Online Store', ['Store design', 'Theme Marketplace', 'Domain', 'Information pages', 'Custom URLs']],
  ['Sales Channels', ['نقطة مدار', 'Mobile app', 'Landing pages']],
  ['Customers', ['All customers', 'Settings', 'Customer groups', 'Import customers', 'Custom fields']],
  ['Staff', ['Staff', 'Roles & permissions', 'Employees targets']],
  ['Reports', ['Store performance', 'Smart analytics', 'Manage reports']],
  ['Support', ['Reviews', 'Tickets', 'Shipping tickets', 'Chat', 'Complaints']],
  ['Shipping', ['Shipping & delivery', 'Shipping settings', 'Shipping routes', 'International readiness']],
  ['Payments', ['Payment methods', 'Wallet', 'Payment restrictions', 'Tax settings', 'Transactions', 'Store verification']],
  ['Apps & Logs', ['App Store', 'My apps', 'Experts', 'Webhooks', 'SMS log', 'Activity history', 'Export log']],
  ['Settings', ['Your profile', 'General', 'Store plan', 'Balance & billing', 'Payments', 'Domain', 'Checkout', 'Taxes', 'Products', 'Orders', 'Shipping & delivery', 'Notifications', 'Installed apps']],
]

const orderStatuses = ['All orders', 'محذوف', 'بإنتظار الدفع', 'بإنتظار المراجعة', 'قيد التنفيذ', 'تم التنفيذ', 'جاري التوصيل', 'تم التوصيل', 'تم الشحن', 'ملغي', 'مسترجع', 'قيد الإسترجاع', 'طلب عرض سعر', 'مكتمل']
const productFilters = ['Unpriced Products', 'Pinned Products', 'Hidden Products', 'Hidden in Store App', 'Discounted Products', 'Out of Stock Products', 'For Sale Products', 'Uncategorized Products', 'Taxable Products', 'Products Requiring Shipping', 'Nearly Out of Stock', 'Products Without Description']
const productFilterStatus: Record<string, string> = {
  'Unpriced Products': 'unpriced',
  'Pinned Products': 'pinned',
  'Hidden Products': 'hidden',
  'Hidden in Store App': 'hidden_app',
  'Discounted Products': 'discounted',
  'Out of Stock Products': 'out_of_stock',
  'For Sale Products': 'sale',
  'Uncategorized Products': 'uncategorized',
  'Taxable Products': 'taxable',
  'Products Requiring Shipping': 'requires_shipping',
  'Nearly Out of Stock': 'low_stock',
  'Products Without Description': 'missing_description',
}
const reportMenu = ['Performance summary', 'Sales', 'Orders', 'Customers', 'Visits', 'Landing pages', 'Conversion rate', 'Abandoned carts', 'Payments', 'Shipping', 'Inventory', 'Customer wallet']
const carriers = ['Aramex', 'Smsa', 'DHL Express', 'Fetchr', 'J&T Express', 'RedBox']
const apps = ['Offers Bundles Upsell Cross sell', 'Zud, Increase Average Order Value', 'InstaCart - Shoppable Instagram Feed', 'Alfinder', 'Bousla', 'Wallet Plus', 'WhatsApp Chat Button', 'Rawaj Sales Boost Widgets']
const themes = ['وسام', 'إتقان', 'زاد', 'ليما', 'رايد', 'مواسم']
const sampleOrders = [
  { id: '#1007', customer: 'سارة علي', total: '24.500 BHD', status: 'بإنتظار الدفع', channel: 'المتجر الإلكتروني', time: 'قبل 8 دقائق' },
  { id: '#1006', customer: 'محمد حسن', total: '11.000 BHD', status: 'قيد التنفيذ', channel: 'Instagram', time: 'اليوم 02:15 م' },
  { id: '#1005', customer: 'فاطمة جاسم', total: '38.750 BHD', status: 'جاري التوصيل', channel: 'المتجر الإلكتروني', time: 'أمس' },
  { id: '#1004', customer: 'Khalid Store', total: '92.000 BHD', status: 'مكتمل', channel: 'نقطة البيع', time: '05 Aug' },
]
const sampleProducts = [
  { name: 'عباية لينن', sku: 'MD-ABY-001', price: '18.000 BHD', stock: '24', status: 'For sale' },
  { name: 'عطر مدار', sku: 'MD-PRF-014', price: '12.500 BHD', stock: '8', status: 'Discounted' },
  { name: 'بطاقة هدية', sku: 'MD-GFT-050', price: '5.000 BHD', stock: 'Digital', status: 'Hidden' },
  { name: 'مجموعة تغليف', sku: 'MD-PKG-003', price: '2.000 BHD', stock: '3', status: 'Nearly out' },
]
const setupTasks = [
  ['Add a support number', 'Add', 'Required before launch'],
  ['Set up your domain', 'Set up', 'Default domain is active'],
  ['Add your first product', 'Add', '4 draft products ready'],
  ['Set your pickup location', 'Set', 'Bahrain branch missing'],
  ['Design your store', 'Design', 'Theme editor ready'],
  ['Verify your store', 'Verify', 'Required for payments'],
]
const paymentMethods = [
  ['مدفوعات مدار', 'Requires verification', 'Activate'],
  ['BenefitPay', 'Recommended for Bahrain', 'Set up'],
  ['Apple Pay', 'Not connected', 'Activate'],
  ['Tabby', 'Available after verification', 'View'],
  ['Tamara', 'Available after verification', 'View'],
  ['Bank transfer', 'Manual review', 'Set up'],
]
const settingsCatalog = [
  { key: 'Your profile', title: 'Your profile', summary: 'Personal information, login devices, password, and account security.', rows: [['Owner', 'سعيد', 'Basic'], ['Email', 'mr.fks.r0@gmail.com', 'Not verified'], ['Language', 'English beta', 'Dark mode on']], toggles: ['English (Beta)', 'Dark mode', 'Two-factor authentication'] },
  { key: 'General', title: 'General settings', summary: 'Store name, identity, contact information, and default country.', rows: [['Store name', 'مدار', 'Visible'], ['Country', 'Bahrain', 'Active'], ['Support email', 'support@middar.test', 'Draft']], toggles: ['Show store contact', 'Allow customer notes', 'Maintenance mode'] },
  { key: 'Store plan', title: 'Store plan', summary: 'Current plan, upgrade cards, trial state, and subscription controls.', rows: [['Current plan', 'Basic', 'Active'], ['Trial', 'Not started', 'Available'], ['Next invoice', '0.000 BHD', 'Preview']], toggles: ['Annual billing', 'Plan recommendations', 'Usage alerts'] },
  { key: 'Manage stores', title: 'Manage stores', summary: 'Switch between stores, create a new store, and manage ownership.', rows: [['Main store', 'مدار', 'Owner'], ['Sandbox store', 'Draft', 'Hidden'], ['Team stores', '0', 'Preview']], toggles: ['Show archived stores', 'Require owner approval', 'Store switch shortcut'] },
  { key: 'Balance & billing', title: 'Balance & billing', summary: 'Wallet balance, invoices, receipts, and billing contacts.', rows: [['Balance', '0.000 BHD', 'Low'], ['Last invoice', 'No invoices', 'Empty'], ['Billing email', 'mr.fks.r0@gmail.com', 'Draft']], toggles: ['Auto recharge', 'Invoice email copy', 'Billing alerts'] },
  { key: 'Payments', title: 'Payments', summary: 'Payment methods, verification, checkout display, and settlement preview.', rows: [['Verification', 'Required', 'Pending'], ['BenefitPay', 'Ready to set up', 'Bahrain'], ['Settlement', '2-5 business days', 'Preview']], toggles: ['Show cash on delivery', 'Save card option', 'Payment failure alerts'] },
  { key: 'Domain', title: 'Domain', summary: 'Default link, custom domain, DNS records, SSL, and redirects.', rows: [['Default domain', 'saeed-store.middar.shop', 'Active'], ['Custom domain', 'Not connected', 'Pending'], ['SSL', 'Automatic', 'Ready']], toggles: ['Redirect www', 'Force HTTPS', 'Show domain status'] },
  { key: 'Checkout', title: 'Checkout', summary: 'Checkout fields, order notes, customer account, and confirmation behavior.', rows: [['Guest checkout', 'Enabled', 'Active'], ['Order notes', 'Enabled', 'Visible'], ['Phone verification', 'Optional', 'Draft']], toggles: ['Require customer email', 'Allow order notes', 'Show gift message'] },
  { key: 'Taxes', title: 'Taxes', summary: 'VAT, tax numbers, product tax defaults, and invoice display.', rows: [['VAT', 'Disabled', 'Can enable'], ['Tax number', 'Missing', 'Required later'], ['Default product tax', '0%', 'Preview']], toggles: ['Show tax at checkout', 'Tax-inclusive pricing', 'Invoice tax summary'] },
  { key: 'Sales channels', title: 'Sales channels', summary: 'Online store, mobile app, point of sale, and landing pages.', rows: [['Online store', 'Active', 'Primary'], ['Mobile app', 'Not enabled', 'Optional'], ['Landing pages', 'Draft', 'Ready']], toggles: ['Show channel badges', 'Enable draft channels', 'Channel analytics'] },
  { key: 'Markets', title: 'Markets', summary: 'Countries, currencies, language, and regional storefront rules.', rows: [['Primary market', 'Bahrain', 'Active'], ['Currency', 'BHD', 'Active'], ['GCC expansion', 'Draft', 'Preview']], toggles: ['Multi-currency', 'Auto language', 'Market-specific pricing'] },
  { key: 'Products', title: 'Products settings', summary: 'Inventory, product display, reviews, digital products, and SEO defaults.', rows: [['Low stock alert', '5 items', 'Active'], ['Reviews', 'Visible', 'Moderated'], ['Digital delivery', 'Draft', 'Optional']], toggles: ['Track inventory', 'Show sold-out badge', 'Allow product reviews'] },
  { key: 'Orders', title: 'Orders settings', summary: 'Statuses, invoices, custom fields, order tags, and automation previews.', rows: [['Invoice prefix', 'MD-', 'Active'], ['Custom fields', 'Locked', 'Pro'], ['Auto tags', 'Draft', 'Preview']], toggles: ['Auto invoice number', 'Allow order editing', 'Notify staff'] },
  { key: 'Shipping & delivery', title: 'Shipping & delivery', summary: 'Pickup locations, couriers, delivery zones, COD, and free shipping.', rows: [['Pickup branch', 'Manama', 'Needs hours'], ['Aramex', 'Connected', 'Active'], ['Free shipping', '30 BHD+', 'Active']], toggles: ['Cash on delivery', 'Free shipping rule', 'Delivery date picker'] },
  { key: 'Customers', title: 'Customers settings', summary: 'Customer groups, registration fields, wallet, privacy, and import options.', rows: [['Groups', '3 groups', 'Preview'], ['Custom fields', 'Draft', 'Optional'], ['Import', 'CSV ready', 'Visual']], toggles: ['Require phone', 'Allow customer wallet', 'Marketing consent'] },
  { key: 'Marketing', title: 'Marketing settings', summary: 'Pixels, feeds, coupons, campaigns, abandoned carts, and UTM defaults.', rows: [['Meta pixel', 'Not connected', 'Draft'], ['Coupons', 'Ready', 'Active'], ['Abandoned carts', 'Locked', 'Plus']], toggles: ['Marketing emails', 'Coupon stacking', 'UTM auto tagging'] },
  { key: 'Customer Wallet', title: 'Customer Wallet', summary: 'Wallet balance rules, refunds, loyalty credit, and customer display.', rows: [['Wallet', 'Disabled', 'Can enable'], ['Refunds to wallet', 'Draft', 'Preview'], ['Expiry', 'Never', 'Default']], toggles: ['Enable wallet', 'Show wallet at checkout', 'Wallet expiry alerts'] },
  { key: 'Blog', title: 'Blog settings', summary: 'Articles, categories, SEO defaults, and storefront visibility.', rows: [['Blog', 'Hidden', 'Draft'], ['Categories', '2', 'Preview'], ['SEO template', 'Ready', 'Draft']], toggles: ['Show blog in nav', 'Allow article comments', 'Featured articles'] },
  { key: 'Reviews', title: 'Reviews settings', summary: 'Product reviews, moderation, questions, and post-purchase requests.', rows: [['Reviews', 'Enabled', 'Moderated'], ['Questions', 'Enabled', 'Visible'], ['Review request', 'After 7 days', 'Draft']], toggles: ['Auto publish reviews', 'Allow photos', 'Ask after delivery'] },
  { key: 'Notifications', title: 'Notifications', summary: 'Email, dashboard, customer messages, staff alerts, and system events.', rows: [['Email verification', 'Pending', 'Action needed'], ['Order alerts', 'Enabled', 'Active'], ['Customer SMS', 'Not connected', 'Preview']], toggles: ['Dashboard notifications', 'Email notifications', 'Low stock alerts'] },
  { key: 'Installed apps', title: 'Installed apps', summary: 'Connected apps, permissions, billing, logs, and uninstall states.', rows: [['Installed apps', '0', 'Empty'], ['App permissions', 'Preview', 'Ready'], ['Webhook status', 'Draft', 'Not connected']], toggles: ['App update alerts', 'Permission warnings', 'Webhook logs'] },
]
const settingsDeepControls: Record<string, Array<{ title: string; controls: Array<{ label: string; helper?: string; enabled?: boolean; link?: boolean }> }>> = {
  Products: [
    {
      title: 'Product listing',
      controls: [
        { label: 'Show out-of-stock products last', enabled: false },
        { label: 'Show "Show more" button in product description', enabled: false },
        { label: 'Show "-" when price is zero', enabled: false },
        { label: 'Show "You may also like" section on product page', link: true },
        { label: 'Display product images in full quality', helper: 'Keep product images in their original resolution without compression.', enabled: false },
      ],
    },
    {
      title: 'Product display in store',
      controls: [
        { label: 'Show "Starting from" price', enabled: false },
        { label: 'Show promotions on the product page', enabled: false },
        { label: 'Auto-add promotional item to cart', enabled: true },
        { label: 'Product tax pricing', helper: 'Choose how VAT is applied to product prices.', link: true },
      ],
    },
    {
      title: 'Advanced product details',
      controls: [
        { label: 'Enable product duplication in cart', enabled: true },
        { label: 'Show number of purchases', link: true },
        { label: 'Show product weight on product page, cart, and invoice', enabled: false },
        { label: 'Include HS code field in advanced details', enabled: false },
        { label: 'Back in stock alerts', link: true },
      ],
    },
    {
      title: 'Catalog tools',
      controls: [
        { label: 'Branch and warehouse priority order', link: true },
        { label: 'Product filters', helper: 'Filters only appear when relevant product data is available.', link: true },
        { label: 'Brands', helper: 'Manage how brands are shown across your storefront.', link: true },
        { label: 'Exclude products from inventory sync', enabled: false },
        { label: 'Wishlist notifications', enabled: true },
      ],
    },
  ],
  Checkout: [
    {
      title: 'Checkout behavior',
      controls: [
        { label: 'Prefill checkout from last order', helper: 'Automatically prefill shipping address and carrier from the customer latest order.', enabled: false },
        { label: 'Guest checkout', helper: 'Let visitors check out without creating an account.', link: true },
        { label: 'Quick Purchase', helper: 'Let customers buy products with a single click.', enabled: false },
        { label: 'Enable corporate orders', helper: 'Collect company name, commercial registration, and tax ID on invoice.', enabled: false },
        { label: 'Display donation message', helper: 'Show or hide the donation message in checkout footer.', enabled: true },
      ],
    },
    {
      title: 'Customer information',
      controls: [
        { label: 'Require customer email', enabled: true },
        { label: 'Require phone verification', enabled: false },
        { label: 'Allow order notes', enabled: true },
        { label: 'Show gift message', enabled: false },
      ],
    },
  ],
  Domain: [
    {
      title: 'Domain actions',
      controls: [
        { label: 'Edit default subdomain', helper: 'Update the default subdomain used for your store.', link: true },
        { label: 'Register custom domain', helper: 'Register and set up a custom domain for your store.', link: true },
        { label: 'Connect external domain', helper: 'Connect a domain you already own.', link: true },
        { label: 'Transfer domain', helper: 'Transfer your domain from another provider.', link: true },
      ],
    },
  ],
  'Store plan': [
    {
      title: 'Subscription controls',
      controls: [
        { label: 'Renew subscription', helper: 'Keep your current plan active.', link: true },
        { label: 'Update payment method', helper: 'Wallet balance: 0.000 BHD.', link: true },
        { label: 'Gift a plan', helper: 'Help another merchant grow with a monthly or annual plan.', link: true },
        { label: 'Pause subscription', helper: 'Pause up to twice per year.', link: true },
        { label: 'Cancel subscription', helper: 'Plan features remain active until the current period ends.', link: true },
      ],
    },
  ],
}

const specialPageDetails: Record<string, { badge?: string; title: string; body: string; locked?: boolean }> = {
  'Orders:Custom fields': {
    badge: 'Available on Pro and Special',
    title: 'Custom data for your customers',
    body: 'Add custom fields in the order or registration form to collect additional information from customers, which helps you provide a customized shopping experience that meets their needs.',
    locked: true,
  },
  'Orders:Bulk status update': {
    badge: 'Available on Plus, Pro, and Special',
    title: 'Update many orders at once',
    body: 'Select a group of orders and move them to the right status without opening every order manually.',
    locked: true,
  },
  'Orders:Order statuses': {
    badge: 'Available on your plan',
    title: 'Customize your order workflow',
    body: 'Create and organize statuses so merchants can follow each order from checkout to delivery.',
  },
  'Orders:Auto assignment': {
    badge: 'Available on Plus, Pro, and Special',
    title: 'Assign orders automatically',
    body: 'Distribute new orders across your team based on rules, workload, or order source.',
    locked: true,
  },
  'Products:Product editor': {
    badge: 'Available on Plus, Pro, and Special',
    title: 'Bulk Product Editor',
    body: 'Edit prices, quantities, categories, and product details in bulk from one table.',
    locked: true,
  },
  'Marketing:Abandoned carts': {
    badge: 'Available on Plus, Pro, and Special',
    title: 'Recover abandoned carts',
    body: 'Send automated reminders and bring customers back to complete their orders.',
    locked: true,
  },
  'Marketing:Loyalty program': {
    badge: 'Available on Pro and Special',
    title: 'Reward your repeat customers',
    body: 'Create points, tiers, and rewards that encourage customers to come back to your store.',
    locked: true,
  },
  'Online Store:Domain': {
    badge: 'Available on your plan',
    title: 'Connect your store domain',
    body: 'Manage your default link, custom domain, DNS state, and renewal information.',
  },
  'Payments:Store verification': {
    badge: 'Required',
    title: "Your store isn't verified",
    body: 'Verify your store to activate and manage online payments securely.',
    locked: true,
  },
  'Apps & Logs:Activity history': {
    badge: 'Available on Plus, Pro, and Special',
    title: 'Full tracking of all your store activity',
    body: 'Follow messages, activities, and export files from one place and see who performed each action.',
    locked: true,
  },
}

function routeForMenuLink(group: string, link: string): DashboardScreen {
  if (group === 'Apps & Logs' && ['SMS log', 'Activity history', 'Export log'].includes(link)) return 'logs'
  if (group === 'Apps & Logs') return 'apps'
  if (group === 'Online Store' || group === 'Sales Channels') return 'store'
  if (group === 'Orders') return 'orders'
  if (group === 'Products') return 'products'
  if (group === 'Marketing') return 'marketing'
  if (group === 'Customers') return 'customers'
  if (group === 'Staff') return 'staff'
  if (group === 'Reports') return 'reports'
  if (group === 'Support') return 'support'
  if (group === 'Shipping') return 'shipping'
  if (group === 'Payments') return 'payments'
  if (group === 'Settings') return 'settings'
  return 'summary'
}

function groupForSection(section: Section): string {
  if (section.id === 'store') return 'Online Store'
  if (section.id === 'apps' || section.id === 'logs') return 'Apps & Logs'
  if (section.id === 'settings') return 'Settings'
  return section.label
}

function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePageKey, setActivePageKey] = useState<string | null>(null)
  const active = useMemo(() => sections.find((section) => section.id === screen) ?? sections[0], [screen])

  if (screen === 'landing') {
    return <PublicHome setScreen={setScreen} />
  }

  if (screen === 'register') {
    return <RegisterPage setScreen={setScreen} />
  }

  if (screen === 'verification') {
    return <VerificationPage setScreen={setScreen} />
  }

  if (screen === 'onboarding') {
    return <OnboardingPage setScreen={setScreen} />
  }

  return (
    <main className="salla-shell" dir="ltr">
      <Header active={active} screen={screen} setScreen={setScreen} setActivePageKey={setActivePageKey} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && <MegaMenu setScreen={setScreen} setActivePageKey={setActivePageKey} setMenuOpen={setMenuOpen} />}
      <SubNav active={active} activePageKey={activePageKey} setScreen={setScreen} setActivePageKey={setActivePageKey} />
      <section className="workspace">
        {activePageKey ? <DynamicPage pageKey={activePageKey} setScreen={setScreen} setActivePageKey={setActivePageKey} /> : (
          <>
            {screen === 'summary' && <StoreSummary />}
            {screen === 'orders' && <Orders />}
            {screen === 'products' && <Products />}
            {screen === 'marketing' && <Marketing />}
            {screen === 'store' && <StoreDesign />}
            {screen === 'customers' && <Customers />}
            {screen === 'staff' && <Staff />}
            {screen === 'reports' && <Reports />}
            {screen === 'support' && <Support />}
            {screen === 'shipping' && <Shipping />}
            {screen === 'payments' && <Payments />}
            {screen === 'apps' && <Apps />}
            {screen === 'logs' && <Logs />}
            {screen === 'settings' && <SettingsPage />}
          </>
        )}
      </section>
      <button className="chat-fab" aria-label="الدعم الفني"><MessageCircle size={24} /></button>
    </main>
  )
}

function PublicHome({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const stats = [
    ['68K+', 'متجر إلكتروني يمكن إدارته من لوحة واحدة'],
    ['40B+', 'مبيعات قابلة للمتابعة عبر التقارير'],
    ['15M+', 'طلب يمكن تنظيمه حسب الحالة والقناة'],
  ]
  const sectors = ['الأزياء', 'الإلكترونيات', 'المطاعم والمقاهي', 'العطور والتجميل', 'المنتجات الرقمية', 'الهدايا', 'الخدمات', 'الكتب والتعليم']
  const solutions = [
    ['إنشاء المتجر', 'تسجيل، تحقق، أسئلة تجهيز، اختيار باقة، ثم Store Summary واضح.'],
    ['تصميم الواجهة', 'ثيمات، ألوان، شعار، صفحات تعريفية، دومين، ومعاينة مباشرة.'],
    ['إدارة العمليات', 'طلبات، منتجات، مخزون، عملاء، موظفين، شحن، ومدفوعات كواجهات جاهزة.'],
    ['النمو والتسويق', 'إعلانات، كوبونات، سلات متروكة، ولاء، SEO، وتقويم تسويقي.'],
  ]
  const plans = [
    ['Basic', 'مجاني', 'للبداية وتجربة تجهيز المتجر'],
    ['Plus', '99 AED / شهر', 'للمتاجر الصغيرة وأدوات النمو'],
    ['Pro', '299 AED / شهر', 'للشركات والفرق والتقارير المتقدمة'],
  ]

  return (
    <main className="public-shell" dir="rtl">
      <header className="public-header">
        <button className="public-brand">
          <span>مدار</span>
          <small>صانع متاجر ذكي</small>
        </button>
        <nav>
          <button onClick={() => scrollTo('solutions')}>الحلول</button>
          <button onClick={() => scrollTo('pricing')}>الأسعار</button>
          <button onClick={() => scrollTo('builder')}>الثيمات</button>
          <button onClick={() => scrollTo('resources')}>الموارد</button>
        </nav>
        <div>
          <button className="public-ghost" onClick={() => setScreen('register')}>تسجيل دخول</button>
          <button className="public-primary" onClick={() => setScreen('register')}>أنشئ متجرك</button>
        </div>
      </header>

      <section className="public-hero">
        <div className="public-copy">
          <span className="public-badge">من الفكرة إلى متجر جاهز</span>
          <h1>مدار.. ابنِ متجرك الإلكتروني بتجربة مرنة وسريعة</h1>
          <p>
            واجهة عربية لصناعة المتاجر: تسجيل، أسئلة تجهيز المتجر، اختيار الباقة، ثم لوحة تحكم كاملة لإدارة الطلبات والمنتجات والتسويق والتقارير.
          </p>
          <div className="public-actions">
            <button className="public-primary" onClick={() => setScreen('register')}>دخول لوحة التحكم</button>
            <button className="public-secondary" onClick={() => setScreen('register')}>استعراض صناعة الموقع</button>
          </div>
        </div>
        <div className="public-dashboard-preview" dir="ltr">
          <div className="preview-header"><span /><b>Store Summary</b><i /></div>
          <div className="preview-alert" />
          <div className="preview-progress"><span /></div>
          <div className="preview-layout">
            <section>
              <h3>Add your branding</h3>
              <i /><i /><i />
            </section>
            <aside>
              <b>Your store preview</b>
              <div />
            </aside>
          </div>
        </div>
      </section>

      <section className="public-stats">
        {stats.map(([value, label]) => <article key={value}><b>{value}</b><span>{label}</span></article>)}
      </section>

      <section className="public-band">
        <span>تجربة التاجر كاملة</span>
        <h2>من أول زيارة للموقع إلى لوحة تحكم جاهزة</h2>
        <p>الصفحة الرئيسية لازم تشرح المنصة، تقود المستخدم للتسجيل، وتعرض الثقة والحلول قبل ما يدخل الداشبورد.</p>
      </section>

      <section className="public-sectors">
        <div>
          <span>القطاعات</span>
          <h2>ابدأ مهما كان نوع تجارتك</h2>
        </div>
        <div>
          {sectors.map((sector, index) => <button className={index === 0 ? 'active' : ''} key={sector}>{sector}</button>)}
        </div>
      </section>

      <section className="public-sections" id="solutions">
        {solutions.map(([title, body]) => (
          <article key={title}>
            <Sparkles size={24} />
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="public-builder" id="builder">
        <div>
          <span>صانع الموقع</span>
          <h2>واجهة صناعة متجر بدون باك اند الآن</h2>
          <p>نركز في هذه المرحلة على الشاشات: اختيار الثيم، تعديل البراند، الدومين، الصفحات، المنتجات، والمعاينة.</p>
          <button className="public-primary" onClick={() => setScreen('store')}>افتح صانع الموقع</button>
        </div>
        <div className="builder-board" dir="ltr">
          {['Theme', 'Branding', 'Domain', 'Pages', 'Products', 'Preview'].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="public-pricing" id="pricing">
        <div className="public-section-head">
          <span>الباقات</span>
          <h2>اختيار الباقة يظهر قبل الداشبورد</h2>
        </div>
        <div>
          {plans.map(([name, price, body]) => (
            <article key={name}>
              <h3>{name}</h3>
              <b>{price}</b>
              <p>{body}</p>
              <button onClick={() => setScreen('register')}>اختيار</button>
            </article>
          ))}
        </div>
      </section>

      <section className="public-trust">
        {['BLANCO', 'CAVALEY', 'LAYLI', 'Nintendo', 'بيت العود', 'كنوز', 'مقهى يومي', 'متجر ورد'].map((brand) => <span key={brand}>{brand}</span>)}
      </section>

      <footer className="public-footer" id="resources">
        <div>
          <h2>مدار</h2>
          <p>نسخة واجهات لصانع متاجر مدار، مصممة لتكون مرنة وواضحة قبل ربط الباك اند.</p>
        </div>
        <div>
          <h3>المنصة</h3>
          <button>الحلول</button>
          <button>الأسعار</button>
          <button>الثيمات</button>
        </div>
        <div>
          <h3>لوحة التحكم</h3>
          <button onClick={() => setScreen('orders')}>الطلبات</button>
          <button onClick={() => setScreen('products')}>المنتجات</button>
          <button onClick={() => setScreen('reports')}>التقارير</button>
        </div>
      </footer>
    </main>
  )
}

function RegisterPage({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <main className="auth-shell" dir="rtl">
      <button className="auth-logo" onClick={() => setScreen('landing')}>مدار</button>
      <section className="auth-layout">
        <aside className="auth-visual">
          <span>ابدأ الآن</span>
          <h1>أنشئ متجرك الإلكتروني في دقائق</h1>
          <p>رحلة مدار الكاملة: تسجيل الحساب، التحقق، أسئلة تجهيز المتجر، ثم لوحة التحكم.</p>
          <div className="auth-illustration" dir="ltr">
            <i /><i /><i />
            <section><b>Store setup</b><span /></section>
            <section><b>Verify account</b><span /></section>
            <section><b>Choose plan</b><span /></section>
          </div>
        </aside>
        <section className="auth-card">
          <button className="auth-back" onClick={() => setScreen('landing')}>رجوع</button>
          <h2>أنشئ حسابك في مدار</h2>
          <p>أدخل بياناتك الأساسية للانتقال إلى صفحة التحقق.</p>
          <label>
            الاسم الكامل
            <input autoComplete="off" name="middar-owner-name" placeholder="مثال: سعيد منصور" />
          </label>
          <label>
            البريد الإلكتروني
            <input autoComplete="off" name="middar-owner-email" placeholder="name@example.com" />
          </label>
          <label>
            رقم الجوال
            <input autoComplete="off" name="middar-owner-phone" placeholder="+973 0000 0000" type="tel" />
          </label>
          <label>
            كلمة المرور
            <input autoComplete="new-password" name="middar-owner-password" placeholder="8 أحرف على الأقل" type="password" />
          </label>
          <label>
            أين يقع نشاطك؟
            <select defaultValue="bahrain">
              <option value="bahrain">البحرين</option>
              <option value="saudi">السعودية</option>
              <option value="uae">الإمارات</option>
              <option value="kuwait">الكويت</option>
            </select>
          </label>
          <button className="auth-submit" onClick={() => setScreen('verification')}>إنشاء الحساب</button>
          <small>بالمتابعة أنت توافق على الشروط وسياسة الخصوصية.</small>
        </section>
      </section>
    </main>
  )
}

function VerificationPage({ setScreen }: { setScreen: (screen: Screen) => void }) {
  return (
    <main className="auth-shell verify-shell" dir="rtl">
      <button className="auth-logo" onClick={() => setScreen('landing')}>مدار</button>
      <section className="verify-card-page">
        <button className="auth-back" onClick={() => setScreen('register')}>رجوع</button>
        <h1>تحقق من حسابك</h1>
        <p>أدخل رمز التحقق المرسل إلى بريدك أو جوالك لإكمال إنشاء المتجر.</p>
        <div className="otp-row" dir="ltr">
          <input maxLength={1} defaultValue="7" />
          <input maxLength={1} defaultValue="5" />
          <input maxLength={1} defaultValue="8" />
          <input maxLength={1} defaultValue="3" />
        </div>
        <button className="auth-submit" onClick={() => setScreen('onboarding')}>تحقق</button>
        <button className="link-button">إعادة إرسال الرمز</button>
      </section>
    </main>
  )
}

const onboardingSteps = [
  {
    question: 'أين يقع نشاطك التجاري؟',
    helper: 'اختيار الدولة يساعدنا نجهز المتطلبات والقنوات المناسبة.',
    options: ['البحرين', 'السعودية', 'الإمارات', 'الكويت', 'دولة أخرى'],
  },
  {
    question: 'هل نشاطك قائم حاليًا؟',
    helper: 'بنخصص التجربة حسب مرحلة مشروعك.',
    options: ['نعم، أبيع حاليًا', 'لا، أبدأ مشروع جديد'],
  },
  {
    question: 'هل عندك سجل تجاري أو رخصة تجارية؟',
    helper: 'هذه خطوة واجهة فقط الآن، التوثيق الفعلي مؤجل للباك اند.',
    options: ['نعم', 'لا', 'قيد الاستخراج'],
  },
  {
    question: 'أين تبيع حاليًا؟',
    helper: 'بنجهز لك أدوات النقل أو الربط حسب قناتك الحالية.',
    options: ['متجر فعلي', 'منصة تجارة إلكترونية أخرى', 'وسائل التواصل', 'Marketplaces', 'لا أبيع حاليًا'],
  },
  {
    question: 'ماذا تخطط أن تبيع؟',
    helper: 'نوع المنتج يحدد شاشات المنتج والشحن والخدمات.',
    options: ['منتجات فعلية', 'دروبشيبنق', 'منتجات رقمية', 'خدمات وحجوزات', 'أطعمة ومشروبات'],
  },
  {
    question: 'كم مبيعاتك الشهرية تقريبًا؟',
    helper: 'نستخدمها لاحقًا لتخصيص التقارير والاقتراحات.',
    options: ['أقل من 5K AED', '5K - 25K AED', '25K - 100K AED', '100K - 500K AED', 'أكثر من 500K AED'],
  },
  {
    question: 'كم شخص سيعمل على المتجر؟',
    helper: 'يساعدنا نبرز شاشات الموظفين والصلاحيات إذا احتجتها.',
    options: ['أنا فقط', '2 إلى 5', '6 إلى 20', 'أكثر من 20'],
  },
  {
    question: 'ما القطاع الأقرب لمتجرك؟',
    helper: 'اختر قطاعًا واحدًا الآن، ويمكن تعديل ذلك لاحقًا.',
    options: ['إلكترونيات', 'أزياء', 'عطور وتجميل', 'مطاعم ومقاهي', 'هدايا وإكسسوارات', 'منتجات رقمية', 'خدمات', 'كتب وتعليم'],
  },
]

void onboardingSteps

type OnboardingOption = {
  label: string
  next?: string
}

type OnboardingFlowStep = {
  question: string
  helper: string
  options: OnboardingOption[]
}

const onboardingFlow: Record<string, OnboardingFlowStep> = {
  country: {
    question: 'أين يقع نشاطك التجاري؟',
    helper: 'اختيار الدولة يحدد المتطلبات والقنوات المناسبة من البداية.',
    options: [
      { label: 'البحرين', next: 'business_stage' },
      { label: 'السعودية', next: 'business_stage' },
      { label: 'الإمارات', next: 'business_stage' },
      { label: 'الكويت', next: 'market_waitlist' },
      { label: 'دولة أخرى', next: 'market_waitlist' },
    ],
  },
  market_waitlist: {
    question: 'مدار غير متاح بالكامل في دولتك حتى الآن',
    helper: 'نقدر نكمل تجهيز الواجهة ونحفظ اهتمامك، لكن إعدادات الدفع والشحن الرسمية تتغير حسب الدولة لاحقًا.',
    options: [
      { label: 'أكمل تجهيز المتجر كتجربة', next: 'business_stage' },
      { label: 'أبلغوني عند توفر الدولة', next: 'plans' },
    ],
  },
  business_stage: {
    question: 'هل نشاطك قائم حاليًا؟',
    helper: 'لو تبيع حاليًا نحتاج نسألك عن القنوات والمبيعات. لو تبدأ جديد نختصر المسار ونركز على التجهيز.',
    options: [
      { label: 'نعم، أبيع حاليًا', next: 'current_channels' },
      { label: 'لا، أبدأ مشروع جديد', next: 'license_status' },
    ],
  },
  current_channels: {
    question: 'أين تبيع حاليًا؟',
    helper: 'هذا يحدد هل نعرض لك شاشات نقل المنتجات، الربط، أو قنوات البيع.',
    options: [
      { label: 'متجر فعلي', next: 'license_status' },
      { label: 'منصة تجارة إلكترونية أخرى', next: 'migration_source' },
      { label: 'وسائل التواصل', next: 'license_status' },
      { label: 'Marketplaces', next: 'license_status' },
    ],
  },
  migration_source: {
    question: 'من أي منصة تريد نقل بياناتك؟',
    helper: 'نجهز لاحقًا شاشة استيراد مناسبة للمنصة التي تختارها.',
    options: [
      { label: 'منصة مشابهة', next: 'license_status' },
      { label: 'زد', next: 'license_status' },
      { label: 'شوبيفاي', next: 'license_status' },
      { label: 'منصة أخرى', next: 'license_status' },
    ],
  },
  license_status: {
    question: 'هل عندك سجل تجاري أو رخصة تجارية؟',
    helper: 'هذا يغير مسار التوثيق؛ لا نجبر المستخدم الجديد على نفس أسئلة المتجر القائم.',
    options: [
      { label: 'نعم', next: 'product_type' },
      { label: 'لا', next: 'license_intent' },
      { label: 'قيد الاستخراج', next: 'product_type' },
    ],
  },
  license_intent: {
    question: 'هل أنت في مرحلة استخراج الرخصة؟',
    helper: 'لو لا، نكمل مسار تجريبي ونؤجل التوثيق للباك اند لاحقًا.',
    options: [
      { label: 'نعم، أعمل عليها', next: 'product_type' },
      { label: 'لا، أحتاج أبدأ بدون رخصة الآن', next: 'product_type' },
    ],
  },
  product_type: {
    question: 'ماذا تخطط أن تبيع؟',
    helper: 'نوع المنتج يحدد ظهور الشحن، الملفات الرقمية، الحجوزات، أو المطاعم.',
    options: [
      { label: 'منتجات فعلية', next: 'monthly_sales' },
      { label: 'دروبشيبنق', next: 'monthly_sales' },
      { label: 'منتجات رقمية', next: 'team_size' },
      { label: 'خدمات وحجوزات', next: 'team_size' },
      { label: 'أطعمة ومشروبات', next: 'monthly_sales' },
    ],
  },
  monthly_sales: {
    question: 'كم مبيعاتك الشهرية تقريبًا؟',
    helper: 'هذا السؤال يظهر فقط للمسارات التي تحتاج توقعات تشغيل ومبيعات.',
    options: [
      { label: 'أقل من 5K AED', next: 'team_size' },
      { label: '5K - 25K AED', next: 'team_size' },
      { label: '25K - 100K AED', next: 'team_size' },
      { label: '100K - 500K AED', next: 'team_size' },
      { label: 'أكثر من 500K AED', next: 'team_size' },
    ],
  },
  team_size: {
    question: 'كم شخص سيعمل على المتجر؟',
    helper: 'نبرز شاشات الموظفين والصلاحيات فقط عندما تكون مفيدة.',
    options: [
      { label: 'أنا فقط', next: 'sector' },
      { label: '2 إلى 5', next: 'sector' },
      { label: '6 إلى 20', next: 'sector' },
      { label: 'أكثر من 20', next: 'sector' },
    ],
  },
  sector: {
    question: 'ما القطاع الأقرب لمتجرك؟',
    helper: 'آخر خطوة قبل اختيار الباقة. يمكن تعديلها لاحقًا من إعدادات المتجر.',
    options: [
      { label: 'إلكترونيات', next: 'plans' },
      { label: 'أزياء', next: 'plans' },
      { label: 'عطور وتجميل', next: 'plans' },
      { label: 'مطاعم ومقاهي', next: 'plans' },
      { label: 'هدايا وإكسسوارات', next: 'plans' },
      { label: 'منتجات رقمية', next: 'plans' },
      { label: 'خدمات', next: 'plans' },
      { label: 'كتب وتعليم', next: 'plans' },
    ],
  },
}

function OnboardingPage({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const [currentId, setCurrentId] = useState('country')
  const [history, setHistory] = useState<string[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const current = onboardingFlow[currentId]
  const isPlans = currentId === 'plans'
  const progress = Math.min(((history.length + 1) / 9) * 100, 100)

  const choose = (answer: string) => {
    const option = current.options.find((item) => item.label === answer)
    setAnswers((prev) => ({ ...prev, [currentId]: answer }))
    setHistory((prev) => [...prev, currentId])
    setCurrentId(option?.next ?? 'plans')
  }

  const goBack = () => {
    setHistory((prev) => {
      const next = [...prev]
      const previous = next.pop()
      setCurrentId(previous ?? 'country')
      return next
    })
  }

  return (
    <main className="qna-shell" dir="ltr">
      <button className="qna-logo" onClick={() => setScreen('landing')}>مدار</button>
      <section className="qna-card">
        <div className="qna-progress"><span style={{ width: `${progress}%` }} /></div>
        {!isPlans ? (
          <>
            <button className="auth-back" disabled={history.length === 0} onClick={goBack}>Go back</button>
            <small>Question {history.length + 1} · Branching setup</small>
            <h1>{current.question}</h1>
            <p>{current.helper}</p>
            <div className="qna-options">
              {current.options.map((option) => (
                <button className={answers[currentId] === option.label ? 'selected' : ''} key={option.label} onClick={() => choose(option.label)}>
                  {option.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <PlanChoice setScreen={setScreen} setStep={setCurrentId} />
        )}
      </section>
    </main>
  )
}

function PlanChoice({ setScreen, setStep }: { setScreen: (screen: Screen) => void; setStep: (step: string) => void }) {
  const plans = [
    ['مدار Basic', 'Free', 'For new sellers & explorers'],
    ['مدار Plus', 'AED 99 / Month', 'For small businesses'],
    ['مدار Pro', 'AED 299 / Month', 'For established companies'],
  ]

  return (
    <section className="plan-choice">
      <button className="auth-back" onClick={() => setStep('sector')}>Go back</button>
      <span>Monthly <b>Save 16% annually</b></span>
      <h1>Grow your business with the right plan</h1>
      <div>
        {plans.map(([name, price, body], index) => (
          <article className={index === 0 ? 'selected' : ''} key={name}>
            <h2>{name}</h2>
            <strong>{price}</strong>
            <p>{body}</p>
            <ul>
              <li>Unlimited Products</li>
              <li>Unlimited Customers</li>
              <li>Discount Coupons</li>
              <li>Customer Inquiries & Reviews</li>
            </ul>
            <button onClick={() => setScreen('summary')}>Select {name}</button>
          </article>
        ))}
      </div>
    </section>
  )
}

function Header({
  active,
  screen,
  setScreen,
  setActivePageKey,
  menuOpen,
  setMenuOpen,
}: {
  active: Section
  screen: Screen
  setScreen: (screen: Screen) => void
  setActivePageKey: (key: string | null) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}) {
  const mainItems = sections.slice(0, 5)
  const [activeTool, setActiveTool] = useState<'ask' | 'search' | 'notifications' | 'settings' | 'profile' | null>(null)
  const closeTools = () => setActiveTool(null)
  const openTool = (tool: typeof activeTool) => {
    setMenuOpen(false)
    setActiveTool((current) => current === tool ? null : tool)
  }

  return (
    <header className="main-header">
      <button
        className="brand brand-button"
        onClick={() => {
          setScreen('landing')
          setActivePageKey(null)
          closeTools()
          setMenuOpen(false)
        }}
      >
        <span className="brand-logo">مدار</span>
      </button>
      <nav className="main-nav">
        <button className={menuOpen ? 'active nav-button' : 'nav-button'} onClick={() => { closeTools(); setMenuOpen(!menuOpen) }}>
          <Menu size={18} /> All
        </button>
        {mainItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              className={screen === item.id ? 'active nav-button' : 'nav-button'}
              key={item.id}
              onClick={() => {
                setScreen(item.id)
                setActivePageKey(null)
                closeTools()
                setMenuOpen(false)
              }}
            >
              <Icon size={19} /> {item.label}
            </button>
          )
        })}
        <button
          className={active.id === 'reports' ? 'active nav-button' : 'nav-button'}
          onClick={() => {
            setScreen('reports')
            setActivePageKey(null)
            closeTools()
            setMenuOpen(false)
          }}
        >
          <BarChart3 size={19} /> Reports
        </button>
      </nav>
      <div className="header-tools">
        <button className={activeTool === 'ask' ? 'ask active' : 'ask'} aria-label="AI assistant" title="AI assistant" onClick={() => openTool('ask')}><Sparkles size={18} /></button>
        <button className={activeTool === 'search' ? 'tool active' : 'tool'} aria-label="Search" title="Search" onClick={() => openTool('search')}><Search size={20} /></button>
        <button className={screen === 'apps' ? 'tool active' : 'tool'} aria-label="Apps menu" title="Apps menu" onClick={() => { setScreen('apps'); setActivePageKey('Apps & Logs:My apps'); closeTools(); setMenuOpen(false) }}><Grid3X3 size={20} /></button>
        <button className={screen === 'support' ? 'tool active' : 'tool'} aria-label="Support inbox" title="Support inbox" onClick={() => { setScreen('support'); setActivePageKey('Support:Chat'); closeTools(); setMenuOpen(false) }}><MessageCircle size={20} /></button>
        <button className={activeTool === 'notifications' ? 'tool active' : 'tool'} aria-label="Notifications" title="Notifications" onClick={() => openTool('notifications')}><Bell size={20} /></button>
        <button className={activeTool === 'settings' ? 'tool active' : 'tool'} aria-label="Settings" title="Settings" onClick={() => openTool('settings')}><Settings size={20} /></button>
        <button className={activeTool === 'profile' ? 'profile active' : 'profile'} onClick={() => openTool('profile')}>
          <span>س</span>
          <b>سعيد</b>
          <small>Basic</small>
          <ChevronDown size={17} />
        </button>
        {activeTool && (
          <HeaderToolPanel
            activeTool={activeTool}
            setScreen={setScreen}
            setActivePageKey={setActivePageKey}
            closeTools={closeTools}
          />
        )}
      </div>
    </header>
  )
}

function HeaderToolPanel({
  activeTool,
  setScreen,
  setActivePageKey,
  closeTools,
}: {
  activeTool: 'ask' | 'search' | 'notifications' | 'settings' | 'profile'
  setScreen: (screen: Screen) => void
  setActivePageKey: (key: string | null) => void
  closeTools: () => void
}) {
  const go = (screen: DashboardScreen, pageKey?: string) => {
    setScreen(screen)
    setActivePageKey(pageKey ?? null)
    closeTools()
  }

  if (activeTool === 'search') {
    return (
      <section className="search-overlay">
        <button className="overlay-close" onClick={closeTools}>close</button>
        <div className="salla-search-box">
          <Search size={22} />
          <input autoFocus placeholder="Search pages or settings" />
        </div>
      </section>
    )
  }

  if (activeTool === 'notifications') {
    return (
      <section className="tool-popover notice-popover">
        <h3>Notifications</h3>
        <article><b>Email verification</b><p>Activate your email to unlock all dashboard features.</p></article>
        <article><b>Store setup</b><p>6 steps remaining before launch.</p></article>
        <button onClick={() => go('settings')}>Notification settings</button>
      </section>
    )
  }

  if (activeTool === 'profile') {
    return (
      <section className="tool-popover profile-popover">
        <div className="profile-summary"><span>Ø³</span><div><b>Ø³Ø¹ÙŠØ¯</b><small>Basic plan</small></div></div>
        <button onClick={() => go('settings', 'Settings:Balance & billing')}>Store plan & subscriptions</button>
        <button>Invite & earn</button>
        <button>Give feedback</button>
        <button onClick={() => go('settings', 'Settings:Notifications')}>Notification preferences</button>
      </section>
    )
  }

  if (activeTool === 'settings') {
    return <SettingsDrawer closeTools={closeTools} setScreen={setScreen} setActivePageKey={setActivePageKey} />
  }

  return (
    <section className="tool-popover ask-popover">
      <h3>AI assistant</h3>
      <p>Ask for store setup ideas, dashboard guidance, or launch checklist help.</p>
      <div className="quick-results">
        <button onClick={() => go('summary')}>Setup checklist</button>
        <button onClick={() => go('marketing', 'Marketing:إعلانات مدار')}>Marketing ideas</button>
        <button onClick={() => go('products', 'Products:All products')}>Product tasks</button>
      </div>
    </section>
  )
}

function SettingsDrawer({
  closeTools,
  setScreen,
  setActivePageKey,
}: {
  closeTools: () => void
  setScreen: (screen: Screen) => void
  setActivePageKey: (key: string | null) => void
}) {
  const [activeSetting, setActiveSetting] = useState(settingsCatalog[0].key)
  const activeDetail = settingsCatalog.find((item) => item.key === activeSetting) ?? settingsCatalog[0]

  return (
    <section className="settings-drawer">
      <aside>
        <h2>Settings</h2>
        <label><Search size={17} /><input placeholder="Search settings" /></label>
        <nav className="settings-nav-scroll">
          {settingsCatalog.map((item) => (
            <button className={activeSetting === item.key ? 'active' : ''} key={item.key} onClick={() => setActiveSetting(item.key)}>
              <span><SettingIcon name={item.key} /></span>
              {item.title}
            </button>
          ))}
        </nav>
      </aside>
      <section>
        <div className="drawer-head">
          <h2>{activeDetail.title}</h2>
          <div>
            <button
              aria-label="Expand settings"
              onClick={() => {
                setScreen('settings')
                setActivePageKey(`Settings:${activeSetting}`)
                closeTools()
              }}
            >
              <Grid3X3 size={18} />
            </button>
            <button aria-label="Close settings" onClick={closeTools}>x</button>
          </div>
        </div>
        <SettingsContent detail={activeDetail} compact />
      </section>
    </section>
  )
}

function MegaMenu({
  setScreen,
  setActivePageKey,
  setMenuOpen,
}: {
  setScreen: (screen: Screen) => void
  setActivePageKey: (key: string | null) => void
  setMenuOpen: (open: boolean) => void
}) {
  return (
    <section className="mega-menu">
      {menuGroups.map(([group, links]) => (
        <article key={group}>
          <h3>{group}</h3>
          {(links as string[]).map((link) => (
            <button
              key={link}
              onClick={() => {
                setScreen(routeForMenuLink(group, link))
                setActivePageKey(`${group}:${link}`)
                setMenuOpen(false)
              }}
            >
              {link}
            </button>
          ))}
        </article>
      ))}
    </section>
  )
}

function SubNav({
  active,
  activePageKey,
  setScreen,
  setActivePageKey,
}: {
  active: Section
  activePageKey: string | null
  setScreen: (screen: Screen) => void
  setActivePageKey: (key: string | null) => void
}) {
  const group = groupForSection(active)
  const activeTab = activePageKey?.startsWith(`${group}:`) ? activePageKey.split(':')[1] : active.tabs[0]
  const openTab = (tab: string) => {
    if (active.id === 'summary') {
      setScreen('summary')
      setActivePageKey(null)
      return
    }

    setScreen(routeForMenuLink(group, tab))
    setActivePageKey(`${group}:${tab}`)
  }

  return (
    <nav className="sub-nav">
      <div>
        {active.tabs.map((tab) => (
          <button
            aria-label={tab}
            className={activeTab === tab ? 'active' : ''}
            key={tab}
            onClick={() => openTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {active.action && (
        <button
          className="mint-action"
          onClick={() => {
            setScreen(active.id)
            setActivePageKey(`${group}:${active.action}`)
          }}
        >
          <Plus size={18} /> {active.action}
        </button>
      )}
    </nav>
  )
}

function StoreSummary() {
  return (
    <div className="page-stack">
      <Alert />
      <section className="setup">
        <div className="setup-title">
          <h1>Continue setting up your store 🚀</h1>
          <b>1/7</b>
        </div>
        <div className="progress"><span /></div>
        <div className="setup-grid">
          <article className="setup-card">
            <div className="setup-card-head">
              <h2>Add your branding</h2>
              <button>⌃</button>
            </div>
            <Label title="Store name" helper="Enter a name for your store" placeholder="Enter your store name" />
            <label className="field">
              <span>Store description <em>Optional</em></span>
              <small>Add a short description to show visitors what your store is about</small>
              <textarea placeholder="Write a short description" />
              <b>0/200</b>
            </label>
            <div className="upload">
              <span><Palette size={30} /></span>
              <b>Drag & drop image</b>
              <button>or browse device</button>
            </div>
            <Label title="Store primary color" helper="Pick a color that matches your brand" placeholder="#000000" />
            <button className="save">Save</button>
          </article>
          <aside className="preview-card">
            <h3>Your branding appears in your store's header and footer</h3>
            <div className="browser-preview">
              <div className="preview-top"><i /><i /><i /><span /></div>
              <div className="preview-search" />
              <div className="preview-hero"><span /><div><i /><i /></div></div>
              <div className="preview-footer"><i /><i /><i /><i /><i /></div>
            </div>
          </aside>
        </div>
        <Checklist />
      </section>
    </div>
  )
}

function Alert() {
  return (
    <section className="email-alert" dir="rtl">
      <div>
        <h2>تفعيل البريد الإلكتروني</h2>
        <p>يرجى تفعيل بريدك الإلكتروني للوصول الكامل إلى جميع مزايا المتجر.</p>
      </div>
      <button>إعادة إرسال رابط التفعيل</button>
    </section>
  )
}

function Checklist() {
  return (
    <div className="checklist">
      {setupTasks.map(([step, action, helper], index) => (
        <article key={step}>
          <span>{index + 2}</span>
          <b>{step}</b>
          <small>{helper}</small>
          <button>{action}</button>
        </article>
      ))}
    </div>
  )
}

function DynamicPage({
  pageKey,
  setScreen,
  setActivePageKey,
}: {
  pageKey: string
  setScreen: (screen: Screen) => void
  setActivePageKey: (key: string | null) => void
}) {
  const [group, link] = pageKey.split(':')
  const route = routeForMenuLink(group, link)
  const groupLinks = menuGroups.find(([name]) => name === group)?.[1] ?? [link]
  const detail = specialPageDetails[pageKey]
  const asideTitle = group === 'Apps & Logs' ? 'Apps & Logs' : group
  const pageTitle = link || sections.find((section) => section.id === route)?.label || 'Home'
  const openSidePage = (item: string) => {
    setScreen(routeForMenuLink(group, item))
    setActivePageKey(`${group}:${item}`)
  }

  if (pageKey === 'Products:New product' || pageKey === 'Products:Product editor') {
    return <ProductEditorPage mode={pageKey.endsWith('New product') ? 'new' : 'bulk'} />
  }

  if (pageKey === 'Products:Product settings') {
    return <ProductSettingsPage />
  }

  if (pageKey === 'Products:Categories & options') {
    return <CategoriesOptionsPage />
  }

  if (pageKey === 'Orders:New order') {
    return <NewOrderPage />
  }

  if (pageKey === 'Orders:Order settings') {
    return <OrderSettingsPage />
  }

  if (pageKey === 'Marketing:Create Ad') {
    return <CampaignBuilderPage />
  }

  if (pageKey === 'Online Store:Store design' || pageKey === 'Online Store:Theme Marketplace' || pageKey === 'Online Store:Manage themes') {
    return <ThemeEditorPage />
  }

  if (pageKey === 'Online Store:Domain') {
    return <DomainPage />
  }

  if (pageKey === 'Online Store:Information pages' || pageKey === 'Online Store:Custom URLs') {
    return <InformationPagesPage activeView={pageTitle} />
  }

  if (route === 'payments') {
    return (
      <PageShell crumb="Payments" title={pageTitle} aside={<FilterList title="Payments" items={groupLinks} activeItem={pageTitle} onItemClick={openSidePage} />}>
        <Payments />
      </PageShell>
    )
  }

  if (route === 'shipping') {
    return (
      <PageShell crumb="Shipping" title={pageTitle} aside={<FilterList title="Shipping" items={groupLinks} activeItem={pageTitle} onItemClick={openSidePage} />}>
        <Shipping />
      </PageShell>
    )
  }

  if (route === 'apps') {
    return (
      <PageShell crumb="Apps & Logs" title={pageTitle} aside={<FilterList title="Apps & Logs" items={groupLinks} activeItem={pageTitle} onItemClick={openSidePage} />}>
        <Apps />
      </PageShell>
    )
  }

  if (route === 'logs') {
    return (
      <PageShell crumb="Apps & Logs" title={pageTitle} aside={<FilterList title="Apps & Logs" items={groupLinks} activeItem={pageTitle} onItemClick={openSidePage} />}>
        <Logs />
      </PageShell>
    )
  }

  if (route === 'settings') {
    return <SettingsPage key={pageTitle} initialSetting={pageTitle} />
  }

  if (detail) {
    return (
      <PageShell crumb={group} title={pageTitle} aside={<FilterList title={asideTitle} items={groupLinks} activeItem={pageTitle} onItemClick={openSidePage} />}>
        <LockedFeature title={pageTitle} badge={detail.badge} body={detail.title} description={detail.body} />
        {detail.locked ? <UnavailablePanel /> : <PagePreview title={detail.title} group={group} link={pageTitle} />}
      </PageShell>
    )
  }

  if (route === 'orders') {
    if (pageTitle === 'All orders') return <Orders />

    return (
      <PageShell crumb="Orders" title={pageTitle} aside={<FilterList title="Orders" items={groupLinks} activeItem={pageTitle} onItemClick={openSidePage} />}>
        <PagePreview title={pageTitle} group={group} link={pageTitle} />
      </PageShell>
    )
  }

  if (route === 'products') {
    return (
      <PageShell crumb="Products" title={pageTitle} aside={<FilterList title="Products" items={groupLinks} activeItem={pageTitle} onItemClick={openSidePage} />}>
        {pageTitle === 'All products' ? <SplitEmpty title="No products selected" action="Filter" /> : <PagePreview title={pageTitle} group={group} link={pageTitle} />}
      </PageShell>
    )
  }

  if (route === 'marketing') {
    return (
      <PageShell crumb="Marketing" title={pageTitle} aside={<FilterList title="Marketing" items={groupLinks} activeItem={pageTitle} onItemClick={openSidePage} />}>
        <PagePreview title={pageTitle} group={group} link={pageTitle} />
      </PageShell>
    )
  }

  if (route === 'store') {
    return (
      <PageShell crumb={group} title={pageTitle} aside={<FilterList title={group} items={groupLinks} activeItem={pageTitle} onItemClick={openSidePage} />}>
        {pageTitle === 'Store design' || pageTitle === 'Theme Marketplace' ? (
          <FeatureHero title={pageTitle} badge="Available on your plan" body="Customize the storefront experience, pages, channels, and launch-ready presentation." action="Open editor" />
        ) : (
          <PagePreview title={pageTitle} group={group} link={pageTitle} />
        )}
      </PageShell>
    )
  }

  if (route === 'reports') {
    return (
      <PageShell crumb="Reports" title={pageTitle} aside={<FilterList title="Reports" items={groupLinks} activeItem={pageTitle} onItemClick={openSidePage} />}>
        <div className="date-card">Jul 2026, 28 - Aug 2026, 04 <button>...</button></div>
        <MetricGrid metrics={[['Gross sales', ''], ['Orders', ''], ['Conversion', ''], ['Visits', '']]} skeleton />
      </PageShell>
    )
  }

  return (
    <PageShell crumb={group} title={pageTitle} aside={<FilterList title={asideTitle} items={groupLinks} activeItem={pageTitle} onItemClick={openSidePage} />}>
      <PagePreview title={pageTitle} group={group} link={pageTitle} />
    </PageShell>
  )
}

function PagePreview({ title, group, link }: { title: string; group: string; link: string }) {
  const [notice, setNotice] = useState('Ready screen')
  const rows = [
    [title, group, notice],
    ['Filters', 'Visual only', 'No backend yet'],
    ['Actions', link.includes('settings') || link.includes('Settings') ? 'Settings layout' : 'Empty state', 'Draft'],
  ]

  return (
    <div className="dynamic-stack">
      <section className="dynamic-hero">
        <span>{group}</span>
        <h1>{title}</h1>
        <p>This screen is now connected from the All menu with its own title, breadcrumb, side navigation, and مدار workspace state.</p>
        <div>
          <button onClick={() => setNotice('Primary action selected')}>Primary action</button>
          <button onClick={() => setNotice('Guide panel opened')}>Learn more</button>
        </div>
      </section>
      <div className="split-empty">
        <section>
          <button className="filter"><Filter size={17} /> Filter</button>
          <div className="empty-lines"><i /><i /><i /><i /></div>
        </section>
        <section><Empty title={`No ${title.toLowerCase()} selected`} body="The visual structure is ready. Functional data can be connected later." /></section>
      </div>
      <Panel title={`${title} preview`}>
        <Table rows={rows} />
      </Panel>
    </div>
  )
}

function UnavailablePanel() {
  return (
    <section className="unavailable-panel">
      <div>
        <ShieldCheck size={38} />
        <span>Upgrade required</span>
        <h2>This feature isn't available on your plan</h2>
        <p>Try the "Pro" or "Special" plan free to unlock this feature and more for your store.</p>
      </div>
      <div className="locked-actions">
        <button>Learn more</button>
        <button>Start free trial</button>
      </div>
    </section>
  )
}

function ProductEditorPage({ mode }: { mode: 'new' | 'bulk' }) {
  const setupSections = ['Basic information', 'Price & inventory', 'Images', 'Shipping', 'SEO', 'Options']
  const [activeSection, setActiveSection] = useState(setupSections[0])
  const [saveState, setSaveState] = useState('Draft not saved')

  return (
    <PageShell crumb="Products" title={mode === 'new' ? 'New product' : 'Product editor'} aside={<FilterList title="Product setup" items={setupSections} activeItem={activeSection} onItemClick={setActiveSection} />}>
      <section className="form-workspace">
        <div className="form-main">
          <Panel title={mode === 'new' ? 'Basic information' : 'Bulk product editor'}>
            <div className="form-grid">
              <Label title="Product name" helper="Visible in storefront and dashboard" placeholder="Example: Linen abaya" />
              <Label title="SKU" helper="Optional product identifier" placeholder="MD-ABY-001" />
              <label className="field wide">
                <span>Description <em>Optional</em></span>
                <small>Add clear details for your customers.</small>
                <textarea placeholder="Write product description" />
              </label>
            </div>
          </Panel>
          <Panel title="Price & inventory">
            <div className="form-grid three">
              <Label title="Price" helper="Default selling price" placeholder="0.000 BHD" />
              <Label title="Sale price" helper="Optional discount price" placeholder="0.000 BHD" />
              <Label title="Quantity" helper="Available stock" placeholder="0" />
            </div>
          </Panel>
          <Panel title="Images">
            <div className="upload wide-upload">
              <span><ShoppingBag size={30} /></span>
              <b>Drag & drop product images</b>
              <button onClick={() => setSaveState('Image picker opened')}>or browse device</button>
            </div>
          </Panel>
          <Panel title={`${activeSection} details`}>
            <Table rows={[
              ['Section', activeSection, 'Active'],
              ['Preview', activeSection === 'SEO' ? 'Search preview ready' : 'Visible in product workflow', 'Draft'],
              ['Validation', activeSection === 'Price & inventory' ? 'Price and stock required' : 'Optional details', 'Visual'],
            ]} />
          </Panel>
        </div>
        <aside className="form-side">
          <Panel title="Publishing">
            <div className="setting-list">
              <label><span>Product status</span><select defaultValue="sale"><option value="sale">For sale</option><option value="hidden">Hidden</option></select></label>
              <label><span>Requires shipping</span><input type="checkbox" defaultChecked /></label>
              <label><span>Taxable product</span><input type="checkbox" /></label>
            </div>
            <button className="save" onClick={() => setSaveState('Product draft saved')}>Save product</button>
            <p className="inline-status">{saveState}</p>
          </Panel>
          <Panel title="Preview">
            <Empty title="Product preview" body="Preview updates after adding product images and details." />
          </Panel>
        </aside>
      </section>
    </PageShell>
  )
}

function ProductSettingsPage() {
  const [activeCard, setActiveCard] = useState('Product display')
  const settings = [
    ['Product display', 'Control product visibility, sold-out labels, and storefront badges.'],
    ['Inventory alerts', 'Choose low-stock thresholds and stock notifications.'],
    ['Reviews and questions', 'Show reviews, product questions, and moderation states.'],
    ['Digital products', 'Prepare download delivery and access rules for digital items.'],
    ['Product SEO', 'Default title and metadata patterns for products.'],
    ['Import & export', 'Templates, mapping, and product file previews.'],
  ]

  return (
    <PageShell crumb="Products" title="Product settings" aside={<FilterList title="Products" items={['Product settings', 'Categories & options', 'Inventory management', 'Import & export']} activeItem="Product settings" />}>
      <section className="settings-grid">
        {settings.map(([title, body]) => (
          <article className={activeCard === title ? 'active-card' : ''} key={title}><ShoppingBag size={22} /><h3>{title}</h3><p>{body}</p><button onClick={() => setActiveCard(title)}>Open</button></article>
        ))}
      </section>
      <Panel title={activeCard}>
        <Table rows={[['Status', 'Editable', 'Visual only'], ['Current value', activeCard.includes('Inventory') ? 'Low stock at 5 units' : 'Default storefront behavior', 'Active'], ['Last action', 'Opened from settings card', 'Ready']]} />
      </Panel>
    </PageShell>
  )
}

function CategoriesOptionsPage() {
  const [activeCatalog, setActiveCatalog] = useState('Categories')
  return (
    <PageShell crumb="Products" title="Categories & options" aside={<FilterList title="Catalog" items={['Categories', 'Product options', 'Brands', 'Tags']} activeItem={activeCatalog} onItemClick={setActiveCatalog} />}>
      <div className="two-panels">
        <Panel title={activeCatalog}>
          <Table rows={[['Abayas', '12 products', 'Visible'], ['Perfumes', '8 products', 'Visible'], ['New arrivals', '0 products', 'Draft']]} />
        </Panel>
        <Panel title="Product options">
          <Table rows={[['Size', 'S, M, L, XL', 'Active'], ['Color', 'Black, Beige, Olive', 'Active'], ['Gift wrap', 'Yes / No', 'Draft']]} />
        </Panel>
      </div>
    </PageShell>
  )
}

function NewOrderPage() {
  const orderSteps = ['Customer', 'Products', 'Shipping', 'Payment', 'Review']
  const [activeStep, setActiveStep] = useState(orderSteps[0])
  const [orderNote, setOrderNote] = useState('No products added')

  return (
    <PageShell crumb="Orders" title="New order" aside={<FilterList title="Order flow" items={orderSteps} activeItem={activeStep} onItemClick={setActiveStep} />}>
      <section className="form-workspace">
        <div className="form-main">
          <Panel title="Customer">
            <div className="form-grid">
              <Label title="Customer name" helper="Search or enter customer name" placeholder="Customer name" />
              <Label title="Phone number" helper="Used for order updates" placeholder="+973 0000 0000" />
            </div>
          </Panel>
          <Panel title="Products">
            <div className="products-toolbar">
              <label><Search size={17} /><input placeholder="Search products to add" /></label>
              <button className="filter" onClick={() => setOrderNote('Custom item added to visual order') }><Plus size={17} /> Add custom item</button>
            </div>
            <Empty title={orderNote} body="Search and add products to start the order." />
          </Panel>
          <Panel title={`${activeStep} step`}>
            <Table rows={[['Current step', activeStep, 'Open'], ['Validation', activeStep === 'Review' ? 'Ready for review' : 'Needs merchant input', 'Draft']]} />
          </Panel>
        </div>
        <aside className="form-side">
          <Panel title="Order summary">
            <Table rows={[['Subtotal', '0.000 BHD'], ['Shipping', '0.000 BHD'], ['Total', '0.000 BHD']]} />
            <button className="save">Create order</button>
          </Panel>
        </aside>
      </section>
    </PageShell>
  )
}

function OrderSettingsPage() {
  const [activeSetting, setActiveSetting] = useState('Checkout behavior')
  const settings = [
    ['Checkout behavior', 'Control notes, order confirmation, and customer checkout options.'],
    ['Invoice numbering', 'Prefix, sequence, and invoice appearance.'],
    ['Order tags', 'Automatic tags based on products, city, or payment method.'],
    ['Status automation', 'Move orders based on simple visual rules.'],
    ['Customer messages', 'Templates for order created, shipped, and delivered.'],
    ['Custom fields', 'Collect extra order or registration information.'],
  ]

  return (
    <PageShell crumb="Orders" title="Order settings" aside={<FilterList title="Settings" items={['General', 'Checkout fields', 'Invoices', 'Auto tags', 'Notifications']} activeItem="General" />}>
      <section className="settings-grid">
        {settings.map(([title, body]) => (
          <article className={activeSetting === title ? 'active-card' : ''} key={title}><ClipboardList size={22} /><h3>{title}</h3><p>{body}</p><button onClick={() => setActiveSetting(title)}>Open</button></article>
        ))}
      </section>
      <Panel title={activeSetting}>
        <Table rows={[['Preview', activeSetting, 'Open'], ['Rule status', activeSetting.includes('Custom') ? 'Available on higher plan' : 'Editable draft', 'Visual']]} />
      </Panel>
    </PageShell>
  )
}

function CampaignBuilderPage() {
  const [activeChannel, setActiveChannel] = useState('Snapchat')
  const [activeStep, setActiveStep] = useState('Channel')

  return (
    <PageShell crumb="Marketing" title="Create Ad" aside={<FilterList title="Campaign setup" items={['Channel', 'Audience', 'Budget', 'Creative', 'Review']} activeItem={activeStep} onItemClick={setActiveStep} />}>
      <section className="form-workspace">
        <div className="form-main">
          <FeatureHero title="Create Ad" badge="Visual setup" body="Build a campaign draft and preview its structure before connecting real ad accounts." action="Start draft" />
          <Panel title="Channel">
            <SelectableTabs items={['Snapchat', 'TikTok', 'Google', 'Meta', 'YouTube']} activeItem={activeChannel} onChange={setActiveChannel} />
          </Panel>
          <Panel title="Campaign details">
            <div className="form-grid">
              <Label title="Campaign name" helper="Internal name shown in reports" placeholder="Summer launch" />
              <Label title="Daily budget" helper="Preview only" placeholder="10.000 BHD" />
            </div>
          </Panel>
        </div>
        <aside className="form-side">
          <Panel title={`${activeChannel} readiness`}>
            <Table rows={[['Step', activeStep], ['Pixel', activeChannel === 'Google' ? 'Tag not connected' : 'Not connected'], ['Audience', 'Draft'], ['Payment', 'Pending']]} />
          </Panel>
        </aside>
      </section>
    </PageShell>
  )
}

function Orders() {
  const [activeStatus, setActiveStatus] = useState(orderStatuses[0])
  const [selectedOrder, setSelectedOrder] = useState<(typeof sampleOrders)[number] | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [statusesOpen, setStatusesOpen] = useState(false)
  const [listCollapsed, setListCollapsed] = useState(false)
  const [activeFilter, setActiveFilter] = useState('Saved filters')
  const visibleOrders = sampleOrders.filter((order) => {
    const matchesStatus = activeStatus === orderStatuses[0] || order.status === activeStatus
    const text = `${order.id} ${order.customer} ${order.channel}`.toLowerCase()
    return matchesStatus && text.includes(searchTerm.toLowerCase())
  })
  const isEmpty = visibleOrders.length === 0
  const content = (
    <div className="orders-workspace">
      <section className="orders-commandbar">
        <label>
          <Search size={19} />
          <input
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value)
              setSelectedOrder(null)
            }}
            placeholder="Search by order number, tracking number, or customer name"
          />
          <span>i</span>
        </label>
        <button className={filterOpen ? 'active' : ''} onClick={() => setFilterOpen(true)}><Filter size={18} /> Filter</button>
      </section>

      <section className={listCollapsed ? 'orders-board collapsed' : 'orders-board'}>
        <aside className="orders-status-list">
          {orderStatuses.map((status, index) => {
            const count = status === orderStatuses[0] ? sampleOrders.length : sampleOrders.filter((order) => order.status === status).length
            return (
              <button className={activeStatus === status ? 'active' : ''} key={status} onClick={() => { setActiveStatus(status); setSelectedOrder(null) }}>
                <i style={{ background: orderStatusColor(index) }} />
                <span>{status}</span>
                <b>{count}</b>
              </button>
            )
          })}
          <button className="customize-statuses" onClick={() => setStatusesOpen(true)}><SlidersHorizontal size={17} /> Customize statuses</button>
        </aside>

        <button className="orders-collapse" aria-label="Collapse order statuses" onClick={() => setListCollapsed(!listCollapsed)}>
          {listCollapsed ? '>' : '<'}
        </button>

        <section className="orders-results">
          {isEmpty ? (
            <Empty title="No results found" body="Try searching with different keywords or browse other sections." />
          ) : (
            <div className="orders-list">
              {visibleOrders.map((order) => (
                <button className={selectedOrder?.id === order.id ? 'active' : ''} key={order.id} onClick={() => setSelectedOrder(order)}>
                  <span><b>{order.id}</b><small>{order.time}</small></span>
                  <span>{order.customer}<small>{order.channel}</small></span>
                  <strong>{order.total}</strong>
                  <em>{order.status}</em>
                </button>
              ))}
            </div>
          )}
        </section>

        <aside className="orders-detail-panel">
          {selectedOrder ? (
            <>
              <div className="detail-head">
                <div><span>Order details</span><h2>{selectedOrder.id}</h2></div>
                <em>{selectedOrder.status}</em>
              </div>
              <Table rows={[
                ['Customer', selectedOrder.customer, selectedOrder.channel],
                ['Total', selectedOrder.total, 'Bahrain'],
                ['Payment', selectedOrder.status === 'بإنتظار الدفع' ? 'Pending' : 'Paid', 'Visual only'],
                ['Timeline', selectedOrder.time, 'Ready'],
              ]} />
              <div className="detail-actions"><button>Print invoice</button><button>Change status</button><button>Message customer</button></div>
            </>
          ) : (
            <Empty title="No orders selected" body="Select an order from the list to preview customer, payment, and timeline details here." />
          )}
        </aside>
      </section>

      <div className="orders-secondary-actions">
        <button onClick={() => setStatusesOpen(true)}><SlidersHorizontal size={17} /> Customize statuses</button>
        <button onClick={() => setMoreOpen(!moreOpen)}><MoreHorizontal size={18} /> More</button>
        <button aria-label="Refresh orders" onClick={() => { setSelectedOrder(null); setSearchTerm('') }}><RefreshCcw size={17} /></button>
        {moreOpen && (
          <div className="orders-more-menu">
            {['Bookings', 'Custom fields', 'Cart options', 'Export templates', 'Deleted orders', 'Auto tags'].map((item) => (
              <button key={item}>{item}</button>
            ))}
          </div>
        )}
      </div>

      {filterOpen && (
        <OrdersFilterDialog activeFilter={activeFilter} setActiveFilter={setActiveFilter} onClose={() => setFilterOpen(false)} />
      )}
      {statusesOpen && <OrdersQuickDialog title="Customize statuses" onClose={() => setStatusesOpen(false)} />}
    </div>
  )

  return content
}

function orderStatusColor(index: number) {
  return ['#9af3df', '#ff5c7a', '#ff5c7a', '#5f6368', '#37b7ff', '#17a9e6', '#4b9dff', '#02b882', '#55dfd1', '#ff4f70', '#ff637d', '#ff637d', '#ffb224', '#f0f2f1'][index] ?? '#9af3df'
}

function OrdersFilterDialog({
  activeFilter,
  setActiveFilter,
  onClose,
}: {
  activeFilter: string
  setActiveFilter: (filter: string) => void
  onClose: () => void
}) {
  const filters = ['Country & City', 'Show External Orders', 'Select The Affiliate Marketer', 'Affiliate marketing orders', 'Transferred to Zatca', 'My assigned orders', 'Quick Donation', 'Market', 'Shipping Policy Status', 'Shipping Company', "Didn't get synched with accounting services", 'Shipping type', 'Coupons', 'branches', 'Assigned Employee', 'tags', 'Order Type', 'Order Date', 'order sort', 'Payment Method', 'Unread Orders', 'Order Status', 'Pickup From Branch', 'products', 'Sales channels']

  return (
    <section className="orders-dialog-backdrop">
      <dialog className="orders-filter-dialog" open>
        <header><h2>Filter</h2><button aria-label="Close filter" onClick={onClose}><X size={18} /></button></header>
        <main>
          <article className="saved-filter-card">
            <SlidersHorizontal size={22} />
            <div><h3>Saved filters</h3><p>Save this filter setup to make filtering easier next time.</p></div>
          </article>
          <div className="orders-filter-list">
            {filters.map((filter) => (
              <button className={activeFilter === filter ? 'active' : ''} key={filter} onClick={() => setActiveFilter(filter)}>
                <span>{filter}</span>
                <ChevronDown size={17} />
              </button>
            ))}
          </div>
        </main>
        <footer>
          <button disabled>View results</button>
          <button disabled>Save filter</button>
          <button onClick={() => setActiveFilter('Saved filters')}>Reset</button>
        </footer>
      </dialog>
    </section>
  )
}

function OrdersQuickDialog({ title, onClose }: { title: string; onClose: () => void }) {
  const isStatus = title === 'Customize statuses'
  return (
    <section className="orders-dialog-backdrop">
      <dialog className="orders-quick-dialog" open>
        <header><h2>{title}</h2><button aria-label={`Close ${title}`} onClick={onClose}><X size={18} /></button></header>
        {isStatus ? (
          <div className="status-editor-list">
            {orderStatuses.slice(1).map((status, index) => (
              <label key={status}><i style={{ background: orderStatusColor(index + 1) }} /> <span>{status}</span><input type="checkbox" defaultChecked /></label>
            ))}
          </div>
        ) : (
          <div className="quick-order-grid">
            <Label title="Customer" helper="Search or add customer" placeholder="Customer name or phone" />
            <Label title="Product" helper="Add product to the draft order" placeholder="Search product" />
            <Label title="Payment" helper="Visual setup only" placeholder="Payment method" />
          </div>
        )}
        <footer><button onClick={onClose}>Cancel</button><button onClick={onClose}>{isStatus ? 'Save statuses' : 'Create order'}</button></footer>
      </dialog>
    </section>
  )
}

function LegacyOrders() {
  const [activeStatus, setActiveStatus] = useState(orderStatuses[0])
  const [selectedOrder, setSelectedOrder] = useState(sampleOrders[0])
  const visibleOrders = activeStatus === orderStatuses[0] ? sampleOrders : sampleOrders.filter((order) => order.status === activeStatus)
  const ordersToShow = visibleOrders.length ? visibleOrders : sampleOrders.slice(0, 2)

  return (
    <PageShell crumb="Orders" title="All orders" aside={<FilterList title="All orders" items={orderStatuses} activeItem={activeStatus} onItemClick={setActiveStatus} />}>
      <LockedFeature title="Order Editing" body="Manage your orders, with a button press" />
      <section className="products-toolbar">
        <label><Search size={17} /><input placeholder="Search by order number, customer, or phone" /></label>
        <button className="filter"><Filter size={17} /> Filter</button>
        <select defaultValue="newest"><option value="newest">Newest first</option><option value="total">Highest total</option><option value="status">By status</option></select>
      </section>
      <div className="records-layout">
        <section className="record-list">
          {ordersToShow.map((order) => (
            <button className={selectedOrder.id === order.id ? 'active' : ''} key={order.id} onClick={() => setSelectedOrder(order)}>
              <span><b>{order.id}</b><small>{order.time}</small></span>
              <span>{order.customer}<small>{order.channel}</small></span>
              <strong>{order.total}</strong>
              <em>{order.status}</em>
            </button>
          ))}
        </section>
        <aside className="record-detail">
          <div className="detail-head">
            <div><span>Order details</span><h2>{selectedOrder.id}</h2></div>
            <em>{selectedOrder.status}</em>
          </div>
          <Table rows={[
            ['Customer', selectedOrder.customer, selectedOrder.channel],
            ['Total', selectedOrder.total, 'Bahrain'],
            ['Payment', selectedOrder.status === 'بإنتظار الدفع' ? 'Pending' : 'Paid', 'Visual only'],
            ['Timeline', selectedOrder.time, 'Ready'],
          ]} />
          <div className="detail-actions"><button>Print invoice</button><button>Change status</button><button>Message customer</button></div>
        </aside>
      </div>
    </PageShell>
  )
}

void LegacyOrders

function Products() {
  const initialFilter = () => {
    const status = new URLSearchParams(window.location.search).get('status')
    return productFilters.find((item) => productFilterStatus[item] === status) ?? productFilters[0]
  }
  const [activeFilter, setActiveFilter] = useState(initialFilter)
  const [selectedProduct, setSelectedProduct] = useState(sampleProducts[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const setProductFilter = (item: string) => {
    setActiveFilter(item)
    const status = productFilterStatus[item]
    const nextUrl = `${window.location.pathname}${status ? `?status=${status}` : ''}`
    window.history.pushState({}, '', nextUrl)
  }

  return (
    <PageShell crumb="Products" title="All products" aside={<FilterList title="Product filters" items={productFilters} activeItem={activeFilter} onItemClick={setProductFilter} />}>
      <section className="products-toolbar">
        <label>
          <Search size={17} />
          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search by product name or SKU" />
        </label>
        <details className="filter-details" open={filterDrawerOpen} onToggle={(event) => setFilterDrawerOpen(event.currentTarget.open)}>
          <summary className="filter"><Filter size={17} /> Filter</summary>
          <div className="filter-panel">
            <b>Product status</b>
            <span>{activeFilter}</span>
            <button onClick={() => setFilterDrawerOpen(false)}>Apply</button>
          </div>
        </details>
        <select defaultValue="newest">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="name">Name A-Z</option>
        </select>
      </section>
      <section className="active-filter-strip">
        <span>Status</span>
        <button>{activeFilter}</button>
        {searchTerm && <button>Search: {searchTerm}</button>}
      </section>
      <div className="records-layout">
        <section className="record-list">
          {sampleProducts
            .filter((product) => `${product.name} ${product.sku}`.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((product) => (
              <button className={selectedProduct.sku === product.sku ? 'active' : ''} key={product.sku} onClick={() => setSelectedProduct(product)}>
                <span><b>{product.name}</b><small>{product.sku}</small></span>
                <span>{product.price}<small>Stock: {product.stock}</small></span>
                <em>{product.status}</em>
              </button>
            ))}
        </section>
        <aside className="record-detail">
          <div className="detail-head">
            <div><span>Product details</span><h2>{selectedProduct.name}</h2></div>
            <em>{selectedProduct.status}</em>
          </div>
          <div className="product-preview-tile"><ShoppingBag size={44} /><b>{selectedProduct.price}</b></div>
          <Table rows={[
            ['SKU', selectedProduct.sku, 'Editable'],
            ['Inventory', selectedProduct.stock, 'Tracked'],
            ['Status', selectedProduct.status, activeFilter],
            ['SEO', 'Ready preview', 'Draft'],
          ]} />
          <div className="detail-actions"><button>Edit product</button><button>Duplicate</button><button>Hide in store</button></div>
        </aside>
      </div>
    </PageShell>
  )
}

function Marketing() {
  const [activeChannel, setActiveChannel] = useState('Snapchat')

  return (
    <div className="page-stack">
      <LockedFeature title="إعلانات مدار" body="Use مدار Ads to reach more customers and increase your store sales." />
      <SelectableTabs items={['Snapchat', 'TikTok', 'Google', 'Meta', 'YouTube']} activeItem={activeChannel} onChange={setActiveChannel} />
      <MetricGrid metrics={[['Impressions', '0'], ['Avg. CPC', '0 SAR'], ['Clicks', '0'], ['Spent', '0 SAR']]} />
      <div className="two-panels">
        <Panel title={`${activeChannel} credits`}><b className="big">0</b><p>Low balance</p><button className="outline">Top up</button></Panel>
        <Panel title={`Latest ${activeChannel} Campaigns`}><Empty title="No ad reports yet!" body={`New ${activeChannel} reports will appear here when ads are published.`} /></Panel>
      </div>
    </div>
  )
}

function ThemeEditorPage() {
  const editorSections = ['Header', 'Hero', 'Products', 'Footer', 'Colors', 'Mobile preview']
  const [activeSection, setActiveSection] = useState(editorSections[0])
  const [themeName, setThemeName] = useState(themes[0])
  const [publishState, setPublishState] = useState('Draft theme')

  return (
    <PageShell crumb="Online Store" title="Store design" aside={<FilterList title="Theme editor" items={editorSections} activeItem={activeSection} onItemClick={setActiveSection} />}>
      <section className="builder-shell">
        <div className="builder-toolbar">
          <div>
            <span>Current theme</span>
            <b>{themeName}</b>
          </div>
          <SelectableTabs items={['Desktop', 'Mobile', 'RTL']} activeItem={activeSection === 'Mobile preview' ? 'Mobile' : 'Desktop'} onChange={(item) => setActiveSection(item === 'Mobile' ? 'Mobile preview' : 'Header')} />
          <button className="save" onClick={() => setPublishState('Theme changes saved')}>Save changes</button>
        </div>
        <div className="builder-grid">
          <aside className="builder-controls">
            <Panel title={activeSection}>
              <div className="setting-list">
                <label><span>Section visibility</span><input type="checkbox" defaultChecked /></label>
                <label><span>Full width</span><input type="checkbox" defaultChecked={activeSection === 'Hero'} /></label>
                <label><span>Spacing</span><select defaultValue="balanced"><option value="compact">Compact</option><option value="balanced">Balanced</option><option value="wide">Wide</option></select></label>
              </div>
            </Panel>
            <Panel title="Theme marketplace">
              <div className="theme-mini-grid">
                {themes.slice(0, 4).map((theme) => (
                  <button className={themeName === theme ? 'active' : ''} key={theme} onClick={() => setThemeName(theme)}>{theme}</button>
                ))}
              </div>
            </Panel>
          </aside>
          <section className="store-preview-frame">
            <div className="store-preview">
              <header><b>مدار</b><nav><span>الرئيسية</span><span>الأقسام</span><span>تواصل معنا</span></nav></header>
              <section className={activeSection === 'Hero' ? 'preview-hero active' : 'preview-hero'}>
                <small>{themeName}</small>
                <h2>واجهة متجر جاهزة للبيع</h2>
                <button>تسوق الآن</button>
              </section>
              <div className={activeSection === 'Products' ? 'preview-products active' : 'preview-products'}>
                {[1, 2, 3].map((item) => <article key={item}><i /><b>منتج {item}</b><span>0.000 BHD</span></article>)}
              </div>
              <footer className={activeSection === 'Footer' ? 'active' : ''}>© مدار - روابط المتجر والسياسات</footer>
            </div>
          </section>
          <aside className="form-side">
            <Panel title="Preview state">
              <Table rows={[['Active section', activeSection], ['Theme', themeName], ['Status', publishState]]} />
            </Panel>
          </aside>
        </div>
      </section>
    </PageShell>
  )
}

function DomainPage() {
  const [domainState, setDomainState] = useState('default')

  return (
    <PageShell crumb="Online Store" title="Domain" aside={<FilterList title="Domain setup" items={['Default domain', 'Custom domain', 'DNS records', 'Redirects', 'SSL']} activeItem={domainState === 'default' ? 'Default domain' : 'Custom domain'} onItemClick={(item) => setDomainState(item === 'Default domain' ? 'default' : 'custom')} />}>
      <section className="form-workspace">
        <div className="form-main">
          <FeatureHero title="Domain" badge="Available on your plan" body="Prepare the store URL, custom domain, SSL, and redirects before real DNS connection." action="Connect domain" />
          <Panel title="Default store link">
            <div className="domain-card">
              <span>https://saeed-store.middar.shop</span>
              <button onClick={() => setDomainState('default')}>Copy link</button>
            </div>
          </Panel>
          <Panel title="Custom domain">
            <div className="form-grid">
              <Label title="Domain name" helper="Example: mystore.com" placeholder="yourdomain.com" />
              <Label title="Provider" helper="Where the domain was purchased" placeholder="Namecheap, GoDaddy, Cloudflare" />
            </div>
          </Panel>
        </div>
        <aside className="form-side">
          <Panel title="DNS checklist">
            <Table rows={[['A record', 'Pending'], ['CNAME', 'Ready'], ['SSL', 'Will activate after DNS'], ['Redirect www', 'Enabled']]} />
          </Panel>
        </aside>
      </section>
    </PageShell>
  )
}

function InformationPagesPage({ activeView }: { activeView: string }) {
  const [selectedPage, setSelectedPage] = useState('About us')
  const pages = ['About us', 'Privacy policy', 'Return policy', 'Shipping policy', 'Contact us']

  return (
    <PageShell crumb="Online Store" title={activeView} aside={<FilterList title="Pages" items={pages} activeItem={selectedPage} onItemClick={setSelectedPage} />}>
      <div className="records-layout">
        <section className="record-list">
          {pages.map((pageName, index) => (
            <button className={selectedPage === pageName ? 'active' : ''} key={pageName} onClick={() => setSelectedPage(pageName)}>
              <span><b>{pageName}</b><small>{index < 2 ? 'Published' : 'Draft'}</small></span>
              <em>{index < 2 ? 'Visible' : 'Hidden'}</em>
            </button>
          ))}
        </section>
        <aside className="record-detail">
          <div className="detail-head">
            <div><span>Page editor</span><h2>{selectedPage}</h2></div>
            <em>Visual draft</em>
          </div>
          <label className="field">
            <span>Page title <em>Optional</em></span>
            <small>Shown in storefront navigation and SEO.</small>
            <input defaultValue={selectedPage} />
          </label>
          <label className="field">
            <span>Page content <em>Optional</em></span>
            <small>Draft content only, backend later.</small>
            <textarea defaultValue="Write page content here..." />
          </label>
          <div className="detail-actions"><button>Save draft</button><button>Preview page</button><button>Publish</button></div>
        </aside>
      </div>
    </PageShell>
  )
}

function StoreDesign() {
  const [activeTheme, setActiveTheme] = useState(themes[0])
  return (
    <div className="page-stack">
      <FeatureHero title="Theme editor" badge="Available on your plan" body="Customize your store with guided and clear steps, fast launch, and flexible visual controls." action="Start for free" />
      <section className="theme-grid">
        {themes.map((theme, index) => (
          <article className={activeTheme === theme ? 'active-card' : ''} key={theme}>
            <div className={`theme-art t${index + 1}`} />
            <h3>{theme}</h3>
            <p>{['Fashion', 'Electronics', 'Food & Grocery', 'Cosmetics', 'Digital products', 'Gifts'][index]}</p>
            <button onClick={() => setActiveTheme(theme)}>Customize</button>
          </article>
        ))}
      </section>
      <Panel title={`${activeTheme} preview`}>
        <Table rows={[['Selected theme', activeTheme, 'Ready'], ['Editor', 'Open from Store design tab', 'Visual only']]} />
      </Panel>
    </div>
  )
}

function Customers() {
  const customerGroups = ['All customers', 'Empty groups', 'VIP customers', 'New customers']
  const [activeCustomerGroup, setActiveCustomerGroup] = useState(customerGroups[0])

  return (
    <PageShell crumb="Customers" title="All customers" aside={<FilterList title="Customer groups" items={customerGroups} activeItem={activeCustomerGroup} onItemClick={setActiveCustomerGroup} />}>
      <LockedFeature title="Add New Customer" body="Effective communication with your customers" />
      <SplitEmpty title={`No ${activeCustomerGroup.toLowerCase()} selected`} action="Filter" context={activeCustomerGroup} />
    </PageShell>
  )
}

function Staff() {
  return (
    <div className="page-stack">
      <LockedFeature title="Staff Accounts" body="Add your team and manage roles, permissions, and employee targets." />
      <Panel title="Staff">
        <Table rows={[['Store Owner', 'mr.fks.r0@gmail.com', 'Joined today', 'Active']]} />
      </Panel>
    </div>
  )
}

function Reports() {
  const [activeReport, setActiveReport] = useState(reportMenu[0])
  const metrics = activeReport === 'Shipping'
    ? [['Delivered orders', '18'], ['Avg. delivery', '1.8 days'], ['Shipping cost', '42.500 BHD'], ['Issues', '1']]
    : activeReport === 'Inventory'
      ? [['Available products', '43'], ['Low stock', '3'], ['Out of stock', '1'], ['Stock value', '812 BHD']]
      : [['Gross sales', '166.250 BHD'], ['Net sales', '154.800 BHD'], ['Orders', '24'], ['Conversion', '2.8%']]

  return (
    <PageShell crumb="Reports" title="Store performance" aside={<FilterList title="Reports" items={reportMenu} footer="Manage reports" activeItem={activeReport} onItemClick={setActiveReport} />}>
      <div className="date-card">Jul 2026, 28 - Aug 2026, 04 <button>...</button></div>
      <MetricGrid metrics={metrics} />
      <div className="analytics-layout">
        <Panel title={`${activeReport} trend`}>
          <div className="bar-chart">
            {[34, 58, 46, 72, 64, 88, 53].map((height, index) => <span style={{ height: `${height}%` }} key={index} />)}
          </div>
        </Panel>
        <Panel title="Top insights">
          <Table rows={[
            ['Best channel', 'Online store', '68% of sales'],
            ['Best product', 'عباية لينن', '18 orders'],
            ['Needs action', '3 products low stock', 'Open inventory'],
          ]} />
        </Panel>
      </div>
    </PageShell>
  )
}

function Support() {
  const supportItems = ['Reviews', 'Questions', 'Reported reviews', 'Tickets', 'Complaints']
  const [activeSupport, setActiveSupport] = useState(supportItems[0])

  return (
    <PageShell crumb="Support" title="Reviews" aside={<FilterList title="Inbox" items={supportItems} activeItem={activeSupport} onItemClick={setActiveSupport} />}>
      <SplitEmpty title={`No ${activeSupport.toLowerCase()} selected`} action="Filter" context={activeSupport} />
    </PageShell>
  )
}

function Shipping() {
  const [activeShipping, setActiveShipping] = useState('All carriers')
  const [selectedCarrier, setSelectedCarrier] = useState(carriers[0])

  return (
    <div className="page-stack">
      <FeatureHero title="Manage shipping" badge="Available on your plan" body="A fleet of trusted local and global couriers ready to deliver your orders." action="App Store" />
      <SelectableTabs items={['All carriers', 'Standard shipping', 'Express shipping', 'Economy shipping', 'International shipping', 'Freight shipping']} activeItem={activeShipping} onChange={setActiveShipping} />
      <div className="analytics-layout">
        <Panel title={activeShipping}>
          <Table rows={[['Default origin', 'Manama branch', 'Needs pickup time'], ['COD', 'Disabled', 'Can be enabled'], ['Free shipping', 'Over 30 BHD', 'Active']]} />
        </Panel>
        <Panel title={`${selectedCarrier} setup`}>
          <Table rows={[['Status', selectedCarrier === 'Aramex' ? 'Connected' : 'Not connected'], ['Coverage', 'Bahrain + GCC'], ['Action', 'Configure rates']]} />
        </Panel>
      </div>
      <section className="carrier-grid">
        {carriers.map((carrier) => <Carrier active={carrier === selectedCarrier} key={carrier} name={carrier} onSelect={() => setSelectedCarrier(carrier)} />)}
      </section>
    </div>
  )
}

function Payments() {
  const [activeMethod, setActiveMethod] = useState(paymentMethods[0][0])
  return (
    <div className="page-stack">
      <LockedFeature title="مدفوعات مدار" body="Make checkout easier for your customers. Enable online payments and let customers pay securely through your store." />
      <section className="verify-card">
        <ShieldCheck size={34} />
        <div><h2>Your store isn't verified</h2><p>Verify your store to activate and manage online payments securely.</p></div>
        <button>Verify now</button>
      </section>
      <section className="payment-grid">
        {paymentMethods.map(([method, state, action]) => (
          <article className={activeMethod === method ? 'active-card' : ''} key={method}>
            <WalletCards /><b>{method}</b><p>{state}</p><button onClick={() => setActiveMethod(method)}>{action}</button>
          </article>
        ))}
      </section>
      <Panel title={`${activeMethod} details`}>
        <Table rows={[['Availability', activeMethod.includes('مدار') ? 'After verification' : 'Preview ready'], ['Settlement', '2-5 business days'], ['Checkout display', 'Visible after activation']]} />
      </Panel>
    </div>
  )
}

function Apps() {
  const [activeApp, setActiveApp] = useState(apps[0])
  const [activeCategory, setActiveCategory] = useState('All')
  return (
    <div className="page-stack">
      <section className="apps-hero"><h1>Power your store with the right tools</h1><button>Browse all categories</button></section>
      <SelectableTabs items={['All', 'Marketing', 'Sales', 'Shipping', 'Accounting', 'Installed']} activeItem={activeCategory} onChange={setActiveCategory} />
      <section className="apps-grid">
        {apps.map((app, index) => (
          <article className={activeApp === app ? 'active-card' : ''} key={app}>
            <span>Marketing</span>
            <h3>{app}</h3>
            <p>{index % 2 ? 'Start From 48.08 AED / Monthly' : 'Free Trial 7 Days'}</p>
            <button onClick={() => setActiveApp(app)}>View</button>
          </article>
        ))}
      </section>
      <Panel title={`${activeApp} app page`}>
        <Table rows={[['Category', activeCategory, 'Selected'], ['Plan', 'Free trial available', 'Visual only'], ['Permissions', 'Products, orders, customers'], ['Status', 'Ready to install']]} />
      </Panel>
    </div>
  )
}

function Logs() {
  return (
    <div className="page-stack">
      <LockedFeature title="Activity Log" body="Full tracking of all your store activity" />
      <Panel title="Log preview">
        <Table rows={[['SMS log', 'No messages yet', 'Basic'], ['Activity history', 'Available on Plus', 'Locked'], ['Export log', 'No exports yet', 'Empty']]} />
      </Panel>
    </div>
  )
}

function SettingsPage({ initialSetting = 'Your profile' }: { initialSetting?: string }) {
  const normalizedInitial = settingsCatalog.find((item) => item.key === initialSetting || item.title === initialSetting)?.key ?? settingsCatalog[0].key
  const [activeSetting, setActiveSetting] = useState(normalizedInitial)
  const activeDetail = settingsCatalog.find((item) => item.key === activeSetting) ?? settingsCatalog[0]

  return (
    <PageShell crumb="Settings" title={activeDetail.title} aside={<FilterList title="Settings" items={settingsCatalog.map((item) => item.key)} activeItem={activeSetting} onItemClick={setActiveSetting} />}>
      <div className="settings-overview">
        <section>
          <span>Settings</span>
          <h1>{activeDetail.title}</h1>
          <p>{activeDetail.summary}</p>
        </section>
        <button>Save changes</button>
      </div>
      <SettingsContent detail={activeDetail} />
    </PageShell>
  )
}

function SettingsContent({ detail, compact = false }: { detail: typeof settingsCatalog[number]; compact?: boolean }) {
  const [activeControl, setActiveControl] = useState<string | null>(null)
  const [activeCard, setActiveCard] = useState<string>('Configuration')
  const deepControls = settingsDeepControls[detail.key] ?? []
  const cards = [
    ['Configuration', detail.summary, 'Open'],
    ['Access & visibility', 'Control where this setting appears in the merchant workflow.', 'Manage'],
    ['Activity', 'Preview changes, alerts, and recent actions for this settings area.', 'View log'],
  ]

  return (
    <div className={compact ? 'settings-content compact' : 'settings-content'}>
      <Panel title="Current setup">
        <Table rows={detail.rows} />
      </Panel>
      {deepControls.length > 0 && (
        <div className="setting-switch-groups">
          {deepControls.map((group) => (
            <section className="setting-switch-card" key={group.title}>
              <h3>{group.title}</h3>
              {group.controls.map((control) => (
                <button
                  className={activeControl === control.label ? 'switch-row active' : 'switch-row'}
                  key={control.label}
                  onClick={() => setActiveControl(control.label)}
                >
                  <span>
                    <b>{control.label}</b>
                    {control.helper && <small>{control.helper}</small>}
                  </span>
                  {control.link ? <ChevronDown size={18} /> : <i className={control.enabled ? 'switch-control on' : 'switch-control'} />}
                </button>
              ))}
            </section>
          ))}
        </div>
      )}
      {activeControl && (
        <Panel title={activeControl}>
          <Table rows={[['State', 'Selected', detail.title], ['Preview', 'Ready for visual configuration'], ['Backend', 'Deferred']]} />
        </Panel>
      )}
      <div className="settings-card-list">
        {cards.map(([title, body, action]) => (
          <article className={activeCard === title ? 'active-card' : ''} key={title}>
            <b>{title}</b>
            <p>{body}</p>
            <button onClick={() => setActiveCard(title)}>{action}</button>
          </article>
        ))}
      </div>
      <Panel title={activeCard}>
        <Table rows={[
          ['Area', detail.title, 'Selected'],
          ['Mode', activeCard === 'Activity' ? 'Log preview' : activeCard === 'Access & visibility' ? 'Visibility rules' : 'Configuration panel'],
          ['Status', activeCard === 'Activity' ? 'No recent changes' : 'Ready'],
        ]} />
      </Panel>
      <div className="settings-toggles">
        {detail.toggles.map((toggle, index) => (
          <label key={toggle}>{toggle}<input type="checkbox" defaultChecked={index === 0} /></label>
        ))}
      </div>
    </div>
  )
}

function SettingIcon({ name }: { name: string }) {
  if (name.includes('profile') || name === 'Customers') return <UserRound size={18} />
  if (name.includes('plan') || name.includes('billing')) return <CreditCard size={18} />
  if (name.includes('Payment')) return <WalletCards size={18} />
  if (name.includes('Domain') || name.includes('Sales')) return <Store size={18} />
  if (name.includes('Checkout') || name.includes('Products')) return <ShoppingBag size={18} />
  if (name.includes('Orders')) return <ClipboardList size={18} />
  if (name.includes('Shipping')) return <Truck size={18} />
  if (name.includes('Marketing')) return <Megaphone size={18} />
  if (name.includes('Notifications')) return <Bell size={18} />
  if (name.includes('apps')) return <AppWindow size={18} />
  return <Settings size={18} />
}

function SelectableTabs({ items, activeItem, onChange }: { items: string[]; activeItem: string; onChange: (item: string) => void }) {
  return (
    <div className="channel-tabs">
      {items.map((item) => (
        <button className={activeItem === item ? 'active' : ''} key={item} onClick={() => onChange(item)}>
          {item}
        </button>
      ))}
    </div>
  )
}

function PageShell({ crumb, title, aside, children }: { crumb: string; title: string; aside: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="page-layout">
      <aside>{aside}</aside>
      <section className="page-content">
        <div className="breadcrumb">{crumb} <span>›</span> {title}</div>
        {children}
      </section>
    </div>
  )
}

function FilterList({
  title,
  items,
  footer,
  activeItem,
  onItemClick,
}: {
  title: string
  items: string[]
  footer?: string
  activeItem?: string
  onItemClick?: (item: string) => void
}) {
  return (
    <nav className="side-list">
      <h3>{title}</h3>
      {items.map((item, index) => (
        <button
          aria-label={item}
          className={(activeItem ? item === activeItem : index === 0) ? 'active' : ''}
          key={item}
          onClick={() => onItemClick?.(item)}
        >
          {item}{index < 4 && <small>0</small>}
        </button>
      ))}
      {footer && <button className="manage">{footer}</button>}
    </nav>
  )
}

function LockedFeature({ title, body, badge = 'Available on Plus, Pro, and Special', description }: { title: string; body: string; badge?: string; description?: string }) {
  return (
    <section className="locked-card">
      <div>
        <span>{title}</span>
        <small>{badge}</small>
        <h2>{body}</h2>
        {description && <p>{description}</p>}
      </div>
      <div className="locked-actions">
        <button>Learn more</button>
        <button>Start your free trial</button>
      </div>
    </section>
  )
}

function FeatureHero({ title, badge, body, action }: { title: string; badge: string; body: string; action: string }) {
  return (
    <section className="feature-hero">
      <div>
        <span>{title} <small>{badge}</small></span>
        <h1>Stand out with your design</h1>
        <p>{body}</p>
      </div>
      <button>{action}</button>
    </section>
  )
}

function SplitEmpty({ title, action, context = 'All' }: { title: string; action: string; context?: string }) {
  return (
    <div className="split-empty">
      <section>
        <details className="filter-details">
          <summary className="filter"><Filter size={17} /> {action}</summary>
          <div className="filter-panel">
            <b>Active view</b>
            <span>{context}</span>
            <button>Apply</button>
          </div>
        </details>
        <div className="empty-lines"><i /><i /><i /><i /></div>
      </section>
      <section><Empty title={title} body="Select an item from the list to see details here." /></section>
    </div>
  )
}

function Empty({ title, body }: { title: string; body: string }) {
  return <div className="empty"><Boxes size={46} /><h2>{title}</h2><p>{body}</p></div>
}

function MetricGrid({ metrics, skeleton = false }: { metrics: string[][]; skeleton?: boolean }) {
  return (
    <section className="metric-grid">
      {metrics.map(([label, value]) => (
        <article key={label}>
          <h3>{label} <small>?</small></h3>
          {skeleton ? <div className="skeleton"><i /><i /><i /></div> : <b>{value}</b>}
        </article>
      ))}
    </section>
  )
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="panel"><h2>{title}</h2>{children}</section>
}

function Table({ rows }: { rows: string[][] }) {
  return <div className="table">{rows.map((row) => <div key={row.join('-')}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}</div>
}

function Carrier({ name, active, onSelect }: { name: string; active?: boolean; onSelect?: () => void }) {
  return (
    <article className={active ? 'carrier-card active-card' : 'carrier-card'}>
      <div><Truck /><b>{name}</b><small>4 (4085)</small></div>
      <p><span>Carrier status</span> {name === 'Aramex' ? 'Connected' : 'Inactive'}</p>
      <p><span>Delivery time</span> 2 - 7 business days</p>
      <p><span>Shipping type</span> Standard</p>
      <button onClick={onSelect}>{active ? 'Selected' : 'Configure'}</button>
    </article>
  )
}

function Label({ title, helper, placeholder }: { title: string; helper: string; placeholder: string }) {
  return (
    <label className="field">
      <span>{title} <em>Optional</em></span>
      <small>{helper}</small>
      <input placeholder={placeholder} />
    </label>
  )
}

export default App

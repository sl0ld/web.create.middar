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
  Palette,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  UserRound,
  Users,
  WalletCards,
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
  { id: 'settings', label: 'Settings', icon: Settings, tabs: ['Store settings', 'Account', 'Billing', 'Notifications', 'Security'] },
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
        <button onClick={() => go('settings', 'Settings:Billing')}>Store plan & subscriptions</button>
        <button>Invite & earn</button>
        <button>Give feedback</button>
        <button onClick={() => go('settings', 'Settings:Notifications')}>Notification preferences</button>
      </section>
    )
  }

  if (activeTool === 'settings') {
    return <SettingsDrawer closeTools={closeTools} />
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

function SettingsDrawer({ closeTools }: { closeTools: () => void }) {
  const settingsItems = [
    'Your profile',
    'General',
    'Store plan',
    'Manage stores',
    'Balance & billing',
    'Payments',
    'Domain',
    'Checkout',
    'Taxes',
    'Sales channels',
    'Markets',
    'Products',
    'Orders',
    'Shipping & delivery',
    'Customers',
    'Marketing',
    'Customer Wallet',
    'Blog',
    'Reviews',
    'Notifications',
    'Installed apps',
  ]

  return (
    <section className="settings-drawer">
      <aside>
        <h2>Settings</h2>
        <label><Search size={17} /><input placeholder="Search settings" /></label>
        <nav>
          {settingsItems.map((item, index) => (
            <button className={index === 0 ? 'active' : ''} key={item}>
              <span>{item.slice(0, 1)}</span>
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <section>
        <div className="drawer-head">
          <h2>Your profile</h2>
          <div>
            <button aria-label="Expand settings"><Grid3X3 size={18} /></button>
            <button aria-label="Close settings" onClick={closeTools}>x</button>
          </div>
        </div>
        <div className="settings-card-list">
          <article><b>Edit profile</b><p>Update your personal information and account details.</p><ChevronDown size={18} /></article>
          <article><b>Registered devices</b><p>Review and manage devices signed in to your account.</p><ChevronDown size={18} /></article>
          <article><b>Quick access</b><p>Manage passkeys for fast, secure sign-in across all your devices.</p><ChevronDown size={18} /></article>
          <article><b>Password</b><p>Change your account password.</p><button>Change</button></article>
          <article><b>Two-factor authentication</b><p>Protect your account with an extra verification step.</p><span /></article>
          <article><b>Sign out of all devices</b><p>Sign out of all other devices signed in to your account.</p><button className="danger">Sign out</button></article>
        </div>
        <div className="settings-toggles">
          <label>English (Beta)<input type="checkbox" defaultChecked /></label>
          <label>Dark mode<input type="checkbox" defaultChecked /></label>
        </div>
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
  const steps = ['Add a support number', 'Set up your domain', 'Add your first product', 'Set your pickup location', 'Design your store', 'Verify your store']
  return (
    <div className="checklist">
      {steps.map((step, index) => (
        <article key={step}>
          <span>{index + 2}</span>
          <b>{step}</b>
          <button>{['Add', 'Set up', 'Add', 'Set', 'Design', 'Verify'][index]}</button>
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

  if (detail) {
    return (
      <PageShell crumb={group} title={pageTitle} aside={<FilterList title={asideTitle} items={groupLinks} activeItem={pageTitle} onItemClick={openSidePage} />}>
        <LockedFeature title={pageTitle} badge={detail.badge} body={detail.title} description={detail.body} />
        {detail.locked ? <UnavailablePanel /> : <PagePreview title={detail.title} group={group} link={pageTitle} />}
      </PageShell>
    )
  }

  if (route === 'orders') {
    return (
      <PageShell crumb="Orders" title={pageTitle} aside={<FilterList title="Orders" items={groupLinks} activeItem={pageTitle} onItemClick={openSidePage} />}>
        {pageTitle === 'All orders' ? <SplitEmpty title="No order selected" action="Filter" /> : <PagePreview title={pageTitle} group={group} link={pageTitle} />}
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
  const emptyTitle = activeStatus === orderStatuses[0] ? 'No order selected' : `No ${activeStatus} order selected`

  return (
    <PageShell crumb="Orders" title="All orders" aside={<FilterList title="All orders" items={orderStatuses} activeItem={activeStatus} onItemClick={setActiveStatus} />}>
      <LockedFeature title="Order Editing" body="Manage your orders, with a button press" />
      <SplitEmpty title={emptyTitle} action="Filter" context={activeStatus} />
    </PageShell>
  )
}

function Products() {
  const initialFilter = () => {
    const status = new URLSearchParams(window.location.search).get('status')
    return productFilters.find((item) => productFilterStatus[item] === status) ?? productFilters[0]
  }
  const [activeFilter, setActiveFilter] = useState(initialFilter)
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
      <SplitEmpty title={`No ${activeFilter.toLowerCase()} selected`} action="Filter" context={activeFilter} />
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

  return (
    <PageShell crumb="Reports" title="Store performance" aside={<FilterList title="Reports" items={reportMenu} footer="Manage reports" activeItem={activeReport} onItemClick={setActiveReport} />}>
      <div className="date-card">Jul 2026, 28 - Aug 2026, 04 <button>...</button></div>
      <MetricGrid metrics={[[`${activeReport} gross`, ''], ['Net sales', ''], ['Total costs', ''], ['Net profit', '']]} skeleton />
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

  return (
    <div className="page-stack">
      <FeatureHero title="Manage shipping" badge="Available on your plan" body="A fleet of trusted local and global couriers ready to deliver your orders." action="App Store" />
      <SelectableTabs items={['All carriers', 'Standard shipping', 'Express shipping', 'Economy shipping', 'International shipping', 'Freight shipping']} activeItem={activeShipping} onChange={setActiveShipping} />
      <Panel title={activeShipping}>
        <p>Showing carriers and setup states for {activeShipping.toLowerCase()}.</p>
      </Panel>
      <section className="carrier-grid">
        {carriers.map((carrier) => <Carrier key={carrier} name={carrier} />)}
      </section>
    </div>
  )
}

function Payments() {
  return (
    <div className="page-stack">
      <LockedFeature title="مدفوعات مدار" body="Make checkout easier for your customers. Enable online payments and let customers pay securely through your store." />
      <section className="verify-card">
        <ShieldCheck size={34} />
        <div><h2>Your store isn't verified</h2><p>Verify your store to activate and manage online payments securely.</p></div>
        <button>Verify now</button>
      </section>
      <section className="payment-grid">
        {['مدفوعات مدار', 'Tabby', 'Tamara', 'Digital wallets', 'PayPal', 'Bank transfer'].map((method) => <article key={method}><WalletCards /><b>{method}</b><button>Activate</button></article>)}
      </section>
    </div>
  )
}

function Apps() {
  return (
    <div className="page-stack">
      <section className="apps-hero"><h1>Power your store with the right tools</h1><button>Browse all categories</button></section>
      <section className="apps-grid">
        {apps.map((app, index) => (
          <article key={app}>
            <span>Marketing</span>
            <h3>{app}</h3>
            <p>{index % 2 ? 'Start From 48.08 AED / Monthly' : 'Free Trial 7 Days'}</p>
            <button>View</button>
          </article>
        ))}
      </section>
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

function SettingsPage() {
  const settingsItems = ['Store settings', 'Account', 'Billing', 'Notifications', 'Security']
  const [activeSetting, setActiveSetting] = useState(settingsItems[0])

  return (
    <PageShell crumb="Settings" title="Store settings" aside={<FilterList title="Settings" items={settingsItems} activeItem={activeSetting} onItemClick={setActiveSetting} />}>
      <div className="settings-grid">
        {[
          ['Store profile', 'Store name, logo, description, and contact details.'],
          ['Account settings', 'Owner information, email, phone, and language preferences.'],
          ['Billing and plan', 'Current Basic plan, upgrade options, and invoices preview.'],
          ['Notifications', 'Email, dashboard, and customer message alerts.'],
          ['Security', 'Password, active sessions, and verification status.'],
          ['Team access', 'Roles, permissions, and staff invitations.'],
        ].map(([title, body]) => (
          <article key={title}>
            <Settings size={22} />
            <h3>{title}</h3>
            <p>{body}</p>
            <button onClick={() => setActiveSetting(title.includes('Billing') ? 'Billing' : title.includes('Notifications') ? 'Notifications' : title.includes('Security') ? 'Security' : 'Account')}>Open</button>
          </article>
        ))}
      </div>
    </PageShell>
  )
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

function Carrier({ name }: { name: string }) {
  return (
    <article className="carrier-card">
      <div><Truck /><b>{name}</b><small>4 (4085)</small></div>
      <p><span>Carrier status</span> Inactive</p>
      <p><span>Delivery time</span> الشحن 2 - 7 ايام عمل</p>
      <p><span>Shipping type</span> عادي</p>
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

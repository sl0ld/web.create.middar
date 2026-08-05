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
  ['Marketing', ['Salla Ads', 'Pixels & feeds', 'Abandoned carts', 'Coupons', 'Cashback offers', 'Influencers', 'Special offers', 'Campaigns', 'Cart offers', 'Marketing calendar', 'Customer wallet', 'Affiliate marketing', 'SEO', 'Loyalty program', 'Quick checkout', 'Gifting', 'Reorder Reminder']],
  ['Online Store', ['Store design', 'Theme Marketplace', 'Domain', 'Information pages', 'Custom URLs']],
  ['Sales Channels', ['Salla Point', 'Mobile app', 'Landing pages']],
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
          <h1>مدار.. ابنِ متجرك الإلكتروني بنفس تجربة سلة وطور عليها</h1>
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
          <p>نسخة واجهات لصانع متاجر مستوحى من تجربة سلة، مع تطوير يناسب مدار.</p>
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
          <p>نفس رحلة سلة التي حللناها: تسجيل الحساب، التحقق، أسئلة تجهيز المتجر، ثم لوحة التحكم.</p>
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

function OnboardingPage({ setScreen }: { setScreen: (screen: Screen) => void }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const current = onboardingSteps[step]
  const isPlans = step >= onboardingSteps.length
  const progress = Math.min(((step + 1) / (onboardingSteps.length + 1)) * 100, 100)

  const choose = (answer: string) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[step] = answer
      return next
    })
    setStep((value) => value + 1)
  }

  return (
    <main className="qna-shell" dir="ltr">
      <button className="qna-logo" onClick={() => setScreen('landing')}>مدار</button>
      <section className="qna-card">
        <div className="qna-progress"><span style={{ width: `${progress}%` }} /></div>
        {!isPlans ? (
          <>
            <button className="auth-back" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>Go back</button>
            <small>Question {step + 1} of {onboardingSteps.length}</small>
            <h1>{current.question}</h1>
            <p>{current.helper}</p>
            <div className="qna-options">
              {current.options.map((option) => (
                <button className={answers[step] === option ? 'selected' : ''} key={option} onClick={() => choose(option)}>
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <PlanChoice setScreen={setScreen} setStep={setStep} />
        )}
      </section>
    </main>
  )
}

function PlanChoice({ setScreen, setStep }: { setScreen: (screen: Screen) => void; setStep: (step: number) => void }) {
  const plans = [
    ['Salla Basic', 'Free', 'For new sellers & explorers'],
    ['Salla Plus', 'AED 99 / Month', 'For small businesses'],
    ['Salla Pro', 'AED 299 / Month', 'For established companies'],
  ]

  return (
    <section className="plan-choice">
      <button className="auth-back" onClick={() => setStep(onboardingSteps.length - 1)}>Go back</button>
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
        <button onClick={() => go('marketing', 'Marketing:Salla Ads')}>Marketing ideas</button>
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
  const rows = [
    [title, group, 'Ready screen'],
    ['Filters', 'Visual only', 'No backend yet'],
    ['Actions', link.includes('settings') || link.includes('Settings') ? 'Settings layout' : 'Empty state', 'Draft'],
  ]

  return (
    <div className="dynamic-stack">
      <section className="dynamic-hero">
        <span>{group}</span>
        <h1>{title}</h1>
        <p>This screen is now connected from the All menu with its own title, breadcrumb, side navigation, and Salla-style empty workspace.</p>
        <div>
          <button>Primary action</button>
          <button>Learn more</button>
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
  const [activeFilter, setActiveFilter] = useState(productFilters[0])

  return (
    <PageShell crumb="Products" title="All products" aside={<FilterList title="Product filters" items={productFilters} activeItem={activeFilter} onItemClick={setActiveFilter} />}>
      <SplitEmpty title={`No ${activeFilter.toLowerCase()} selected`} action="Filter" context={activeFilter} />
    </PageShell>
  )
}

function Marketing() {
  const [activeChannel, setActiveChannel] = useState('Snapchat')

  return (
    <div className="page-stack">
      <LockedFeature title="Salla Ads" body="Use Salla Ads to reach more customers and increase your store sales." />
      <SelectableTabs items={['Snapchat', 'TikTok', 'Google', 'Meta', 'YouTube']} activeItem={activeChannel} onChange={setActiveChannel} />
      <MetricGrid metrics={[['Impressions', '0'], ['Avg. CPC', '0 SAR'], ['Clicks', '0'], ['Spent', '0 SAR']]} />
      <div className="two-panels">
        <Panel title={`${activeChannel} credits`}><b className="big">0</b><p>Low balance</p><button className="outline">Top up</button></Panel>
        <Panel title={`Latest ${activeChannel} Campaigns`}><Empty title="No ad reports yet!" body={`New ${activeChannel} reports will appear here when ads are published.`} /></Panel>
      </div>
    </div>
  )
}

function StoreDesign() {
  return (
    <div className="page-stack">
      <FeatureHero title="Theme editor" badge="Available on your plan" body="Customize your store with guided and clear steps, fast launch, and flexible visual controls." action="Start for free" />
      <section className="theme-grid">
        {themes.map((theme, index) => (
          <article key={theme}>
            <div className={`theme-art t${index + 1}`} />
            <h3>{theme}</h3>
            <p>{['Fashion', 'Electronics', 'Food & Grocery', 'Cosmetics', 'Digital products', 'Gifts'][index]}</p>
            <button>Customize</button>
          </article>
        ))}
      </section>
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
      <LockedFeature title="Salla Payments" body="Make checkout easier for your customers. Enable online payments and let customers pay securely through your store." />
      <section className="verify-card">
        <ShieldCheck size={34} />
        <div><h2>Your store isn't verified</h2><p>Verify your store to activate and manage online payments securely.</p></div>
        <button>Verify now</button>
      </section>
      <section className="payment-grid">
        {['Salla Payments', 'Tabby', 'Tamara', 'Digital wallets', 'PayPal', 'Bank transfer'].map((method) => <article key={method}><WalletCards /><b>{method}</b><button>Activate</button></article>)}
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

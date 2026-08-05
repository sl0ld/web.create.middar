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
]

const menuGroups: Array<[string, string[]]> = [
  ['Orders', ['All orders', 'Order statuses', 'Auto assignment', 'Invoice settings', 'Reservations', 'Custom fields', 'Order options', 'Export templates', 'Automatic tags']],
  ['Products', ['All products', 'Categories & options', 'Product editor', 'Bulk quantities', 'Inventory transfer', 'Product campaigns', 'Product restrictions', 'Import products', 'Export products', 'Stock audit']],
  ['Marketing', ['Ads dashboard', 'Snapchat integration', 'Abandoned carts', 'Coupons', 'Cashback', 'Influencers', 'Offers', 'Retargeting', 'Marketing calendar', 'Customer wallet', 'Affiliate', 'SEO', 'Loyalty', 'Quick checkout', 'Gift', 'Reorder reminders']],
  ['Online Store', ['Store design', 'Theme Marketplace', 'Domain', 'Information pages', 'Custom URLs', 'Salla Point', 'Mobile app', 'Landing pages']],
  ['Customers', ['All customers', 'Settings', 'Customer groups', 'Import customers']],
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

function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [menuOpen, setMenuOpen] = useState(false)
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
      <Header active={active} screen={screen} setScreen={setScreen} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {menuOpen && <MegaMenu setScreen={setScreen} setMenuOpen={setMenuOpen} />}
      <SubNav active={active} />
      <section className="workspace">
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
  menuOpen,
  setMenuOpen,
}: {
  active: Section
  screen: Screen
  setScreen: (screen: Screen) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
}) {
  const mainItems = sections.slice(0, 5)
  return (
    <header className="main-header">
      <button
        className="brand brand-button"
        onClick={() => {
          setScreen('landing')
          setMenuOpen(false)
        }}
      >
        <span className="brand-logo">مدار</span>
      </button>
      <nav className="main-nav">
        <button className={menuOpen ? 'active nav-button' : 'nav-button'} onClick={() => setMenuOpen(!menuOpen)}>
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
            setMenuOpen(false)
          }}
        >
          <BarChart3 size={19} /> Reports
        </button>
      </nav>
      <div className="header-tools">
        <button className="ask"><Sparkles size={18} /></button>
        <button className="tool"><Search size={20} /></button>
        <button className="tool"><Grid3X3 size={20} /></button>
        <button className="tool" onClick={() => setScreen('support')}><MessageCircle size={20} /></button>
        <button className="tool"><Bell size={20} /></button>
        <button className="tool"><Settings size={20} /></button>
        <button className="profile">
          <span>س</span>
          <b>سعيد</b>
          <small>Basic</small>
          <ChevronDown size={17} />
        </button>
      </div>
    </header>
  )
}

function MegaMenu({ setScreen, setMenuOpen }: { setScreen: (screen: Screen) => void; setMenuOpen: (open: boolean) => void }) {
  const routeByGroup: Record<string, Screen> = {
    Orders: 'orders',
    Products: 'products',
    Marketing: 'marketing',
    'Online Store': 'store',
    Customers: 'customers',
    Staff: 'staff',
    Reports: 'reports',
    Support: 'support',
    Shipping: 'shipping',
    Payments: 'payments',
    'Apps & Logs': 'apps',
  }
  return (
    <section className="mega-menu">
      {menuGroups.map(([group, links]) => (
        <article key={group}>
          <h3>{group}</h3>
          {(links as string[]).map((link) => (
            <button
              key={link}
              onClick={() => {
                setScreen(routeByGroup[group] ?? 'summary')
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

function SubNav({ active }: { active: Section }) {
  return (
    <nav className="sub-nav">
      <div>
        {active.tabs.map((tab, index) => <button className={index === 0 ? 'active' : ''} key={tab}>{tab}</button>)}
      </div>
      {active.action && <button className="mint-action"><Plus size={18} /> {active.action}</button>}
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

function Orders() {
  return (
    <PageShell crumb="Orders" title="All orders" aside={<FilterList title="All orders" items={orderStatuses} />}>
      <LockedFeature title="Order Editing" body="Manage your orders, with a button press" />
      <SplitEmpty title="No order selected" action="Filter" />
    </PageShell>
  )
}

function Products() {
  return (
    <PageShell crumb="Products" title="All products" aside={<FilterList title="Product filters" items={productFilters} />}>
      <SplitEmpty title="No products selected" action="Filter" />
    </PageShell>
  )
}

function Marketing() {
  return (
    <div className="page-stack">
      <LockedFeature title="Salla Ads" body="Use Salla Ads to reach more customers and increase your store sales." />
      <div className="channel-tabs">{['Snapchat', 'TikTok', 'Google', 'Meta', 'YouTube'].map((item) => <button key={item}>{item}</button>)}</div>
      <MetricGrid metrics={[['Impressions', '0'], ['Avg. CPC', '0 SAR'], ['Clicks', '0'], ['Spent', '0 SAR']]} />
      <div className="two-panels">
        <Panel title="Store credits"><b className="big">0</b><p>Low balance</p><button className="outline">Top up</button></Panel>
        <Panel title="Latest Campaigns"><Empty title="No ad reports yet!" body="New reports will appear here when ads are published." /></Panel>
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
  return (
    <PageShell crumb="Customers" title="All customers" aside={<FilterList title="Customer groups" items={['All customers', 'Empty groups', 'VIP customers', 'New customers']} />}>
      <LockedFeature title="Add New Customer" body="Effective communication with your customers" />
      <SplitEmpty title="No customer selected" action="Filter" />
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
  return (
    <PageShell crumb="Reports" title="Store performance" aside={<FilterList title="Reports" items={reportMenu} footer="Manage reports" />}>
      <div className="date-card">Jul 2026, 28 - Aug 2026, 04 <button>...</button></div>
      <MetricGrid metrics={[['Gross sales', ''], ['Net sales', ''], ['Total costs', ''], ['Net profit', '']]} skeleton />
    </PageShell>
  )
}

function Support() {
  return (
    <PageShell crumb="Support" title="Reviews" aside={<FilterList title="Inbox" items={['Reviews', 'Questions', 'Reported reviews', 'Tickets', 'Complaints']} />}>
      <SplitEmpty title="No review selected" action="Filter" />
    </PageShell>
  )
}

function Shipping() {
  return (
    <div className="page-stack">
      <FeatureHero title="Manage shipping" badge="Available on your plan" body="A fleet of trusted local and global couriers ready to deliver your orders." action="App Store" />
      <div className="channel-tabs">{['All carriers', 'Standard shipping', 'Express shipping', 'Economy shipping', 'International shipping', 'Freight shipping'].map((item) => <button key={item}>{item}</button>)}</div>
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

function FilterList({ title, items, footer }: { title: string; items: string[]; footer?: string }) {
  return (
    <nav className="side-list">
      <h3>{title}</h3>
      {items.map((item, index) => <button className={index === 0 ? 'active' : ''} key={item}>{item}{index < 4 && <small>0</small>}</button>)}
      {footer && <button className="manage">{footer}</button>}
    </nav>
  )
}

function LockedFeature({ title, body }: { title: string; body: string }) {
  return (
    <section className="locked-card">
      <div>
        <span>{title}</span>
        <small>Available on Plus, Pro, and Special</small>
        <h2>{body}</h2>
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

function SplitEmpty({ title, action }: { title: string; action: string }) {
  return (
    <div className="split-empty">
      <section>
        <button className="filter"><Filter size={17} /> {action}</button>
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

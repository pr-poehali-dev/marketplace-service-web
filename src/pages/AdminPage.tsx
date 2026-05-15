import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/marketplace/ServiceCard';
import { SELLERS, SERVICES, CATEGORIES, ADMIN_STATS, formatPrice } from '@/data/mockData';

type AdminTab = 'dashboard' | 'users' | 'services' | 'orders' | 'categories' | 'reviews' | 'finance' | 'reports';

const MOCK_USERS = [
  { id: 'u1', name: 'Алексей Морозов', email: 'alex@mail.ru', role: 'seller', status: 'active', joined: '2021-03-15', orders: 89 },
  { id: 'u2', name: 'Мария Захарова', email: 'maria@gmail.com', role: 'seller', status: 'active', joined: '2022-01-10', orders: 67 },
  { id: 'u3', name: 'Иван Иванов', email: 'ivan@yandex.ru', role: 'buyer', status: 'active', joined: '2024-02-05', orders: 3 },
  { id: 'u4', name: 'Пётр Сидоров', email: 'petr@mail.ru', role: 'buyer', status: 'blocked', joined: '2023-11-10', orders: 0 },
  { id: 'u5', name: 'Елена Сорокина', email: 'elena@gmail.com', role: 'seller', status: 'active', joined: '2022-09-01', orders: 87 },
];

const MOCK_ALL_ORDERS = [
  { id: 'ao1', service: 'Разработка сайта', seller: 'Алексей М.', buyer: 'Иван И.', status: 'completed', price: 35000, date: '2024-04-01' },
  { id: 'ao2', service: 'Логотип с нуля', seller: 'Елена С.', buyer: 'Мария В.', status: 'in_progress', price: 8000, date: '2024-04-28' },
  { id: 'ao3', service: 'SEO-продвижение', seller: 'Дмитрий В.', buyer: 'Пётр С.', status: 'paid', price: 12000, date: '2024-05-01' },
  { id: 'ao4', service: 'SMM ВКонтакте', seller: 'Владимир О.', buyer: 'Светлана К.', status: 'cancelled', price: 10000, date: '2024-04-20' },
];

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700',
  blocked: 'bg-red-50 text-red-700',
  completed: 'bg-emerald-50 text-emerald-700',
  in_progress: 'bg-indigo-50 text-indigo-700',
  paid: 'bg-blue-50 text-blue-700',
  cancelled: 'bg-red-50 text-red-700',
  pending: 'bg-amber-50 text-amber-700',
};

const TOP_SELLERS = SELLERS.slice(0, 10).map((s, i) => ({
  ...s,
  revenue: s.totalEarned,
  rank: i + 1,
})).sort((a, b) => b.revenue - a.revenue);

const CAT_REPORT = CATEGORIES.map(c => ({
  name: c.name,
  orders: Math.floor(c.count * 2.3),
  revenue: Math.floor(c.count * 28000),
  color: c.color,
})).sort((a, b) => b.revenue - a.revenue);

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [userFilter, setUserFilter] = useState<'all' | 'buyer' | 'seller' | 'blocked'>('all');
  const [reportType, setReportType] = useState<'sellers' | 'categories' | 'finance' | 'reviews' | 'activity'>('sellers');

  const tabs = [
    { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'users', label: 'Пользователи', icon: 'Users' },
    { id: 'services', label: 'Услуги', icon: 'Package' },
    { id: 'orders', label: 'Лоты', icon: 'ShoppingBag' },
    { id: 'categories', label: 'Категории', icon: 'Grid3x3' },
    { id: 'reviews', label: 'Отзывы', icon: 'Star' },
    { id: 'finance', label: 'Финансы', icon: 'TrendingUp' },
    { id: 'reports', label: 'Отчёты', icon: 'FileBarChart' },
  ] as const;

  const filteredUsers = MOCK_USERS.filter(u => {
    if (userFilter === 'all') return true;
    if (userFilter === 'blocked') return u.status === 'blocked';
    return u.role === userFilter;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-[hsl(222,40%,8%)] text-white px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Icon name="Shield" size={16} className="text-white" />
          </div>
          <span className="font-montserrat font-bold">Админ-панель МастерРынок</span>
          <Badge className="ml-2 bg-primary/20 text-primary border-0 text-xs">Admin</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 border border-border overflow-x-auto scrollbar-hide w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 ${activeTab === tab.id ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name={tab.icon as 'Shield'} size={13} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Пользователей', value: ADMIN_STATS.totalUsers.toLocaleString(), sub: `+${ADMIN_STATS.newUsersToday} сегодня`, icon: 'Users', color: 'text-primary', bg: 'bg-primary/10' },
                { label: 'Активных услуг', value: ADMIN_STATS.activeServices, sub: `${ADMIN_STATS.totalServices} всего`, icon: 'Package', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Лотов сегодня', value: ADMIN_STATS.ordersToday, sub: `${ADMIN_STATS.totalOrders.toLocaleString()} всего`, icon: 'ShoppingBag', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Оборот (сегодня)', value: `${(ADMIN_STATS.revenue.today / 1000).toFixed(0)}K ₽`, sub: `${(ADMIN_STATS.revenue.month / 1000000).toFixed(2)}M за месяц`, icon: 'TrendingUp', color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-4">
                  <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon name={s.icon as 'Users'} size={18} className={s.color} />
                  </div>
                  <div className="text-2xl font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-border p-5">
                <h3 className="font-semibold mb-4">Комиссия платформы</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Оборот за неделю</span>
                    <span className="font-semibold">{(ADMIN_STATS.revenue.week / 1000).toFixed(0)}K ₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Оборот за месяц</span>
                    <span className="font-semibold">{(ADMIN_STATS.revenue.month / 1000000).toFixed(2)}M ₽</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-border pt-3">
                    <span className="text-muted-foreground">Комиссия (10%)</span>
                    <span className="font-bold text-emerald-600">{(ADMIN_STATS.revenue.commission / 1000).toFixed(0)}K ₽</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-border p-5">
                <h3 className="font-semibold mb-4">Топ-5 продавцов</h3>
                <div className="space-y-2">
                  {ADMIN_STATS.topSellers.map((s, i) => (
                    <div key={s.id} className="flex items-center gap-2 text-sm">
                      <span className="w-5 text-muted-foreground text-xs">#{i + 1}</span>
                      <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-white text-[10px] font-bold">{s.initials}</div>
                      <span className="flex-1 truncate">{s.name}</span>
                      <span className="font-semibold text-xs">{(s.totalEarned / 1000000).toFixed(2)}M</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* USERS */}
        {activeTab === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                {(['all', 'buyer', 'seller', 'blocked'] as const).map(f => (
                  <button key={f} onClick={() => setUserFilter(f)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${userFilter === f ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                    {f === 'all' ? 'Все' : f === 'buyer' ? 'Покупатели' : f === 'seller' ? 'Продавцы' : 'Заблокированные'}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    {['Пользователь', 'Email', 'Роль', 'Статус', 'Заказов', 'Действия'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, i) => (
                    <tr key={user.id} className={`border-t border-border ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                      <td className="px-4 py-3 font-medium">{user.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-xs border-0 ${user.role === 'seller' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {user.role === 'seller' ? 'Продавец' : 'Покупатель'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[user.status]}`}>
                          {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{user.orders}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-7 text-xs">Профиль</Button>
                          <Button variant="ghost" size="sm" className={`h-7 text-xs ${user.status === 'blocked' ? 'text-emerald-600' : 'text-destructive'}`}>
                            {user.status === 'blocked' ? 'Разблок.' : 'Блок.'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Модерация услуг</h2>
              <Badge className="bg-amber-50 text-amber-700 border-amber-200">3 на проверке</Badge>
            </div>
            {SERVICES.slice(0, 6).map(svc => (
              <div key={svc.id} className="bg-white rounded-2xl border border-border p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Package" size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{svc.title}</div>
                  <div className="text-xs text-muted-foreground">{formatPrice(svc.price, svc.priceType)} · {svc.ordersCount} заказов</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {svc.isFeatured && <Badge className="bg-primary/10 text-primary border-0 text-xs">ТОП</Badge>}
                  <Badge className={`text-xs border-0 ${svc.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-muted text-muted-foreground'}`}>
                    {svc.isActive ? 'Активна' : 'Черновик'}
                  </Badge>
                  <Button variant="outline" size="sm" className="h-7 text-xs">Промо</Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive">Удалить</Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ORDERS */}
        {activeTab === 'orders' && (
          <div>
            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    {['ID', 'Услуга', 'Продавец', 'Покупатель', 'Статус', 'Сумма', 'Дата', 'Действие'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ALL_ORDERS.map((order, i) => (
                    <tr key={order.id} className={`border-t border-border ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                      <td className="px-4 py-3 text-muted-foreground text-xs font-mono">{order.id}</td>
                      <td className="px-4 py-3 font-medium truncate max-w-[140px]">{order.service}</td>
                      <td className="px-4 py-3 text-muted-foreground">{order.seller}</td>
                      <td className="px-4 py-3 text-muted-foreground">{order.buyer}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[order.status] || 'bg-muted text-muted-foreground'}`}>
                          {order.status === 'completed' ? 'Завершён' : order.status === 'in_progress' ? 'В работе' : order.status === 'paid' ? 'Оплачен' : 'Отменён'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-semibold">{order.price.toLocaleString('ru-RU')} ₽</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(order.date).toLocaleDateString('ru-RU')}</td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Детали</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CATEGORIES */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Управление категориями</h2>
              <Button size="sm" className="gradient-primary text-white border-0">
                <Icon name="Plus" size={14} className="mr-1" />
                Добавить
              </Button>
            </div>
            <div className="space-y-2">
              {CATEGORIES.map(cat => (
                <div key={cat.id}>
                  <div className="bg-white rounded-2xl border border-border p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: cat.color }}>
                      <Icon name={cat.icon as 'Code'} size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{cat.name}</div>
                      <div className="text-xs text-muted-foreground">{cat.count} услуг · {cat.children?.length} подкатегорий</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-7 text-xs">Редакт.</Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive">Удалить</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-3">
            {[
              { buyer: 'Михаил К.', seller: 'Алексей Морозов', rating: 5, text: 'Отличная работа! Всё сделано качественно и в срок.', date: '15.04.2024' },
              { buyer: 'Ольга Т.', seller: 'Елена Сорокина', rating: 5, text: 'Очень довольна логотипом!', date: '10.04.2024' },
              { buyer: 'Денис Р.', seller: 'Анна Белова', rating: 5, text: 'Текст для лендинга написан профессионально.', date: '08.04.2024' },
            ].map((rev, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {rev.buyer.slice(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{rev.buyer}</span>
                    <span className="text-muted-foreground text-xs">→</span>
                    <span className="text-xs text-muted-foreground">{rev.seller}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{rev.date}</span>
                  </div>
                  <StarRating rating={rev.rating} small />
                  <p className="text-sm text-muted-foreground mt-1.5">{rev.text}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive flex-shrink-0">Удалить</Button>
              </div>
            ))}
          </div>
        )}

        {/* FINANCE */}
        {activeTab === 'finance' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Оборот за месяц', value: '7,34M ₽', icon: 'TrendingUp', color: 'text-primary' },
                { label: 'Комиссия (10%)', value: '734K ₽', icon: 'Percent', color: 'text-emerald-600' },
                { label: 'Выплаты продавцам', value: '6,60M ₽', icon: 'ArrowDownToLine', color: 'text-indigo-600' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-border p-5">
                  <Icon name={item.icon as 'TrendingUp'} size={22} className={`${item.color} mb-3`} />
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-xs text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Настройка комиссии</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Текущая комиссия платформы</label>
                  <div className="flex items-center gap-2">
                    <input type="number" defaultValue={10} className="w-20 border border-border rounded-lg px-3 py-2 text-sm" />
                    <span className="text-sm text-muted-foreground">%</span>
                    <Button size="sm" className="gradient-primary text-white border-0">Сохранить</Button>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground max-w-xs">
                  Комиссия взимается с каждого успешно завершённого лота. Изменение применяется к новым лотам.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'sellers', label: 'Продавцы' },
                  { id: 'categories', label: 'Категории' },
                  { id: 'finance', label: 'Финансы' },
                  { id: 'reviews', label: 'Отзывы' },
                  { id: 'activity', label: 'Активность' },
                ].map(r => (
                  <button key={r.id} onClick={() => setReportType(r.id as typeof reportType)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${reportType === r.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
                    {r.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Icon name="Download" size={13} className="mr-1" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Icon name="FileText" size={13} className="mr-1" />
                  PDF
                </Button>
              </div>
            </div>

            {reportType === 'sellers' && (
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                  <h3 className="font-semibold">ТОП-10 продавцов по выручке</h3>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-muted/30">
                    <tr>
                      {['#', 'Продавец', 'Заказов', 'Рейтинг', 'Выручка', 'Комиссия'].map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-xs text-muted-foreground font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TOP_SELLERS.map((s, i) => (
                      <tr key={s.id} className={`border-t border-border ${i % 2 === 0 ? '' : 'bg-muted/10'}`}>
                        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">{i + 1}</td>
                        <td className="px-4 py-3 font-medium">{s.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{s.completedOrders}</td>
                        <td className="px-4 py-3">
                          <StarRating rating={s.rating} small />
                        </td>
                        <td className="px-4 py-3 font-semibold">{(s.revenue / 1000000).toFixed(2)}M ₽</td>
                        <td className="px-4 py-3 text-emerald-600 font-semibold">{(s.revenue * 0.1 / 1000).toFixed(0)}K ₽</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {reportType === 'categories' && (
              <div className="bg-white rounded-2xl border border-border overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                  <h3 className="font-semibold">Доходность категорий</h3>
                </div>
                <div className="p-5 space-y-4">
                  {CAT_REPORT.map((cat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{cat.name}</span>
                        <span className="font-bold">{(cat.revenue / 1000000).toFixed(2)}M ₽</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${(cat.revenue / CAT_REPORT[0].revenue) * 100}%`, background: cat.color }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">{cat.orders} лотов</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {reportType === 'finance' && (
              <div className="bg-white rounded-2xl border border-border p-5">
                <h3 className="font-semibold mb-4">Финансовый отчёт</h3>
                <div className="space-y-3">
                  {[
                    { period: 'Январь 2024', revenue: 4200000, commission: 420000, payouts: 3780000 },
                    { period: 'Февраль 2024', revenue: 5100000, commission: 510000, payouts: 4590000 },
                    { period: 'Март 2024', revenue: 6300000, commission: 630000, payouts: 5670000 },
                    { period: 'Апрель 2024', revenue: 7340000, commission: 734000, payouts: 6606000 },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-4 gap-2 py-2.5 border-b border-border last:border-0 text-sm">
                      <div className="font-medium">{row.period}</div>
                      <div>{(row.revenue / 1000000).toFixed(2)}M ₽</div>
                      <div className="text-emerald-600 font-semibold">{(row.commission / 1000).toFixed(0)}K ₽</div>
                      <div className="text-muted-foreground">{(row.payouts / 1000000).toFixed(2)}M ₽</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {reportType === 'reviews' && (
              <div className="bg-white rounded-2xl border border-border p-5">
                <h3 className="font-semibold mb-4">Аналитика отзывов</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <div className="text-3xl font-bold text-amber-500">4.8</div>
                    <div className="text-xs text-muted-foreground">Средний рейтинг</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <div className="text-3xl font-bold">2 891</div>
                    <div className="text-xs text-muted-foreground">Всего отзывов</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-xl">
                    <div className="text-3xl font-bold text-emerald-600">94%</div>
                    <div className="text-xs text-muted-foreground">Положительных (4-5 ★)</div>
                  </div>
                </div>
                {[5, 4, 3, 2, 1].map(star => {
                  const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 6 : star === 2 ? 2 : 2;
                  return (
                    <div key={star} className="flex items-center gap-3 mb-2">
                      <span className="text-xs w-6 text-right">{star}★</span>
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-8">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            )}

            {reportType === 'activity' && (
              <div className="bg-white rounded-2xl border border-border p-5">
                <h3 className="font-semibold mb-4">Активность пользователей</h3>
                <div className="space-y-3">
                  {[
                    { period: 'Сегодня', registrations: 23, orders: 47, revenue: '284K ₽' },
                    { period: 'Эта неделя', registrations: 156, orders: 312, revenue: '1,87M ₽' },
                    { period: 'Этот месяц', registrations: 634, orders: 1248, revenue: '7,34M ₽' },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-4 gap-2 py-2.5 border-b border-border last:border-0 text-sm">
                      <div className="font-medium">{row.period}</div>
                      <div>{row.registrations} регистраций</div>
                      <div>{row.orders} лотов</div>
                      <div className="text-emerald-600 font-semibold">{row.revenue}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

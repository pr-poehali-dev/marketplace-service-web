import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/marketplace/ServiceCard';
import { SELLERS, getServicesBySeller, formatPrice } from '@/data/mockData';

type OrderStatus = 'new' | 'paid' | 'in_progress' | 'completed' | 'cancelled';

const MOCK_INCOMING = [
  { id: 'lo1', serviceName: 'Разработка сайта на React + Node.js', buyerName: 'Михаил К.', status: 'paid' as OrderStatus, price: 35000, date: '2024-05-01' },
  { id: 'lo2', serviceName: 'Лендинг на React за 3 дня', buyerName: 'Светлана Р.', status: 'new' as OrderStatus, price: 9000, date: '2024-05-10' },
  { id: 'lo3', serviceName: 'REST API на FastAPI', buyerName: 'Андрей Т.', status: 'in_progress' as OrderStatus, price: 22000, date: '2024-04-25' },
  { id: 'lo4', serviceName: 'Telegram-бот', buyerName: 'Ольга В.', status: 'completed' as OrderStatus, price: 6500, date: '2024-04-10' },
];

const MOCK_REVIEWS = [
  { id: 'r1', buyer: 'Михаил К.', text: 'Отличная работа! Всё сделано качественно и в срок.', rating: 5, date: '2024-04-15' },
  { id: 'r2', buyer: 'Светлана Р.', text: 'Хорошее качество, но пришлось делать несколько правок.', rating: 4, date: '2024-04-08' },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  new: { label: 'Новый', color: 'text-amber-700', bg: 'bg-amber-50' },
  paid: { label: 'Оплачен', color: 'text-blue-700', bg: 'bg-blue-50' },
  in_progress: { label: 'В работе', color: 'text-indigo-700', bg: 'bg-indigo-50' },
  completed: { label: 'Завершён', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  cancelled: { label: 'Отменён', color: 'text-red-700', bg: 'bg-red-50' },
};

const seller = SELLERS[0];
const services = getServicesBySeller('s1');

const CHART_DATA = [
  { day: 'Пн', value: 12000 }, { day: 'Вт', value: 28000 }, { day: 'Ср', value: 8000 },
  { day: 'Чт', value: 35000 }, { day: 'Пт', value: 22000 }, { day: 'Сб', value: 15000 }, { day: 'Вс', value: 9000 },
];
const maxChart = Math.max(...CHART_DATA.map(d => d.value));

export default function SellerCabinetPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'orders' | 'reviews' | 'finance'>('overview');

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: 'LayoutDashboard' },
    { id: 'services', label: 'Услуги', icon: 'Package' },
    { id: 'orders', label: 'Лоты', icon: 'ShoppingBag' },
    { id: 'reviews', label: 'Отзывы', icon: 'Star' },
    { id: 'finance', label: 'Финансы', icon: 'TrendingUp' },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold">
          {seller.initials}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-montserrat font-bold text-xl">{seller.name}</h1>
            {seller.isVerified && <Icon name="BadgeCheck" size={18} className="text-primary" />}
          </div>
          <div className="flex items-center gap-2">
            <StarRating rating={seller.rating} small />
            <span className="text-muted-foreground text-xs">· Кабинет продавца</span>
          </div>
        </div>
        <div className="ml-auto">
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
            <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block mr-1.5" />
            Онлайн
          </Badge>
        </div>
      </div>

      <div className="flex gap-1 mb-6 bg-muted rounded-xl p-1 overflow-x-auto scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${activeTab === tab.id ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Icon name={tab.icon} size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Активных услуг', value: services.length, icon: 'Package', color: 'text-primary', bg: 'bg-primary/10' },
              { label: 'Выполненных', value: seller.completedOrders, icon: 'CheckCircle', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Отзывов', value: seller.reviewsCount, icon: 'Star', color: 'text-amber-500', bg: 'bg-amber-50' },
              { label: 'Рейтинг', value: seller.rating.toFixed(1), icon: 'TrendingUp', color: 'text-indigo-600', bg: 'bg-indigo-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-border p-4">
                <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                  <Icon name={stat.icon as 'Package'} size={18} className={stat.color} />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Заработок за неделю</h3>
              <span className="text-sm text-muted-foreground">129 000 ₽</span>
            </div>
            <div className="flex items-end gap-2 h-32">
              {CHART_DATA.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-lg gradient-primary transition-all hover:opacity-80"
                    style={{ height: `${(d.value / maxChart) * 100}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-semibold mb-3">Входящие лоты (последние)</h3>
            <div className="space-y-2">
              {MOCK_INCOMING.slice(0, 3).map(order => {
                const cfg = STATUS_CONFIG[order.status];
                return (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <div className="text-sm font-medium">{order.serviceName}</div>
                      <div className="text-xs text-muted-foreground">{order.buyerName}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                      <span className="font-semibold text-sm">{order.price.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'services' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Мои услуги ({services.length})</h2>
            <Button size="sm" className="gradient-primary text-white border-0">
              <Icon name="Plus" size={14} className="mr-1" />
              Добавить
            </Button>
          </div>
          <div className="space-y-3">
            {services.map(svc => (
              <div key={svc.id} className="bg-white rounded-2xl border border-border p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Briefcase" size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{svc.title}</div>
                  <div className="text-xs text-muted-foreground">{formatPrice(svc.price, svc.priceType)} · {svc.ordersCount} заказов</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={svc.isActive ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-muted text-muted-foreground border-transparent'}>
                    {svc.isActive ? 'Активна' : 'Черновик'}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Icon name="Edit" size={13} />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive">
                    <Icon name="Trash2" size={13} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-3">
          {MOCK_INCOMING.map(order => {
            const cfg = STATUS_CONFIG[order.status];
            return (
              <div key={order.id} className="bg-white rounded-2xl border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="font-semibold text-sm mb-1">{order.serviceName}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <Icon name="User" size={11} />
                      {order.buyerName}
                      <span>·</span>
                      {new Date(order.date).toLocaleDateString('ru-RU')}
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold mb-2">{order.price.toLocaleString('ru-RU')} ₽</div>
                    <div className="flex gap-1.5">
                      <Button variant="outline" size="sm" className="text-xs h-7">
                        <Icon name="MessageCircle" size={11} className="mr-1" />
                        Чат
                      </Button>
                      {order.status === 'new' && (
                        <Button size="sm" className="text-xs h-7 gradient-primary text-white border-0">Принять</Button>
                      )}
                      {order.status === 'in_progress' && (
                        <Button size="sm" className="text-xs h-7 bg-emerald-500 text-white border-0">Завершить</Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-3">
          {MOCK_REVIEWS.map(rev => (
            <div key={rev.id} className="bg-white rounded-2xl border border-border p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                  {rev.buyer.slice(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{rev.buyer}</span>
                    <span className="text-xs text-muted-foreground">{new Date(rev.date).toLocaleDateString('ru-RU')}</span>
                  </div>
                  <StarRating rating={rev.rating} small />
                  <p className="text-sm text-muted-foreground mt-2">{rev.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'finance' && (
        <div className="space-y-4">
          <div className="gradient-hero text-white rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-white/60 mb-1">На балансе</div>
                <div className="text-2xl font-bold">48 400 ₽</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">За месяц</div>
                <div className="text-2xl font-bold">129 000 ₽</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Всего заработано</div>
                <div className="text-2xl font-bold">2,84 млн</div>
              </div>
            </div>
            <Button className="mt-4 bg-white/20 hover:bg-white/30 text-white border-0">
              <Icon name="ArrowDownToLine" size={15} className="mr-2" />
              Запросить вывод
            </Button>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-semibold mb-4">Последние начисления</h3>
            <div className="space-y-3">
              {[
                { name: 'Лот: Разработка сайта (за вычетом 10%)', amount: 31500, date: '01.05.2024' },
                { name: 'Лот: Telegram-бот', amount: 5850, date: '10.04.2024' },
                { name: 'Лот: REST API', amount: 19800, date: '25.04.2024' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <div className="text-sm font-medium">{tx.name}</div>
                    <div className="text-xs text-muted-foreground">{tx.date}</div>
                  </div>
                  <div className="font-semibold text-emerald-600">+{tx.amount.toLocaleString('ru-RU')} ₽</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

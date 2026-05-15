import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type OrderStatus = 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled';

const MOCK_ORDERS = [
  { id: 'o1', serviceName: 'Разработка сайта на React + Node.js', sellerName: 'Алексей Морозов', status: 'completed' as OrderStatus, price: 35000, date: '2024-04-01', canReview: true },
  { id: 'o2', serviceName: 'SEO-продвижение сайта', sellerName: 'Дмитрий Волков', status: 'in_progress' as OrderStatus, price: 12000, date: '2024-04-20', canReview: false },
  { id: 'o3', serviceName: 'Продающие тексты для лендинга', sellerName: 'Анна Белова', status: 'paid' as OrderStatus, price: 3500, date: '2024-05-01', canReview: false },
  { id: 'o4', serviceName: 'Логотип с нуля', sellerName: 'Елена Сорокина', status: 'completed' as OrderStatus, price: 8000, date: '2024-03-15', canReview: false },
  { id: 'o5', serviceName: 'Telegram-бот на Python', sellerName: 'Сергей Кузнецов', status: 'cancelled' as OrderStatus, price: 6000, date: '2024-03-28', canReview: false },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  pending: { label: 'Ожидает оплаты', color: 'text-amber-700', bg: 'bg-amber-50' },
  paid: { label: 'Оплачен', color: 'text-blue-700', bg: 'bg-blue-50' },
  in_progress: { label: 'В работе', color: 'text-indigo-700', bg: 'bg-indigo-50' },
  completed: { label: 'Завершён', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  cancelled: { label: 'Отменён', color: 'text-red-700', bg: 'bg-red-50' },
};

export default function BuyerCabinetPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'wallet' | 'profile'>('orders');
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [reviewModal, setReviewModal] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  const filteredOrders = MOCK_ORDERS.filter(o => filterStatus === 'all' || o.status === filterStatus);

  const tabs = [
    { id: 'orders', label: 'Мои лоты', icon: 'ShoppingBag' },
    { id: 'wallet', label: 'Кошелёк', icon: 'Wallet' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold">
          ИП
        </div>
        <div>
          <h1 className="font-montserrat font-bold text-2xl">Иван Покупатель</h1>
          <p className="text-muted-foreground text-sm">Кабинет покупателя</p>
        </div>
      </div>

      <div className="flex gap-1 mb-6 bg-muted rounded-xl p-1 w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <Icon name={tab.icon} size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'orders' && (
        <div>
          <div className="flex gap-2 mb-4 flex-wrap">
            {(['all', 'pending', 'paid', 'in_progress', 'completed', 'cancelled'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterStatus === status ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:text-foreground'}`}
              >
                {status === 'all' ? 'Все' : STATUS_CONFIG[status as OrderStatus].label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredOrders.map(order => {
              const statusCfg = STATUS_CONFIG[order.status];
              return (
                <div key={order.id} className="bg-white rounded-2xl border border-border p-4 animate-fade-in">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-1">{order.serviceName}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Icon name="User" size={11} />
                        {order.sellerName}
                        <span>·</span>
                        {new Date(order.date).toLocaleDateString('ru-RU')}
                      </div>
                      <span className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full font-medium ${statusCfg.bg} ${statusCfg.color}`}>
                        {statusCfg.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{order.price.toLocaleString('ru-RU')} ₽</div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm" className="text-xs h-7">
                          <Icon name="MessageCircle" size={11} className="mr-1" />
                          Чат
                        </Button>
                        {order.canReview && (
                          <Button size="sm" className="text-xs h-7 gradient-primary text-white border-0" onClick={() => setReviewModal(order.id)}>
                            <Icon name="Star" size={11} className="mr-1" />
                            Отзыв
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'wallet' && (
        <div className="space-y-4">
          <div className="gradient-hero text-white rounded-2xl p-6">
            <div className="text-sm text-white/60 mb-1">Баланс кошелька</div>
            <div className="text-4xl font-bold mb-4">2 500 ₽</div>
            <Button className="bg-white/20 hover:bg-white/30 text-white border-0">
              <Icon name="Plus" size={15} className="mr-2" />
              Пополнить
            </Button>
          </div>

          <div className="bg-white rounded-2xl border border-border p-5">
            <h3 className="font-semibold mb-4">История транзакций</h3>
            <div className="space-y-3">
              {[
                { name: 'Оплата: Разработка сайта', amount: -35000, date: '01.04.2024', type: 'expense' },
                { name: 'Возврат: Telegram-бот', amount: 6000, date: '28.03.2024', type: 'refund' },
                { name: 'Оплата: Логотип', amount: -8000, date: '15.03.2024', type: 'expense' },
                { name: 'Пополнение баланса', amount: 10000, date: '10.03.2024', type: 'deposit' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <div className="text-sm font-medium">{tx.name}</div>
                    <div className="text-xs text-muted-foreground">{tx.date}</div>
                  </div>
                  <div className={`font-semibold ${tx.amount > 0 ? 'text-emerald-600' : 'text-foreground'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('ru-RU')} ₽
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Личные данные</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Имя', value: 'Иван', icon: 'User' },
              { label: 'Фамилия', value: 'Покупатель', icon: 'User' },
              { label: 'Email', value: 'ivan@example.com', icon: 'Mail' },
              { label: 'Телефон', value: '+7 (900) 123-45-67', icon: 'Phone' },
              { label: 'Город', value: 'Москва', icon: 'MapPin' },
            ].map((field, i) => (
              <div key={i}>
                <label className="text-xs text-muted-foreground mb-1 block">{field.label}</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border bg-muted/30 text-sm">
                  <Icon name={field.icon as 'User'} size={14} className="text-muted-foreground" />
                  {field.value}
                </div>
              </div>
            ))}
          </div>
          <Button className="mt-5 gradient-primary text-white border-0">
            <Icon name="Save" size={14} className="mr-2" />
            Сохранить изменения
          </Button>
        </div>
      )}

      {reviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md mx-4 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Оставить отзыв</h3>
              <button onClick={() => setReviewModal(null)}><Icon name="X" size={20} /></button>
            </div>
            <div className="flex gap-1 mb-4">
              {[1,2,3,4,5].map(star => (
                <button key={star} onClick={() => setReviewRating(star)}>
                  <Icon name="Star" size={28} className={star <= reviewRating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'} />
                </button>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Расскажите о своём опыте работы с продавцом..."
              className="w-full border border-border rounded-xl p-3 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            />
            <Button className="w-full gradient-primary text-white border-0" onClick={() => setReviewModal(null)}>
              Отправить отзыв
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

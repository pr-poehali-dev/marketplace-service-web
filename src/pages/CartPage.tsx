import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getSellerById, formatPrice, type Service } from '@/data/mockData';

interface CartPageProps {
  cart: Service[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onViewService: (service: Service) => void;
}

export default function CartPage({ cart, onRemove, onCheckout, onViewService }: CartPageProps) {
  const total = cart.reduce((sum, s) => sum + s.price, 0);

  const categoryColors: Record<string, string> = {
    it: '#6366f1', design: '#ec4899', marketing: '#f59e0b',
    education: '#10b981', business: '#3b82f6', content: '#8b5cf6',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-montserrat font-bold text-2xl mb-6">
        Корзина {cart.length > 0 && <span className="text-muted-foreground font-normal text-lg">({cart.length})</span>}
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Icon name="ShoppingCart" size={40} className="text-muted-foreground" />
          </div>
          <h2 className="font-semibold text-xl mb-2">Корзина пуста</h2>
          <p className="text-muted-foreground text-sm mb-6">Добавьте услуги, чтобы продолжить</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {cart.map((svc) => {
              const seller = getSellerById(svc.sellerId);
              const color = categoryColors[svc.category] || '#6366f1';
              return (
                <div key={svc.id} className="bg-white rounded-2xl border border-border p-4 flex gap-4 animate-fade-in">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}22` }}
                  >
                    <Icon name="Briefcase" size={24} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <button
                      className="font-semibold text-sm hover:text-primary transition-colors text-left line-clamp-2"
                      onClick={() => onViewService(svc)}
                    >
                      {svc.title}
                    </button>
                    {seller && (
                      <div className="flex items-center gap-1 mt-1">
                        <Icon name="User" size={11} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{seller.name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="outline" className="text-xs">
                        <Icon name="Clock" size={10} className="mr-1" />
                        {svc.deliveryDays} дн.
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end justify-between">
                    <div className="font-bold text-foreground">{formatPrice(svc.price, svc.priceType)}</div>
                    <button
                      onClick={() => onRemove(svc.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-border p-5 sticky top-20">
              <h3 className="font-semibold mb-4">Итого</h3>
              <div className="space-y-2 mb-4">
                {cart.map(svc => (
                  <div key={svc.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate mr-2">{svc.title.slice(0, 25)}...</span>
                    <span className="font-medium flex-shrink-0">{svc.price.toLocaleString('ru-RU')} ₽</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 flex justify-between mb-5">
                <span className="font-bold">Итого</span>
                <span className="font-bold text-lg">{total.toLocaleString('ru-RU')} ₽</span>
              </div>

              <div className="space-y-2 mb-4">
                {['Банковская карта', 'ЮMoney', 'СБП'].map(method => (
                  <label key={method} className="flex items-center gap-2 cursor-pointer text-sm p-2 rounded-lg hover:bg-muted">
                    <input type="radio" name="payment" className="accent-primary" defaultChecked={method === 'Банковская карта'} />
                    {method}
                  </label>
                ))}
              </div>

              <Button className="w-full gradient-primary text-white border-0 h-11" onClick={onCheckout}>
                <Icon name="CreditCard" size={16} className="mr-2" />
                Оплатить {total.toLocaleString('ru-RU')} ₽
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-3">
                Тестовый режим — реальных списаний нет
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

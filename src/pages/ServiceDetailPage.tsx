import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/marketplace/ServiceCard';
import { REVIEWS, SERVICES, getSellerById, getServicesBySeller, formatPrice, type Service, type Seller } from '@/data/mockData';

interface ServiceDetailPageProps {
  service: Service;
  isFavorite: boolean;
  onFavorite: () => void;
  onAddToCart: (service: Service) => void;
  onViewSeller: (seller: Seller) => void;
  onBack: () => void;
}

export default function ServiceDetailPage({ service, isFavorite, onFavorite, onAddToCart, onViewSeller, onBack }: ServiceDetailPageProps) {
  const seller = getSellerById(service.sellerId);
  const reviews = REVIEWS.filter(r => r.serviceId === service.id);
  const allReviews = REVIEWS.slice(0, 3);
  const sellerServices = seller ? getServicesBySeller(seller.id).filter(s => s.id !== service.id).slice(0, 3) : [];

  const categoryColors: Record<string, string> = {
    it: '#6366f1', design: '#ec4899', marketing: '#f59e0b',
    education: '#10b981', business: '#3b82f6', content: '#8b5cf6',
  };
  const color = categoryColors[service.category] || '#6366f1';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <Icon name="ArrowLeft" size={16} />
        <span className="text-sm">Назад</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN */}
        <div className="lg:col-span-2 space-y-6">
          <div
            className="h-64 rounded-2xl flex items-center justify-center relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${color}22 0%, ${color}55 100%)` }}
          >
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center opacity-40" style={{ background: color }}>
              <Icon name="Briefcase" size={40} className="text-white" />
            </div>
            <div className="absolute top-4 left-4 flex gap-2">
              {service.isFeatured && <Badge className="text-white border-0" style={{ background: color }}>ТОП услуга</Badge>}
              {service.isNew && <Badge className="bg-emerald-500 text-white border-0">Новинка</Badge>}
            </div>
          </div>

          <div>
            <h1 className="font-montserrat font-bold text-2xl mb-3">{service.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <StarRating rating={service.rating} />
                <span className="ml-1">({service.reviewsCount} отзывов)</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="ShoppingBag" size={14} />
                {service.ordersCount} заказов
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={14} />
                {service.deliveryDays} дн.
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {service.tags.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">{tag}</span>
              ))}
            </div>

            <div className="bg-muted/50 rounded-2xl p-5">
              <h2 className="font-semibold mb-2">Описание</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          </div>

          {/* REVIEWS */}
          <div>
            <h2 className="font-semibold text-lg mb-4">Отзывы {allReviews.length > 0 && `(${allReviews.length})`}</h2>
            {allReviews.length === 0 ? (
              <div className="text-center py-8 bg-muted/50 rounded-2xl">
                <Icon name="MessageSquare" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">Пока нет отзывов. Будьте первым!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {allReviews.map(rev => (
                  <div key={rev.id} className="bg-white rounded-2xl border border-border p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {rev.buyerAvatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm">{rev.buyerName}</span>
                          <span className="text-xs text-muted-foreground">{new Date(rev.date).toLocaleDateString('ru-RU')}</span>
                        </div>
                        <StarRating rating={rev.rating} small />
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{rev.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-border p-5 sticky top-20">
            <div className="text-2xl font-bold mb-1">
              {formatPrice(service.price, service.priceType, service.priceMax)}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
              <Icon name="Clock" size={14} />
              Срок выполнения: {service.deliveryDays} {service.deliveryDays === 1 ? 'день' : 'дней'}
            </div>

            <Button
              className="w-full mb-3 gradient-primary text-white border-0 h-11"
              onClick={() => onAddToCart(service)}
            >
              <Icon name="ShoppingCart" size={16} className="mr-2" />
              В корзину
            </Button>
            <Button variant="outline" className="w-full h-11 mb-4">
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Написать продавцу
            </Button>
            <button onClick={onFavorite} className="w-full flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-rose-500 transition-colors">
              <Icon name="Heart" size={15} className={isFavorite ? 'text-rose-500 fill-rose-500' : ''} />
              {isFavorite ? 'Убрать из избранного' : 'В избранное'}
            </button>
          </div>

          {seller && (
            <div
              className="bg-white rounded-2xl border border-border p-5 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onViewSeller(seller)}
            >
              <h3 className="font-semibold text-sm mb-3">Продавец</h3>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold">
                  {seller.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-semibold text-sm">{seller.name}</span>
                    {seller.isVerified && <Icon name="BadgeCheck" size={13} className="text-primary" />}
                  </div>
                  <StarRating rating={seller.rating} small />
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-muted-foreground">
                    <div><span className="font-semibold text-foreground">{seller.completedOrders}</span> заказов</div>
                    <div><span className="font-semibold text-foreground">{seller.reviewsCount}</span> отзывов</div>
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={11} />
                      {seller.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="MessageSquare" size={11} />
                      {seller.responseTime}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {sellerServices.length > 0 && (
            <div className="bg-white rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-sm mb-3">Другие услуги продавца</h3>
              <div className="space-y-3">
                {sellerServices.map(svc => (
                  <div key={svc.id} className="flex items-start gap-2">
                    <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: categoryColors[svc.category] }}>
                      <Icon name="Briefcase" size={14} />
                    </div>
                    <div>
                      <div className="text-xs font-medium line-clamp-2 leading-snug">{svc.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{formatPrice(svc.price, svc.priceType)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

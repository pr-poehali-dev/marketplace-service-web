import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/marketplace/ServiceCard';
import ServiceCard from '@/components/marketplace/ServiceCard';
import { REVIEWS, getServicesBySeller, formatPrice, type Seller, type Service } from '@/data/mockData';

interface SellerProfilePageProps {
  seller: Seller;
  favorites: string[];
  onFavorite: (id: string) => void;
  onAddToCart: (service: Service) => void;
  onViewService: (service: Service) => void;
  onBack: () => void;
}

export default function SellerProfilePage({ seller, favorites, onFavorite, onAddToCart, onViewService, onBack }: SellerProfilePageProps) {
  const services = getServicesBySeller(seller.id);
  const reviews = REVIEWS.slice(0, 3);

  const joinDate = new Date(seller.joinedAt).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <Icon name="ArrowLeft" size={16} />
        <span className="text-sm">Назад</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* PROFILE CARD */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-border p-6 sticky top-20">
            <div className="text-center mb-5">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                {seller.initials}
              </div>
              <h2 className="font-montserrat font-bold text-lg">{seller.name}</h2>
              <div className="flex items-center justify-center gap-1.5 mb-2">
                {seller.isVerified && (
                  <Badge className="bg-primary/10 text-primary border-0 text-xs">
                    <Icon name="BadgeCheck" size={11} className="mr-1" />
                    Проверен
                  </Badge>
                )}
                {seller.isOnline && (
                  <Badge className="bg-emerald-50 text-emerald-600 border-0 text-xs">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block mr-1" />
                    Онлайн
                  </Badge>
                )}
              </div>
              <StarRating rating={seller.rating} />
            </div>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="MapPin" size={15} />
                {seller.location}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Calendar" size={15} />
                На платформе с {joinDate}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="MessageSquare" size={15} />
                Отвечает {seller.responseTime}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs mb-5 py-3 border-y border-border">
              <div>
                <div className="font-bold text-lg text-foreground">{seller.completedOrders}</div>
                <div className="text-muted-foreground">заказов</div>
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">{seller.reviewsCount}</div>
                <div className="text-muted-foreground">отзывов</div>
              </div>
              <div>
                <div className="font-bold text-lg text-foreground">{seller.rating}</div>
                <div className="text-muted-foreground">рейтинг</div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-4">{seller.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {seller.tags.map(tag => (
                <span key={tag} className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">{tag}</span>
              ))}
            </div>

            <Button className="w-full gradient-primary text-white border-0">
              <Icon name="MessageCircle" size={15} className="mr-2" />
              Написать продавцу
            </Button>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-3 space-y-8">
          <div>
            <h2 className="font-montserrat font-bold text-xl mb-4">Услуги продавца ({services.length})</h2>
            {services.length === 0 ? (
              <div className="text-center py-12 bg-muted/50 rounded-2xl">
                <Icon name="Package" size={40} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Услуги ещё не добавлены</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((svc, i) => (
                  <div key={svc.id} className={`animate-fade-in stagger-${Math.min(i + 1, 4)}`}>
                    <ServiceCard
                      service={svc}
                      isFavorite={favorites.includes(svc.id)}
                      onFavorite={onFavorite}
                      onAddToCart={onAddToCart}
                      onViewService={onViewService}
                      onViewSeller={() => {}}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="font-montserrat font-bold text-xl mb-4">Отзывы ({reviews.length})</h2>
            {reviews.length === 0 ? (
              <div className="text-center py-8 bg-muted/50 rounded-2xl">
                <Icon name="Star" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">Пока нет отзывов</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.map(rev => (
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
                        <p className="text-sm text-muted-foreground mt-2">{rev.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

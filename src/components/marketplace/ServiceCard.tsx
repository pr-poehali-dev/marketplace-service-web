import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Service, Seller, formatPrice } from '@/data/mockData';

interface ServiceCardProps {
  service: Service;
  seller?: Seller;
  isFavorite?: boolean;
  onFavorite?: (id: string) => void;
  onAddToCart?: (service: Service) => void;
  onViewService?: (service: Service) => void;
  onViewSeller?: (seller: Seller) => void;
}

function StarRating({ rating, small }: { rating: number; small?: boolean }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Icon
          key={i}
          name="Star"
          size={small ? 11 : 13}
          className={i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}
        />
      ))}
      <span className={`ml-1 font-semibold text-foreground ${small ? 'text-[11px]' : 'text-xs'}`}>{rating.toFixed(1)}</span>
    </div>
  );
}

export { StarRating };

export default function ServiceCard({ service, seller, isFavorite, onFavorite, onAddToCart, onViewService, onViewSeller }: ServiceCardProps) {
  const categoryColors: Record<string, string> = {
    it: '#6366f1', design: '#ec4899', marketing: '#f59e0b',
    education: '#10b981', business: '#3b82f6', content: '#8b5cf6',
  };
  const color = categoryColors[service.category] || '#6366f1';

  return (
    <div className="service-card group cursor-pointer" onClick={() => onViewService?.(service)}>
      <div
        className="h-40 relative overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)` }}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center opacity-40 group-hover:opacity-60 transition-opacity"
          style={{ background: color }}>
          <Icon name="Briefcase" size={28} className="text-white" />
        </div>

        <div className="absolute top-3 left-3 flex gap-1.5">
          {service.isFeatured && (
            <Badge className="text-white text-[10px] px-2 py-0.5 border-0" style={{ background: color }}>
              ТОП
            </Badge>
          )}
          {service.isNew && (
            <Badge className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 border-0">
              Новинка
            </Badge>
          )}
        </div>

        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          onClick={e => { e.stopPropagation(); onFavorite?.(service.id); }}
        >
          <Icon
            name="Heart"
            size={15}
            className={isFavorite ? 'text-rose-500 fill-rose-500' : 'text-muted-foreground'}
          />
        </button>
      </div>

      <div className="p-4">
        {seller && (
          <button
            className="flex items-center gap-2 mb-2 group/seller"
            onClick={e => { e.stopPropagation(); onViewSeller?.(seller); }}
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
              style={{ background: color }}>
              {seller.initials.slice(0, 2)}
            </div>
            <span className="text-xs text-muted-foreground group-hover/seller:text-foreground transition-colors truncate">
              {seller.name}
            </span>
            {seller.isVerified && <Icon name="BadgeCheck" size={12} className="text-primary flex-shrink-0" />}
          </button>
        )}

        <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <StarRating rating={service.rating} small />
          <span className="text-xs text-muted-foreground">{service.ordersCount} заказов</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Стоимость</div>
            <div className="font-bold text-foreground text-sm">
              {formatPrice(service.price, service.priceType)}
            </div>
          </div>
          <Button
            size="sm"
            className="text-white text-xs px-3 h-8 border-0"
            style={{ background: color }}
            onClick={e => { e.stopPropagation(); onAddToCart?.(service); }}
          >
            В корзину
          </Button>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <Icon name="Clock" size={11} className="text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">Срок: {service.deliveryDays} дн.</span>
        </div>
      </div>
    </div>
  );
}

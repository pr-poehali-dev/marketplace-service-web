import Icon from '@/components/ui/icon';
import ServiceCard from '@/components/marketplace/ServiceCard';
import { SERVICES, getSellerById, type Service, type Seller } from '@/data/mockData';

interface FavoritesPageProps {
  favorites: string[];
  onFavorite: (id: string) => void;
  onAddToCart: (service: Service) => void;
  onViewService: (service: Service) => void;
  onViewSeller: (seller: Seller) => void;
}

export default function FavoritesPage({ favorites, onFavorite, onAddToCart, onViewService, onViewSeller }: FavoritesPageProps) {
  const favoriteServices = SERVICES.filter(s => favorites.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="font-montserrat font-bold text-2xl mb-2">
        Избранное
      </h1>
      <p className="text-muted-foreground text-sm mb-6">{favoriteServices.length} услуг</p>

      {favoriteServices.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Icon name="Heart" size={40} className="text-muted-foreground" />
          </div>
          <h2 className="font-semibold text-xl mb-2">Избранное пусто</h2>
          <p className="text-muted-foreground text-sm">Нажмите ❤️ на карточке услуги, чтобы добавить в избранное</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favoriteServices.map((svc, i) => {
            const seller = getSellerById(svc.sellerId);
            return (
              <div key={svc.id} className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
                <ServiceCard
                  service={svc}
                  seller={seller}
                  isFavorite={true}
                  onFavorite={onFavorite}
                  onAddToCart={onAddToCart}
                  onViewService={onViewService}
                  onViewSeller={sel => sel && onViewSeller(sel)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

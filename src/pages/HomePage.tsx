import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ServiceCard from '@/components/marketplace/ServiceCard';
import { StarRating } from '@/components/marketplace/ServiceCard';
import {
  CATEGORIES, SERVICES, SELLERS, REVIEWS,
  getFeaturedServices, getNewServices, getSellerById,
  formatPrice, type Service, type Seller
} from '@/data/mockData';

interface HomePageProps {
  favorites: string[];
  onFavorite: (id: string) => void;
  onAddToCart: (service: Service) => void;
  onViewService: (service: Service) => void;
  onViewSeller: (seller: Seller) => void;
  onNavigateCatalog: () => void;
  searchQuery: string;
  onSearch: (q: string) => void;
}

const STATS = [
  { label: 'Исполнителей', value: '1 842', icon: 'Users' },
  { label: 'Услуг', value: '789', icon: 'Briefcase' },
  { label: 'Выполненных заказов', value: '12 400+', icon: 'CheckCircle' },
  { label: 'Средний рейтинг', value: '4.8 ★', icon: 'Star' },
];

export default function HomePage({ favorites, onFavorite, onAddToCart, onViewService, onViewSeller, onNavigateCatalog, searchQuery, onSearch }: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const featured = getFeaturedServices();
  const newServices = getNewServices();
  const topSellers = SELLERS.slice(0, 6);

  const categoryColors: Record<string, string> = {
    it: '#6366f1', design: '#ec4899', marketing: '#f59e0b',
    education: '#10b981', business: '#3b82f6', content: '#8b5cf6',
  };

  return (
    <div>
      {/* HERO */}
      <section className="gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }} />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 text-sm px-4 py-1.5">
              <Icon name="Sparkles" size={14} className="mr-2" />
              Более 1800 проверенных специалистов
            </Badge>
            <h1 className="font-montserrat font-black text-4xl md:text-6xl leading-tight mb-6 animate-fade-in">
              Найдите<br />
              <span className="text-gradient">профессионала</span><br />
              для любой задачи
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-xl animate-fade-in stagger-2">
              Разработка, дизайн, маркетинг, обучение — сотни специалистов готовы начать прямо сейчас
            </p>

            <div className="flex gap-3 max-w-xl animate-fade-in stagger-3">
              <div className="flex-1 relative">
                <Icon name="Search" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50" />
                <Input
                  value={searchQuery}
                  onChange={e => onSearch(e.target.value)}
                  placeholder="Что нужно сделать?"
                  className="pl-10 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20"
                  onKeyDown={e => e.key === 'Enter' && onNavigateCatalog()}
                />
              </div>
              <Button onClick={onNavigateCatalog} size="lg" className="h-12 px-6 gradient-primary border-0 text-white shadow-lg shadow-primary/30">
                Найти
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 animate-fade-in stagger-4">
              {['Разработка сайта', 'Логотип', 'SEO', 'SMM', 'Репетитор'].map(tag => (
                <button
                  key={tag}
                  onClick={() => { onSearch(tag); onNavigateCatalog(); }}
                  className="text-xs text-white/60 hover:text-white px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={s.icon as 'Users'} size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-montserrat font-bold text-2xl">Категории услуг</h2>
          <Button variant="ghost" size="sm" onClick={onNavigateCatalog} className="text-primary">
            Все категории <Icon name="ArrowRight" size={14} className="ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); onNavigateCatalog(); }}
              className={`animate-fade-in stagger-${Math.min(i + 1, 6)} group p-4 rounded-2xl border-2 transition-all hover:shadow-md text-left`}
              style={{
                borderColor: activeCategory === cat.id ? cat.color : 'transparent',
                background: `${cat.color}10`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110"
                style={{ background: cat.color }}
              >
                <Icon name={cat.icon as 'Code'} size={20} className="text-white" />
              </div>
              <div className="font-semibold text-sm leading-tight mb-1">{cat.name}</div>
              <div className="text-xs text-muted-foreground">{cat.count} услуг</div>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-montserrat font-bold text-2xl">Популярные услуги</h2>
            <p className="text-muted-foreground text-sm mt-1">Выбор тысяч клиентов</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onNavigateCatalog} className="text-primary">
            Смотреть все <Icon name="ArrowRight" size={14} className="ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featured.slice(0, 8).map((svc, i) => {
            const seller = getSellerById(svc.sellerId);
            return (
              <div key={svc.id} className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
                <ServiceCard
                  service={svc}
                  seller={seller}
                  isFavorite={favorites.includes(svc.id)}
                  onFavorite={onFavorite}
                  onAddToCart={onAddToCart}
                  onViewService={onViewService}
                  onViewSeller={sel => sel && onViewSeller(sel)}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* NEW SERVICES */}
      <section className="bg-muted/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-montserrat font-bold text-2xl">Новинки</h2>
              <p className="text-muted-foreground text-sm mt-1">Только появились на платформе</p>
            </div>
            <Badge className="bg-emerald-500 text-white border-0">Новые</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {newServices.map((svc, i) => {
              const seller = getSellerById(svc.sellerId);
              return (
                <div key={svc.id} className={`animate-fade-in stagger-${Math.min(i + 1, 4)}`}>
                  <ServiceCard
                    service={svc}
                    seller={seller}
                    isFavorite={favorites.includes(svc.id)}
                    onFavorite={onFavorite}
                    onAddToCart={onAddToCart}
                    onViewService={onViewService}
                    onViewSeller={sel => sel && onViewSeller(sel)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOP SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-montserrat font-bold text-2xl">Рекомендуемые продавцы</h2>
            <p className="text-muted-foreground text-sm mt-1">Проверенные специалисты с высоким рейтингом</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topSellers.map((seller, i) => (
            <div
              key={seller.id}
              className={`animate-fade-in stagger-${Math.min(i + 1, 6)} bg-white rounded-2xl border border-border p-5 flex gap-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              onClick={() => onViewSeller(seller)}
            >
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {seller.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="font-semibold text-sm">{seller.name}</span>
                  {seller.isVerified && <Icon name="BadgeCheck" size={14} className="text-primary" />}
                  {seller.isOnline && <span className="w-2 h-2 bg-emerald-500 rounded-full" />}
                </div>
                <StarRating rating={seller.rating} small />
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{seller.description}</p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {seller.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-muted/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="font-montserrat font-bold text-2xl mb-6 text-center">Что говорят клиенты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map((rev, i) => (
              <div key={rev.id} className={`animate-fade-in stagger-${Math.min(i + 1, 5)} bg-white rounded-2xl border border-border p-5`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                    {rev.buyerAvatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{rev.buyerName}</div>
                    <StarRating rating={rev.rating} small />
                  </div>
                  <div className="ml-auto text-xs text-muted-foreground">{new Date(rev.date).toLocaleDateString('ru-RU')}</div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">"{rev.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="gradient-hero rounded-3xl p-10 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }} />
          </div>
          <Icon name="Rocket" size={40} className="text-white/60 mx-auto mb-4 animate-float" />
          <h2 className="font-montserrat font-black text-3xl md:text-4xl mb-4">Стань исполнителем</h2>
          <p className="text-white/70 max-w-md mx-auto mb-8">Зарегистрируйся и начни зарабатывать на своих навыках уже сегодня</p>
          <div className="flex gap-3 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
              Начать продавать
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Узнать подробнее
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
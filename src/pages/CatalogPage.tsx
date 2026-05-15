import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import ServiceCard from '@/components/marketplace/ServiceCard';
import { CATEGORIES, SERVICES, getSellerById, type Service, type Seller } from '@/data/mockData';

interface CatalogPageProps {
  favorites: string[];
  onFavorite: (id: string) => void;
  onAddToCart: (service: Service) => void;
  onViewService: (service: Service) => void;
  onViewSeller: (seller: Seller) => void;
  searchQuery: string;
}

type SortOption = 'popular' | 'rating' | 'price_asc' | 'price_desc' | 'new';

export default function CatalogPage({ favorites, onFavorite, onAddToCart, onViewService, onViewSeller, searchQuery }: CatalogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [showFilters, setShowFilters] = useState(false);

  const activeCategory = CATEGORIES.find(c => c.id === selectedCategory);

  const filtered = useMemo(() => {
    let result = [...SERVICES];
    if (localSearch) {
      const q = localSearch.toLowerCase();
      result = result.filter(s => s.title.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q)) || s.description.toLowerCase().includes(q));
    }
    if (selectedCategory) result = result.filter(s => s.category === selectedCategory);
    if (selectedSubcategory) result = result.filter(s => s.subcategory === selectedSubcategory);
    result = result.filter(s => s.price >= priceRange[0] && s.price <= priceRange[1]);

    switch (sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'new': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      default: result.sort((a, b) => b.ordersCount - a.ordersCount);
    }
    return result;
  }, [localSearch, selectedCategory, selectedSubcategory, priceRange, sortBy]);

  const categoryIcons: Record<string, string> = {
    it: '#6366f1', design: '#ec4899', marketing: '#f59e0b',
    education: '#10b981', business: '#3b82f6', content: '#8b5cf6',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-montserrat font-bold text-2xl">Каталог услуг</h1>
          <p className="text-muted-foreground text-sm">{filtered.length} услуг найдено</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
          <Icon name="SlidersHorizontal" size={14} className="mr-1" />
          Фильтры
        </Button>
      </div>

      <div className="flex gap-6">
        {/* SIDEBAR */}
        <aside className={`w-64 flex-shrink-0 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div>
            <h3 className="font-semibold text-sm mb-3">Поиск</h3>
            <div className="relative">
              <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                placeholder="Название услуги..."
                className="pl-8 h-9 text-sm"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Категория</h3>
            <div className="space-y-1">
              <button
                onClick={() => { setSelectedCategory(''); setSelectedSubcategory(''); }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}
              >
                Все категории
              </button>
              {CATEGORIES.map(cat => (
                <div key={cat.id}>
                  <button
                    onClick={() => { setSelectedCategory(cat.id); setSelectedSubcategory(''); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}
                  >
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                    {cat.name}
                    <span className="ml-auto text-xs opacity-60">{cat.count}</span>
                  </button>
                  {selectedCategory === cat.id && cat.children && (
                    <div className="ml-4 space-y-0.5 mt-1">
                      {cat.children.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setSelectedSubcategory(sub.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${selectedSubcategory === sub.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Цена</h3>
            <Slider
              value={priceRange}
              onValueChange={(v) => setPriceRange(v as [number, number])}
              min={0} max={150000} step={1000}
              className="mb-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{priceRange[0].toLocaleString('ru-RU')} ₽</span>
              <span>{priceRange[1].toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Сортировка</h3>
            <div className="space-y-1">
              {[
                { value: 'popular', label: 'Популярные' },
                { value: 'rating', label: 'По рейтингу' },
                { value: 'price_asc', label: 'Цена ↑' },
                { value: 'price_desc', label: 'Цена ↓' },
                { value: 'new', label: 'Новинки' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value as SortOption)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${sortBy === opt.value ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {(selectedCategory || localSearch) && (
            <Button variant="outline" size="sm" className="w-full" onClick={() => { setSelectedCategory(''); setSelectedSubcategory(''); setLocalSearch(''); setPriceRange([0, 150000]); }}>
              <Icon name="X" size={13} className="mr-1" />
              Сбросить фильтры
            </Button>
          )}
        </aside>

        {/* GRID */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Icon name="SearchX" size={36} className="text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Услуги не найдены</h3>
              <p className="text-muted-foreground text-sm mb-4">Попробуйте изменить параметры поиска или фильтры</p>
              <Button variant="outline" onClick={() => { setSelectedCategory(''); setLocalSearch(''); setPriceRange([0, 150000]); }}>
                Сбросить всё
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((svc, i) => {
                const seller = getSellerById(svc.sellerId);
                return (
                  <div key={svc.id} className={`animate-fade-in stagger-${Math.min((i % 6) + 1, 6)}`}>
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
          )}
        </div>
      </div>
    </div>
  );
}

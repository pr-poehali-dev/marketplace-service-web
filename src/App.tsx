import { useState, useEffect } from 'react';
import Header from '@/components/marketplace/Header';
import HomePage from '@/pages/HomePage';
import CatalogPage from '@/pages/CatalogPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import SellerProfilePage from '@/pages/SellerProfilePage';
import CartPage from '@/pages/CartPage';
import FavoritesPage from '@/pages/FavoritesPage';
import BuyerCabinetPage from '@/pages/BuyerCabinetPage';
import SellerCabinetPage from '@/pages/SellerCabinetPage';
import AdminPage from '@/pages/AdminPage';
import AuthModal from '@/pages/AuthModal';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { type Service, type Seller } from '@/data/mockData';

type Page = 'home' | 'catalog' | 'seller' | 'service' | 'cart' | 'favorites' | 'buyer-cabinet' | 'seller-cabinet' | 'admin';
type Role = 'guest' | 'buyer' | 'seller' | 'admin';

function Footer() {
  return (
    <footer className="bg-[hsl(222,40%,8%)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center text-sm">🚀</div>
              <span className="font-montserrat font-bold">МастерРынок</span>
            </div>
            <p className="text-white/50 text-xs leading-relaxed">Маркетплейс услуг для бизнеса и частных лиц</p>
          </div>
          {[
            { title: 'Каталог', links: ['IT и разработка', 'Дизайн', 'Маркетинг', 'Обучение'] },
            { title: 'Компания', links: ['О нас', 'Блог', 'Карьера', 'Пресса'] },
            { title: 'Поддержка', links: ['Помощь', 'Безопасность', 'Условия', 'Конфиденциальность'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link}><a href="#" className="text-white/50 text-xs hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© 2024 МастерРынок. Все права защищены.</p>
          <p className="text-white/30 text-xs">Демо-версия · Тестовые данные</p>
        </div>
      </div>
    </footer>
  );
}

function AppInner() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [role, setRole] = useState<Role>('guest');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModal, setAuthModal] = useState<'login' | 'register' | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [cart, setCart] = useState<Service[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('mkt_favorites') || '[]'); } catch { return []; }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('mkt_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      toast({ title: prev.includes(id) ? 'Убрано из избранного' : 'Добавлено в избранное ❤️', duration: 1500 });
      return next;
    });
  };

  const handleAddToCart = (service: Service) => {
    if (!isLoggedIn) { setAuthModal('login'); return; }
    if (cart.some(s => s.id === service.id)) {
      toast({ title: 'Уже в корзине', duration: 1500 });
      return;
    }
    setCart(prev => [...prev, service]);
    toast({ title: `«${service.title.slice(0, 28)}...» в корзине`, duration: 2000 });
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(s => s.id !== id));
  };

  const handleCheckout = () => {
    setCart([]);
    setCurrentPage('buyer-cabinet');
    toast({ title: '✅ Оплата прошла успешно! Лоты созданы.', duration: 3000 });
  };

  const handleAuthSuccess = (r: 'buyer' | 'seller' | 'admin') => {
    setRole(r);
    setIsLoggedIn(true);
    const labels = { admin: 'администратор', seller: 'продавец', buyer: 'покупатель' };
    toast({ title: `Добро пожаловать! Роль: ${labels[r]}`, duration: 2500 });
    if (r === 'admin') setCurrentPage('admin');
    else if (r === 'seller') setCurrentPage('seller-cabinet');
    else setCurrentPage('home');
  };

  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setCurrentPage('service');
    window.scrollTo(0, 0);
  };

  const handleViewSeller = (seller: Seller) => {
    setSelectedSeller(seller);
    setCurrentPage('seller');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (page: Page) => {
    if ((page === 'buyer-cabinet' || page === 'seller-cabinet') && !isLoggedIn) {
      setAuthModal('login');
      return;
    }
    if (page === 'admin' && role !== 'admin') return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            favorites={favorites}
            onFavorite={handleFavorite}
            onAddToCart={handleAddToCart}
            onViewService={handleViewService}
            onViewSeller={handleViewSeller}
            onNavigateCatalog={() => setCurrentPage('catalog')}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
          />
        );
      case 'catalog':
        return (
          <CatalogPage
            favorites={favorites}
            onFavorite={handleFavorite}
            onAddToCart={handleAddToCart}
            onViewService={handleViewService}
            onViewSeller={handleViewSeller}
            searchQuery={searchQuery}
          />
        );
      case 'service':
        return selectedService ? (
          <ServiceDetailPage
            service={selectedService}
            isFavorite={favorites.includes(selectedService.id)}
            onFavorite={() => handleFavorite(selectedService.id)}
            onAddToCart={handleAddToCart}
            onViewSeller={handleViewSeller}
            onBack={() => setCurrentPage('catalog')}
          />
        ) : null;
      case 'seller':
        return selectedSeller ? (
          <SellerProfilePage
            seller={selectedSeller}
            favorites={favorites}
            onFavorite={handleFavorite}
            onAddToCart={handleAddToCart}
            onViewService={handleViewService}
            onBack={() => setCurrentPage('catalog')}
          />
        ) : null;
      case 'cart':
        return (
          <CartPage
            cart={cart}
            onRemove={handleRemoveFromCart}
            onCheckout={handleCheckout}
            onViewService={handleViewService}
          />
        );
      case 'favorites':
        return (
          <FavoritesPage
            favorites={favorites}
            onFavorite={handleFavorite}
            onAddToCart={handleAddToCart}
            onViewService={handleViewService}
            onViewSeller={handleViewSeller}
          />
        );
      case 'buyer-cabinet':
        return <BuyerCabinetPage />;
      case 'seller-cabinet':
        return <SellerCabinetPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-golos">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        role={role}
        cartCount={cart.length}
        favCount={favorites.length}
        isLoggedIn={isLoggedIn}
        onLogin={() => setAuthModal('login')}
        onRegister={() => setAuthModal('register')}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />

      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSuccess={handleAuthSuccess}
        />
      )}

      <Toaster />
    </div>
  );
}

export default AppInner;

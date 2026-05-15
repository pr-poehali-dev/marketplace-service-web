import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Page = 'home' | 'catalog' | 'seller' | 'service' | 'cart' | 'favorites' | 'buyer-cabinet' | 'seller-cabinet' | 'admin';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  role: 'guest' | 'buyer' | 'seller' | 'admin';
  cartCount: number;
  favCount: number;
  isLoggedIn: boolean;
  onLogin: () => void;
  onRegister: () => void;
  searchQuery: string;
  onSearch: (q: string) => void;
}

export default function Header({ currentPage, onNavigate, role, cartCount, favCount, isLoggedIn, onLogin, onRegister, searchQuery, onSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 h-16">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Icon name="Rocket" size={16} className="text-white" />
            </div>
            <span className="font-montserrat font-800 text-lg text-foreground hidden sm:block">
              Мастер<span className="text-primary">Рынок</span>
            </span>
          </button>

          <div className="flex-1 max-w-xl hidden md:flex relative">
            <div className="relative w-full">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={e => onSearch(e.target.value)}
                placeholder="Поиск услуг..."
                className="pl-9 h-9 bg-muted border-transparent focus:bg-white focus:border-primary transition-all"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => onNavigate('catalog')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 'catalog' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
            >
              Каталог
            </button>
            {isLoggedIn && (
              <button
                onClick={() => onNavigate(role === 'seller' ? 'seller-cabinet' : 'buyer-cabinet')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${(currentPage === 'seller-cabinet' || currentPage === 'buyer-cabinet') ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
              >
                Кабинет
              </button>
            )}
            {role === 'admin' && (
              <button
                onClick={() => onNavigate('admin')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 'admin' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
              >
                Админ
              </button>
            )}
          </nav>

          <div className="flex items-center gap-2 ml-auto md:ml-0">
            {isLoggedIn && (
              <>
                <button onClick={() => onNavigate('favorites')} className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                  <Icon name="Heart" size={20} className="text-muted-foreground" />
                  {favCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{favCount}</span>
                  )}
                </button>
                <button onClick={() => onNavigate('cart')} className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                  <Icon name="ShoppingCart" size={20} className="text-muted-foreground" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>
                  )}
                </button>
                <button
                  onClick={() => onNavigate(role === 'seller' ? 'seller-cabinet' : 'buyer-cabinet')}
                  className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold"
                >
                  {role === 'admin' ? 'A' : role === 'seller' ? 'П' : 'К'}
                </button>
              </>
            )}
            {!isLoggedIn && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={onLogin} className="hidden sm:flex">Войти</Button>
                <Button size="sm" onClick={onRegister} className="gradient-primary text-white border-0">
                  <span className="hidden sm:inline">Регистрация</span>
                  <Icon name="UserPlus" size={16} className="sm:hidden" />
                </Button>
              </div>
            )}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-border animate-fade-in">
            <div className="relative mb-3">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={searchQuery} onChange={e => onSearch(e.target.value)} placeholder="Поиск услуг..." className="pl-9 h-9" />
            </div>
            <div className="flex flex-col gap-1">
              <button onClick={() => { onNavigate('catalog'); setMobileMenuOpen(false); }} className="text-left px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">Каталог</button>
              {isLoggedIn && <button onClick={() => { onNavigate(role === 'seller' ? 'seller-cabinet' : 'buyer-cabinet'); setMobileMenuOpen(false); }} className="text-left px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">Личный кабинет</button>}
              {!isLoggedIn && <button onClick={onLogin} className="text-left px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">Войти</button>}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

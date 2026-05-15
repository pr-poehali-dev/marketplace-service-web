import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuthModalProps {
  mode: 'login' | 'register';
  onClose: () => void;
  onSuccess: (role: 'buyer' | 'seller' | 'admin') => void;
}

export default function AuthModal({ mode: initialMode, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState(initialMode);
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (email === 'admin@mastermarket.ru') {
      onSuccess('admin');
    } else {
      onSuccess(mode === 'register' ? role : 'buyer');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-3xl p-7 w-full max-w-sm mx-4 animate-scale-in shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-2">
              <Icon name="Rocket" size={18} className="text-white" />
            </div>
            <h2 className="font-montserrat font-bold text-xl">
              {mode === 'login' ? 'Войти' : 'Регистрация'}
            </h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center">
            <Icon name="X" size={18} />
          </button>
        </div>

        {mode === 'register' && (
          <>
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1.5 block">Имя</label>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" className="h-11" />
            </div>
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1.5 block">Я регистрируюсь как</label>
              <div className="grid grid-cols-2 gap-2">
                {(['buyer', 'seller'] as const).map(r => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-sm ${role === r ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}
                  >
                    <Icon name={r === 'buyer' ? 'ShoppingBag' : 'Briefcase'} size={20} className={role === r ? 'text-primary' : 'text-muted-foreground'} />
                    <span className={`font-medium text-xs ${role === r ? 'text-primary' : 'text-muted-foreground'}`}>
                      {r === 'buyer' ? 'Покупатель' : 'Продавец'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
          <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="h-11" />
        </div>
        <div className="mb-5">
          <label className="text-xs text-muted-foreground mb-1.5 block">Пароль</label>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="h-11" />
        </div>

        {mode === 'login' && (
          <p className="text-xs text-muted-foreground mb-4">
            Для доступа в админку используйте: <span className="font-mono text-foreground">admin@mastermarket.ru</span>
          </p>
        )}

        <Button className="w-full h-11 gradient-primary text-white border-0 mb-3" onClick={handleSubmit}>
          {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
        </Button>

        <div className="relative text-center mb-3">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
          <span className="relative bg-white px-2 text-xs text-muted-foreground">или</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button variant="outline" className="h-10 text-xs" onClick={handleSubmit}>
            <Icon name="Globe" size={14} className="mr-1.5" />
            Google
          </Button>
          <Button variant="outline" className="h-10 text-xs" onClick={handleSubmit}>
            <Icon name="Github" size={14} className="mr-1.5" />
            GitHub
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          {mode === 'login' ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          {' '}
          <button className="text-primary font-medium hover:underline" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>
      </div>
    </div>
  );
}

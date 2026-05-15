export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  parent?: string;
  children?: Category[];
  count: number;
};

export type Seller = {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  rating: number;
  reviewsCount: number;
  completedOrders: number;
  description: string;
  location: string;
  tags: string[];
  joinedAt: string;
  isVerified: boolean;
  isOnline: boolean;
  responseTime: string;
  totalEarned: number;
};

export type Service = {
  id: string;
  sellerId: string;
  title: string;
  category: string;
  subcategory: string;
  price: number;
  priceType: 'fixed' | 'from';
  priceMax?: number;
  description: string;
  deliveryDays: number;
  rating: number;
  reviewsCount: number;
  ordersCount: number;
  tags: string[];
  image: string;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  createdAt: string;
};

export type Review = {
  id: string;
  serviceId: string;
  buyerName: string;
  buyerAvatar: string;
  rating: number;
  text: string;
  date: string;
};

export type Order = {
  id: string;
  serviceId: string;
  buyerId: string;
  sellerId: string;
  status: 'pending' | 'paid' | 'in_progress' | 'completed' | 'cancelled';
  price: number;
  createdAt: string;
  serviceName: string;
  sellerName: string;
};

export const CATEGORIES: Category[] = [
  {
    id: 'it',
    name: 'IT и разработка',
    slug: 'it',
    icon: 'Code',
    color: '#6366f1',
    count: 234,
    children: [
      { id: 'web-dev', name: 'Разработка сайтов', slug: 'web-dev', icon: 'Globe', color: '#6366f1', count: 87 },
      { id: 'mobile', name: 'Мобильные приложения', slug: 'mobile', icon: 'Smartphone', color: '#6366f1', count: 54 },
      { id: 'backend', name: 'Backend разработка', slug: 'backend', icon: 'Server', color: '#6366f1', count: 62 },
      { id: 'automation', name: 'Автоматизация', slug: 'automation', icon: 'Zap', color: '#6366f1', count: 31 },
    ]
  },
  {
    id: 'design',
    name: 'Дизайн',
    slug: 'design',
    icon: 'Palette',
    color: '#ec4899',
    count: 198,
    children: [
      { id: 'logo', name: 'Логотипы', slug: 'logo', icon: 'Star', color: '#ec4899', count: 76 },
      { id: 'ui-ux', name: 'UI/UX дизайн', slug: 'ui-ux', icon: 'Layout', color: '#ec4899', count: 58 },
      { id: 'illustration', name: 'Иллюстрации', slug: 'illustration', icon: 'PenTool', color: '#ec4899', count: 44 },
      { id: 'video', name: 'Видео и анимация', slug: 'video', icon: 'Video', color: '#ec4899', count: 20 },
    ]
  },
  {
    id: 'marketing',
    name: 'Маркетинг',
    slug: 'marketing',
    icon: 'TrendingUp',
    color: '#f59e0b',
    count: 156,
    children: [
      { id: 'seo', name: 'SEO продвижение', slug: 'seo', icon: 'Search', color: '#f59e0b', count: 48 },
      { id: 'smm', name: 'Соцсети (SMM)', slug: 'smm', icon: 'Share2', color: '#f59e0b', count: 67 },
      { id: 'ads', name: 'Контекстная реклама', slug: 'ads', icon: 'Target', color: '#f59e0b', count: 41 },
    ]
  },
  {
    id: 'education',
    name: 'Обучение',
    slug: 'education',
    icon: 'BookOpen',
    color: '#10b981',
    count: 89,
    children: [
      { id: 'tutors', name: 'Репетиторы', slug: 'tutors', icon: 'GraduationCap', color: '#10b981', count: 45 },
      { id: 'courses', name: 'Онлайн-курсы', slug: 'courses', icon: 'PlayCircle', color: '#10b981', count: 44 },
    ]
  },
  {
    id: 'business',
    name: 'Бизнес',
    slug: 'business',
    icon: 'Briefcase',
    color: '#3b82f6',
    count: 112,
    children: [
      { id: 'accounting', name: 'Бухгалтерия', slug: 'accounting', icon: 'Calculator', color: '#3b82f6', count: 38 },
      { id: 'legal', name: 'Юридические услуги', slug: 'legal', icon: 'Scale', color: '#3b82f6', count: 42 },
      { id: 'consulting', name: 'Консалтинг', slug: 'consulting', icon: 'Users', color: '#3b82f6', count: 32 },
    ]
  },
  {
    id: 'content',
    name: 'Контент и тексты',
    slug: 'content',
    icon: 'FileText',
    color: '#8b5cf6',
    count: 143,
    children: [
      { id: 'copywriting', name: 'Копирайтинг', slug: 'copywriting', icon: 'Edit', color: '#8b5cf6', count: 78 },
      { id: 'translation', name: 'Переводы', slug: 'translation', icon: 'Languages', color: '#8b5cf6', count: 65 },
    ]
  },
];

export const SELLERS: Seller[] = [
  { id: 's1', name: 'Алексей Морозов', avatar: '', initials: 'АМ', rating: 4.9, reviewsCount: 127, completedOrders: 312, description: 'Fullstack-разработчик с 8 годами опыта. Специализируюсь на React, Node.js и PostgreSQL. Сдаю проекты в срок.', location: 'Москва', tags: ['React', 'Node.js', 'TypeScript'], joinedAt: '2021-03-15', isVerified: true, isOnline: true, responseTime: '~1 час', totalEarned: 2840000 },
  { id: 's2', name: 'Мария Захарова', avatar: '', initials: 'МЗ', rating: 4.8, reviewsCount: 89, completedOrders: 198, description: 'UI/UX дизайнер. Создаю красивые и удобные интерфейсы для веб и мобильных приложений.', location: 'Санкт-Петербург', tags: ['Figma', 'UI/UX', 'Branding'], joinedAt: '2022-01-10', isVerified: true, isOnline: false, responseTime: '~3 часа', totalEarned: 1560000 },
  { id: 's3', name: 'Дмитрий Волков', avatar: '', initials: 'ДВ', rating: 4.7, reviewsCount: 64, completedOrders: 145, description: 'SEO-специалист. Вывожу сайты в топ-3 Яндекс и Google. Работаю только белыми методами.', location: 'Екатеринбург', tags: ['SEO', 'Яндекс', 'Google'], joinedAt: '2021-07-22', isVerified: true, isOnline: true, responseTime: '~2 часа', totalEarned: 980000 },
  { id: 's4', name: 'Елена Сорокина', avatar: '', initials: 'ЕС', rating: 5.0, reviewsCount: 43, completedOrders: 87, description: 'Логотипы и фирменный стиль. Каждый бренд уникален — создаю с душой и вниманием к деталям.', location: 'Казань', tags: ['Illustrator', 'Branding', 'Logo'], joinedAt: '2022-09-01', isVerified: false, isOnline: true, responseTime: '~30 мин', totalEarned: 670000 },
  { id: 's5', name: 'Игорь Петренко', avatar: '', initials: 'ИП', rating: 4.6, reviewsCount: 112, completedOrders: 267, description: 'Мобильная разработка на Flutter и React Native. iOS + Android одновременно за разумные деньги.', location: 'Новосибирск', tags: ['Flutter', 'React Native', 'iOS'], joinedAt: '2020-11-05', isVerified: true, isOnline: false, responseTime: '~4 часа', totalEarned: 3120000 },
  { id: 's6', name: 'Анна Белова', avatar: '', initials: 'АБ', rating: 4.9, reviewsCount: 76, completedOrders: 154, description: 'Копирайтер и контент-маркетолог. Пишу продающие тексты, статьи для блогов, описания товаров.', location: 'Москва', tags: ['Копирайтинг', 'SEO-тексты', 'Контент'], joinedAt: '2021-05-18', isVerified: true, isOnline: true, responseTime: '~1 час', totalEarned: 890000 },
  { id: 's7', name: 'Сергей Кузнецов', avatar: '', initials: 'СК', rating: 4.8, reviewsCount: 98, completedOrders: 221, description: 'Backend-разработчик. Python, Django, FastAPI. Разрабатываю API, парсеры, боты Telegram.', location: 'Москва', tags: ['Python', 'FastAPI', 'PostgreSQL'], joinedAt: '2021-02-28', isVerified: true, isOnline: true, responseTime: '~2 часа', totalEarned: 2340000 },
  { id: 's8', name: 'Наталья Романова', avatar: '', initials: 'НР', rating: 4.7, reviewsCount: 55, completedOrders: 103, description: 'Репетитор по математике и физике. Готовлю к ОГЭ, ЕГЭ и олимпиадам. 95% студентов сдают на 80+.', location: 'Санкт-Петербург', tags: ['Математика', 'ЕГЭ', 'Физика'], joinedAt: '2022-03-14', isVerified: false, isOnline: false, responseTime: '~5 часов', totalEarned: 420000 },
  { id: 's9', name: 'Владимир Орлов', avatar: '', initials: 'ВО', rating: 4.9, reviewsCount: 134, completedOrders: 289, description: 'SMM-специалист. Веду соцсети под ключ: ВКонтакте, Telegram, Instagram. Реальные подписчики, живое вовлечение.', location: 'Краснодар', tags: ['SMM', 'Telegram', 'ВКонтакте'], joinedAt: '2021-01-09', isVerified: true, isOnline: true, responseTime: '~1 час', totalEarned: 1780000 },
  { id: 's10', name: 'Ксения Козлова', avatar: '', initials: 'КК', rating: 4.6, reviewsCount: 38, completedOrders: 72, description: 'Бухгалтер и налоговый консультант. Ведение ИП и ООО, нулевая отчётность, оптимизация налогов.', location: 'Нижний Новгород', tags: ['1С', 'Бухгалтерия', 'ИП'], joinedAt: '2022-06-20', isVerified: true, isOnline: false, responseTime: '~6 часов', totalEarned: 560000 },
  { id: 's11', name: 'Артём Фёдоров', avatar: '', initials: 'АФ', rating: 4.8, reviewsCount: 67, completedOrders: 138, description: 'Видеомонтаж и создание анимации. После эффектов, интро, промо-ролики для бизнеса.', location: 'Уфа', tags: ['Premiere Pro', 'After Effects', 'Motion'], joinedAt: '2021-10-03', isVerified: true, isOnline: true, responseTime: '~3 часа', totalEarned: 1120000 },
  { id: 's12', name: 'Ольга Никитина', avatar: '', initials: 'ОН', rating: 5.0, reviewsCount: 29, completedOrders: 58, description: 'Переводчик EN/DE/FR-RU. Технические, юридические и маркетинговые тексты. Нотариальные переводы.', location: 'Москва', tags: ['Переводы', 'Английский', 'Немецкий'], joinedAt: '2023-02-11', isVerified: false, isOnline: true, responseTime: '~2 часа', totalEarned: 320000 },
  { id: 's13', name: 'Павел Громов', avatar: '', initials: 'ПГ', rating: 4.7, reviewsCount: 83, completedOrders: 176, description: 'Контекстная реклама Яндекс Директ и Google Ads. Снижаю стоимость заявки, увеличиваю конверсию.', location: 'Ростов-на-Дону', tags: ['Яндекс.Директ', 'Google Ads', 'ROI'], joinedAt: '2021-08-17', isVerified: true, isOnline: false, responseTime: '~4 часа', totalEarned: 1450000 },
  { id: 's14', name: 'Виктория Суворова', avatar: '', initials: 'ВС', rating: 4.9, reviewsCount: 52, completedOrders: 94, description: 'Иллюстратор и концепт-художник. Персонажи, обложки книг, принты для мерча и NFT.', location: 'Казань', tags: ['Illustration', 'Procreate', 'Character'], joinedAt: '2022-04-25', isVerified: false, isOnline: true, responseTime: '~2 часа', totalEarned: 740000 },
  { id: 's15', name: 'Николай Лебедев', avatar: '', initials: 'НЛ', rating: 4.6, reviewsCount: 71, completedOrders: 152, description: 'Юрист по договорному праву. Составление договоров, консультации по спорам, защита интеллектуальной собственности.', location: 'Москва', tags: ['Договоры', 'Арбитраж', 'ИС'], joinedAt: '2021-12-01', isVerified: true, isOnline: false, responseTime: '~8 часов', totalEarned: 1890000 },
  { id: 's16', name: 'Татьяна Власова', avatar: '', initials: 'ТВ', rating: 4.8, reviewsCount: 44, completedOrders: 89, description: 'Онлайн-курсы по английскому языку. От нуля до B2 за 3 месяца. Индивидуальный план обучения.', location: 'Воронеж', tags: ['Английский', 'IELTS', 'Speaking'], joinedAt: '2022-07-08', isVerified: true, isOnline: true, responseTime: '~1 час', totalEarned: 380000 },
  { id: 's17', name: 'Роман Крылов', avatar: '', initials: 'РК', rating: 4.7, reviewsCount: 91, completedOrders: 203, description: 'DevOps-инженер. Настройка CI/CD, Docker, Kubernetes, мониторинг. Делаю деплой быстрым и надёжным.', location: 'Новосибирск', tags: ['Docker', 'Kubernetes', 'CI/CD'], joinedAt: '2020-09-12', isVerified: true, isOnline: true, responseTime: '~2 часа', totalEarned: 2670000 },
  { id: 's18', name: 'Светлана Коновалова', avatar: '', initials: 'СКо', rating: 4.9, reviewsCount: 37, completedOrders: 63, description: 'Бизнес-консультант. Помогаю малому и среднему бизнесу выстроить процессы, найти узкие места, вырасти в прибыли.', location: 'Санкт-Петербург', tags: ['Консалтинг', 'Стратегия', 'Lean'], joinedAt: '2022-11-30', isVerified: false, isOnline: false, responseTime: '~1 день', totalEarned: 920000 },
];

export const SERVICES: Service[] = [
  { id: 'svc1', sellerId: 's1', title: 'Разработка сайта на React + Node.js', category: 'it', subcategory: 'web-dev', price: 25000, priceType: 'from', priceMax: 80000, description: 'Создам современный сайт или веб-приложение под ключ. SPA, лендинг, корпоративный сайт, интернет-магазин. Адаптивная вёрстка, SEO-оптимизация, деплой.', deliveryDays: 14, rating: 4.9, reviewsCount: 47, ordersCount: 89, tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'], image: '', isActive: true, isFeatured: true, isNew: false, createdAt: '2024-01-15' },
  { id: 'svc2', sellerId: 's2', title: 'Дизайн интерфейса мобильного приложения', category: 'design', subcategory: 'ui-ux', price: 15000, priceType: 'from', priceMax: 45000, description: 'Разработаю дизайн-систему и полный UI Kit для iOS/Android приложения в Figma. Анимации, прототип, передача разработчикам.', deliveryDays: 7, rating: 4.8, reviewsCount: 32, ordersCount: 67, tags: ['Figma', 'iOS', 'Android', 'Prototype'], image: '', isActive: true, isFeatured: true, isNew: false, createdAt: '2024-02-01' },
  { id: 'svc3', sellerId: 's3', title: 'SEO-продвижение сайта в Яндекс и Google', category: 'marketing', subcategory: 'seo', price: 12000, priceType: 'from', description: 'Комплексное SEO: технический аудит, семантика, ссылочный профиль, контент-стратегия. Отчёт каждый месяц. Гарантия роста позиций за 3 месяца.', deliveryDays: 30, rating: 4.7, reviewsCount: 28, ordersCount: 54, tags: ['SEO', 'Яндекс', 'Google', 'Семантика'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2024-01-20' },
  { id: 'svc4', sellerId: 's4', title: 'Разработка логотипа с нуля', category: 'design', subcategory: 'logo', price: 5000, priceType: 'from', priceMax: 20000, description: 'Создам уникальный логотип для вашего бренда. 3 концепции на выбор, неограниченные правки до утверждения. Все исходники (AI, SVG, PNG).', deliveryDays: 5, rating: 5.0, reviewsCount: 43, ordersCount: 87, tags: ['Logo', 'Illustrator', 'Branding'], image: '', isActive: true, isFeatured: true, isNew: false, createdAt: '2023-11-10' },
  { id: 'svc5', sellerId: 's5', title: 'Flutter-приложение для iOS и Android', category: 'it', subcategory: 'mobile', price: 40000, priceType: 'from', priceMax: 150000, description: 'Кроссплатформенная разработка на Flutter. MVP за 2 недели, полноценное приложение — за месяц. Публикация в App Store и Google Play.', deliveryDays: 21, rating: 4.6, reviewsCount: 19, ordersCount: 38, tags: ['Flutter', 'iOS', 'Android', 'Firebase'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2024-03-05' },
  { id: 'svc6', sellerId: 's6', title: 'Продающие тексты для лендинга', category: 'content', subcategory: 'copywriting', price: 3500, priceType: 'fixed', description: 'Напишу цепляющий текст для посадочной страницы. Анализ ЦА, формула AIDA, уникальное торговое предложение. Конверсия гарантирована.', deliveryDays: 3, rating: 4.9, reviewsCount: 56, ordersCount: 112, tags: ['Копирайтинг', 'Лендинг', 'Конверсия'], image: '', isActive: true, isFeatured: true, isNew: false, createdAt: '2023-12-01' },
  { id: 'svc7', sellerId: 's7', title: 'REST API на FastAPI + PostgreSQL', category: 'it', subcategory: 'backend', price: 18000, priceType: 'from', priceMax: 60000, description: 'Разработаю масштабируемый REST API. Авторизация JWT, документация Swagger, Docker-деплой, покрытие тестами.', deliveryDays: 10, rating: 4.8, reviewsCount: 34, ordersCount: 71, tags: ['Python', 'FastAPI', 'Docker', 'PostgreSQL'], image: '', isActive: true, isFeatured: false, isNew: true, createdAt: '2024-04-10' },
  { id: 'svc8', sellerId: 's8', title: 'Репетитор по математике (ОГЭ/ЕГЭ)', category: 'education', subcategory: 'tutors', price: 1500, priceType: 'fixed', description: 'Занятия онлайн. Разбираем слабые темы, решаем варианты, учим стратегию экзамена. 1 урок = 60 минут. Первое занятие со скидкой 50%.', deliveryDays: 1, rating: 4.7, reviewsCount: 55, ordersCount: 103, tags: ['Математика', 'ЕГЭ', 'ОГЭ'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2023-09-01' },
  { id: 'svc9', sellerId: 's9', title: 'Ведение Telegram-канала под ключ', category: 'marketing', subcategory: 'smm', price: 8000, priceType: 'from', priceMax: 25000, description: 'Разработаю стратегию, создам контент-план, буду писать и публиковать посты ежедневно. Рост аудитории, вовлечённость, монетизация.', deliveryDays: 30, rating: 4.9, reviewsCount: 41, ordersCount: 88, tags: ['Telegram', 'Контент', 'SMM'], image: '', isActive: true, isFeatured: true, isNew: false, createdAt: '2024-01-08' },
  { id: 'svc10', sellerId: 's10', title: 'Бухгалтерское сопровождение ИП', category: 'business', subcategory: 'accounting', price: 5000, priceType: 'from', description: 'Ежеквартальная отчётность, налоговые декларации, работа с кассой, консультации по оптимизации. УСН, ОСНО, патент.', deliveryDays: 7, rating: 4.6, reviewsCount: 38, ordersCount: 72, tags: ['1С', 'УСН', 'Налоги', 'Декларации'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2023-10-15' },
  { id: 'svc11', sellerId: 's11', title: 'Промо-ролик для бизнеса', category: 'design', subcategory: 'video', price: 7000, priceType: 'from', priceMax: 30000, description: 'Монтаж и создание промо-видео: таймлапс, анимационная инфографика, рекламный ролик. Длительность до 60 сек. Все форматы.', deliveryDays: 5, rating: 4.8, reviewsCount: 27, ordersCount: 52, tags: ['Видео', 'After Effects', 'Монтаж'], image: '', isActive: true, isFeatured: false, isNew: true, createdAt: '2024-04-20' },
  { id: 'svc12', sellerId: 's12', title: 'Перевод текста EN/DE/FR → RU', category: 'content', subcategory: 'translation', price: 800, priceType: 'from', description: 'Профессиональный письменный перевод. Цена за 1000 знаков. Технические, юридические, маркетинговые тексты. Срок — 1-3 дня.', deliveryDays: 3, rating: 5.0, reviewsCount: 29, ordersCount: 58, tags: ['Английский', 'Немецкий', 'Французский'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2023-11-22' },
  { id: 'svc13', sellerId: 's13', title: 'Настройка Яндекс Директ с нуля', category: 'marketing', subcategory: 'ads', price: 9000, priceType: 'fixed', description: 'Полная настройка рекламной кампании: анализ конкурентов, ключевые слова, объявления, ставки. Цель — максимум лидов при минимальном бюджете.', deliveryDays: 5, rating: 4.7, reviewsCount: 45, ordersCount: 97, tags: ['Яндекс.Директ', 'Реклама', 'Лиды'], image: '', isActive: true, isFeatured: true, isNew: false, createdAt: '2023-12-10' },
  { id: 'svc14', sellerId: 's14', title: 'Авторские иллюстрации для книги или сайта', category: 'design', subcategory: 'illustration', price: 4000, priceType: 'from', priceMax: 15000, description: 'Создам уникальные иллюстрации в вашем стиле. Персонажи, обложки, иллюстрации для детских книг, рекламная графика.', deliveryDays: 7, rating: 4.9, reviewsCount: 52, ordersCount: 94, tags: ['Иллюстрация', 'Персонажи', 'Procreate'], image: '', isActive: true, isFeatured: false, isNew: true, createdAt: '2024-04-15' },
  { id: 'svc15', sellerId: 's15', title: 'Составление договора для бизнеса', category: 'business', subcategory: 'legal', price: 3000, priceType: 'from', priceMax: 12000, description: 'Составлю или проверю договор: поставки, оказания услуг, NDA, трудовой, с фрилансерами. Защита ваших интересов в каждом пункте.', deliveryDays: 3, rating: 4.6, reviewsCount: 31, ordersCount: 67, tags: ['Договор', 'NDA', 'Юрист'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2023-08-05' },
  { id: 'svc16', sellerId: 's16', title: 'Курс английского онлайн (A1–B2)', category: 'education', subcategory: 'courses', price: 2000, priceType: 'from', description: 'Индивидуальные занятия по Zoom. Разговорный английский, подготовка к IELTS/TOEFL, бизнес-английский. Прогресс уже после 5 уроков.', deliveryDays: 1, rating: 4.8, reviewsCount: 44, ordersCount: 89, tags: ['Английский', 'IELTS', 'Онлайн'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2023-07-14' },
  { id: 'svc17', sellerId: 's17', title: 'Настройка Docker и CI/CD для проекта', category: 'it', subcategory: 'automation', price: 12000, priceType: 'from', priceMax: 35000, description: 'Контейнеризация приложения, настройка GitHub Actions или GitLab CI, автодеплой на VPS/облако. Мониторинг через Grafana.', deliveryDays: 7, rating: 4.7, reviewsCount: 38, ordersCount: 82, tags: ['Docker', 'GitHub Actions', 'Nginx'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2024-02-20' },
  { id: 'svc18', sellerId: 's18', title: 'Стратегическая сессия для бизнеса', category: 'business', subcategory: 'consulting', price: 8000, priceType: 'fixed', description: '2-часовая сессия: разбираем текущую ситуацию, находим узкие места, строим план роста на 3-6 месяцев. Запись и резюме сессии — в подарок.', deliveryDays: 2, rating: 4.9, reviewsCount: 37, ordersCount: 63, tags: ['Консалтинг', 'Стратегия', 'Бизнес'], image: '', isActive: true, isFeatured: true, isNew: false, createdAt: '2023-12-28' },
  { id: 'svc19', sellerId: 's1', title: 'Лендинг на React за 3 дня', category: 'it', subcategory: 'web-dev', price: 9000, priceType: 'fixed', description: 'Быстрый современный лендинг. Адаптив, анимации, форма заявки, интеграция с CRM. Сдаю строго через 3 рабочих дня.', deliveryDays: 3, rating: 4.9, reviewsCount: 33, ordersCount: 61, tags: ['React', 'Лендинг', 'Быстро'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2024-03-01' },
  { id: 'svc20', sellerId: 's7', title: 'Telegram-бот на Python за сутки', category: 'it', subcategory: 'automation', price: 4000, priceType: 'from', priceMax: 15000, description: 'Бот для автоматизации: рассылки, приём заявок, интеграция с базой данных, оплата через Telegram Stars или ЮKassa.', deliveryDays: 1, rating: 4.8, reviewsCount: 29, ordersCount: 54, tags: ['Python', 'Telegram', 'Bot', 'aiogram'], image: '', isActive: true, isFeatured: false, isNew: true, createdAt: '2024-04-25' },
  { id: 'svc21', sellerId: 's2', title: 'Фирменный стиль компании', category: 'design', subcategory: 'ui-ux', price: 20000, priceType: 'from', priceMax: 60000, description: 'Брендбук под ключ: логотип, цвета, типографика, шаблоны для соцсетей, визиток, презентаций. Полный гайдлайн для команды.', deliveryDays: 14, rating: 4.8, reviewsCount: 18, ordersCount: 31, tags: ['Брендинг', 'Figma', 'Гайдлайн'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2024-01-30' },
  { id: 'svc22', sellerId: 's9', title: 'Ведение ВКонтакте (контент + реклама)', category: 'marketing', subcategory: 'smm', price: 10000, priceType: 'from', description: 'Комплексное ведение сообщества ВКонтакте: контент-план, дизайн публикаций, таргетированная реклама, аналитика.', deliveryDays: 30, rating: 4.9, reviewsCount: 27, ordersCount: 55, tags: ['ВКонтакте', 'Таргет', 'Контент'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2023-11-15' },
  { id: 'svc23', sellerId: 's6', title: 'SEO-статья для блога (3000-5000 слов)', category: 'content', subcategory: 'copywriting', price: 5500, priceType: 'fixed', description: 'Экспертная статья, которую читают и которая ранжируется. Семантическое ядро, LSI-ключи, структура, уникальность 99%.', deliveryDays: 5, rating: 4.9, reviewsCount: 41, ordersCount: 78, tags: ['SEO', 'Статья', 'Контент-маркетинг'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2024-02-08' },
  { id: 'svc24', sellerId: 's17', title: 'Kubernetes кластер с нуля', category: 'it', subcategory: 'backend', price: 30000, priceType: 'from', description: 'Развертывание production-ready Kubernetes кластера. Ingress, cert-manager, Helm, мониторинг Prometheus + Grafana. Документация включена.', deliveryDays: 10, rating: 4.7, reviewsCount: 14, ordersCount: 23, tags: ['Kubernetes', 'Helm', 'Prometheus'], image: '', isActive: true, isFeatured: false, isNew: true, createdAt: '2024-05-01' },
  { id: 'svc25', sellerId: 's11', title: 'Анимированный логотип (моушн)', category: 'design', subcategory: 'video', price: 3500, priceType: 'from', priceMax: 10000, description: 'Оживлю ваш логотип: плавная анимация для заставки видео, трансляций, соцсетей. Форматы MP4, GIF, Lottie.', deliveryDays: 3, rating: 4.8, reviewsCount: 21, ordersCount: 44, tags: ['Моушн', 'Лого', 'Анимация', 'Lottie'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2023-12-20' },
  { id: 'svc26', sellerId: 's5', title: 'Чат-бот на React Native', category: 'it', subcategory: 'mobile', price: 20000, priceType: 'from', priceMax: 50000, description: 'Приложение с встроенным AI-чатом (GPT/Claude). Истории чатов, голосовой ввод, поддержка тёмной темы. iOS + Android.', deliveryDays: 14, rating: 4.6, reviewsCount: 11, ordersCount: 19, tags: ['React Native', 'AI', 'ChatGPT'], image: '', isActive: true, isFeatured: false, isNew: true, createdAt: '2024-04-28' },
  { id: 'svc27', sellerId: 's13', title: 'Google Ads — поисковая кампания', category: 'marketing', subcategory: 'ads', price: 7500, priceType: 'fixed', description: 'Настройка и оптимизация кампании в Google Ads: ключевые слова, объявления, расширения, отслеживание конверсий. Ежемесячный отчёт.', deliveryDays: 4, rating: 4.7, reviewsCount: 33, ordersCount: 68, tags: ['Google Ads', 'PPC', 'Конверсии'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2024-01-05' },
  { id: 'svc28', sellerId: 's15', title: 'Регистрация товарного знака', category: 'business', subcategory: 'legal', price: 15000, priceType: 'from', description: 'Проверка товарного знака, подача заявки в Роспатент, ведение до получения свидетельства. Гарантия результата.', deliveryDays: 60, rating: 4.6, reviewsCount: 17, ordersCount: 32, tags: ['Товарный знак', 'Роспатент', 'ИС'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2023-10-01' },
  { id: 'svc29', sellerId: 's14', title: 'NFT-арт и цифровые коллекции', category: 'design', subcategory: 'illustration', price: 6000, priceType: 'from', priceMax: 30000, description: 'Создание уникальных иллюстраций для NFT-коллекций. Генеративное искусство, персонажи, атрибуты. Готовые файлы для минтинга.', deliveryDays: 10, rating: 4.9, reviewsCount: 23, ordersCount: 38, tags: ['NFT', 'Digital Art', 'Web3'], image: '', isActive: true, isFeatured: false, isNew: false, createdAt: '2024-03-15' },
  { id: 'svc30', sellerId: 's18', title: 'Финансовая модель стартапа в Excel', category: 'business', subcategory: 'consulting', price: 12000, priceType: 'from', priceMax: 25000, description: 'Построю финансовую модель на 3-5 лет: P&L, Cash Flow, баланс, юнит-экономика, сценарии роста. Подходит для инвесторов и банков.', deliveryDays: 7, rating: 4.9, reviewsCount: 19, ordersCount: 31, tags: ['Excel', 'Финмодель', 'Стартап', 'Инвестиции'], image: '', isActive: true, isFeatured: false, isNew: true, createdAt: '2024-04-22' },
];

export const REVIEWS: Review[] = [
  { id: 'r1', serviceId: 'svc1', buyerName: 'Михаил К.', buyerAvatar: 'МК', rating: 5, text: 'Алексей сделал сайт быстро и качественно. Всё по ТЗ, правки вносил моментально. Однозначно рекомендую!', date: '2024-04-15' },
  { id: 'r2', serviceId: 'svc4', buyerName: 'Ольга Т.', buyerAvatar: 'ОТ', rating: 5, text: 'Очень довольна логотипом! Елена сразу поняла, что мне нужно, и сделала 3 варианта — все понравились. Выбрала один и в итоге очень счастлива.', date: '2024-04-10' },
  { id: 'r3', serviceId: 'svc6', buyerName: 'Денис Р.', buyerAvatar: 'ДР', rating: 5, text: 'Текст для лендинга написан профессионально. Конверсия выросла с 1.2% до 3.8% — результат говорит сам за себя.', date: '2024-04-08' },
  { id: 'r4', serviceId: 'svc9', buyerName: 'Светлана М.', buyerAvatar: 'СМ', rating: 5, text: 'Владимир ведёт наш Telegram уже 4 месяца. За это время набрали 2000 живых подписчиков без накрутки. Продолжаем работать.', date: '2024-04-05' },
  { id: 'r5', serviceId: 'svc13', buyerName: 'Андрей Б.', buyerAvatar: 'АБ', rating: 5, text: 'Настроил Директ — стоимость заявки снизилась в 2.5 раза. Павел чётко знает своё дело, никаких лишних слов.', date: '2024-03-28' },
];

export const ADMIN_STATS = {
  totalUsers: 1842,
  newUsersToday: 23,
  totalServices: 789,
  activeServices: 634,
  totalOrders: 4521,
  ordersToday: 47,
  revenue: {
    today: 284000,
    week: 1870000,
    month: 7340000,
    commission: 734000,
  },
  topSellers: SELLERS.slice(0, 5),
};

export const formatPrice = (price: number, priceType: 'fixed' | 'from', priceMax?: number): string => {
  const fmt = (n: number) => n.toLocaleString('ru-RU');
  if (priceType === 'from') {
    if (priceMax) return `от ${fmt(price)} до ${fmt(priceMax)} ₽`;
    return `от ${fmt(price)} ₽`;
  }
  return `${fmt(price)} ₽`;
};

export const getSellerById = (id: string): Seller | undefined => SELLERS.find(s => s.id === id);
export const getCategoryById = (id: string): Category | undefined => CATEGORIES.find(c => c.id === id);
export const getServicesBySeller = (sellerId: string): Service[] => SERVICES.filter(s => s.sellerId === sellerId);
export const getFeaturedServices = (): Service[] => SERVICES.filter(s => s.isFeatured);
export const getNewServices = (): Service[] => SERVICES.filter(s => s.isNew);

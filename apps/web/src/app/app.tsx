import { useMemo, useState } from 'react';
import styles from './app.module.scss';

type Category = 'Шары' | 'Подвесы' | 'Фигурки';
type Product = { id: number; name: string; description: string; price: number; category: Category; image: string; badge?: string };

const products: Product[] = [
  { id: 1, name: 'Полночная парча', description: 'Бархатистый синий шар с тонким золотым узором.', price: 2490, category: 'Шары', image: '/assets/toys/toy-01.webp', badge: 'Хит' },
  { id: 2, name: 'Королевский купол', description: 'Глубокий ультрамарин и золотые лепестки ручной отделки.', price: 2790, category: 'Шары', image: '/assets/toys/toy-02.webp' },
  { id: 3, name: 'Сапфировый снег', description: 'Сияющая фактура из сотен крошечных синих кристаллов.', price: 2290, category: 'Шары', image: '/assets/toys/toy-03.webp' },
  { id: 4, name: 'Серебряная капля', description: 'Воздушный подвес с мерцающим серебряным напылением.', price: 2190, category: 'Подвесы', image: '/assets/toys/toy-04.webp' },
  { id: 5, name: 'Ледяное перо', description: 'Вытянутая стеклянная капля с филигранным рисунком.', price: 1890, category: 'Подвесы', image: '/assets/toys/toy-05.webp' },
  { id: 6, name: 'Синий вельвет', description: 'Матовый шар с золотыми меридианами и бархатной глубиной.', price: 2590, category: 'Шары', image: '/assets/toys/toy-06.webp' },
  { id: 7, name: 'Изумрудный вихрь', description: 'Стеклянный волчок оттенка хвои с тонкой золотой нитью.', price: 2390, category: 'Подвесы', image: '/assets/toys/toy-07.webp', badge: 'Новинка' },
  { id: 8, name: 'Лесная мозаика', description: 'Зелёный шар с лентами, бусинами и зеркальными вставками.', price: 2990, category: 'Шары', image: '/assets/toys/toy-08.webp' },
  { id: 9, name: 'Оловянный барабанщик', description: 'Сказочный музыкант в парадном мундире и высокой шапке.', price: 3290, category: 'Фигурки', image: '/assets/toys/toy-09.webp' },
  { id: 10, name: 'Морозный кристалл', description: 'Серебристая капля с геометрической огранкой.', price: 1990, category: 'Подвесы', image: '/assets/toys/toy-10.webp' },
  { id: 11, name: 'Ночная мозаика', description: 'Гранёный шар в графитовых и лазурных оттенках.', price: 2690, category: 'Шары', image: '/assets/toys/toy-11.webp' },
  { id: 12, name: 'Черничная шишка', description: 'Ажурный подвес цвета зимнего неба с серебряным инеем.', price: 2090, category: 'Подвесы', image: '/assets/toys/toy-12.webp' },
  { id: 13, name: 'Белый барашек', description: 'Добрый символ года в тёплом шарфе и с фактурной шерстью.', price: 3490, category: 'Фигурки', image: '/assets/toys/toy-13.webp', badge: 'Особенный' },
  { id: 14, name: 'Подарок для Севера', description: 'Девочка-путешественница с подарком и пушистой муфтой.', price: 3690, category: 'Фигурки', image: '/assets/toys/toy-14.webp' },
  { id: 15, name: 'Зимнее путешествие', description: 'Нежная фигурка девочки с чемоданчиком в пастельных тонах.', price: 3590, category: 'Фигурки', image: '/assets/toys/toy-15.webp' },
  { id: 16, name: 'Первый снег', description: 'Маленькая наездница на белой лошадке-качалке.', price: 3990, category: 'Фигурки', image: '/assets/toys/toy-16.webp', badge: 'Коллекция' },
  { id: 17, name: 'Юный фонарщик', description: 'Зимний мальчик с фонарём и игрушкой в руках.', price: 3590, category: 'Фигурки', image: '/assets/toys/toy-17.webp' },
  { id: 18, name: 'Золотая комета', description: 'Праздничный шар из сверкающих золотых звёзд.', price: 2890, category: 'Шары', image: '/assets/toys/toy-18.webp' },
  { id: 19, name: 'Клюквенный глянец', description: 'Классический красный шар с живым рисунком стекла.', price: 2190, category: 'Шары', image: '/assets/toys/toy-19.webp' },
];

const formatPrice = (price: number) => `${new Intl.NumberFormat('ru-RU').format(price)} ₽`;
const BagIcon = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.5h11l1 12h-13l1-12Z"/><path d="M9 9V6.5a3 3 0 0 1 6 0V9"/></svg>;

export function App() {
  const [category, setCategory] = useState<'Все' | Category>('Все');
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const visibleProducts = category === 'Все' ? products : products.filter((product) => product.category === category);
  const cartProducts = useMemo(() => products.filter((product) => cart[product.id]), [cart]);
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const total = cartProducts.reduce((sum, product) => sum + product.price * cart[product.id], 0);

  const addToCart = (id: number) => { setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 })); setCartOpen(true); };
  const changeQuantity = (id: number, delta: number) => setCart((current) => { const next = (current[id] || 0) + delta; const updated = { ...current }; if (next <= 0) delete updated[id]; else updated[id] = next; return updated; });
  const finishOrder = (event: React.FormEvent) => { event.preventDefault(); setOrdered(true); setCart({}); };

  return <div className={styles['store']}>
    <div className={styles['topline']}>Бесплатная доставка по Москве при заказе от 7 000 ₽</div>
    <header className={styles['header']}>
      <a className={styles['logo']} href="#top" aria-label="Северное сияние — на главную"><span className={styles['logoMark']}>✦</span><span>Северное<br/><i>сияние</i></span></a>
      <nav className={styles['nav']} aria-label="Основная навигация"><a href="#catalog">Коллекция</a><a href="#story">О нас</a><a href="#delivery">Доставка</a></nav>
      <button className={styles['cartButton']} onClick={() => setCartOpen(true)} aria-label={`Корзина, товаров: ${cartCount}`}><BagIcon/><span>Корзина</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
    </header>
    <main id="top">
      <section className={styles['hero']}>
        <div className={styles['heroCopy']}><span className={styles['eyebrow']}>Коллекция 2026 · Ручная работа</span><h1>Праздник,<br/>который <em>останется</em></h1><p>Ёлочные украшения с характером — для семейных историй, которые передают из поколения в поколение.</p><a className={styles['primaryButton']} href="#catalog">Смотреть коллекцию <span>→</span></a></div>
        <div className={styles['heroVisual']}><div className={styles['heroHalo']}/><img src="/assets/toys/toy-01.webp" alt="Синий ёлочный шар с золотым узором"/><span className={styles['heroNote']}>Каждая игрушка<br/>выбрана вручную</span></div>
        <div className={styles['heroStars']} aria-hidden="true">✦<span>✧</span><b>✦</b></div>
      </section>
      <section className={styles['promises']} aria-label="Преимущества">
        <div><span>01</span><p><strong>Бережная упаковка</strong>Каждая игрушка — в отдельной подарочной коробке</p></div><div><span>02</span><p><strong>Отборная коллекция</strong>Выразительные украшения с тонкой отделкой</p></div><div><span>03</span><p><strong>Доставка по России</strong>Надёжно упакуем и отправим в ваш город</p></div>
      </section>
      <section className={styles['catalog']} id="catalog">
        <div className={styles['sectionHeading']}><div><span className={styles['eyebrow']}>Найдите свою</span><h2>Новогоднюю историю</h2></div><p>Украшения, которые хочется рассматривать — и бережно доставать каждую зиму.</p></div>
        <div className={styles['filters']} role="group" aria-label="Фильтр каталога">{(['Все','Шары','Подвесы','Фигурки'] as const).map((item) => <button key={item} className={category === item ? styles['activeFilter'] : ''} onClick={() => setCategory(item)}>{item}</button>)}<span>{visibleProducts.length} украшений</span></div>
        <div className={styles['grid']}>{visibleProducts.map((product) => <article className={styles['card']} key={product.id}>
          <div className={styles['imageWrap']}>{product.badge && <span className={styles['badge']}>{product.badge}</span>}<img src={product.image} alt={product.name} loading="lazy"/><button className={styles['quickAdd']} onClick={() => addToCart(product.id)} aria-label={`Добавить ${product.name} в корзину`}><span>Добавить</span> ＋</button></div>
          <div className={styles['cardInfo']}><span>{product.category}</span><h3>{product.name}</h3><p>{product.description}</p><strong>{formatPrice(product.price)}</strong></div>
        </article>)}</div>
      </section>
      <section className={styles['story']} id="story"><div className={styles['storyImage']}><img src="/assets/toys/toy-16.webp" alt="Новогодняя фигурка девочки на лошадке"/></div><div className={styles['storyCopy']}><span className={styles['eyebrow']}>С теплом к деталям</span><h2>Не просто украшения.<br/><em>Будущие воспоминания.</em></h2><p>Мы собираем коллекцию игрушек, в которых есть настроение настоящего праздника: блеск зимнего вечера, тёплый свет гирлянд и немного детского чуда.</p><p>Каждый экземпляр внимательно осматриваем и упаковываем вручную, чтобы он приехал к вам в идеальном состоянии.</p><a href="#catalog">Выбрать свою игрушку <span>→</span></a></div></section>
      <section className={styles['delivery']} id="delivery"><span>✦</span><div><small>Подарочная упаковка</small><h2>Дарить уже можно</h2><p>Добавим открытку с вашим текстом и перевяжем коробку бархатной лентой.</p></div><a href="#catalog">Выбрать подарок</a></section>
    </main>
    <footer className={styles['footer']}><div className={styles['logo']}><span className={styles['logoMark']}>✦</span><span>Северное<br/><i>сияние</i></span></div><p>Коллекционные новогодние украшения<br/>для дома и самых близких.</p><div><a href="#catalog">Каталог</a><a href="#story">О нас</a><a href="#delivery">Доставка</a></div><small>© 2026 Северное сияние</small></footer>
    {cartOpen && <div className={styles['overlay']} onMouseDown={() => setCartOpen(false)}><aside className={styles['drawer']} onMouseDown={(event) => event.stopPropagation()} aria-label="Корзина">
      <div className={styles['drawerHeader']}><div><span>Ваша корзина</span><h2>{cartCount ? `${cartCount} ${cartCount === 1 ? 'украшение' : 'украшения'}` : 'Пока пусто'}</h2></div><button onClick={() => setCartOpen(false)} aria-label="Закрыть">×</button></div>
      {!cartProducts.length ? <div className={styles['emptyCart']}><span>✦</span><p>Добавьте украшения из коллекции — они появятся здесь.</p><button onClick={() => setCartOpen(false)}>Вернуться в каталог</button></div> : <><div className={styles['cartList']}>{cartProducts.map((product) => <div className={styles['cartItem']} key={product.id}><img src={product.image} alt=""/><div><h3>{product.name}</h3><span>{formatPrice(product.price)}</span><div className={styles['quantity']}><button onClick={() => changeQuantity(product.id,-1)}>−</button><b>{cart[product.id]}</b><button onClick={() => changeQuantity(product.id,1)}>＋</button></div></div></div>)}</div><div className={styles['cartFooter']}><div><span>Итого</span><strong>{formatPrice(total)}</strong></div><small>Доставка рассчитывается при оформлении</small><button onClick={() => { setCartOpen(false); setCheckout(true); }}>Оформить заказ <span>→</span></button></div></>}
    </aside></div>}
    {checkout && <div className={styles['overlay']} onMouseDown={() => setCheckout(false)}><div className={styles['checkout']} onMouseDown={(event) => event.stopPropagation()}><button className={styles['closeCheckout']} onClick={() => setCheckout(false)} aria-label="Закрыть">×</button>
      {ordered ? <div className={styles['success']}><span>✦</span><h2>Заказ принят</h2><p>Спасибо! Это демонстрационный магазин, поэтому настоящий заказ не создан. Но корзина и весь сценарий работают.</p><button onClick={() => { setOrdered(false); setCheckout(false); }}>Вернуться в магазин</button></div> : <form onSubmit={finishOrder}><span className={styles['eyebrow']}>Последний шаг</span><h2>Оформление заказа</h2><p>Оставьте контакты — мы уточним детали доставки.</p><label>Ваше имя<input required placeholder="Анна"/></label><label>Телефон<input required type="tel" placeholder="+7 999 000-00-00"/></label><label>Город<input required placeholder="Москва"/></label><label>Комментарий<textarea placeholder="Текст для открытки или пожелания"/></label><div className={styles['checkoutTotal']}><span>К оплате</span><strong>{formatPrice(total)}</strong></div><button type="submit">Подтвердить заказ</button><small>Демонстрационная форма — данные никуда не отправляются</small></form>}
    </div></div>}
  </div>;
}

export default App;

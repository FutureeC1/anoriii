import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { SEOCategoryPage } from "./pages/SEOCategoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "catalog", Component: Catalog },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      {
        path: "silver-rings",
        element: <SEOCategoryPage
          title="Silver Rings — Серебряные кольца в Ташкенте"
          h1="Silver Rings — Серебряные кольца в Ташкенте"
          description="Откройте для себя коллекцию стильных серебряных колец от Anori. Минималистичные дизайны, высокое качество и доступные цены. Silver rings для любого случая."
          metaDescription="Купить стильные серебряные кольца в Ташкенте. Широкий выбор silver rings от Anori Jewelry с доставкой по Узбекистану."
          categorySlug="rings"
        />
      },
      {
        path: "silver-necklaces",
        element: <SEOCategoryPage
          title="Silver Necklaces — Серебряные ожерелья и колье"
          h1="Silver Necklaces — Серебряные ожерелья и колье в Ташкенте"
          description="Изысканные серебряные ожерелья и колье (silver necklaces) для тех, кто ценит утонченность. Лучшие украшения из серебра в Anori Tashkent."
          metaDescription="Серебряные ожерелья и колье в Ташкенте. Silver necklaces от Anori — элегантность в каждом украшении с доставкой."
          categorySlug="necklaces"
        />
      },
      {
        path: "silver-chains",
        element: <SEOCategoryPage
          title="Silver Chains — Серебряные цепочки Ташкент"
          h1="Silver Chains — Серебряные цепочки в Ташкенте"
          description="Тонкие и прочные серебряные цепочки (silver chains) от Anori. Идеальное дополнение к вашему образу. Серебро 925 пробы."
          metaDescription="Каталог серебряных цепочек в Ташкенте. Купить silver chains от Anori Jewelry. Высокое качество, доставка по Узбекистану."
          categorySlug="chains"
        />
      },
      {
        path: "serebryanye-koltsa",
        element: <SEOCategoryPage
          title="Серебряные кольца — Купить в Ташкенте"
          h1="Серебряные кольца в Ташкенте — Anori"
          description="Широкий выбор серебряных колец в магазине Anori Tashkent. Современный дизайн, серебро высокого качества и быстрая доставка."
          metaDescription="Купить серебряные кольца в Ташкенте по доступным ценам. Стильные украшения из серебра в магазине Anori Jewelry."
          categorySlug="koltsa"
        />
      },
      {
        path: "serebryanye-tsepochki",
        element: <SEOCategoryPage
          title="Серебряные цепочки — Магазин украшений Anori"
          h1="Серебряные цепочки в Ташкенте — Anori"
          description="Большой каталог серебряных цепочек для мужчин и женщин. Купите серебряную цепочку в Anori с доставкой до двери."
          metaDescription="Магазин серебряных цепочек в Ташкенте. Большой выбор, выгодные цены и гарантия качества в Anori Jewelry."
          categorySlug="tsepochki"
        />
      },
    ],
  },
]);

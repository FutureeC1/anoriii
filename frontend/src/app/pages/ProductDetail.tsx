import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ArrowLeft, Truck, RotateCcw, Shield, Loader2 } from 'lucide-react';
import { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import { TelegramButton } from '../components/TelegramButton';
import { SEO } from '../components/SEO';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // In real app, we might search by ID or slug. The backend uses slug.
        // But for now let's assume we can get it.
        const response = await api.get(`catalog/products/${id}/`);
        const p = response.data;
        const mappedProduct: Product = {
          id: p.id.toString(),
          name: p.name,
          price: parseFloat(p.price),
          category: (p.category_name || '').toLowerCase(),
          image: p.images && p.images[0] ? p.images[0].image_url : '',
          images: p.images ? p.images.map((img: any) => img.image_url) : [],
          description: p.description,
          featured: p.is_new
        };
        setProduct(mappedProduct);

        // Fetch related products
        const relatedRes = await api.get(`catalog/products/`, {
          params: { category__slug: p.category_slug || p.category }
        });
        const mappedRelated = relatedRes.data.results
          .filter((item: any) => item.id !== p.id)
          .map((item: any) => ({
            id: item.id.toString(),
            name: item.name,
            price: parseFloat(item.price),
            category: (item.category_slug || '').toLowerCase(),
            image: item.image || '',
            images: item.image ? [item.image] : [],
            description: '',
          }));
        setRelatedProducts(mappedRelated);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Товар не найден');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-700" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h2 className="text-2xl mb-4">{error || 'Товар не найден'}</h2>
        <Link to="/catalog" className="text-yellow-700 hover:underline">Вернуться в каталог</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <SEO
        title={product.name}
        description={product.description || "Изысканное украшение от Anori Tashkent"}
        image={product.image}
        url={`${window.location.origin}/product/${product.id}`}
        type="product"
      />
      {/* Breadcrumbs */}
      <Link
        to="/catalog"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Назад к каталогу</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-yellow-700' : 'border-transparent'
                    }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-8">
            <h1 className="text-4xl tracking-tight mb-4">{product.name}</h1>
            <p className="text-3xl text-gray-900">
              {product.price.toLocaleString('ru-RU')} сум
            </p>
          </div>

          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-gray-900 text-white py-4 rounded-full hover:bg-yellow-700 transition-colors duration-300 mb-6"
          >
            {addedToCart ? 'Добавлено в корзину!' : 'Добавить в корзину'}
          </button>

          <button
            onClick={() => {
              addItem(product);
              navigate('/checkout');
            }}
            className="w-full border-2 border-gray-900 text-gray-900 py-4 rounded-full hover:bg-gray-50 transition-colors duration-300 mb-8"
          >
            Купить сейчас
          </button>

          <div className="mb-8">
            <TelegramButton product={product} variant="primary" className="w-full" />
            <p className="text-center text-xs text-gray-500 mt-2">
              Самый быстрый способ оформления заказа
            </p>
          </div>

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-8 space-y-6">
            <div className="flex items-start space-x-4">
              <Truck className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
              <div>
                <h3 className="mb-1">Доставка</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Бесплатная доставка по Ташкенту в течение 24 часов. По Узбекистану — 2-3 дня.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <RotateCcw className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
              <div>
                <h3 className="mb-1">Возврат</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Возврат в течение 14 дней без объяснения причин.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Shield className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
              <div>
                <h3 className="mb-1">Гарантия</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Золото 585 пробы. Сертификат качества прилагается.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-24">
        <h2 className="text-3xl tracking-tight mb-12">Вам может понравиться</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts
            .slice(0, 4)
            .map(relatedProduct => (
              <Link
                key={relatedProduct.id}
                to={`/product/${relatedProduct.id}`}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg mb-4">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-gray-900 group-hover:text-yellow-700 transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-900">
                    {relatedProduct.price.toLocaleString('ru-RU')} сум
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

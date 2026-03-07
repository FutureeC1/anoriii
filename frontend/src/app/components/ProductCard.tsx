import { Link } from 'react-router';
import { Product } from '../data/products';
import { TelegramButton } from './TelegramButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>
        <div className="space-y-2">
          <h3 className="text-gray-900 group-hover:text-yellow-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-900">
            {product.price.toLocaleString('ru-RU')} сум
          </p>
        </div>
      </Link>

      {/* Telegram Button Overlay */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <TelegramButton product={product} variant="minimal" className="bg-white/80 backdrop-blur-sm shadow-md" />
      </div>
    </div>
  );
}

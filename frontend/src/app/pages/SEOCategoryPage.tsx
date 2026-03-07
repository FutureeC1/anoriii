import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';
import api from '../services/api';

interface SEOCategoryPageProps {
    title: string;
    h1: string;
    description: string;
    categorySlug: string;
    metaDescription: string;
}

export function SEOCategoryPage({ title, h1, description, categorySlug, metaDescription }: SEOCategoryPageProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Map SEO category slugs to internal catalog categories if necessary
                // For simplicity, we'll try to match the slug or some predefined mapping
                const internalSlug = categorySlug.includes('rings') || categorySlug.includes('koltsa') ? 'ring' :
                    categorySlug.includes('necklaces') || categorySlug.includes('necklace') ? 'necklace' :
                        categorySlug.includes('chains') || categorySlug.includes('tsepochki') ? 'chain' :
                            categorySlug;

                const response = await api.get('catalog/products/', { params: { category: internalSlug } });

                if (response.data && response.data.results) {
                    const mappedProducts = response.data.results.map((p: any) => ({
                        id: p.id.toString(),
                        name: p.name,
                        price: parseFloat(p.price),
                        category: (p.category_slug || '').toLowerCase(),
                        image: p.image || '',
                        images: p.image ? [p.image] : [],
                        description: '',
                        featured: p.is_new
                    }));
                    setProducts(mappedProducts);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                console.error('Failed to fetch SEO products:', err);
                setError('Не удалось загрузить товары.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categorySlug]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <SEO title={title} description={metaDescription} />

            <div className="mb-12">
                <h1 className="text-4xl tracking-tight mb-6">{h1}</h1>
                <p className="text-gray-600 max-w-3xl leading-relaxed">{description}</p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-32">
                    <Loader2 className="w-8 h-8 animate-spin text-yellow-700" />
                </div>
            ) : error ? (
                <div className="text-center py-16">
                    <p className="text-red-500 mb-4">{error}</p>
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-gray-600 text-lg">В данной категории пока нет товаров. Мы работаем над обновлением коллекции!</p>
                </div>
            )}
        </div>
    );
}

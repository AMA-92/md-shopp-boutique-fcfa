
import React from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onViewProduct }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden border border-purple-100 hover:border-purple-300">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Discount badge avec nouveau design */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
            -{discountPercentage}%
          </div>
        )}

        {/* Action buttons avec nouveau design */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-2">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
            <Heart size={16} className="text-purple-600" />
          </button>
          <button 
            onClick={() => onViewProduct(product)}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
          >
            <Eye size={16} className="text-purple-600" />
          </button>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-5">
        <div className="text-sm text-purple-600 font-semibold mb-1 uppercase tracking-wide">{product.category}</div>
        <h3 className="font-bold text-gray-800 mb-3 line-clamp-2 text-lg group-hover:text-purple-700 transition-colors">{product.name}</h3>
        
        {/* Rating avec nouveau design */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2 bg-gray-100 px-2 py-1 rounded-full">({product.reviews})</span>
        </div>

        {/* Price avec nouveau design */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2 bg-gray-100 px-2 py-1 rounded-full">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to cart button avec nouveau design */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
        >
          <ShoppingCart size={18} />
          <span>Ajouter au panier</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

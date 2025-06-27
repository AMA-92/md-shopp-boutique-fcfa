
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
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            -{discountPercentage}%
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Heart size={16} className="text-gray-600" />
          </button>
          <button 
            onClick={() => onViewProduct(product)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <Eye size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm text-green-600 font-medium mb-1">{product.category}</div>
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-gray-800">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
        >
          <ShoppingCart size={16} />
          <span>Ajouter au panier</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

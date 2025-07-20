
import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Phone, Mail, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  cartItemsCount: number;
  onToggleCart: () => void;
}

const Header = ({ cartItemsCount, onToggleCart }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-xl sticky top-0 z-50 border-b border-purple-100">
      {/* Top bar avec nouveau gradient */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 hover:text-purple-200 transition-colors">
              <Phone size={14} />
              <div className="space-x-2">
                <span>77 253 67 57</span>
                <span>70 898 55 45</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 hover:text-purple-200 transition-colors">
              <Mail size={14} />
              <span>mdshop@gmail.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-medium">
              Livraison gratuite à partir de 50,000 FCFA
            </span>
            <Link 
              to="/admin/login" 
              className="flex items-center space-x-1 hover:text-purple-200 transition-colors bg-white/10 px-3 py-1 rounded-full"
            >
              <Settings size={14} />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo avec nouveau design */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              MD
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Que de Bonnes Choses
            </span>
          </Link>

          {/* Search bar avec nouveau design */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-purple-50/30"
              />
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-r-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Cart and menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleCart}
              className="relative p-3 hover:bg-purple-50 rounded-xl transition-all duration-300 group"
            >
              <ShoppingCart size={24} className="text-purple-600 group-hover:text-purple-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 hover:bg-purple-50 rounded-xl transition-all duration-300"
            >
              {isMenuOpen ? 
                <X size={24} className="text-purple-600" /> : 
                <Menu size={24} className="text-purple-600" />
              }
            </button>
          </div>
        </div>

        {/* Navigation avec nouveau design - tous les liens pointent vers la page d'accueil */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-6`}>
          <ul className="md:flex md:space-x-8 space-y-2 md:space-y-0">
            {[
              { name: 'Accueil', path: '/' },
              { name: 'Produits', path: '/' },
              { name: 'Électronique', path: '/' },
              { name: 'Mode', path: '/' },
              { name: 'Maison', path: '/' },
              { name: 'Contact', path: '/' }
            ].map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className="block py-2 px-4 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              </li>
            ))}
            <li className="md:hidden">
              <Link 
                to="/admin/login" 
                className="block py-2 px-4 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 font-medium"
              >
                Administration
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

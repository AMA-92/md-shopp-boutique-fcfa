
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
    <header className="bg-card shadow-elegant sticky top-0 z-50 border-b border-border backdrop-blur-md">
      {/* Top bar professionnel avec dégradé */}
      <div className="bg-gradient-primary text-white py-3">
        <div className="container mx-auto px-6 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 hover:text-white/80 transition-colors">
              <Phone size={16} className="text-primary-light" />
              <div className="space-x-3">
                <span>77 253 67 57</span>
                <span>70 898 55 45</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 hover:text-white/80 transition-colors">
              <Mail size={16} className="text-primary-light" />
              <span>mdshop@gmail.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium border border-white/30">
              ✨ Livraison gratuite à partir de 50,000 FCFA
            </span>
            <Link 
              to="/admin/login" 
              className="flex items-center space-x-2 hover:text-white/80 transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
            >
              <Settings size={16} />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Header principal moderne */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo professionnel */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="bg-gradient-primary text-white w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl shadow-elegant group-hover:shadow-soft transition-all duration-300 group-hover:scale-105">
              <span className="bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent">MD</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent block leading-none">
                Que de Bonnes Choses
              </span>
              <span className="text-xs text-muted-foreground font-medium">Premium Shopping Experience</span>
            </div>
          </Link>

          {/* Barre de recherche moderne */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Rechercher parmi nos produits premium..."
                className="w-full px-6 py-4 border-2 border-border rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background/50 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/30"
              />
              <button className="bg-gradient-primary hover:opacity-90 text-white px-8 py-4 rounded-r-2xl transition-all duration-300 shadow-elegant hover:shadow-soft">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Actions et menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleCart}
              className="relative p-4 hover:bg-secondary/30 rounded-2xl transition-all duration-300 group shadow-soft hover:shadow-elegant"
            >
              <ShoppingCart size={24} className="text-primary group-hover:text-primary-dark transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-primary text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-elegant animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-4 hover:bg-secondary/30 rounded-2xl transition-all duration-300 shadow-soft"
            >
              {isMenuOpen ? 
                <X size={24} className="text-primary" /> : 
                <Menu size={24} className="text-primary" />
              }
            </button>
          </div>
        </div>

        {/* Navigation professionnelle */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-8`}>
          <ul className="md:flex md:space-x-2 space-y-2 md:space-y-0 md:justify-center">
            {[
              { name: 'Accueil', path: '/' },
              { name: 'Nos Produits', path: '/' },
              { name: 'Électronique', path: '/' },
              { name: 'Mode & Style', path: '/' },
              { name: 'Maison & Jardin', path: '/' },
              { name: 'Contact', path: '/' }
            ].map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.path} 
                  className="block py-3 px-6 text-foreground hover:text-primary hover:bg-secondary/30 rounded-xl transition-all duration-300 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                </Link>
              </li>
            ))}
            <li className="md:hidden">
              <Link 
                to="/admin/login" 
                className="block py-3 px-6 text-foreground hover:text-primary hover:bg-secondary/30 rounded-xl transition-all duration-300 font-medium"
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


import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  cartItemsCount: number;
  onToggleCart: () => void;
}

const Header = ({ cartItemsCount, onToggleCart }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone size={14} />
              <span>+221 77 876 20 82</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail size={14} />
              <span>contact@mdshopp.cm</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Livraison gratuite à partir de 50,000 FCFA</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
              MD
            </div>
            <span className="text-2xl font-bold text-gray-800">shopp</span>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
              <button className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-r-lg transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Cart and menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleCart}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart size={24} className="text-gray-700" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block mt-4`}>
          <ul className="md:flex md:space-x-8 space-y-2 md:space-y-0">
            <li><Link to="/" className="block py-2 text-gray-700 hover:text-slate-700 transition-colors">Accueil</Link></li>
            <li><Link to="/products" className="block py-2 text-gray-700 hover:text-slate-700 transition-colors">Produits</Link></li>
            <li><Link to="/electronics" className="block py-2 text-gray-700 hover:text-slate-700 transition-colors">Électronique</Link></li>
            <li><Link to="/fashion" className="block py-2 text-gray-700 hover:text-slate-700 transition-colors">Mode</Link></li>
            <li><Link to="/home" className="block py-2 text-gray-700 hover:text-slate-700 transition-colors">Maison</Link></li>
            <li><Link to="/contact" className="block py-2 text-gray-700 hover:text-slate-700 transition-colors">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

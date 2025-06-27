
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
                MD
              </div>
              <span className="text-2xl font-bold">shopp</span>
            </div>
            <p className="text-gray-300">
              Votre boutique en ligne de confiance pour tous vos besoins. 
              Qualité garantie et livraison rapide partout au Cameroun.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-900 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens rapides</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-slate-400 transition-colors">Accueil</a></li>
              <li><a href="/products" className="hover:text-slate-400 transition-colors">Produits</a></li>
              <li><a href="/about" className="hover:text-slate-400 transition-colors">À propos</a></li>
              <li><a href="/contact" className="hover:text-slate-400 transition-colors">Contact</a></li>
              <li><a href="/faq" className="hover:text-slate-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Catégories</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/electronics" className="hover:text-slate-400 transition-colors">Électronique</a></li>
              <li><a href="/fashion" className="hover:text-slate-400 transition-colors">Mode & Beauté</a></li>
              <li><a href="/home" className="hover:text-slate-400 transition-colors">Maison & Jardin</a></li>
              <li><a href="/sports" className="hover:text-slate-400 transition-colors">Sport & Loisirs</a></li>
              <li><a href="/books" className="hover:text-slate-400 transition-colors">Livres</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contactez-nous</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+221 77 876 20 82</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>contact@mdshopp.cm</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Douala, Cameroun</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 MD shopp. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

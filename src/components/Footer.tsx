
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company info avec nouveau design */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                MD
              </div>
               <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                 Que de Bonnes Choses
               </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Votre boutique en ligne de confiance pour tous vos besoins. 
              Qualité garantie et livraison rapide partout au Sénégal.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gradient-to-r from-pink-500 to-pink-600 p-3 rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-3 rounded-xl hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gradient-to-r from-blue-700 to-blue-800 p-3 rounded-xl hover:from-blue-800 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Linkedin size={20} />
              </a>
              <a href="#" className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-300">Liens rapides</h3>
            <ul className="space-y-3 text-gray-300">
              {['Accueil', 'Produits', 'À propos', 'Contact', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href="/" className="hover:text-purple-300 transition-colors duration-300 relative group">
                    {link}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-300">Catégories</h3>
            <ul className="space-y-3 text-gray-300">
              {['Électronique', 'Mode & Beauté', 'Maison & Jardin', 'Sport & Loisirs', 'Livres'].map((category) => (
                <li key={category}>
                  <a href="/" className="hover:text-purple-300 transition-colors duration-300 relative group">
                    {category}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info avec nouveau design */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-300">Contactez-nous</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
                  <Phone size={16} />
                </div>
                <div className="space-y-1">
                  <div>77 253 67 57</div>
                  <div>70 898 55 45</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                  <Mail size={16} />
                </div>
                <span>mdshop@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-lg">
                  <MapPin size={16} />
                </div>
                <span>Dakar, Sénégal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-700/50 mt-12 pt-8 text-center">
          <p className="text-gray-300">&copy; 2024 MD shopp. Tous droits réservés.</p>
          <p className="text-sm text-purple-300 mt-2">Fait avec ❤️ pour nos clients</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

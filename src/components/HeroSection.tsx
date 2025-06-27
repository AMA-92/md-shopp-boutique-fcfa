
import React from 'react';
import { ArrowRight, Truck, Shield, CreditCard } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative">
      {/* Main hero */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Bienvenue chez
                <span className="block text-yellow-400">MD shopp</span>
              </h1>
              <p className="text-xl text-green-100 leading-relaxed">
                Découvrez notre sélection exceptionnelle de produits de qualité. 
                Livraison rapide, prix compétitifs et service client de premier plan.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105">
                  <span>Découvrir nos produits</span>
                  <ArrowRight size={20} />
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                  En savoir plus
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500&h=400&fit=crop"
                  alt="Produits MD shopp"
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-12 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-3 rounded-full">
                <Truck className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Livraison gratuite</h3>
                <p className="text-gray-600 text-sm">À partir de 50,000 FCFA</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Garantie qualité</h3>
                <p className="text-gray-600 text-sm">Produits certifiés</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-6 bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-3 rounded-full">
                <CreditCard className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Paiement sécurisé</h3>
                <p className="text-gray-600 text-sm">Plusieurs options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

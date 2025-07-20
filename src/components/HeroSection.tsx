
import React from 'react';
import { ArrowRight, Truck, Shield, CreditCard } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative">
      {/* Main hero avec dégradé professionnel */}
      <div className="bg-gradient-hero text-white py-24 relative overflow-hidden">
        {/* Éléments décoratifs de fond */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-white/5" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
                  ✨ Nouvelle collection disponible
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Bienvenue chez
                  <span className="block bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                    Que de Bonnes Choses
                  </span>
                </h1>
              </div>
              
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Découvrez notre sélection exceptionnelle de produits de qualité premium. 
                Une expérience shopping moderne avec un service client d'excellence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-white text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-elegant">
                  <span>Découvrir nos produits</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold transition-all duration-300">
                  En savoir plus
                </button>
              </div>
            </div>
            
            <div className="relative">
              {/* Card flottante avec effet glassmorphism */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-elegant relative">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-primary rounded-full opacity-50 blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-secondary rounded-full opacity-50 blur-xl"></div>
                
                <img
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=500&fit=crop"
                  alt="Produits Que de Bonnes Choses"
                  className="w-full rounded-2xl shadow-soft relative z-10"
                />
                
                {/* Stats flottantes */}
                <div className="absolute -bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-soft">
                  <div className="flex justify-around text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">500+</div>
                      <div className="text-sm text-muted-foreground">Produits</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">1000+</div>
                      <div className="text-sm text-muted-foreground">Clients</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">99%</div>
                      <div className="text-sm text-muted-foreground">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section des fonctionnalités modernisée */}
      <div className="bg-background py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une expérience d'achat exceptionnelle avec des avantages exclusifs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-card hover:bg-gradient-secondary/50 p-8 rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-elegant">
              <div className="bg-gradient-primary p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Truck className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">Livraison gratuite</h3>
              <p className="text-muted-foreground">À partir de 50,000 FCFA partout au Cameroun</p>
            </div>
            
            <div className="group bg-card hover:bg-gradient-secondary/50 p-8 rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-elegant">
              <div className="bg-gradient-primary p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">Garantie qualité</h3>
              <p className="text-muted-foreground">Produits certifiés avec garantie satisfait ou remboursé</p>
            </div>
            
            <div className="group bg-card hover:bg-gradient-secondary/50 p-8 rounded-2xl border border-border hover:border-primary/20 transition-all duration-300 hover:shadow-elegant">
              <div className="bg-gradient-primary p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">Paiement sécurisé</h3>
              <p className="text-muted-foreground">Plusieurs options de paiement 100% sécurisées</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

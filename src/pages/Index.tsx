
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';
import Footer from '../components/Footer';
import { sampleProducts, categories, Product } from '../data/products';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends Product {
  quantity: number;
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  paymentMethod: 'wave' | 'orange' | 'cash_on_delivery';
  phoneNumber: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  date: string;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const { toast } = useToast();

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté à votre panier`,
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Produit retiré",
      description: "Le produit a été retiré de votre panier",
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = (order: Order) => {
    // Sauvegarder la commande dans le localStorage
    const existingOrders = JSON.parse(localStorage.getItem('md-shopp-orders') || '[]');
    const updatedOrders = [...existingOrders, order];
    localStorage.setItem('md-shopp-orders', JSON.stringify(updatedOrders));
    
    // Vider le panier
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const handleViewProduct = (product: Product) => {
    toast({
      title: "Détails du produit",
      description: `Affichage des détails pour ${product.name}`,
    });
    console.log("Voir le produit:", product);
  };

  const filteredProducts = selectedCategory === "Tous" 
    ? sampleProducts 
    : sampleProducts.filter(product => product.category === selectedCategory);

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemsCount={cartItemsCount}
        onToggleCart={() => setIsCartOpen(!isCartOpen)}
      />
      
      <HeroSection />

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos Produits Vedettes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de produits de qualité supérieure, 
              soigneusement choisis pour répondre à tous vos besoins.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-slate-700 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewProduct={handleViewProduct}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Voir tous les produits
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-slate-700 to-slate-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Restez informé de nos dernières offres
          </h3>
          <p className="text-slate-200 mb-8 max-w-2xl mx-auto">
            Inscrivez-vous à notre newsletter et recevez en exclusivité nos meilleures promotions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              S'inscrire
            </button>
          </div>
        </div>
      </section>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        }))}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
};

export default Index;

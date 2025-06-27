
import React, { useState, useEffect } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Product, sampleProducts, categories as initialCategories } from '../data/products';
import { LogOut, Package, Settings, Palette } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductsTab from '../components/admin/ProductsTab';
import SiteSettingsTab from '../components/admin/SiteSettingsTab';

interface SiteSettings {
  logo: string;
  siteName: string;
  phone: string;
  email: string;
  address: string;
  quickLinks: string[];
  categories: string[];
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
}

const AdminDashboard = () => {
  const { isAdminLoggedIn, logout } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    logo: '',
    siteName: 'MD shopp',
    phone: '+221 77 876 20 82',
    email: 'contact@mdshopp.cm',
    address: 'Douala, Cameroun',
    quickLinks: ['Accueil', 'Produits', 'À propos', 'Contact', 'FAQ'],
    categories: initialCategories.slice(1), // Exclure "Tous"
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
    },
  });

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
  }, [isAdminLoggedIn, navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
    navigate('/');
  };

  const handleProductsChange = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const handleSettingsChange = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    // Mettre à jour les catégories si elles ont changé
    if (JSON.stringify(newSettings.categories) !== JSON.stringify(categories.slice(1))) {
      setCategories(['Tous', ...newSettings.categories]);
    }
  };

  if (!isAdminLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header avec nouveau design */}
      <div className="bg-white shadow-lg border-b border-purple-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold shadow-lg">
                MD
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Administration MD shopp
                </h1>
                <p className="text-sm text-gray-600">Panneau de contrôle administrateur</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="flex items-center space-x-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300"
            >
              <LogOut size={16} />
              <span>Déconnexion</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 bg-white shadow-lg rounded-xl border border-purple-200">
            <TabsTrigger 
              value="products" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg"
            >
              <Package size={18} />
              <span>Produits</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg"
            >
              <Settings size={18} />
              <span>Paramètres</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
              <ProductsTab
                products={products}
                categories={categories}
                onProductsChange={handleProductsChange}
              />
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <SiteSettingsTab
              settings={siteSettings}
              onSettingsChange={handleSettingsChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

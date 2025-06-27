
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, Upload } from 'lucide-react';

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
    whatsapp: string;
  };
}

interface SiteSettingsTabProps {
  settings: SiteSettings;
  onSettingsChange: (settings: SiteSettings) => void;
}

const SiteSettingsTab = ({ settings, onSettingsChange }: SiteSettingsTabProps) => {
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);
  const [logoPreview, setLogoPreview] = useState<string>(settings.logo);
  const { toast } = useToast();

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        setLogoPreview(logoUrl);
        setLocalSettings(prev => ({ ...prev, logo: logoUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: keyof SiteSettings, value: any) => {
    setLocalSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialMediaChange = (platform: keyof SiteSettings['socialMedia'], value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      socialMedia: { ...prev.socialMedia, [platform]: value }
    }));
  };

  const addQuickLink = () => {
    setLocalSettings(prev => ({
      ...prev,
      quickLinks: [...prev.quickLinks, '']
    }));
  };

  const updateQuickLink = (index: number, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      quickLinks: prev.quickLinks.map((link, i) => i === index ? value : link)
    }));
  };

  const removeQuickLink = (index: number) => {
    setLocalSettings(prev => ({
      ...prev,
      quickLinks: prev.quickLinks.filter((_, i) => i !== index)
    }));
  };

  const addCategory = () => {
    setLocalSettings(prev => ({
      ...prev,
      categories: [...prev.categories, '']
    }));
  };

  const updateCategory = (index: number, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      categories: prev.categories.map((cat, i) => i === index ? value : cat)
    }));
  };

  const removeCategory = (index: number) => {
    if (localSettings.categories.length > 1) {
      setLocalSettings(prev => ({
        ...prev,
        categories: prev.categories.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    toast({
      title: "Paramètres sauvegardés",
      description: "Les paramètres du site ont été mis à jour avec succès",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Paramètres du Site</h3>
        <Button 
          onClick={handleSave}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 flex items-center space-x-2"
        >
          <Save size={16} />
          <span>Sauvegarder</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logo et informations générales */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
          <h4 className="text-lg font-semibold mb-4 text-purple-800">Logo et Informations</h4>
          
          <div className="space-y-4">
            <div>
              <Label>Logo du site</Label>
              <div className="mt-2 space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('logo-upload')?.click()}
                  className="flex items-center space-x-2"
                >
                  <Upload size={16} />
                  <span>Changer le logo</span>
                </Button>
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                
                {logoPreview && (
                  <div className="w-20 h-20 border border-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={logoPreview}
                      alt="Logo aperçu"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label>Nom du site</Label>
              <Input
                value={localSettings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
                placeholder="MD shopp"
              />
            </div>

            <div>
              <Label>Téléphone</Label>
              <Input
                value={localSettings.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+221 77 876 20 82"
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                value={localSettings.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="contact@mdshopp.cm"
              />
            </div>

            <div>
              <Label>Adresse</Label>
              <Input
                value={localSettings.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Douala, Cameroun"
              />
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
          <h4 className="text-lg font-semibold mb-4 text-purple-800">Réseaux Sociaux</h4>
          
          <div className="space-y-4">
            <div>
              <Label>Facebook</Label>
              <Input
                value={localSettings.socialMedia.facebook}
                onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                placeholder="https://facebook.com/mdshopp"
              />
            </div>

            <div>
              <Label>Instagram</Label>
              <Input
                value={localSettings.socialMedia.instagram}
                onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                placeholder="https://instagram.com/mdshopp"
              />
            </div>

            <div>
              <Label>Twitter</Label>
              <Input
                value={localSettings.socialMedia.twitter}
                onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                placeholder="https://twitter.com/mdshopp"
              />
            </div>

            <div>
              <Label>LinkedIn</Label>
              <Input
                value={localSettings.socialMedia.linkedin}
                onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/company/mdshopp"
              />
            </div>

            <div>
              <Label>WhatsApp</Label>
              <Input
                value={localSettings.socialMedia.whatsapp}
                onChange={(e) => handleSocialMediaChange('whatsapp', e.target.value)}
                placeholder="https://wa.me/22177876208"
              />
            </div>
          </div>
        </div>

        {/* Liens rapides */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-purple-800">Liens Rapides</h4>
            <Button
              onClick={addQuickLink}
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <Plus size={14} />
            </Button>
          </div>
          
          <div className="space-y-3">
            {localSettings.quickLinks.map((link, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={link}
                  onChange={(e) => updateQuickLink(index, e.target.value)}
                  placeholder="Nom du lien"
                />
                <Button
                  onClick={() => removeQuickLink(index)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Catégories */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-purple-800">Catégories</h4>
            <Button
              onClick={addCategory}
              size="sm"
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              <Plus size={14} />
            </Button>
          </div>
          
          <div className="space-y-3">
            {localSettings.categories.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={category}
                  onChange={(e) => updateCategory(index, e.target.value)}
                  placeholder="Nom de la catégorie"
                />
                <Button
                  onClick={() => removeCategory(index)}
                  size="sm"
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                  disabled={localSettings.categories.length === 1}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsTab;

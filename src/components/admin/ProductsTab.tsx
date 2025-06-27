
import React, { useState } from 'react';
import { Product } from '../../data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Trash2, Plus, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface ProductFormData {
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  image: string;
}

interface ProductsTabProps {
  products: Product[];
  categories: string[];
  onProductsChange: (products: Product[]) => void;
}

const ProductsTab = ({ products, categories, onProductsChange }: ProductsTabProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      price: 0,
      originalPrice: 0,
      category: categories[1],
      description: '',
      image: '',
    },
  });

  const filteredProducts = selectedCategory === 'Tous' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImagePreview(imageUrl);
        form.setValue('image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: ProductFormData) => {
    if (editingProduct) {
      const updatedProducts = products.map(product =>
        product.id === editingProduct.id
          ? {
              ...product,
              ...data,
              rating: product.rating,
              reviews: product.reviews,
              inStock: product.inStock,
            }
          : product
      );
      onProductsChange(updatedProducts);
      toast({
        title: "Produit modifié",
        description: `${data.name} a été modifié avec succès`,
      });
    } else {
      const newProduct: Product = {
        id: Math.max(...products.map(p => p.id)) + 1,
        ...data,
        rating: 4.5,
        reviews: 0,
        inStock: true,
      };
      onProductsChange([...products, newProduct]);
      toast({
        title: "Produit ajouté",
        description: `${data.name} a été ajouté avec succès`,
      });
    }

    form.reset();
    setImagePreview('');
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setValue('name', product.name);
    form.setValue('price', product.price);
    form.setValue('originalPrice', product.originalPrice || 0);
    form.setValue('category', product.category);
    form.setValue('description', product.description);
    form.setValue('image', product.image);
    setImagePreview(product.image);
    setIsDialogOpen(true);
  };

  const handleDelete = (product: Product) => {
    const updatedProducts = products.filter(p => p.id !== product.id);
    onProductsChange(updatedProducts);
    toast({
      title: "Produit supprimé",
      description: `${product.name} a été supprimé`,
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-semibold text-gray-800">Gestion des Produits</h3>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setEditingProduct(null);
                form.reset();
                setImagePreview('');
              }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Ajouter un produit</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Modifier le produit' : 'Ajouter un nouveau produit'}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du produit</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom du produit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prix (FCFA)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Prix" 
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="originalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prix original (optionnel)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Prix original" 
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value) || undefined)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <FormControl>
                        <select 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          {...field}
                        >
                          {categories.slice(1).map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows={3}
                          placeholder="Description du produit"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Label>Image du produit</Label>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image-upload')?.click()}
                        className="flex items-center space-x-2"
                      >
                        <Upload size={16} />
                        <span>Choisir une image</span>
                      </Button>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    
                    {imagePreview && (
                      <div className="relative w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Aperçu"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    {editingProduct ? 'Modifier' : 'Ajouter'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-purple-100">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(product)}
                  className="bg-white/90 hover:bg-white shadow-lg"
                >
                  <Edit size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(product)}
                  className="bg-white/90 hover:bg-white text-red-600 hover:text-red-700 shadow-lg"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="text-sm text-purple-600 font-medium mb-1">{product.category}</div>
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-purple-700">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsTab;

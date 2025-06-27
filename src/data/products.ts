
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
}

export const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Smartphone Samsung Galaxy A54",
    price: 285000,
    originalPrice: 320000,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop",
    category: "Électronique",
    rating: 4.5,
    reviews: 128,
    description: "Smartphone avec écran AMOLED 6.4\", appareil photo 50MP et batterie longue durée.",
    inStock: true
  },
  {
    id: 2,
    name: "Robe Élégante Africaine",
    price: 45000,
    originalPrice: 65000,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop",
    category: "Mode",
    rating: 4.8,
    reviews: 89,
    description: "Robe traditionnelle africaine en tissu wax de haute qualité, parfaite pour les occasions spéciales.",
    inStock: true
  },
  {
    id: 3,
    name: "Casque Audio Bluetooth Premium",
    price: 125000,
    originalPrice: 150000,
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=300&fit=crop",
    category: "Électronique",
    rating: 4.6,
    reviews: 245,
    description: "Casque sans fil avec réduction de bruit active et autonomie de 30 heures.",
    inStock: true
  },
  {
    id: 4,
    name: "Ensemble de Cuisine en Inox",
    price: 85000,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop",
    category: "Maison",
    rating: 4.3,
    reviews: 67,
    description: "Set complet de casseroles et poêles en acier inoxydable de qualité professionnelle.",
    inStock: true
  },
  {
    id: 5,
    name: "Montre Connectée Sport",
    price: 95000,
    originalPrice: 120000,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=300&fit=crop",
    category: "Électronique",
    rating: 4.4,
    reviews: 156,
    description: "Montre intelligente avec suivi de santé, GPS et résistance à l'eau.",
    inStock: true
  },
  {
    id: 6,
    name: "Sac à Main Cuir Véritable",
    price: 75000,
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=300&fit=crop",
    category: "Mode",
    rating: 4.7,
    reviews: 94,
    description: "Sac à main élégant en cuir véritable, idéal pour le travail et les sorties.",
    inStock: true
  },
  {
    id: 7,
    name: "Aspirateur Robot Intelligent",
    price: 185000,
    originalPrice: 225000,
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=300&fit=crop",
    category: "Maison",
    rating: 4.5,
    reviews: 78,
    description: "Aspirateur robot avec navigation intelligente et contrôle via application mobile.",
    inStock: true
  },
  {
    id: 8,
    name: "Chaussures de Sport Nike",
    price: 65000,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=300&fit=crop",
    category: "Mode",
    rating: 4.6,
    reviews: 203,
    description: "Baskets de running avec technologie Air Max pour un confort optimal.",
    inStock: false
  }
];

export const categories = [
  "Tous",
  "Électronique",
  "Mode",
  "Maison",
  "Sport",
  "Beauté",
  "Livres",
  "Jouets"
];

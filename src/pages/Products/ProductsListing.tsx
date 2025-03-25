
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  BadgeIndianRupee,
  Grid3X3,
  Heart,
  LayoutList,
  Search,
  SlidersHorizontal
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock product data
const allProducts = [
  {
    id: '1',
    name: 'Premium Business Cards',
    description: 'High-quality business cards on premium stock',
    price: 1250,
    category: 'business-cards',
    tags: ['premium', 'business', 'cards'],
    image: '/placeholder.svg',
    rating: 4.8,
    reviews: 128,
    variants: [
      { id: '1a', name: 'Standard', price: 1250, inStock: true },
      { id: '1b', name: 'Premium', price: 1850, inStock: true },
    ],
    featured: true,
    inStock: true,
  },
  {
    id: '2',
    name: 'Luxury Wedding Cards',
    description: 'Elegant wedding invitations with premium finishes',
    price: 1825,
    category: 'wedding-cards',
    tags: ['wedding', 'luxury', 'cards'],
    image: '/placeholder.svg',
    rating: 4.9,
    reviews: 256,
    variants: [
      { id: '2a', name: 'Standard', price: 1825, inStock: true },
      { id: '2b', name: 'Gold Foil', price: 2450, inStock: true },
    ],
    featured: true,
    inStock: true,
  },
  {
    id: '3',
    name: 'Custom Letterheads',
    description: 'Professional letterheads for your business',
    price: 950,
    category: 'stationery',
    tags: ['letterhead', 'stationery', 'business'],
    image: '/placeholder.svg',
    rating: 4.7,
    reviews: 89,
    variants: [
      { id: '3a', name: 'Basic', price: 950, inStock: true },
      { id: '3b', name: 'Premium', price: 1450, inStock: true },
    ],
    featured: false,
    inStock: true,
  },
  {
    id: '4',
    name: 'Paper Carry Bags',
    description: 'Eco-friendly paper bags for retail',
    price: 750,
    category: 'carry-bags',
    tags: ['bags', 'retail', 'eco-friendly'],
    image: '/placeholder.svg',
    rating: 4.5,
    reviews: 65,
    variants: [
      { id: '4a', name: 'Small', price: 750, inStock: true },
      { id: '4b', name: 'Medium', price: 950, inStock: true },
      { id: '4c', name: 'Large', price: 1150, inStock: true },
    ],
    featured: false,
    inStock: true,
  },
  {
    id: '5',
    name: 'Custom Packaging Boxes',
    description: 'Branded packaging boxes for products',
    price: 1550,
    category: 'boxes',
    tags: ['boxes', 'packaging', 'branded'],
    image: '/placeholder.svg',
    rating: 4.6,
    reviews: 42,
    variants: [
      { id: '5a', name: 'Small', price: 1550, inStock: true },
      { id: '5b', name: 'Medium', price: 1950, inStock: true },
    ],
    featured: true,
    inStock: true,
  },
  {
    id: '6',
    name: 'Promotional Flyers',
    description: 'High-quality flyers for promotions',
    price: 450,
    category: 'flyers',
    tags: ['flyers', 'promotions', 'marketing'],
    image: '/placeholder.svg',
    rating: 4.3,
    reviews: 38,
    variants: [
      { id: '6a', name: 'A5 Size', price: 450, inStock: true },
      { id: '6b', name: 'A4 Size', price: 650, inStock: true },
    ],
    featured: false,
    inStock: false,
  },
];

// Categories
const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'business-cards', name: 'Business Cards' },
  { id: 'wedding-cards', name: 'Wedding Cards' },
  { id: 'stationery', name: 'Stationery' },
  { id: 'carry-bags', name: 'Carry Bags' },
  { id: 'boxes', name: 'Packaging Boxes' },
  { id: 'flyers', name: 'Flyers & Brochures' },
];

const ProductsListing = () => {
  const { category } = useParams();
  const [products, setProducts] = useState(allProducts);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState('featured');
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({
    inStock: false,
    featured: false,
  });

  // Filter products based on category and other filters
  useEffect(() => {
    let filtered = [...allProducts];
    
    if (category && category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Apply price filter
    filtered = filtered.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        product => 
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply checkbox filters
    if (selectedFilters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }
    
    if (selectedFilters.featured) {
      filtered = filtered.filter(product => product.featured);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (a.featured === b.featured) ? 0 : a.featured ? -1 : 1);
        break;
    }
    
    setProducts(filtered);
  }, [category, priceRange, sortBy, searchQuery, selectedFilters]);

  const handleFilterChange = (filterName: string, value: boolean) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterName]: value,
    });
  };

  const getCategoryName = () => {
    if (!category || category === 'all') return 'All Products';
    const found = categories.find(cat => cat.id === category);
    return found ? found.name : 'Products';
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{getCategoryName()}</h1>
          <p className="text-muted-foreground mt-2">
            Browse our selection of premium quality printing products
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-medium mb-4">Categories</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products/${cat.id}`}
                      className={`block px-2 py-1.5 rounded-md ${
                        cat.id === (category || 'all')
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <Slider
                  defaultValue={priceRange}
                  max={3000}
                  step={100}
                  onValueChange={setPriceRange}
                  className="mt-6"
                />
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center">
                    <BadgeIndianRupee className="h-3 w-3 mr-1" />
                    <span>{priceRange[0]}</span>
                  </div>
                  <div className="flex items-center">
                    <BadgeIndianRupee className="h-3 w-3 mr-1" />
                    <span>{priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-4">Filter By</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="in-stock" 
                      checked={selectedFilters.inStock}
                      onCheckedChange={(checked) => 
                        handleFilterChange('inStock', checked as boolean)
                      }
                    />
                    <label
                      htmlFor="in-stock"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      In Stock
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="featured" 
                      checked={selectedFilters.featured}
                      onCheckedChange={(checked) => 
                        handleFilterChange('featured', checked as boolean)
                      }
                    />
                    <label
                      htmlFor="featured"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Featured Products
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className={viewMode === 'grid' ? 'bg-muted' : ''}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={viewMode === 'list' ? 'bg-muted' : ''}
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList className="h-4 w-4" />
                </Button>
                
                <Button
                  variant="outline"
                  className="md:hidden"
                  onClick={() => setFilterMenuOpen(true)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <Select
                  defaultValue={sortBy}
                  onValueChange={setSortBy}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Product Grid/List */}
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No products found</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search.
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setPriceRange([0, 3000]);
                  setSelectedFilters({ inStock: false, featured: false });
                }}>
                  Reset Filters
                </Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Link key={product.id} to={`/products/${product.category}/${product.id}`}>
                    <Card className="h-full transition-all hover:shadow-md overflow-hidden">
                      <div className="relative h-48 bg-muted">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {!product.inStock && (
                          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                            Out of Stock
                          </Badge>
                        )}
                        {product.featured && (
                          <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">
                            Featured
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 rounded-full bg-background/80 text-muted-foreground hover:text-primary"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                          {product.description}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between p-4 pt-0">
                        <div className="flex items-center">
                          <BadgeIndianRupee className="h-4 w-4 mr-1" />
                          <span className="font-semibold">{product.price.toFixed(2)}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ★ {product.rating} ({product.reviews})
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <Link key={product.id} to={`/products/${product.category}/${product.id}`}>
                    <Card className="overflow-hidden transition-all hover:shadow-md">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-48 h-48">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {!product.inStock && (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                              Out of Stock
                            </Badge>
                          )}
                          {product.featured && (
                            <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                            <div>
                              <h3 className="font-medium text-lg">{product.name}</h3>
                              <div className="text-sm text-muted-foreground">
                                ★ {product.rating} ({product.reviews})
                              </div>
                            </div>
                            <div className="flex items-center">
                              <BadgeIndianRupee className="h-4 w-4 mr-1" />
                              <span className="font-semibold">{product.price.toFixed(2)}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground mt-2">
                            {product.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {product.tags.map((tag) => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Menu */}
      {filterMenuOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden">
          <div className="fixed bottom-0 left-0 right-0 h-[80vh] bg-background border-t rounded-t-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={() => setFilterMenuOpen(false)}>
                ✕
              </Button>
            </div>
            
            <ScrollArea className="h-[calc(80vh-6rem)]">
              <div className="space-y-6 pr-4">
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products/${cat.id}`}
                        onClick={() => setFilterMenuOpen(false)}
                        className={`block px-2 py-1.5 rounded-md ${
                          cat.id === (category || 'all')
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <Slider
                    defaultValue={priceRange}
                    max={3000}
                    step={100}
                    onValueChange={setPriceRange}
                    className="mt-6"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-3 w-3 mr-1" />
                      <span>{priceRange[0]}</span>
                    </div>
                    <div className="flex items-center">
                      <BadgeIndianRupee className="h-3 w-3 mr-1" />
                      <span>{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-3">Filter By</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mobile-in-stock" 
                        checked={selectedFilters.inStock}
                        onCheckedChange={(checked) => 
                          handleFilterChange('inStock', checked as boolean)
                        }
                      />
                      <label
                        htmlFor="mobile-in-stock"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        In Stock
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="mobile-featured" 
                        checked={selectedFilters.featured}
                        onCheckedChange={(checked) => 
                          handleFilterChange('featured', checked as boolean)
                        }
                      />
                      <label
                        htmlFor="mobile-featured"
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Featured Products
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSearchQuery('');
                  setPriceRange([0, 3000]);
                  setSelectedFilters({ inStock: false, featured: false });
                }}
              >
                Reset
              </Button>
              <Button
                className="flex-1"
                onClick={() => setFilterMenuOpen(false)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsListing;


import React from 'react';
import { Search, FileImage } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Category {
  id: number;
  name: string;
}

interface ProductFiltersProps {
  categories: Category[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ categories }) => {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="relative flex-1 min-w-[240px]">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products..." className="pl-8" />
      </div>
      <div className="flex gap-2 flex-wrap">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="priceLow">Price: Low to High</SelectItem>
            <SelectItem value="priceHigh">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <FileImage className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default ProductFilters;

import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import carousel1 from "@/assets/carousel1.jpg";
import carousel2 from "@/assets/carousel2.jpg";

import CategorySection from "@/components/blocks/Category-Section";
import ProductGrid from "@/components/blocks/Product-Grid";

export default function UserHomePage() {
  const { products, fetchProducts, fetchCategories, loading } = useUser();

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts({ categoryId: selectedCategory });
  }, [selectedCategory]);

  useEffect(() => {
    (async () => {
      const data = await fetchCategories();
      setCategories(data);
    })();
  }, []);

  function handleCategory(categoryId) {
    setSelectedCategory(categoryId);
  }

  function showAllProducts() {
    setSelectedCategory(null);
  }

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
   <div className="w-full px-6 lg:px-12 py-6 space-y-10">

  <div className="relative">
    <Carousel opts={{ loop: true }}>
      <CarouselContent>
        <CarouselItem>
          <img
            src={carousel1}
            className="w-full h-95 object-cover rounded-2xl"
          />
        </CarouselItem>

        <CarouselItem>
          <img
            src={carousel2}
            className="w-full h-95 object-cover rounded-2xl"
          />
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  </div>

  <div className="relative w-full">
    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
    />

    <Input
      placeholder="Search products..."
      className="pl-10 h-11 w-full"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  <CategorySection
    categories={categories}
    selectedCategory={selectedCategory}
    onSelectCategory={handleCategory}
    onShowAll={showAllProducts}
  />

  <ProductGrid products={filteredProducts} loading={loading} />

</div>
  );
}
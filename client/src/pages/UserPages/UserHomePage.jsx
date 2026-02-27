import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import carousel1 from "@/assets/carousel1.jpg";
import carousel2 from "@/assets/carousel2.jpg";

import CategorySection from "@/components/blocks/Category-Section";
import ProductGrid from "@/components/blocks/Product-Grid";

export default function UserHomePage() {
  const { products, fetchProducts, fetchCategories, loading } = useUser();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
  return (
    <div>
      <div className="relative  p-6">
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            <CarouselItem>
              <img
                src={carousel1}
                className="w-full h-100 object-cover rounded-xl"
              />
            </CarouselItem>

            <CarouselItem>
              <img
                src={carousel2}
                className="w-full h-100 object-cover rounded-xl"
              />
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />

          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>

      <CategorySection
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategory}
        onShowAll={showAllProducts}
      />

      <ProductGrid products={products} loading={loading} />
    </div>
  );
}

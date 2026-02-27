import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function ProductGrid({ products, loading }) {
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="text-center py-20 text-lg font-medium">
        Loading products...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-primary ">Featured Products</h2>

        <p className="text-muted-foreground text-sm">
          {products.length} Products
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div
              onClick={() => navigate(`/user/product/${product._id}`)}
              className="overflow-hidden bg-white h-52 flex items-center justify-center"
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}${product.images[0]}`}
                className="
      h-full
      object-contain
      
      transition-transform duration-500
    "
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg line-clamp-1">
                {product.name}
              </h3>

              <p className="text-muted-foreground text-sm mt-1">
                Premium Quality
              </p>

              <div className="flex items-center justify-between mt-3">
                <p className="text-xl font-bold text-primary">
                  ₹ {product.price}
                </p>

                <Button
                  size="sm"
                  className="
                  text-background
                  bg-accent
                    rounded-full
                    px-5
                    opacity-0
                    group-hover:opacity-100
                    hover:bg-accent-foreground
                    transition
                    
                  "
                  onClick={() => navigate(`/user/product/${product._id}`)}
                >
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useNavigate } from "react-router";

export default function CategorySection({
  categories,
  selectedCategory,
  onSelectCategory,
  onShowAll,
}) {
  
 
  return (
    <div className="max-w-6xl mx-auto px-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>

      <div className="flex gap-3 flex-wrap pb-2">
        <button
          onClick={onShowAll}
          className={`px-5 py-2 border rounded-full whitespace-nowrap transition ${!selectedCategory ? "bg-primary text-white" : "border-border hover:bg-primary hover:text-white"}`}
        >
          All
        </button>
        {categories?.map((cat) => (
          <button
            key={cat._id}
            onClick={() => onSelectCategory(cat._id)}
            className={`px-5 py-2 cursor-pointer border border-border rounded-full whitespace-nowrap  transition ${selectedCategory === cat._id ? "bg-primary text-white" : "border-border hover:bg-primary hover:text-white"} `}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

import { useSeller } from "@/hooks/useSeller";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { DataTable } from "./data-table";
import { RowActions } from "./row-actions";
import { Search ,ArrowLeft} from "lucide-react";

export function SellerTable() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { loading, products, getMyProducts, deleteMyProduct } = useSeller();

  useEffect(() => {
    getMyProducts();
  }, []);

  const handleView = (id) => {
    navigate(`/seller/products/${id}`);
  };
  const columns = [
    {
      key: "image",
      header: "Image",
      render: (row) =>
        row.images?.length ? (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}${row.images[0]}`}
            alt={row.name}
            className="h-12 w-12 rounded object-cover border"
          />
        ) : (
          <div className="h-12 w-12 flex items-center justify-center text-xs text-muted-foreground border rounded">
            No image
          </div>
        ),
    },
    { key: "name", header: "Name" },
    { key: "price", header: "Price" },
    { key: "stock", header: "Stock" },
    { key: "category", header: "Category" },
    { key: "subcategory", header: "Sub Category" },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <RowActions
          actions={[
            {
              label: "View product",
              onClick: () => handleView(row._id),
              disabled: loading,
            },
            {
              label: "Delete Product",
              variant: "destructive",
              onClick: () => deleteMyProduct(row._id),
              disabled: loading,
              seperator: true,
            },
          ]}
        />
      ),
    },
  ];
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase()) 
  );
  return (
    <div className="bg-background rounded-2xl shadow-lg border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
  <div className="flex items-center gap-3">
    {/* <button
      onClick={() => navigate(-1)}
      className="flex items-center text-primary hover:text-primary/80"
    >
      <ArrowLeft className="h-6 w-6" />
    </button> */}

    <div>
      <h1 className="text-3xl font-bold text-primary">My Products</h1>
      <p className="text-ring text-sm">Manage your listed products here</p>
    </div>
  </div>






                  <div className="flex items-center gap-3">

        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border bg-background rounded-lg pl-8 pr-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <Button
          className="bg-accent hover:bg-accent-foreground text-background font-medium 
                       rounded-xl px-6 shadow-md transition"
          onClick={() => navigate("/seller/newProduct")}
        >
          + Add New Product
        </Button>
      </div>
</div>
      <div className="rounded-xl border border-border overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredProducts}
          emptyText={loading ? "Loading..." : "No products found"}
        />
      </div>
    </div>
  );
}

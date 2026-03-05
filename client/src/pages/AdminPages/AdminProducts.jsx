import { DataTable } from "@/components/blocks/data-table";
import { useAdmin } from "@/hooks/useAdmin";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { RowActions } from "@/components/blocks/row-actions";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Search , ArrowLeft } from "lucide-react";
import { Package, Boxes, AlertCircle } from "lucide-react";
export default function AdminProductsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { products, allProducts, loading, deleteSellerProduct } = useAdmin();
  useEffect(() => {
    allProducts();
  }, []);
  const handleDelete = async (id) => {
    await deleteSellerProduct(id);
    toast.success("Product Deleted Successfully");
  };
  const handleView = async (id) => {
    navigate(`/admin/product/${id}`);
  };
  const adminProductColumns = [
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
    {
      key: "name",
      header: "Product",
    },
    {
      key: "category",
      header: "Category",
      render: (row) => <Badge variant="outline">{row.category}</Badge>,
    },
    {
      key: "subcategory",
      header: "Sub-Category",
      render: (row) => <Badge variant="outline">{row.subcategory}</Badge>,
    },
    {
      key: "price",
      header: "Price",
      render: (row) => (
        <span className="font-semibold text-green-600">₹{row.price}</span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (row) =>
        row.stock > 0 ? (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            In Stock
          </Badge>
        ) : (
          <Badge variant="destructive">Out of Stock</Badge>
        ),
    },
    {
      key: "seller",
      header: "Seller",
      render: (row) => (
        <div>
          <p className="font-medium">{row.seller.name}</p>
        </div>
      ),
    },

    {
      key: "createdAt",
      header: "Created",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
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
              onClick: () => handleDelete(row._id),
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
      product.category.toLowerCase().includes(search.toLowerCase()) ||
      product.seller?.name.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="p-4 space-y-6">

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  <div className="flex items-center gap-3">
  
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium"
    >
      <ArrowLeft className="h-5 w-5" />
     
    </button>

    <div>
      <h1 className="text-3xl font-bold tracking-tight text-primary">Products</h1>
      <p className="text-muted-foreground text-sm mt-1">
        Manage and monitor all marketplace products
      </p>
    </div>
  </div>

  {/* Search input */}
  <div className="relative w-full md:w-80">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

    <input
      type="text"
      placeholder="Search products, category, seller..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border bg-background rounded-lg pl-10 pr-3 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
    />
  </div>
</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="border rounded-xl bg-background p-5 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-muted-foreground">Total Products</p>
          <h2 className="text-3xl font-bold mt-1">{products.length}</h2>
        </div>

        <div className="border rounded-xl bg-background p-5 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-muted-foreground">In Stock</p>
          <h2 className="text-3xl font-bold mt-1 text-green-600">
            {products.filter((p) => p.stock > 0).length}
          </h2>
        </div>

        <div className="border rounded-xl bg-background p-5 shad  ow-sm hover:shadow-md transition">
          <p className="text-sm text-muted-foreground">Out of Stock</p>
          <h2 className="text-3xl font-bold mt-1 text-red-500">
            {products.filter((p) => p.stock === 0).length}
          </h2>
        </div>
      </div>
      <div className="border rounded-xl bg-background shadow-sm overflow-hidden">
        <DataTable
          columns={adminProductColumns}
          data={filteredProducts}
          emptyText={loading ? "Loading products..." : "No products found"}
        />
      </div>
    </div>
  );
}

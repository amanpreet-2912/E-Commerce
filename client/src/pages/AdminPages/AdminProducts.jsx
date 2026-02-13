import { DataTable } from "@/components/blocks/data-table";
import { useAdmin } from "@/hooks/useAdmin";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { RowActions } from "@/components/blocks/row-actions";
import { useNavigate } from "react-router";

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const { products, allProducts, loading, deleteSellerProduct } = useAdmin();
  useEffect(() => {
    allProducts();
  }, []);
  const handleDelete = async (id) => {
    await deleteSellerProduct(id);
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
      key: "price",
      header: "Price",
      render: (row) => `₹${row.price}`,
    },
    {
      key: "stock",
      header: "Stock",
      render: (row) =>
        row.stock > 0 ? (
          <Badge variant="success">In Stock</Badge>
        ) : (
          <Badge variant="destructive">Out</Badge>
        ),
    },
    {
      key: "seller",
      header: "Seller",
      render: (row) => row.seller.name,
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

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">All Products</h1>
      </div>

      <div className="border rounded-lg bg-background">
        <DataTable
          columns={adminProductColumns}
          data={products}
          emptyText={loading ? "Loading products..." : "No products found"}
        />
      </div>
    </div>
  );
}

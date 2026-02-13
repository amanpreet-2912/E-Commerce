import { useSeller } from "@/hooks/useSeller";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { DataTable } from "./data-table";
import { RowActions } from "./row-actions";

export function SellerTable() {
  const navigate = useNavigate();
  const { loading, products, getMyProducts, deleteMyProduct } =
    useSeller();

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

  return (
    <div className="min-h-screen p-6">
      <div className="bg-background rounded-2xl shadow-lg border border-border p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">My Products</h1>
            <p className="text-ring text-sm">
              Manage your listed products here
            </p>
          </div>

          <Button
            className="bg-accent hover:bg-accent-foreground text-background font-medium 
                       rounded-xl px-6 shadow-md transition"
            onClick={() => navigate("/seller/newProduct")}
          >
            + Create Product
          </Button>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <DataTable
            columns={columns}
            data={products}
            emptyText={loading ? "Loading..." : "No products found"}
          />
        </div>
      </div>
    </div>
  );
}

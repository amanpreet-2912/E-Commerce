import { DataTable } from "@/components/blocks/data-table";
import { RowActions } from "@/components/blocks/row-actions";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";
import { useEffect } from "react";

export default function Admincategories() {
  const { loading, categories, allCategories } = useAdmin();
  useEffect(() => {
    (async () => {
      await allCategories();
    })();
  }, []);
  console.log(categories);
  const columns = [
    { key: "name", header: "Name" },
    // { key: "products", header: "Products" },

    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <RowActions
          actions={[
            {
              label: "View Products",
              // onClick: () => approve(row._id),
              disabled: loading,
            },
            {
              label: "Delete",
              variant: "destructive",
              // onClick: () => reject(row._id),
              disabled: loading,
              seperator: true,
            },
          ]}
        />
      ),
    },
  ];
   return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-4xl mx-auto bg-card shadow-lg rounded-2xl p-6 space-y-6 border border-border">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Category Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Add and manage product categories
          </p>
        </div>

       
        <form
          // onSubmit={handleAddCategory}
          className="flex gap-3 items-center"
        >
          <input
            type="text"
            placeholder="Enter category name"
            // value={newCategory}
            // onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 px-4 py-2 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary"
          />

          <Button
            type="submit" 
            disabled={loading}
            className="rounded-xl px-6"
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </form>

      
        <div className="border border-border rounded-xl overflow-hidden">
          {categories.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No categories found
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3">Sr.No</th>
                  <th className="text-left p-3">Category Name</th>
                  <th className="text-left p-3">Subcategories</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr
                    key={cat._id}
                    className="border-t border-border hover:bg-muted/40"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{cat.name}</td>
                    <td className="p-3">
                      {cat.subcategories?.length
                        ? cat.subcategories.length
                        : 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

import { RowActions } from "@/components/blocks/row-actions";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/useAdmin";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "sonner";
export default function AdminCategories() {
  const {
    loading,
    categories,
    allCategories,
    addNewCategory,
    deletecategory,
    addSubcategory,
    deleteSubcategory,
  } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [newSub, setNewSub] = useState("");
  const [category, setCategory] = useState(null);
  useEffect(() => {
    allCategories();
  }, []);
  const handleSubcategorySubmit = async (e) => {
    e.preventDefault();
    const updatedCategory = await addSubcategory(
      {
        name: newSub,
      },
      category._id,
    );
    setCategory(updatedCategory);
    setNewSub("");
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await addNewCategory({ name: newCategory });
      toast.success("Category Added");
      setNewCategory("");
      setIsOpen(false);
    } catch (err) {
      console.log();
      toast.error(err.message || "Something Went Wrong");
      setNewCategory("");
    }
  };
  async function handleDelete(id) {
    await deletecategory(id);
    toast.success("Category deleted");
  }
  function openSub(category) {
    setCategory(category);
    setIsSubOpen(true);
  }
  async function handleSubDelete(categoryId, subId) {
    try {
      await deleteSubcategory(categoryId, subId);
      setCategory((prev) => {
        return {
          ...prev,
          subcategories: prev.subcategories.filter((sub) => {
            return sub._id !== subId;
          }),
        };
      });
      toast.success("Subcategory deleted");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  }
  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-4xl mx-auto bg-card shadow-lg rounded-2xl p-6 space-y-6 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Category Management
            </h1>
            <p className="text-muted-foreground text-sm mt-4">
              Add and manage product categories
            </p>
          </div>

          <Button
            className="rounded-xl px-6 text-background bg-accent"
            onClick={() => setIsOpen(true)}
          >
            + Add Category
          </Button>
        </div>

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
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, index) => (
                  <tr
                    key={index}
                    className="border-t border-border hover:bg-muted/40"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{cat.name}</td>
                    <td className="p-3">{cat.subcategories?.length || 0}</td>
                    <td>
                      {" "}
                      <RowActions
                        actions={[
                          {
                            label: "Manage Subcategories",
                            onClick: () => openSub(cat),
                            disabled: loading,
                          },
                          // {
                          //   label: "Delete Catgeory",
                          //   variant: "destructive",
                          //   onClick: () => handleDelete(cat._id),
                          //   disabled: loading,
                          //   seperator: true,
                          // },
                        ]}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-card rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4">
              <h2 className="text-xl font-semibold">Add New Category</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary"
                />

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={loading}
                    className={"text-background"}
                  >
                    {loading ? "Adding..." : "Add"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
       {isSubOpen && category && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-card rounded-2xl shadow-xl w-full max-w-md border border-border animate-in fade-in zoom-in-95">

      
      <div className="flex items-center justify-between border-b border-border px-5 py-4">

        <h2 className="text-lg font-semibold">
          Manage Subcategories
        </h2>

        
        <button
          onClick={() => setIsSubOpen(false)}
          className="text-muted-foreground hover:text-destructive text-xl font-bold"
        >
           <X/>
        </button>

      </div>


      
      <div className="px-5 pt-3 text-sm text-muted-foreground">
        Category: <span className="font-medium text-foreground">{category.name}</span>
      </div>


      
      <div className="px-5 py-4 space-y-2 max-h-60 overflow-y-auto">

        {category.subcategories.length === 0 && (
          <p className="text-muted-foreground text-sm">
            No subcategories yet
          </p>
        )}

        {category.subcategories.map((sub) => (
          <div
            key={sub._id}
            className="flex items-center justify-between border border-border px-3 py-2 rounded-lg hover:bg-muted/40 transition"
          >

            <span className="text-sm font-medium">
              {sub.name}
            </span>

           

          </div>
        ))}

      </div>


   
      <form
        onSubmit={handleSubcategorySubmit}
        className="border-t border-border px-5 py-4 flex gap-2"
      >

        <input
          type="text"
          placeholder="New subcategory"
          value={newSub}
          onChange={(e) => setNewSub(e.target.value)}
          className="flex-1 px-3 py-2 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary"
        />

        <Button
          type="submit"
          disabled={!newSub}
          className="text-background"
        >
          Add
        </Button>

      </form>

    </div>

  </div>
)}

      </div>
    </div>
  );
}

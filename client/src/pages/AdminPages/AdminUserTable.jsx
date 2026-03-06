import { DataTable } from "@/components/blocks/data-table";
import { RowActions } from "@/components/blocks/row-actions";
import { useAdmin } from "@/hooks/useAdmin";
import { ArrowLeft, Trash, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export default function AdminUserTable() {
  const navigate=useNavigate();
  const { usersByRole, loading, deleteuser } = useAdmin();
  const { type } = useParams();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async (type) => {
      const response = await usersByRole(type);
      setUsers(response);
    })(type);
  }, [type]);
  async function handleDelete(id) {
    await deleteuser(id);

    setUsers((prev) => prev.filter((user) => user._id !== id));
    toast.success(`${type} deleted`);
  }
  let heading;
  type === "user"
    ? (heading = "Buyers")
    : type === "seller"
      ? (heading = "Sellers")
      : type === "transporter"
        ? (heading = "Transporters")
        : "Users";
  const baseColumns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    {
      key: "createdAt",
      header: "Joined On",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];
  const actionColumn = {
    key: "actions",
    header: "Actions",
    align: "right",
    render: (row) => (
      <div className="flex justify-end">
        <Trash2
          size={16}
          className="text-destructive cursor-pointer hover:scale-110 transition"
          onClick={() => handleDelete(row._id)}
        />
      </div>
    ),
  };
  const columns =
    type === "seller" || type === "transporter"
      ? [...baseColumns, actionColumn]
      : baseColumns;

  if (!users) {
    return <p>Loading Users</p>;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="bg-background rounded-2xl shadow-lg border border-border p-6 space-y-6">
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-3 mb-4">
  {/* Back icon button */}
  <button
    onClick={() => navigate(-1)}
    className="text-primary hover:text-primary/80 p-1 rounded"
  >
    <ArrowLeft className="h-5 w-5" />
  </button>

  {/* Heading */}
  <h1 className="text-3xl font-bold text-primary">All {heading}</h1>
</div>
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <DataTable
            columns={columns}
            data={users}
            emptyText={loading ? "Loading" : `No ${heading} yet`}
          />
        </div>
      </div>
    </div>
  );
}

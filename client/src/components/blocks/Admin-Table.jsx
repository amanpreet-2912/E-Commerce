import { DataTable } from "@/components/blocks/data-table";
import { RowActions } from "@/components/blocks/row-actions";
import { useAdmin } from "@/hooks/useAdmin";
import { useEffect } from "react";
import { Button } from "../ui/button";



export function AdminTable() {
  const { loading, reject, approve, pendingUsers, users, allUsers } =
    useAdmin();
  useEffect(() => {
    pendingUsers();
  }, []);
  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", render: (row) => row.role.toUpperCase() },
    {
      key: "createdAt",
      header: "Requested At",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <RowActions actions={[
          {label:"Approve",
            onClick:()=>approve(row._id),
            disabled:loading,
          },
          {
            label:"Reject",
            variant:"destructive",
            onClick:()=>reject(row._id),
            disabled:loading,
            seperator:true
          }
        ]} />
      ),
    },
  ];
  return (
   <div className="min-h-screen p-6">
      <div className="bg-background rounded-2xl shadow-lg border border-border p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">Requests</h1>
            <p className="text-ring text-sm">
              Approve or Reject Requests
            </p>
          </div>

        
        </div>

        <div className="rounded-xl border border-border overflow-hidden">
          <DataTable
      columns={columns}
      data={users}
      emptyText={loading ? "Loading" : "NO Pending request"}
    />
        </div>
      </div>
    </div>
  );
}

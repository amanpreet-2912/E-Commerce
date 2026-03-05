import { DataTable } from "@/components/blocks/data-table";
import { RowActions } from "@/components/blocks/row-actions";
import { useAdmin } from "@/hooks/useAdmin";
import { useEffect } from "react";
import { Badge } from "../ui/badge";

export function AdminTable() {
  const { loading, reject, approve, pendingUsers, users } = useAdmin();

  useEffect(() => {
    pendingUsers();
  }, []);

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    {
      key: "role",
      header: "Role",
      render: (row) => (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
          {row.role.toUpperCase()}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Requested At",
      render: (row) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      render: (row) => (
        <RowActions
          actions={[
            {
              label: "Approve",
              onClick: () => approve(row._id),
              disabled: loading,
            },
            {
              label: "Reject",
              variant: "destructive",
              onClick: () => reject(row._id),
              disabled: loading,
              seperator: true,
            },
          ]}
        />
      ),
    },
  ];

return (
  <div className="space-y-6">
    
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          Pending Requests
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Sellers and transporters awaiting approval
        </p>
      </div>
  
    </div>

    <div className="bg-background border border-border rounded-xl">
      <div className="p-6">
        <DataTable
          columns={columns}
          data={users}
          emptyText={
            loading
              ? "Loading requests..."
              : "No pending requests"
          }
        />
      </div>
    </div>

  </div>
);
}
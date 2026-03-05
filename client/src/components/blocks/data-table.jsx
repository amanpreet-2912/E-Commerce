import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function DataTable({
  columns,
  data,
  emptyText = "No data available",
}) {
  return (
    <Table className={"rounded-lg overflow-hidden"} >
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={col.key}
              className={col.align === "right" ? "text-right" : ""}
            >
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length === 0 ? (
          <TableRow  >
            <TableCell
              colSpan={columns.length}
              className="h-24 text-center text-muted-foreground"
            >
              {emptyText}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, index) => (
            <TableRow key={row._id ?? index}
           className={"hover:bg-muted/40 transition"} >
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  className={col.align === "right" ? "text-right" : ""}
                >
                  {col.render
                    ? col.render(row)
                    : row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronUp, ChevronDown, Trash2, Edit } from "lucide-react";
import { ticketManager } from "@/class/TicketManager";
import { DataTable } from "../data-table";

interface TableData {
  id: number;
  userId: string;
  type: "standard" | "vip" | "earlybird";
  price: number;
  status: "active" | "used" | "cancelled";
  purchaseDate: string;
}

function getSortingIcon(isSorted: "asc" | "desc" | false) {
  if (isSorted === "asc") return <ChevronUp className="ml-2 h-4 w-4" aria-hidden="true" />;
  if (isSorted === "desc") return <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />;
  return <ArrowUpDown className="ml-2 h-4 w-4" aria-hidden="true" />;
}

export const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        aria-label="Sort by ID"
      >
        ID
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "userId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        aria-label="Sort by User ID"
      >
        User ID
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("userId")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        aria-label="Sort by Type"
      >
        Type
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        aria-label="Sort by Price"
      >
        Price
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return <div>${Number.isFinite(price) ? price.toFixed(2) : "0.00"}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        aria-label="Sort by Status"
      >
        Status
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "purchaseDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        aria-label="Sort by Purchase Date"
      >
        Purchase Date
        {getSortingIcon(column.getIsSorted())}
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("purchaseDate")}</div>,
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const ticketId = row.getValue("id") as number;
      const handleDelete = () => {
        ticketManager.deleteTicket(ticketId);
        window.location.reload(); // Refresh to update table
      };
      return (
        <div className="flex justify-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => alert("Edit functionality to be implemented")}
            aria-label={`Edit ticket ${ticketId}`}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            aria-label={`Delete ticket ${ticketId}`}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      );
    },
  },
];

interface TicketsDataTableProps {
  data: TableData[];
}

export function TicketsDataTable({ data }: TicketsDataTableProps) {
  return (
    <div className="rounded-md border">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";
import { z } from "zod";
import { useParams, Link } from "react-router-dom";
import { IconDotsVertical, IconGripVertical } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { userListManager } from "@/class/UserListManager";
import { Participant } from "@/class/User";

// Define schema for Participant
export const schema = z.object({
  FirstName: z.string(),
  LastName: z.string(),
  Email: z.string().optional(),
  Role: z.enum(["attendee", "speaker", "volunteer"]).optional(),
  PhoneNumber: z.string().optional(),
  Status: z.enum(["confirmed", "pending", "cancelled"]).optional(),
});

// Define drag handle component
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground cursor-move"
    >
      <IconGripVertical />
      <span className="sr-only">Drag handle</span>
    </Button>
  );
}

export function UsersDataTable({ data }: { data: Participant[] }) {
  const { idEvent } = useParams<{ idEvent: string }>();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [dataState, setDataState] = React.useState(data);

  // Update data when prop changes
  React.useEffect(() => {
    setDataState(data);
  }, [data]);

  // Drag-and-drop setup
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setDataState((prev) => {
        const oldIndex = prev.findIndex((item) => item.FirstName + item.LastName === active.id);
        const newIndex = prev.findIndex((item) => item.FirstName + item.LastName === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleStatusChange = (user: Participant, status: "confirmed" | "pending" | "cancelled") => {
    user.setStatus(status);
    userListManager.removeParticipant(Number(idEvent), user.FirstName, user.LastName);
    userListManager.addParticipant(Number(idEvent), user);
    setDataState((prev) => [...prev]);
  };

  const columns: ColumnDef<Participant>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "drag-handle",
      cell: ({ row }) => <DragHandle id={row.original.FirstName + row.original.LastName} />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "FirstName",
      header: "First Name",
      cell: ({ row }) => (
        <Link
          to={`/management/event/${idEvent}/userlist/${row.original.FirstName + row.original.LastName}`}
          className="truncate hover:underline"
        >
          {row.original.FirstName}
        </Link>
      ),
    },
    {
      accessorKey: "LastName",
      header: "Last Name",
      cell: ({ row }) => (
        <Link
          to={`/management/event/${idEvent}/userlist/${row.original.FirstName + row.original.LastName}`}
          className="truncate hover:underline"
        >
          {row.original.LastName}
        </Link>
      ),
    },
    {
      accessorKey: "PhoneNumber",
      header: "Phone Number",
      cell: ({ row }) => (
        <Link
          to={`/management/event/${idEvent}/userlist/${row.original.FirstName + row.original.LastName}`}
          className="truncate hover:underline"
        >
          {row.original.PhoneNumber || "N/A"}
        </Link>
      ),
    },
    {
      accessorKey: "Email",
      header: "E-mail",
      cell: ({ row }) => (
        <Link
          to={`/management/event/${idEvent}/userlist/${row.original.FirstName + row.original.LastName}`}
          className="truncate hover:underline"
        >
          {row.original.Email || "N/A"}
        </Link>
      ),
    },
    {
      accessorKey: "Role",
      header: "Role",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.Role}</Badge>
      ),
    },
    {
      accessorKey: "Status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.Status === "confirmed" ? "default" : row.original.Status === "pending" ? "secondary" : "destructive"}>
          {row.original.Status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onClick={() => handleStatusChange(row.original, "confirmed")}
            >
              Set Confirmed
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleStatusChange(row.original, "pending")}
            >
              Set Pending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleStatusChange(row.original, "cancelled")}
            >
              Set Cancelled
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                userListManager.removeParticipant(Number(idEvent), row.original.FirstName, row.original.LastName);
                setDataState((prev) => prev.filter((item) => !(item.FirstName === row.original.FirstName && item.LastName === row.original.LastName)));
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: dataState,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filter participants..."
          value={(table.getColumn("FirstName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("FirstName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border bg-white">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={dataState.map((item) => item.FirstName + item.LastName)}
            strategy={verticalListSortingStrategy}
          >
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="hover:bg-muted transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No participants found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
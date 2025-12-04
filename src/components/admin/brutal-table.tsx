"use client";

import { Pencil, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { MinimalCard } from "./brutal-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render?: (item: T) => React.ReactNode;
}

interface MinimalTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
}

export function MinimalTable<T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
}: MinimalTableProps<T>) {
  const hasActions = onEdit || onDelete || onView;

  return (
    <MinimalCard variant="bordered" padding="none" className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
              {hasActions && (
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide w-24">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, rowIndex) => (
              <tr
                key={item.id}
                className="transition-smooth hover:bg-blue-50/50 group"
              >
                {columns.map((column) => (
                  <td
                    key={`${item.id}-${column.key}`}
                    className={`px-5 py-4 text-sm text-slate-600 ${column.className || ""}`}
                  >
                    {column.render
                      ? column.render(item)
                      : String((item as Record<string, unknown>)[column.key] ?? "")}
                  </td>
                ))}
                {hasActions && (
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
                      {onView && (
                        <button
                          onClick={() => onView(item)}
                          className="p-2 rounded-lg hover:bg-blue-100 text-slate-400 hover:text-blue-600 transition-smooth"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className="p-2 rounded-lg hover:bg-blue-100 text-slate-400 hover:text-blue-600 transition-smooth"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className="p-2 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-500 transition-smooth"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {/* Mobile-friendly dropdown alternative */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-smooth md:hidden">
                          <MoreHorizontal size={16} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border border-slate-200 shadow-elevated rounded-lg p-1">
                        {onView && (
                          <DropdownMenuItem onClick={() => onView(item)} className="gap-2 cursor-pointer hover:bg-slate-50 rounded-md px-2 py-2 text-slate-600">
                            <Eye size={16} className="text-slate-400" />
                            View
                          </DropdownMenuItem>
                        )}
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(item)} className="gap-2 cursor-pointer hover:bg-slate-50 rounded-md px-2 py-2 text-slate-600">
                            <Pencil size={16} className="text-slate-400" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem onClick={() => onDelete(item)} className="gap-2 cursor-pointer hover:bg-red-50 rounded-md px-2 py-2 text-red-500">
                            <Trash2 size={16} />
                            Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-sm">No data available</p>
          </div>
        )}
      </div>
    </MinimalCard>
  );
}

// Keep BrutalTable as an alias for backwards compatibility
export const BrutalTable = MinimalTable;

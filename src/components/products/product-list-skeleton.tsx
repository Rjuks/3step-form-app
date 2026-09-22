import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

type Props = { count: number };

export const ProductListSkeleton = ({ count }: Props) => (
  <div role="status" aria-label="Ładowanie produktów">
    <div className="hidden lg:block">
      <Table className="min-w-[900px] table-fixed">
        <TableHeader className="bg-gray-50 [&_th]:text-muted-foreground">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[29%] px-4 text-sm font-medium">Nazwa</TableHead>
            <TableHead className="w-[14%] px-4 text-sm font-medium">SKU</TableHead>
            <TableHead className="w-[14%] px-4 text-sm font-medium">Kategoria</TableHead>
            <TableHead className="w-[15%] px-4 text-sm font-medium">Cena Brutto</TableHead>
            <TableHead className="w-[14%] px-4 text-sm font-medium">Status</TableHead>
            <TableHead className="w-[14%] px-4 text-sm font-medium">Magazyn</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: count }, (_, index) => (
            <TableRow key={index} className="h-12">
              <TableCell className="px-4">
                <Skeleton className="h-4 w-3/4" />
              </TableCell>
              <TableCell className="px-4">
                <Skeleton className="h-4 w-2/3" />
              </TableCell>
              <TableCell className="px-4">
                <Skeleton className="h-4 w-2/3" />
              </TableCell>
              <TableCell className="px-4">
                <Skeleton className="h-4 w-3/4" />
              </TableCell>
              <TableCell className="px-4">
                <Skeleton className="h-5 w-20 rounded-full" />
              </TableCell>
              <TableCell className="px-4">
                <Skeleton className="h-4 w-1/3" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    <div className="grid gap-2 lg:hidden">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="rounded-[12px] border border-border bg-white p-3">
          <div className="flex items-start justify-between gap-2.5">
            <div className="min-w-0 flex-1">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="mt-2 h-3 w-1/3" />
            </div>
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1 rounded-[9px] bg-muted p-3">
            <div>
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="mt-2 h-4 w-2/3" />
            </div>
            <div>
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="mt-2 h-4 w-3/4" />
            </div>
            <div>
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="mt-2 h-4 w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="flex justify-center pt-4 lg:justify-between lg:border-t lg:border-border lg:bg-gray-50 lg:px-4 lg:py-4">
      <Skeleton className="hidden h-4 w-36 lg:block" />
      <Skeleton className="h-8 w-48" />
    </div>
  </div>
);

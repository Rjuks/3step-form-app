import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CATEGORY_LABELS } from "@/constants/consts";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/price";

import { ProductStatus } from "./product-status";

type Props = { products: Product[] };

export const ProductTable = ({ products }: Props) => {
  return (
    <div className="hidden lg:block lg:min-h-[280px]">
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
          {products.map((product) => (
            <TableRow key={product.id} className="h-12 hover:bg-gray-50/60">
              <TableCell className="truncate px-4 text-sm font-medium">{product.name}</TableCell>
              <TableCell className="truncate px-4 text-sm text-muted-foreground">
                {product.sku}
              </TableCell>
              <TableCell className="truncate px-4 text-sm text-muted-foreground">
                {CATEGORY_LABELS[product.category]}
              </TableCell>
              <TableCell className="truncate px-4 text-sm font-medium">
                {formatPrice(product.grossPriceCents, product.currency)}
              </TableCell>
              <TableCell className="px-4">
                <ProductStatus available={product.isAvailable} />
              </TableCell>
              <TableCell className="px-4 text-sm">{product.stockQuantity ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

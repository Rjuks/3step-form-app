import { useFormatter, useTranslations } from "next-intl";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/types/product";

import { ProductStatus } from "./product-status";
import { ProductActions } from "./product-actions";

type Props = {
  products: Product[];
  addedProductIds: ReadonlySet<string>;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export const ProductTable = ({ products, addedProductIds, onEdit, onDelete }: Props) => {
  const t = useTranslations("catalog");
  const categoryLabel = useTranslations("categories");
  const format = useFormatter();

  return (
    <div className="hidden lg:block lg:min-h-[280px]">
      <Table className="min-w-[900px] table-fixed">
        <TableHeader className="bg-gray-50 [&_th]:text-muted-foreground">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[24%] px-4 text-sm font-medium">{t("name")}</TableHead>
            <TableHead className="w-[13%] px-4 text-sm font-medium">{t("sku")}</TableHead>
            <TableHead className="w-[13%] px-4 text-sm font-medium">{t("category")}</TableHead>
            <TableHead className="w-[15%] px-4 text-sm font-medium">{t("grossPrice")}</TableHead>
            <TableHead className="w-[14%] px-4 text-sm font-medium">{t("status")}</TableHead>
            <TableHead className="w-[11%] px-4 text-sm font-medium">{t("stock")}</TableHead>
            <TableHead className="w-[10%] px-2" aria-label={t("actions")} />
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
                {categoryLabel(product.category)}
              </TableCell>
              <TableCell className="truncate px-4 text-sm font-medium">
                {format.number(product.grossPriceCents / 100, {
                  style: "currency",
                  currency: product.currency,
                  currencyDisplay: "code",
                })}
              </TableCell>
              <TableCell className="px-4">
                <ProductStatus available={product.isAvailable} />
              </TableCell>
              <TableCell className="px-4 text-sm">{product.stockQuantity ?? "—"}</TableCell>
              <TableCell className="px-2">
                {addedProductIds.has(product.id) && (
                  <ProductActions product={product} onEdit={onEdit} onDelete={onDelete} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

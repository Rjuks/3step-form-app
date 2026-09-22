import { useFormatter, useTranslations } from "next-intl";

import type { Product } from "@/types/product";

import { ProductStatus } from "./product-status";
import { ProductActions } from "./product-actions";

type Props = {
  product: Product;
  canManage: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export const ProductCard = ({ product, canManage, onEdit, onDelete }: Props) => {
  const t = useTranslations("catalog");
  const categoryLabel = useTranslations("categories");
  const format = useFormatter();

  return (
    <article className="min-w-0 rounded-[12px] border border-border bg-white p-3">
      <div className="flex items-center justify-between gap-2.5">
        <div className="min-w-0">
          <h2 className="truncate text-base font-medium">{product.name}</h2>
          <p className="mt-1 truncate text-xs text-muted-foreground">{product.sku}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <ProductStatus available={product.isAvailable} />
          {canManage && <ProductActions product={product} onEdit={onEdit} onDelete={onDelete} />}
        </div>
      </div>

      <dl className="mt-2 grid grid-cols-3 gap-1 rounded-[9px] bg-muted p-3 text-xs">
        <div className="min-w-0">
          <dt className="text-muted-foreground">{t("category")}</dt>
          <dd className="mt-1 text-sm break-words">{categoryLabel(product.category)}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-muted-foreground">{t("grossPrice")}</dt>
          <dd className="mt-1 text-sm font-medium break-words">
            {format.number(product.grossPriceCents / 100, {
              style: "currency",
              currency: product.currency,
              currencyDisplay: "code",
            })}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-muted-foreground">{t("stock")}</dt>
          <dd className="mt-1 text-sm break-words">{product.stockQuantity ?? "—"}</dd>
        </div>
      </dl>
    </article>
  );
};

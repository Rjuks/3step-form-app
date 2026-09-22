import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export const ProductActions = ({ product, onEdit, onDelete }: Props) => {
  const t = useTranslations("actions");

  return (
    <div className="flex shrink-0 items-center justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`${t("edit")}: ${product.name}`}
        title={t("edit")}
        onClick={() => onEdit(product)}
      >
        <Pencil className="size-4" aria-hidden="true" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        aria-label={`${t("delete")}: ${product.name}`}
        title={t("delete")}
        onClick={() => onDelete(product)}
        className="text-destructive hover:text-destructive"
      >
        <Trash2 className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
};

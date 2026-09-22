import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatProductCount } from "@/utils/product-count";

type Props = {
  page: number;
  pageCount: number;
  productCount: number;
  onPageChange: (page: number) => void;
};

export const ProductPagination = ({ page, pageCount, productCount, onPageChange }: Props) => {
  const pageSummary = `Strona ${page} z ${pageCount} · ${formatProductCount(productCount)}`;

  return (
    <nav
      aria-label={pageSummary}
      className="flex flex-col items-center gap-3 pt-4 text-xs lg:flex-row lg:justify-between lg:border-t lg:border-border lg:bg-gray-50 lg:px-4 lg:py-4"
    >
      <p className="text-muted-foreground">{pageSummary}</p>
      <div className="flex min-w-0 max-w-full items-center gap-1 overflow-x-auto overflow-y-hidden">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="h-8 gap-1 px-2 text-sm font-medium"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          Wstecz
        </Button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
          <Button
            key={number}
            type="button"
            variant={number === page ? "default" : "ghost"}
            size="icon-sm"
            aria-label={`Strona ${number}`}
            aria-current={number === page ? "page" : undefined}
            onClick={() => onPageChange(number)}
            className={`size-8 ${number === page ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}
          >
            {number}
          </Button>
        ))}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
          className="h-8 gap-1 px-2 text-sm font-medium"
        >
          Dalej
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </nav>
  );
};

import { FormField, visibleFieldError } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCY, VAT_RATES } from "@/constants/consts";
import type { ProductFormApi } from "@/hooks/use-product-form";

type Props = {
  form: ProductFormApi;
  showAllErrors: boolean;
  onPriceChange: (field: "netPrice" | "grossPrice", value: string) => void;
  onVatChange: (value: number) => void;
};

export const SecondStepPricing = ({ form, showAllErrors, onPriceChange, onVatChange }: Props) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <form.Field name="netPrice">
        {(field) => {
          const error = visibleFieldError(showAllErrors, field.state.meta);
          return (
            <FormField id="netPrice" label="Cena netto" error={error}>
              <Input
                id="netPrice"
                name={field.name}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={field.state.value}
                onChange={(event) => onPriceChange("netPrice", event.target.value)}
                onBlur={field.handleBlur}
                placeholder="0.00"
                aria-invalid={!!error}
                aria-describedby={error ? "netPrice-error" : undefined}
                className="rounded-full"
              />
            </FormField>
          );
        }}
      </form.Field>

      <form.Field name="grossPrice">
        {(field) => {
          const error = visibleFieldError(showAllErrors, field.state.meta);
          return (
            <FormField id="grossPrice" label="Cena brutto" error={error}>
              <Input
                id="grossPrice"
                name={field.name}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                value={field.state.value}
                onChange={(event) => onPriceChange("grossPrice", event.target.value)}
                onBlur={field.handleBlur}
                placeholder="0.00"
                aria-invalid={!!error}
                aria-describedby={error ? "grossPrice-error" : undefined}
                className="rounded-full"
              />
            </FormField>
          );
        }}
      </form.Field>

      <form.Field name="vatRate">
        {(field) => {
          const error = visibleFieldError(showAllErrors, field.state.meta);
          return (
            <FormField id="vatRate" label="Stawka VAT" error={error}>
              <Select
                value={String(field.state.value)}
                onValueChange={(value) => onVatChange(Number(value))}
              >
                <SelectTrigger
                  id="vatRate"
                  onBlur={field.handleBlur}
                  aria-invalid={!!error}
                  aria-describedby={error ? "vatRate-error" : undefined}
                  className="h-8 w-full rounded-full"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VAT_RATES.map((rate) => (
                    <SelectItem key={rate} value={String(rate)}>
                      {rate}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          );
        }}
      </form.Field>

      <form.Field name="currency">
        {(field) => {
          const error = visibleFieldError(showAllErrors, field.state.meta);
          return (
            <FormField id="currency" label="Waluta" error={error}>
              <Select value={field.state.value} onValueChange={field.handleChange}>
                <SelectTrigger
                  id="currency"
                  onBlur={field.handleBlur}
                  aria-invalid={!!error}
                  aria-describedby={error ? "currency-error" : undefined}
                  className="h-8 w-full rounded-full"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(CURRENCY).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          );
        }}
      </form.Field>
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CATEGORIES,
  CATEGORY_LABELS,
  FEATURES,
  FEATURE_LABELS,
  MANUFACTURERS,
} from "@/constants/consts";
import type { ProductFormApi } from "@/hooks/use-product-form";

import { FormField, visibleFieldError } from "./form-field";

type Props = {
  form: ProductFormApi;
  showAllErrors: boolean;
};

export const FirstStepInformation = ({ form, showAllErrors }: Props) => {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="name">
          {(field) => {
            const error = visibleFieldError(showAllErrors, field.state.meta);
            return (
              <FormField id="name" label="Nazwa produktu" error={error}>
                <Input
                  id="name"
                  name={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="np. MacBook Pro 14"
                  aria-invalid={!!error}
                  aria-describedby={error ? "name-error" : undefined}
                  className="rounded-full"
                />
              </FormField>
            );
          }}
        </form.Field>

        <form.Field name="sku">
          {(field) => {
            const error = visibleFieldError(showAllErrors, field.state.meta);
            return (
              <FormField id="sku" label="SKU produktu" error={error}>
                <Input
                  id="sku"
                  name={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="np. MBP14M3PRO"
                  aria-invalid={!!error}
                  aria-describedby={error ? "sku-error" : undefined}
                  className="rounded-full"
                />
              </FormField>
            );
          }}
        </form.Field>
      </div>

      <form.Field name="description">
        {(field) => (
          <FormField id="description" label="Opis produktu">
            <Textarea
              id="description"
              name={field.name}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              placeholder="Krótki opis produktu"
              className="min-h-16 resize-none rounded-lg"
            />
          </FormField>
        )}
      </form.Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="manufacturer">
          {(field) => {
            const error = visibleFieldError(showAllErrors, field.state.meta);
            return (
              <FormField id="manufacturer" label="Producent" error={error}>
                <Select value={field.state.value} onValueChange={field.handleChange}>
                  <SelectTrigger
                    id="manufacturer"
                    onBlur={field.handleBlur}
                    aria-invalid={!!error}
                    aria-describedby={error ? "manufacturer-error" : undefined}
                    className="h-8 w-full rounded-full"
                  >
                    <SelectValue placeholder="Wybierz producenta" />
                  </SelectTrigger>
                  <SelectContent>
                    {MANUFACTURERS.map((manufacturer) => (
                      <SelectItem key={manufacturer} value={manufacturer}>
                        {manufacturer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            );
          }}
        </form.Field>

        <form.Field name="category">
          {(field) => {
            const error = visibleFieldError(showAllErrors, field.state.meta);
            return (
              <FormField id="category" label="Kategoria" error={error}>
                <Select value={field.state.value} onValueChange={field.handleChange}>
                  <SelectTrigger
                    id="category"
                    onBlur={field.handleBlur}
                    aria-invalid={!!error}
                    aria-describedby={error ? "category-error" : undefined}
                    className="h-8 w-full rounded-full"
                  >
                    <SelectValue placeholder="Wybierz kategorię" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {CATEGORY_LABELS[category]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>
            );
          }}
        </form.Field>
      </div>

      <form.Field name="features">
        {(field) => {
          const error = visibleFieldError(showAllErrors, field.state.meta);
          return (
            <fieldset className="space-y-2" aria-invalid={!!error}>
              <legend className="text-sm font-medium">Cechy produktu</legend>
              <div className="flex flex-wrap gap-2">
                {FEATURES.map((feature) => {
                  const selected = field.state.value.includes(feature);
                  return (
                    <Button
                      key={feature}
                      type="button"
                      variant="outline"
                      size="xs"
                      aria-pressed={selected}
                      onClick={() =>
                        field.handleChange(
                          selected
                            ? field.state.value.filter((value) => value !== feature)
                            : [...field.state.value, feature],
                        )
                      }
                      className={`h-6 rounded-full bg-white px-2 text-sm font-normal ${
                        selected
                          ? "border-blue-600 bg-blue-50 text-blue-700 hover:bg-blue-100"
                          : "text-muted-foreground"
                      }`}
                    >
                      {FEATURE_LABELS[feature]}
                    </Button>
                  );
                })}
              </div>
              {error && (
                <p role="alert" className="text-xs text-destructive">
                  {error}
                </p>
              )}
            </fieldset>
          );
        }}
      </form.Field>
    </div>
  );
};

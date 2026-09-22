import { Checkbox } from "@/components/ui/checkbox";
import { FormField, visibleFieldError } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { ProductFormApi } from "@/hooks/use-product-form";

type Props = {
  form: ProductFormApi;
  showAllErrors: boolean;
};

export const ThirdStepAvailability = ({ form, showAllErrors }: Props) => {
  return (
    <div className="space-y-4">
      <form.Field name="isAvailable">
        {(field) => (
          <label className="flex min-h-9 cursor-pointer items-center gap-2 border-b border-border pb-3 text-sm font-medium">
            <Switch checked={field.state.value} onCheckedChange={field.handleChange} />
            Produkt jest dostępny
          </label>
        )}
      </form.Field>

      <form.Field name="isLimited">
        {(field) => (
          <label className="flex min-h-9 cursor-pointer items-center gap-2 border-b border-border pb-3 text-sm font-medium">
            <Checkbox
              checked={field.state.value}
              onCheckedChange={(checked) => {
                field.handleChange(checked === true);
                if (checked !== true) form.setFieldValue("stockQuantity", "");
              }}
            />
            Produkt limitowany
          </label>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.values.isLimited}>
        {(isLimited) =>
          isLimited ? (
            <form.Field name="stockQuantity">
              {(field) => {
                const error = visibleFieldError(showAllErrors, field.state.meta);
                return (
                  <FormField id="stockQuantity" label="Ilość na magazynie" error={error}>
                    <Input
                      id="stockQuantity"
                      name={field.name}
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                      onBlur={field.handleBlur}
                      placeholder="0"
                      aria-invalid={!!error}
                      aria-describedby={error ? "stockQuantity-error" : undefined}
                      className="rounded-full"
                    />
                  </FormField>
                );
              }}
            </form.Field>
          ) : null
        }
      </form.Subscribe>

      <fieldset className="space-y-3">
        <legend className="mb-3 text-sm font-medium">Limity koszyka</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <form.Field name="minQuantity">
            {(field) => {
              const error = visibleFieldError(showAllErrors, field.state.meta);
              return (
                <FormField id="minQuantity" label="Minimalna ilość" error={error}>
                  <Input
                    id="minQuantity"
                    name={field.name}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={!!error}
                    aria-describedby={error ? "minQuantity-error" : undefined}
                    className="rounded-full px-3"
                  />
                </FormField>
              );
            }}
          </form.Field>

          <form.Field name="maxQuantity">
            {(field) => {
              const error = visibleFieldError(showAllErrors, field.state.meta);
              return (
                <FormField id="maxQuantity" label="Maksymalna ilość" error={error}>
                  <Input
                    id="maxQuantity"
                    name={field.name}
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={!!error}
                    aria-describedby={error ? "maxQuantity-error" : undefined}
                    className="rounded-full"
                  />
                </FormField>
              );
            }}
          </form.Field>
        </div>
      </fieldset>
    </div>
  );
};

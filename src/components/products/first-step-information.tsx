import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { FormField, visibleFieldError } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, FEATURES, MANUFACTURERS } from "@/constants/consts";
import type { ProductFormApi } from "@/hooks/use-product-form";

type Props = {
  form: ProductFormApi;
  showAllErrors: boolean;
};

export const FirstStepInformation = ({ form, showAllErrors }: Props) => {
  const t = useTranslations("form");
  const categoryLabel = useTranslations("categories");
  const featureLabel = useTranslations("features");

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="name">
          {(field) => {
            const error = visibleFieldError(showAllErrors, field.state.meta);
            return (
              <FormField id="name" label={t("name")} error={error}>
                <Input
                  id="name"
                  name={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={t("namePlaceholder")}
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
              <FormField id="sku" label={t("sku")} error={error}>
                <Input
                  id="sku"
                  name={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={t("skuPlaceholder")}
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
          <FormField id="description" label={t("description")}>
            <Textarea
              id="description"
              name={field.name}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              placeholder={t("descriptionPlaceholder")}
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
              <FormField id="manufacturer" label={t("manufacturer")} error={error}>
                <Select value={field.state.value} onValueChange={field.handleChange}>
                  <SelectTrigger
                    id="manufacturer"
                    onBlur={field.handleBlur}
                    aria-invalid={!!error}
                    aria-describedby={error ? "manufacturer-error" : undefined}
                    className="h-8 w-full rounded-full"
                  >
                    <SelectValue placeholder={t("manufacturerPlaceholder")} />
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
              <FormField id="category" label={t("category")} error={error}>
                <Select value={field.state.value} onValueChange={field.handleChange}>
                  <SelectTrigger
                    id="category"
                    onBlur={field.handleBlur}
                    aria-invalid={!!error}
                    aria-describedby={error ? "category-error" : undefined}
                    className="h-8 w-full rounded-full"
                  >
                    <SelectValue placeholder={t("categoryPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {categoryLabel(category)}
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
            <fieldset
              className="space-y-2"
              aria-invalid={!!error}
              tabIndex={error ? -1 : undefined}
            >
              <legend className="text-sm font-medium">{t("features")}</legend>
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
                      {featureLabel(feature)}
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
